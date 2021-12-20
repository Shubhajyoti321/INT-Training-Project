import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default ({ component: Component, ...rest }) => {
	//const { isloggedin } = useSelector((state) => state.auth);
	const isloggedin = useSelector((state) => state.login.isLoggedin)

	console.log("Priverroute",isloggedin)

	return (
		<Route
			{...rest}
			render={(props) => {
				console.log("props.location", props.location)
				return isloggedin ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/', state: { from: props.location.pathname} }} />
					
				);
			}}
		/>
	);
};
