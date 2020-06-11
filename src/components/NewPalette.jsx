import React from 'react';
import chroma from 'chroma-js';
import { getRandomColors } from '../colorHelpers';
import './NewPalette.css';
import { ChromePicker } from 'react-color';
//Drawer imports
import clsx from 'clsx';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Draggable, { DraggableCore } from 'react-draggable';

//drawer styles
const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100%',
	},
	toolBarButtons: {
		marginLeft: 'auto',
		'& Button': {
			marginRight: '10px',
		},
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
		marginRight: theme.spacing(2),
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
		padding: theme.spacing(3),
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
	colorBox: {
		width: '20%',
		height: '25%',
	},
	drawerBody: {
		textAlign: 'center',
		width: '100%',
		'& Button': {
			marginLeft: '10px',
			marginBottom: '20px',
		},
		'& div': {
			margin: 'auto',
		},
		'& input': {
			marginTop: '30px',
		},
	},
}));

const NewPalette = () => {
	const classes = useStyles();
	const theme = useTheme();
	console.log(chroma.random().name());

	const [colors, setColors] = React.useState([]);
	const [background, setBackground] = React.useState('#fffff');
	const [open, setOpen] = React.useState(false);
	const handleChangeComplete = (color) => {
		setBackground(color.hex);
		setColors([...colors, color.hex]);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleGetRandomColor = () => {
		setColors([...colors, chroma.random().hex()]);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						Create A Palette
					</Typography>
					<div className={classes.toolBarButtons}>
						<Button variant='contained' color='secondary'>
							GO BACK
						</Button>
						<Button variant='contained' color='primary'>
							SAVE PALETTE
						</Button>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>
				<div className={classes.drawerBody}>
					<h1>Design Your Palette</h1>
					<Button
						variant='contained'
						color='primary'
						onClick={handleGetRandomColor}
					>
						GET RANDOM COLOR
					</Button>
					<Button
						variant='contained'
						color='secondary'
						onClick={() => setColors([])}
					>
						CLEAR PALETTE
					</Button>

					<ChromePicker
						className={classes.picker}
						color={background}
						onChangeComplete={handleChangeComplete}
					/>
					<TextField id='standard-basic' label='ColorName' />
				</div>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
				<div className={classes.colors}>
					{colors.map((color) => (
						<div
							className={`handle ${classes.colorBox}`}
							style={{ backgroundColor: color }}
						/>
					))}
				</div>
			</main>
		</div>
	);
};

export default NewPalette;
