import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import sizes from './styles/sizes';
const useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	container: {
		backgroundColor: 'gray',
		marginLeft: '0',
		width: '20%',
		textAlign: 'center',
		height: '50px',
	},
	logo: {
		marginRight: '15px',
		padding: '0 13px',
		fontSize: '22px',
		backgroundColor: '#eceff1',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		fontFamily: 'Roboto',
		'& a': {
			textDecoration: 'none',
			color: 'black',
		},
		[sizes.down('xs')]: {
			display: 'none',
		},
	},
	slider: {
		width: '30%',
	},
	selectForm: {
		width: '20%',
	},
});
const Header = ({
	value,
	setValue,
	selection,
	setselection,
	setOpen,
	slider,
}) => {
	const handleSelection = (e) => {
		setselection(e.target.value);
		setOpen(true);
	};
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div className={classes.logo}>
				<Link className={classes.link} to='/palettes'>
					Color App
				</Link>
			</div>
			{slider && (
				<>
					<span>LEVEL:{value} </span>

					<div className={classes.slider}>
						<Slider
							max={900}
							min={100}
							step={100}
							defaultValue={500}
							value={value}
							onChange={handleChange}
							aria-labelledby='continuous-slider'
						/>
					</div>
				</>
			)}
			<FormControl className={classes.selectForm}>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={selection}
					onChange={handleSelection}
				>
					<MenuItem value='hex'>hex</MenuItem>
					<MenuItem value='rgb'>rgb</MenuItem>
					<MenuItem value='rgba'>rgba</MenuItem>
				</Select>
			</FormControl>
		</div>
	);
};

export default Header;
