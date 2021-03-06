import { makeStyles } from '@material-ui/styles';
import sizes from './sizes';
import { getFontColor } from '../../colorHelpers';

export default makeStyles({
	root: {
		height: '100%',
	},
	colorBox: {
		width: '20%',
		display: 'inline-block',
		height: (props) => (props.showLink ? '25%' : '50%'),
		cursor: ' pointer',
		position: 'relative',
		marginBottom: '-3.5px',
		backgroundColor: (props) => props.color.hex,
		'&:hover button': {
			opacity: '1',
		},
		[sizes.down('lg')]: {
			width: '25%',
			height: (props) => (props.showLink ? '20%' : '33%'),
		},
		[sizes.down('md')]: {
			width: '50%',
			height: (props) => (props.showLink ? '10%' : '20%'),
		},
		[sizes.down('xs')]: {
			width: '100%',
			height: (props) => (props.showLink ? '5%' : '10%'),
		},
	},
	colorBoxBack: {
		backgroundColor: 'black',
		height: '50%',
	},
	copyOverlay: {
		width: '100%',
		opacity: '0',
		zIndex: '0',
		height: '100%',
		transition: 'transform 0.6s ease-in-out',
		transform: 'scale(0.1)',
		backgroundColor: (props) => props.color.hex,
	},
	copyOverlayShow: {
		zIndex: '10',
		opacity: '1',
		transform: 'scale(50)',
		transition: 'transform 0.6s ease-in-out',
		position: 'absolute',
	},

	copyMsg: {
		position: 'fixed',
		top: '0',
		left: '0',
		right: '0',
		bottom: '0',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: '4rem',
		transform: 'scale(0.1)',
		opacity: '0',
		color: (props) => getFontColor(props.color.hex, 0.7),
	},
	copyMsgShow: {
		opacity: '1',
		transform: 'scale(1)',
		zIndex: '25',
		transition: 'all 0.4s ease-in-out',
		transitionDelay: '0.3s',
	},
	copyMsgH1: {
		fontWeight: '400',
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		textShadow: '1px 2px black',
		width: '100%',
		textAlign: 'center',
		marginBottom: '0',
		padding: '1rem',
		textTransform: 'uppercase',
		color: (props) => getFontColor(props.color.hex, 0.7),
		[sizes.down('xs')]: {
			fontSize: '6rem',
		},
	},

	copyMsgP: {
		fontSize: '2rem',
		fontWeight: '100',
		color: (props) => getFontColor(props.color.hex, 0.7),
	},

	copyButton: {
		position: 'absolute',
		width: '100px',
		marginLeft: '-50px',
		height: '30px',
		marginTop: '-15px',
		top: '50%',
		left: '50%',
		textAlign: 'center',
		outline: 'none',
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		border: 'none',
		fontSize: '1rem',
		lineHeight: '20px',
		color: (props) => getFontColor(props.color.hex, 0.7),
		textTransform: 'uppercase',
		cursor: 'pointer',
		opacity: '0',
	},
	seeMore: {
		position: 'absolute',
		bottom: '0',
		width: '60px',
		height: '30px',
		color: (props) => getFontColor(props.color.hex, 0.7),
		textAlign: 'center',
		lineHeight: '30px',
		right: '0',
		textDecoration: 'none',
		textTransform: 'uppercase',
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
	},
	colorName: {
		position: 'absolute',
		color: (props) => getFontColor(props.color.hex, 0.7),
		bottom: '0',
		left: '0',
		padding: '10px',
		textTransform: 'uppercase',
	},
	colors: {
		height: '100%',
	},
});
