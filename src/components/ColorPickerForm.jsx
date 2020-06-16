import React from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const ColorPickerForm = ({
	classes,
	color,
	colorName,
	handleInputChange,
	colors,
	maxColors,
	handleChangeComplete,
	addColor,
}) => {
	return (
		<>
			<ChromePicker
				className={classes.picker}
				color={color}
				onChangeComplete={handleChangeComplete}
			/>
			<ValidatorForm onSubmit={addColor}>
				<TextValidator
					label='ColorName'
					variant='filled'
					margin='normal'
					onChange={handleInputChange}
					className={classes.colorNameInput}
					name='colorName'
					value={colorName}
					validators={['required', 'isColorNameUnique', 'isColorUnique']}
					errorMessages={[
						'this field is required',
						' color name must be unique',
						'color already used',
					]}
				/>
				<div style={{ marginTop: '30px' }}>
					<Button
						type='submit'
						variant='contained'
						className={classes.addButton}
						disabled={colors.length >= maxColors}
					>
						{colors.length >= maxColors ? 'PALETTE FULL' : 'ADD COLOR'}
					</Button>
				</div>
			</ValidatorForm>
		</>
	);
};

export default ColorPickerForm;
