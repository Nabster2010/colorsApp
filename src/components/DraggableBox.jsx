import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';
import sizes from './styles/sizes';
const useStyles = makeStyles({
	colorBox: {
		width: '20%',
		height: '25%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
		position: 'relative',
		'&:hover svg': {
			color: 'white',
			transform: 'scale(1.5)',
		},
		[sizes.down('lg')]: {
			width: '25%',
			height: '20%',
		},
		[sizes.down('md')]: {
			width: '50%',
			height: '10%',
		},
		[sizes.down('xs')]: {
			width: '100%',
			height: '5%',
		},
	},
	boxContent: {
		position: 'absolute',
		width: '100%',
		bottom: '0',
		left: '0',
		display: 'flex',
		justifyContent: 'space-between',
		letterSpacing: '1px',
		fontSize: '15px',
		alignItems: 'flex-end',
		textTransform: 'uppercase',
		padding: '10px',
	},
	deleteBtn: {
		cursor: 'pointer',
		marginLeft: 'auto',
		transition: 'all 0.3s ease-in-out',
	},
});

const DraggableBox = ({ color, name, deleteColor }) => {
	const classes = useStyles();
	return (
		<div
			className={`handle ${classes.colorBox}`}
			style={{ backgroundColor: color }}
		>
			<div className={classes.boxContent}>
				<span>{name}</span>
				<DeleteIcon
					className={classes.deleteBtn}
					onClick={() => deleteColor(color)}
				/>
			</div>
		</div>
	);
};

export default SortableElement(DraggableBox);
