import React from 'react';
import './PlalettesPreview.css';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
	root: {
		backgroundColor: 'blue',
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
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
		alignItems: 'center',
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
	newPalette: {
		color: 'white',
	},
});

const PalettesPreview = ({ palettes, deletePalette }) => {
	const [DeleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false);
	const openDeleteConfirmation = () => {
		setDeleteConfirmOpen(true);
	};
	const closeDeleteConfirmation = () => {
		setDeleteConfirmOpen(false);
	};

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<div className={classes.nav}>
					<h1>React Colors</h1>
					<Link className={classes.newPalette} to='/palettes/new'>
						Create Palette
					</Link>
				</div>
				<div className={classes.palettes}>
					{palettes.map((palette) => (
						<MiniPalette
							palette={palette}
							key={palette.id}
							openDeleteConfirmation={openDeleteConfirmation}
							closeDeleteConfirmation={closeDeleteConfirmation}
							DeleteConfirmOpen={DeleteConfirmOpen}
							deletePalette={deletePalette}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default PalettesPreview;
