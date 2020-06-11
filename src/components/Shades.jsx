import React from 'react';
import { ColorBox } from './ColorBox';
import { makeStyles } from '@material-ui/styles';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Header from './Header';
const useStyles = makeStyles({
	root: {
		height: '100%',
	},
	colors: {
		height: '100%',
	},
});
const Shades = ({ palette, history }) => {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(500);
	const [selection, setselection] = React.useState('hex');
	const handleClose = () => setOpen(false);
	const classes = useStyles();
	const { hex } = useParams();
	const { colors } = palette;
	const getShades = (colorsObject, colorId) => {
		let shades = [];
		for (let level in colors) {
			colors[level].forEach((item) => item.id === hex && shades.push(item));
		}
		return shades;
	};

	const shades = getShades(colors, hex).slice(1);

	return (
		<div className={classes.root}>
			<Header
				selection={selection}
				setselection={setselection}
				setOpen={setOpen}
				slider={false}
			/>
			<div className={classes.colors}>
				{shades.map((color) => (
					<ColorBox
						color={color}
						key={color.hex}
						showLink={false}
						selection={selection}
					/>
				))}
				<div className='color-box back'>
					<button className='go-back' onClick={() => history.goBack()}>
						Back
					</button>
				</div>
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

export default Shades;
