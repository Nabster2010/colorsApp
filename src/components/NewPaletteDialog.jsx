import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import Button from '@material-ui/core/Button';

import {
	Dialog,
	DialogTitle,
	Slide,
	DialogContentText,
} from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		margin: '1rem',
		'& #alert-dialog-slide-description': {
			fontSize: 'large',
			marginTop: '1rem',
		},
		'& .emoji-mart': {
			width: 'auto !important',
		},
	},
	btns: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginTop: '2rem',
		'& button': {
			marginRight: '1rem',
		},
	},
	title: {
		padding: '0',
		marginTop: '1rem',
	},
});

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});
const NewPaletteDialog = ({
	handleSubmit,
	handleInputChange,
	paletteName,
	handleClose,
	dialogOpen,
	emojiOpen,
	closeEmoji,
	onEmojiClick,
}) => {
	const classes = useStyles();

	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby='simple-dialog-title'
			open={dialogOpen}
			maxWidth='sm'
			TransitionComponent={Transition}
			fullWidth={true}
		>
			<div className={classes.root}>
				<DialogTitle id='simple-dialog-title' className={classes.title}>
					Choose A Palette Name{' '}
					<span role='img' aria-label='emoji'>
						🎨
					</span>
				</DialogTitle>
				<DialogContentText id='alert-dialog-slide-description'>
					Please enter a name for new Palette ,it has to be unique
				</DialogContentText>

				<Picker
					onSelect={onEmojiClick}
					className={classes.emojiPicker}
					title='Pick your emoji…'
				/>

				<ValidatorForm onSubmit={handleSubmit}>
					<TextValidator
						label='paletteName'
						variant='filled'
						onChange={handleInputChange}
						name='paletteName'
						fullWidth
						margin='normal'
						value={paletteName}
						validators={['required', 'isPaletteNameUnique']}
						errorMessages={[
							'this field is required',
							' Palette name must be unique',
						]}
					/>
					<div className={classes.btns}>
						<Button variant='contained' onClick={handleClose}>
							CANCEL
						</Button>
						<Button type='submit' variant='contained' color='primary'>
							SAVE
						</Button>
					</div>
				</ValidatorForm>
			</div>
		</Dialog>
	);
};

export default NewPaletteDialog;
