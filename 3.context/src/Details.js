import React from 'react';
import { connect } from 'react-redux'

function Details(props) {
    const { details, dispatch } = props;
    const { name, email } = details


    return (
        <div onClick={() => dispatch({ type: "INCREMENT" })}>
            <h3>Details </h3>
            <p>Name is {name}</p>
            <p>Email is {email}</p>
        </div>
    );
}

export default connect((state) => state)(Details);