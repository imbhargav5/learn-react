import React, { useEffect, useState } from 'react';
import { Link, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const ListItems = connect(state => {
    return {
        items: state.items
    }
})(function _ListItems(props) {
    useEffect(() => {
        props.dispatch({
            type: "LOAD_ITEMS"
        })
    }, [])

    const { items } = props;
    const { list } = items;

    const elements = list.map(item => {
        return <p>
            <Link to={"/items/" + item.id}>
                <span>{item.title}</span>
            </Link>
        </p>
    })

    return <div>
        <h1> Items</h1>
        <hr />
        {elements}

    </div>
}
)

const AddItem = connect()(function _AddItem(props) {
    return <ItemForm onSubmit={value => props.dispatch({
        type: "ADD_ITEM",
        text: value
    })} placeholder="Add item" />
})


function ItemForm(props) {
    const { initialValue, onSubmit, placeholder } = props;
    const [value, setValue] = useState(initialValue)

    function onChange(event) {
        setValue(event.target.value)
    }

    return <form onSubmit={event => {
        event.preventDefault()
        if (value) {
            onSubmit(value)
        }
    }}>
        <input value={value} onChange={onChange} type="text" placeholder={placeholder} />
        <button>Send</button>
    </form>
}

const EditItem = connect(state => {
    return {
        items: state.items
    }
})(withRouter(function EditItem(props) {
    const { itemId } = props.match.params;
    const { edit: { item } } = props.items;


    useEffect(() => {
        props.dispatch({
            type: "EDIT_ITEM",
            id: parseInt(itemId)
        })
    }, [])


    if (!item || item.id != itemId) {
        return null;
    }
    return <ItemForm initialValue={item.title} onSubmit={newValue => props.dispatch({
        type: "UPDATE_ITEM",
        text: newValue,

    })} />

}))

function Items(props) {
    return (
        <div>
            <nav>
                <Link to="/items">List Items</Link>
                <Link to="/items/add">Add Item</Link>
            </nav>
            <Route path="/items/:itemId">
                <EditItem />
            </Route>
            <Route path="/items" exact>
                <ListItems />
            </Route>
            <Route path="/items/add" exact>
                <AddItem />
            </Route>

        </div>
    );
}

export default connect()(Items);