import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function DeletePaletteDialog({
	handleClose,
	handleOpen,
	open,
	deletePalette,
	palette,
}) {
	const handleDelete = () => {
		deletePalette(palette.id);
		handleClose();
	};
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle id='simple-dialog-title'>Delete This Palette?</DialogTitle>

			<List>
				<ListItem autoFocus button onClick={handleDelete}>
					<ListItemAvatar>
						<Avatar>
							<CheckCircleOutlinedIcon color='primary' />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary='Remove' />
				</ListItem>
				<ListItem autoFocus button onClick={handleClose}>
					<ListItemAvatar>
						<Avatar>
							<HighlightOffIcon color='secondary' />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary='cancel' />
				</ListItem>
			</List>
		</Dialog>
	);
}

export default DeletePaletteDialog;
