import React from 'react';
import './Palette.css';
import { ColorBox } from './ColorBox';
import Header from './Header';
import Footer from './Footer';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	close: {
		padding: theme.spacing(0.5),
	},
}));
const Palette = ({ palette }) => {
	const [open, setOpen] = React.useState(false);

	const [value, setValue] = React.useState(500);
	const [selection, setselection] = React.useState('hex');
	const handleClose = () => setOpen(false);

	const classes = useStyles();
	return (
		<div className='palette'>
			<Header
				setValue={setValue}
				value={value}
				selection={selection}
				setselection={setselection}
				setOpen={setOpen}
				slider={true}
			/>
			<div className='palette-colors'>
				{palette.colors[value].map((color) => (
					<ColorBox
						color={color}
						selection={selection}
						key={color.id}
						showLink
					/>
				))}
			</div>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
				message={`Format Changed to ${selection.toUpperCase()}`}
				action={
					<IconButton
						aria-label='close'
						color='inherit'
						className={classes.close}
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				}
			/>
			<Footer name={palette.paletteName} emoji={palette.emoji} />
		</div>
	);
};

export default Palette;
