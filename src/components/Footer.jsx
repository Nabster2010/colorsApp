import React from 'react';

const Footer = ({ name, emoji }) => {
	return (
		<footer
			style={{
				display: 'flex',
				height: '5vh',
				justifyContent: 'flex-end',
				alignItems: 'center',
				fontSize: '20px',
				padding: '10px',
			}}
		>
			<span>{emoji}</span>
			<span>{name}</span>
		</footer>
	);
};

export default Footer;
