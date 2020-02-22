import { createStore, combineReducers, applyMiddleware } from 'redux'

const INIT_VALUE = 5;

const loggerMiddleware = store => next => action => {
    console.log("Logger: Action is", { action });
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

const reducer = combineReducers({
    counter: counterReducer,
    details: detailsReducer
})

const store = createStore(reducer, applyMiddleware(loggerMiddleware));


export default store