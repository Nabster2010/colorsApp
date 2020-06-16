import React from 'react';
import './ColorBox.css';
import { ColorBox } from './ColorBox';
import { makeStyles } from '@material-ui/styles';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Header from './Header';
import sizes from './styles/sizes';

const useStyles = makeStyles({
	colors: {
		height: '100%',
	},
	root: {
		height: '100%',
	},
	colorBoxBack: {
		width: '20%',
		display: 'inline-block',
		height: '50%',
		cursor: ' pointer',
		position: 'relative',
		marginBottom: '-3.5px',
		backgroundColor: 'black',
		'&:hover button': {
			opacity: '1',
		},
		[sizes.down('lg')]: {
			width: '25%',
			height: '33%',
		},
		[sizes.down('md')]: {
			width: '50%',
			height: '20%',
		},
		[sizes.down('xs')]: {
			width: '100%',
			height: '10%',
		},
	},
});

const Shades = (props) => {
	const classes = useStyles(props);
	const { palette, history } = props;
	const [open, setOpen] = React.useState(false);
	const [selection, setselection] = React.useState('hex');
	const handleClose = () => setOpen(false);
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
				<div className={classes.colorBoxBack}>
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
