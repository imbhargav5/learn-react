import React, { Component } from 'react'

class Counter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: props.initialValue,
            isCounterEnabled: false,
            name: null
        }
    }
    componentDidMount() {
        this.setState({ name: "bhargav" })
    }
    componentDidUpdate(prevProps, prevState) {
        console.log("Counter", { prevProps, prevState })
    }
    increment = () => {
        //this.state.counter + 1
        this.setState({
            counter: this.state.counter + 1
        })
    }

    decrement = () => {
        //this.state.counter + 1
        this.setState({
            counter: this.state.counter - 1
        })
    }

    reset = () => {
        //this.state.counter + 1
        this.setState({
            counter: this.props.initialValue
        })
    }

    handleEnableCounter = () => {
        this.setState({
            isCounterEnabled: true
        })
    }

    handleDisableCounter = () => {
        this.setState({
            isCounterEnabled: false
        })
    }

    render() {
        const { counter, name, isCounterEnabled } = this.state;
        if (isCounterEnabled) {
            return <div>
                <p>{name}</p>
                <DisplayCounter counter={counter} />
                <p>{counter % 2 == 0 ? <span>Even</span> : <span>Odd</span>}</p>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
                <button onClick={this.reset}>Reset</button>
                <button onClick={this.handleDisableCounter}>Disable Counter</button>
            </div>
        } else {
            return <p style={{ border: "1px solid red" }} onMouseEnter={this.handleEnableCounter}>Counter is not enabled</p>
        }

    }
}


class DisplayCounter extends Component {
    componentDidUpdate(prevProps, prevState) {
        console.log("DisplayCounter", { prevProps, prevState })
    }
    componentWillUnmount() {
        console.log("Display counter is unmounting", this.props.counter)
    }
    render() {
        const { counter } = this.props;
        return <p>{counter}</p>
    }
}

export default Counter