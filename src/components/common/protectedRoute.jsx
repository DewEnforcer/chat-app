import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import {getCurrentUser, isAdmin} from "../../services/authservice";


const ProtectedRoute = ({component: Component, redirectPath, render, adminRoute, ...rest}) => {
    const redirectUser = (props) => {
        return <Redirect to={{
            pathname: redirectPath,
            state: {
                from: props.location
            }
        }}/>
    }

    return (
        <Route 
        {...rest}
        render={(props) => {
            if (adminRoute && !isAdmin()) return redirectUser(props); 
            if (getCurrentUser()) return Component ? <Component {...props}/> : render(props);
            return redirectUser(props);
        }}
        />
    );
}
 
ProtectedRoute.defaultProps = {
    redirectPath: "/login",
}


export default ProtectedRoute;
