import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import DeletePaletteDialog from './DeletePaletteDialog';
const useStyles = makeStyles({
	root: {
		justifyContent: 'center',
		alignItems: 'center',
		border: '1px solid black',
		backgroundColor: 'white',
		borderRadius: '5px',
		position: 'relative',
		'&:hover svg': {
			opacity: '1',
		},
	},
	colors: {
		backgroundColor: '#dea1e4',
		height: '150px',
		width: '90%',
		borderRadius: '5px',
		overflow: 'hidden',
		margin: 'auto',
		marginTop: '0.5rem',
	},
	box: {
		margin: '0 auto',
		display: 'inline-block',
		width: '20%',
		height: '25%',
		marginBottom: '-3.5px',
		position: 'relative',
	},
	title: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '0',
		padding: '0.5rem',
		fontSize: '0.8rem',
		position: 'relative',
	},
	emoji: {
		marginLeft: '0.5rem',
		fontSize: '1.5rem',
	},
	deleteBtn: {
		position: 'absolute',
		width: '20px',
		height: '20px',
		color: 'white',
		top: '0',
		right: '0',
		padding: '10px',
		zIndex: '2',
		backgroundColor: '#eb3c30',
		opacity: '0',
		transition: 'all 0.3s ease-in-out',
		borderRadius: '10%',
	},
});

const MiniPalette = ({
	palette,
	openDeleteConfirmation,
	closeDeleteConfirmation,
	DeleteConfirmOpen,
	deletePalette,
}) => {
	const history = useHistory();
	const classes = useStyles();
	const handleClick = (e) => {
		e.stopPropagation();
		//openDeleteConfirmation();
		deletePalette(palette.id);
	};
	return (
		<div
			className={classes.root}
			onClick={() => history.push(`/palette/${palette.id}`)}
		>
			<DeleteIcon className={classes.deleteBtn} onClick={handleClick} />
			<div className={classes.colors}>
				{palette.colors.map((color) => (
					<div
						className={classes.box}
						style={{ background: color.color }}
						key={color.color}
					></div>
				))}
			</div>
			<h5 className={classes.title}>
				{palette.paletteName}{' '}
				<span className={classes.emoji}>{palette.emoji}</span>
			</h5>
			<DeletePaletteDialog
				open={DeleteConfirmOpen}
				handleClose={closeDeleteConfirmation}
				handleOpen={openDeleteConfirmation}
				deletePalette={deletePalette}
				palette={palette}
			/>
		</div>
	);
};

export default MiniPalette;
