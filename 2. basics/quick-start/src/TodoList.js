import React, { Component } from 'react';

class Todo extends Component {
    modifyTodo = (event) => {
        this.props.onChangeRequest("Genisys Training")
    }
    render() {
        const { text, onDeleteRequest } = this.props
        return <div>
            <p>{text}</p>
            <button onClick={this.modifyTodo}>Modify Todo</button>
            <button onClick={onDeleteRequest}>Delete Todo</button>
        </div>
    }
}


class TodoList extends Component {
    state = {
        todo: "Genisys"
    }
    onDeleteRequest = (event) => {
        console.log(event)
        this.setState({ todo: null })
    }
    onChangeRequest = (value) => {
        this.setState({ todo: value })
    }
    render() {
        return <Todo
            onChangeRequest={this.onChangeRequest}
            onDeleteRequest={this.onDeleteRequest}
            text={this.state.todo} ></Todo>
    }
}

export default TodoList;