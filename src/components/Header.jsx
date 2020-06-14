import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from 'react-router-dom';

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
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					backgroundColor: 'gray',
					marginLeft: '0',
					width: '20%',
					textAlign: 'center',
					height: '50px',
				}}
			>
				<Link
					style={{
						textDecoration: 'none',
						fontWeight: '800',
						fontSize: '30px',
					}}
					to='/palettes'
				>
					Color App
				</Link>
			</div>
			{slider && (
				<>
					<span>LEVEL:{value} </span>

					<div style={{ width: '30%' }}>
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
			<FormControl style={{ width: '20%' }}>
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
