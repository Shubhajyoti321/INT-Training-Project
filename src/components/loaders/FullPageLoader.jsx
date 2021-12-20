import { isWebpSupported } from 'react-image-webp/dist/utils';

const SrlLogoLoader = () => {
	return (
		<div className="logo-loading">
			<div className="text-center">
				<img src={isWebpSupported ? 'webploader' : 'normalloader'} alt="icon" />
				<br />
				<img src={'logoLoadGif'} alt="text" />
			</div>
		</div>
	);
};

export default SrlLogoLoader;
