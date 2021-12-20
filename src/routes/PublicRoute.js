import React from 'react'
import { Route } from 'react-router-dom';

export default ({ component: Component, provider, provider: Provider, ...rest }) => {
  	return (
	  	<Route {...rest}
			render={(props) => (
				provider ? (
					<Provider>
						<Component {...props} />
					</Provider>
					) : (
					<Component {...props} />
					)
				)
			}
		/>
	)
}