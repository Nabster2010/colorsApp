import { makeStyles } from '@material-ui/core/styles';
import sizes from './sizes';
const drawerWidth = 350;
const maxColors = 20;
export const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100%',
		'& .MuiFilledInput-root': {
			margin: theme.spacing(1),
			width: 300,
		},
	},
	toolBar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	toolBarContainer: {
		display: 'flex',
		alignItems: 'center',
		[sizes.down('xs')]: {
			marginRight: '0',
			marginLeft: '0',
		},
	},
	toolBarButtons: {
		display: 'flex',
		alignItems: 'center',
		[sizes.down('xs')]: {
			marginRight: '0',
		},
		'& button': {
			[sizes.down('xs')]: {
				padding: '0.1rem',
				fontSize: '0.8rem',
			},
		},
	},
	saveBtn: {
		marginLeft: '10px',
	},

	appBar: {
		color: 'black',
		backgroundColor: '#efe9db',
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		//marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	colors: {
		display: 'flex',
		height: '90%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		alignContent: 'flex-start',
		flexWrap: 'wrap',
	},

	drawerBody: {
		textAlign: 'center',
		width: '100%',
	},
	btns: {
		display: 'flex',
		width: '90%',
		justifyContent: 'space-between',
		margin: '1rem',
	},
	addButton: {
		backgroundColor: (props) =>
			props.colors.length >= maxColors ? 'gray' : props.background,
		width: '90%',
		height: '60px',
		fontSize: '30px',
		'&:hover': {
			backgroundColor: (props) => props.background,
			opacity: '0.7',
		},
	},
	picker: {
		width: '90% !important',
		margin: 'auto',
	},
	colorNameInput: {
		width: '90%',
		height: '80px',
		marginTop: '2rem',
		'& .MuiInputBase-root': {
			height: '50px',
			'& input': {
				height: '100%',
			},
		},
		'& p': {
			fontSize: 'medium',
		},
		'& label': {
			fontSize: 'x-large',
		},
	},
}));
