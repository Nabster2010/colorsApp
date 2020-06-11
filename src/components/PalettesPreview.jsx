import React from 'react';
import Palette from './Palette';
import './PlalettesPreview.css';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	root: {
		backgroundColor: 'blue',
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'scroll',
	},
	container: {
		width: '50%',
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	nav: {
		display: 'flex',
		width: '100%',
		justifyContent: 'space-between',
		color: 'white',
	},
	palettes: {
		display: 'grid',
		width: '100%',
		gridTemplateColumns: 'repeat(3,30%)',
		gridGap: '5%',
		cursor: 'pointer',
	},
	paletteLink: {
		textDecoration: 'none',
		color: 'blue',
	},
});

const PalettesPreview = ({ palettes }) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<div className={classes.nav}>
					<h1>React Colors</h1>
				</div>
				<div className={classes.palettes}>
					{palettes.map((palette) => (
						<MiniPalette palette={palette} key={palette.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default PalettesPreview;
