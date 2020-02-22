import React from 'react';
import { connect } from 'react-redux'

function Counter(props) {
    console.log(props);
    const { counter, dispatch } = props

    function increment() {
        dispatch({
            type: "INCREMENT"
        })
    }

    function decrement() {
        dispatch({
            type: "DECREMENT"
        })
    }

    function reset() {
        dispatch({
            type: "RESET"
        })
    }

    return <div>
        <p>{counter}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
    </div>
}

export default connect(function (state) {
    const { counter } = state;
    return { counter }
})(Counter);