import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import { all, takeEvery, call, put, take } from 'redux-saga/effects'


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



function itemsReducer(state = {
    list: [],
    edit: {
        id: null,
        item: null
    }
}, action) {
    if (action.type == "LOAD_ITEMS_SUCCEEDED") {
        return {
            ...state,
            list: action.data
        }
    }
    if (action.type == "LOAD_EDIT_ITEM_REQUESTED") {
        return {
            ...state,
            edit: {
                id: action.id,
                item: null
            }
        }
    }
    if (action.type == "LOAD_EDIT_ITEM_SUCCEEDED") {
        return {
            ...state,
            edit: {
                item: action.item,
                id: state.edit.id
            }
        }
    }
    return state;
}


/** 
 * Sagas
*/



const sagaMiddleware = createSagaMiddleware()

/** */

const createReducer = (history) => {
    const reducer = combineReducers({
        counter: counterReducer,
        details: detailsReducer,
        pokedex: pokedexReducer,
        specificPokemon: specificPokemonReducer,
        items: itemsReducer,
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
const store = createStore(createReducer(history), persistedState, composeEnhancers(applyMiddleware(loggerMiddleware, thunk, sagaMiddleware)));

store.subscribe(() => {
    saveState(store.getState())
})


function postItemApi(text) {
    return fetch(`http://localhost:7000/items`, {
        method: 'POST',
        body: JSON.stringify({
            title: text,
            completed: false,
            order: 0
        })
    }).then(response => {
        return response.json()
    })
}

function putItemApi(id, text) {
    return fetch(`http://localhost:7000/items/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: text,
        })
    })
}

function loadItemApi() {
    return fetch(`http://localhost:7000/items`, {
        method: 'GET',
    }).then(response => {
        return response.json()
    })
}

function fetchItemApi(itemId) {
    return fetch(`http://localhost:7000/items/${itemId}`, {
        method: 'GET',
    }).then(response => {
        return response.json()
    })
}


function* addItem(action) {
    const data = yield call(postItemApi, action.text)
    yield put({
        type: "ADD_SUCCEEDED",
        data
    })
}

function* editItem(action) {
    yield put({
        type: "LOAD_EDIT_ITEM_REQUESTED",
        id: action.id
    })
    const item = yield call(fetchItemApi, action.id)
    yield put({
        type: "LOAD_EDIT_ITEM_SUCCEEDED",
        item
    })

    const updateAction = yield take("UPDATE_ITEM")
    try {
        const response = yield call(putItemApi, item.id, updateAction.text)
        yield put({
            type: "UPDATE_ITEM_SUCCEEDED",
        })
    } catch (err) {
        console.log(err)
    }


}

function* fetchItems() {
    const data = yield call(loadItemApi);
    yield put({ type: "LOAD_ITEMS_SUCCEEDED", data })
}

function* watchAddItems() {
    yield takeEvery('ADD_ITEM', addItem);
}

function* watchListItems() {
    yield takeEvery('LOAD_ITEMS', fetchItems);
}

function* watchEditItems() {
    yield takeEvery('EDIT_ITEM', editItem);
}

function* rootSaga() {
    yield all([
        call(watchAddItems),
        call(watchListItems),
        call(watchEditItems)
    ])
}

sagaMiddleware.run(rootSaga)

export default store