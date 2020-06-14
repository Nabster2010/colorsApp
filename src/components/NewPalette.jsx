import React from 'react';
import './NewPalette.css';
import { ChromePicker } from 'react-color';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import DraggableList from './DraggableList';
import arrayMove from 'array-move';

const drawerWidth = 350;
const maxColors = 20;
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100%',
		'& .MuiFilledInput-root': {
			margin: theme.spacing(1),
			width: 300,
		},
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
		'& Button': {
			marginLeft: '10px',
			marginBottom: '20px',
		},
		'& div': {
			margin: 'auto',
		},
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
	},
	input: {
		width: '90% !important',
	},
}));

const NewPalette = ({ savePalette, palettes }) => {
	const [state, setstate] = React.useState({
		colorName: '',
		paletteName: '',
		colors: [],
		color: '',
		open: false,
	});
	const history = useHistory();
	const handleChangeComplete = (color) => {
		setstate({ ...state, color: color.hex });
	};
	const onSortEnd = ({ oldIndex, newIndex }) => {
		setstate({ ...state, colors: arrayMove(state.colors, oldIndex, newIndex) });
	};

	const handleInputChange = (e) => {
		setstate({ ...state, [e.target.name]: e.target.value });
	};
	const handleDrawerOpen = () => {
		setstate({ ...state, open: true });
	};
	const handleSubmit = () => {
		const newPalette = {
			id: state.paletteName.toLowerCase().replace(/ /g, '-'),
			paletteName: state.paletteName,
			colors: state.colors,
		};
		savePalette(newPalette);
		history.push('/palettes');
	};
	const deleteColor = (hex) => {
		setstate({
			...state,
			colors: state.colors.filter((color) => color.color !== hex),
		});
	};

	const handleGetRandomColor = () => {
		let color =
			palettes[Math.floor(Math.random() * palettes.length)].colors[
				Math.floor(Math.random() * palettes.length)
			];
		state.colors.every((item) => item.color !== color.color)
			? setstate({ ...state, colors: [...state.colors, color] })
			: console.log('exist');
	};

	const handleDrawerClose = () => {
		setstate({ ...state, open: false });
		return;
	};

	const addColor = (e) => {
		e.preventDefault();
		setstate({
			...state,
			colors: [...state.colors, { color: state.color, name: state.colorName }],
		});
	};

	const randomFill = () => {
		const randomColors = [];
		while (randomColors.length < 20) {
			let color =
				palettes[Math.floor(Math.random() * palettes.length)].colors[
					Math.floor(Math.random() * palettes.length)
				];
			if (
				randomColors.every((item) => item.color !== color.color) ||
				randomColors.length === 0
			) {
				randomColors.push(color);
			}
		}
		setstate({ ...state, colors: randomColors });
	};
	React.useEffect(() => {
		randomFill();
	}, []);
	React.useEffect(() => {
		ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
			state.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
			palettes.every(
				(palette) => palette.paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule('isColorUnique', (value) =>
			state.colors.every((color) => color.color !== state.color)
		);
	}, [state, palettes]);

	const props = { background: state.color, colors: state.colors };
	const classes = useStyles(props);
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: state.open,
				})}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, state.open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap>
						Create A Palette
					</Typography>
					<div className={classes.toolBarButtons}>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => history.goBack()}
						>
							GO BACK
						</Button>
						<ValidatorForm onSubmit={handleSubmit}>
							<TextValidator
								label='paletteName'
								onChange={handleInputChange}
								name='paletteName'
								value={state.paletteName}
								validators={['required', 'isPaletteNameUnique']}
								errorMessages={[
									'this field is required',
									' Palette name must be unique',
								]}
							/>
							<Button type='submit' variant='contained' color='primary'>
								Save Palette
							</Button>
						</ValidatorForm>
						<Button variant='contained' color='secondary'>
							SAVE PALETTE
						</Button>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={state.open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<div className={classes.drawerBody}>
					<h1>Design Your Palette</h1>
					<Button
						variant='contained'
						color='primary'
						onClick={handleGetRandomColor}
						disabled={state.colors.length >= maxColors}
					>
						RANDOM COLOR
					</Button>
					<Button
						variant='contained'
						color='secondary'
						onClick={() => setstate({ ...state, colors: [] })}
					>
						CLEAR PALETTE
					</Button>

					<ChromePicker
						className={classes.picker}
						color={state.color}
						onChangeComplete={handleChangeComplete}
					/>
					<ValidatorForm onSubmit={addColor}>
						<TextValidator
							label='ColorName'
							onChange={handleInputChange}
							name='colorName'
							value={state.colorName}
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
								disabled={state.colors.length >= maxColors}
							>
								{state.colors.length >= maxColors
									? 'PALETTE FULL'
									: 'ADD COLOR'}
							</Button>
						</div>
					</ValidatorForm>
				</div>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: state.open,
				})}
			>
				<div className={classes.drawerHeader} />
				<DraggableList
					colors={state.colors}
					deleteColor={deleteColor}
					axis='xy'
					onSortEnd={onSortEnd}
				/>
			</main>
		</div>
	);
};

export default NewPalette;
