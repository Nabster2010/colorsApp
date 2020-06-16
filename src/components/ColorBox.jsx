import React from 'react';
import './ColorBox.css';
import { Link, useParams } from 'react-router-dom';
import useStyles from './styles/ColorBoxStyles';

export const ColorBox = (props) => {
	const { color, showLink, selection } = props;
	const classes = useStyles(props);
	const { id } = useParams();

	const [copied, setCopied] = React.useState(false);

	const handleClick = () => {
		setCopied(true);

		navigator.clipboard.writeText(color[selection]);

		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className={classes.colorBox} onClick={handleClick}>
			<div className='copy-container'>
				<div
					className={`${classes.copyOverlay} ${
						copied && classes.copyOverlayShow
					}`}
				></div>
				<div className={`${classes.copyMsg} ${copied && classes.copyMsgShow}`}>
					<h1 className={classes.copyMsgH1}>Copied</h1>
					<p className={classes.copyMsgP}>{color[selection]}</p>
				</div>
				<div className='copy-content'>
					<span className={classes.colorName}>{color.name}</span>
					<button className={classes.copyButton}>Copy</button>
					{showLink && (
						<Link
							to={`/palettes/${id}/${color.id}`}
							className={classes.seeMore}
							onClick={(e) => e.stopPropagation()}
						>
							More
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};
