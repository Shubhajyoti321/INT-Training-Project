import { lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';

import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/css/styles.css';

import FullPageLoader from './components/loaders/FullPageLoader';
import ErrorFallback from './Error/ErrorBoundary/ErrorFallback';
import errorHandler from './Error/ErrorBoundary/errorHandler';
import { withSuspense } from './hoc/withSuspense';

const Routes = withSuspense(
	lazy(() => import(/* webpackChunkName: "routes" */ './routes/Routes')),
	<FullPageLoader />
);

function App() {
	useEffect(() => {
		// Disable logs in production
		if (process.env.NODE_ENV !== 'development') {
			let noOp = function () {}; // no-op function
			if (!window.console) {
				console = {
					log: noOp,
					warn: noOp,
					error: noOp,
				};
			} else {
				console = {
					...console,
					log: noOp,
					warn: noOp,
					error: noOp,
				};
			}
		}
	}, []);

	return (
		<>
			<ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
				<Switch>
					<Route path="/" component={Routes} />
				</Switch>
			</ErrorBoundary>
			<ToastContainer />
		</>
	);
}

export default App;
