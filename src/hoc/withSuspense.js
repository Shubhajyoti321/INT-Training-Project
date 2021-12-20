import React from 'react';

// import DefaultFallbackLoader from '../components/loaders/DefaultFallbackLoader';

/**
 * Wraps the React Component with React.Suspense and FallbackComponent while loading.
 * @param {React.Component} WrappedComponent - lazy loading component to wrap.
 * @param {React.Component} FallbackComponent - component to show while the WrappedComponent is loading.
 */

export const withSuspense = (WrappedComponent, FallbackComponent = null) => {
	return class extends React.Component {
		render() {
			if (!FallbackComponent) FallbackComponent = <div></div>;  // Default fallback
			return (
				<React.Suspense fallback={FallbackComponent}>
					<WrappedComponent {...this.props} />
				</React.Suspense>
			);
		}
	};
};