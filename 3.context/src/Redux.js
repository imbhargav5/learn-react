import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk';


const INIT_VALUE = 5;

const loggerMiddleware = store => next => action => {
    console.log("Logger: Action is", { action });
    return next(action);
}


function counterReducer(state = INIT_VALUE, action) {
    if (action.type == "INCREMENT") {
        return state + 1
    }
    if (action.type == "DECREMENT") {
        return state - 1
    }
    if (action.type == "RESET") {
        return INIT_VALUE
    }
    return state;
}

function nameReducer(state = "Bhargav", action) {
    if (action.type == "NAME_CHANGE") {
        return "Genisys"
    }
    return state
}

function emailReducer(state = "imbhargav5@gmail.com", action) {
    if (action.type == "EMAIL_CHANGE") {
        return action.payload
    }
    return state
}

function pokedexReducer(state = {
    pokemonList: [],
    loaded: false
}, action) {
    if (action.type === "POKEMONLIST_LOADED") {
        const { pokemonList, loaded } = action.payload;
        return {
            pokemonList,
            loaded
        }
    }
    return state;
}

// state.bulbasaur = {..}
// state.charmander = {..}
function specificPokemonReducer(state = {}, action) {
    if (action.type == "SPECIFIC_POKEMON_LOADED") {
        const { pokemonName, data } = action.payload
        return Object.assign({}, state, {
            [pokemonName]: data
        })
    }
    return state
}

const detailsReducer = combineReducers({
    name: nameReducer,
    email: emailReducer
})





const createReducer = (history) => {
    const reducer = combineReducers({
        counter: counterReducer,
        details: detailsReducer,
        pokedex: pokedexReducer,
        specificPokemon: specificPokemonReducer,
        router: connectRouter(history)
    })
    return reducer
}


export const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function loadState() {
    try {
        const value = localStorage.getItem("reduxState");
        if (!value) {
            return undefined
        } else {
            return JSON.parse(value);
        }
    } catch (err) {
        return undefined;
    }
}


function saveState(state) {
    try {
        localStorage.setItem("reduxState", JSON.stringify(state));
    } catch (err) {
        return undefined;
    }
}




const persistedState = loadState();
const store = createStore(createReducer(history), persistedState, composeEnhancers(applyMiddleware(loggerMiddleware, thunk)));
store.subscribe(() => {
    saveState(store.getState())
})

export default store