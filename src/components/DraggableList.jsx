import React from 'react';
import DraggableBox from './DraggableBox';
import { SortableContainer } from 'react-sortable-hoc';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
	colors: {
		display: 'flex',
		height: '90%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		alignContent: 'flex-start',
		flexWrap: 'wrap',
	},
});
const DraggableList = ({ colors, deleteColor }) => {
	const classes = useStyles();
	return (
		<div className={classes.colors}>
			{colors.map((color, index) => (
				<DraggableBox
					index={index}
					color={color.color}
					name={color.name}
					key={color.color}
					deleteColor={deleteColor}
				/>
			))}
		</div>
	);
};

export default SortableContainer(DraggableList);
