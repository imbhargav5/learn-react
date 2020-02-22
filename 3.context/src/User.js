import React from 'react';
import { withRouter } from 'react-router-dom'

function User(props) {
    const username = props.match.params.username;
    return (
        <div>
            <p>Welcome {username}</p>
        </div>
    );
}

export default withRouter(User);