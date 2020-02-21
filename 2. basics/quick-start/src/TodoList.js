import React, { Component, useState } from 'react';

class Todo extends Component {
    modifyTodo = (event) => {
        //this.props.onChangeRequest(event, "Genisys Training")
    }
    render() {
        const { text, onDeleteRequest, onChangeRequest } = this.props
        return <div>
            <p>{text}</p>
            <button onClick={this.modifyTodo}>Modify Todo</button>
            <button onClick={onDeleteRequest}>Delete Todo</button>
        </div>
    }
}


// class TodoList extends Component {
//     state = {
//         todos: ["Genisys", "Training", "Bhargav"]
//     }
//     onDeleteRequest = () => {
//         //this.setState({ todo: null })
//     }
//     onChangeRequest = (event, value) => {
//         // console.log({ value })
//         //this.setState({ todo: value })
//     }
//     render() {
//         const elements = this.state.todos.map(todoItem => <Todo key={todoItem} text={todoItem}></Todo>)
//         return <div>
//             {elements}
//         </div>
//         // return <Todo
//         //     onChangeRequest={this.onChangeRequest}
//         //     onDeleteRequest={this.onDeleteRequest}
//         //     text={this.state.todo} ></Todo>
//     }
// }

function TodoList() {
    const [todos, setTodos] = useState(["Genisys", "Training", "Bhargav"])
    const [name, setName] = useState("Todos with hooks")

    const elements = todos.map(todoItem =>
        <Todo key={todoItem} text={todoItem}></Todo>)

    function clearTodos() {
        setTodos([])
    }

    return <div>
        <h3>{name}</h3>
        {elements}
        <button onClick={clearTodos}>Clear todos</button>
    </div>
}

export default TodoList;