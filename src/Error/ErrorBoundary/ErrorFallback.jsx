import { useHistory } from 'react-router';
import somethingWrongBg from '../../assets/images/something-wrong.svg';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
	const history = useHistory();
	return (
		<div>
			<div className="something-wrong-bg"></div>
			<div role="alert" className="something-wrong">
				<img src={somethingWrongBg} alt="Error" />
				<p>Something went wrong!</p>
				<button
					className="btn btn-primary"
					onClick={() => {
						resetErrorBoundary();
						history.push('/');
					}}
				>
					Home
				</button>
				<button className="btn btn-primary" onClick={resetErrorBoundary}>
					Reload
				</button>
			</div>
		</div>
	);
};

export default ErrorFallback;
