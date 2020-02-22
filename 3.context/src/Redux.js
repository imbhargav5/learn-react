import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'

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

const detailsReducer = combineReducers({
    name: nameReducer,
    email: emailReducer
})



const createReducer = (history) => {
    const reducer = combineReducers({
        counter: counterReducer,
        details: detailsReducer,
        router: connectRouter(history)
    })
    return reducer
}


export const history = createBrowserHistory()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(createReducer(history), composeEnhancers(applyMiddleware(loggerMiddleware)));


export default store