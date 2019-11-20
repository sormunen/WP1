import React from 'react'
import {Link} from 'react-router-dom';

export default function NotFound({location, history}) {
    return (
        <div>
            <h1>404 Not found :(</h1>
            <p>Page doesn't exist or is under maintenance: <code>{location.pathname}</code></p>
            <p>Go back <Link to="/">Home</Link></p>
        </div>
    )
}
