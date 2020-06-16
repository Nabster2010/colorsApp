import React from 'react';
import './NewPalette.css';
import ColorPickerForm from './ColorPickerForm';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { useHistory } from 'react-router-dom';
import DraggableList from './DraggableList';
import NewPaletteNav from './NewPaletteNav';
import arrayMove from 'array-move';
import NewPaletteDialog from './NewPaletteDialog';
import { useStyles } from './styles/NewPaletteStyles';

const maxColors = 20;

const NewPalette = ({ savePalette, palettes }) => {
	const [state, setstate] = React.useState({
		colorName: '',
		paletteName: '',
		colors: [],
		color: '',
		open: false,
		dialogOpen: false,
		emojiOpen: false,
		emoji: 'null',
	});

	const onEmojiClick = (emojiObject) => {
		setstate({ ...state, emoji: emojiObject.native });
	};

	const closeEmoji = () => {
		setstate({ ...state, emojiOpen: false });
	};
	const handleDialogClose = () => {
		setstate({ ...state, dialogOpen: false });
	};
	const openDialog = () => {
		setstate({ ...state, dialogOpen: true });
	};
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
			emoji: state.emoji,
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
			<NewPaletteNav
				classes={classes}
				open={state.open}
				handleDrawerOpen={handleDrawerOpen}
				openDialog={openDialog}
			/>
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
					<div className={classes.btns}>
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
					</div>
					<ColorPickerForm
						color={state.color}
						colorName={state.colorName}
						colors={state.colors}
						classes={classes}
						handleInputChange={handleInputChange}
						maxColors={maxColors}
						handleChangeComplete={handleChangeComplete}
						addColor={addColor}
					/>
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
			<NewPaletteDialog
				handleInputChange={handleInputChange}
				paletteName={state.paletteName}
				dialogOpen={state.dialogOpen}
				handleClose={handleDialogClose}
				handleSubmit={handleSubmit}
				emojiOpen={state.emojiOpen}
				closeEmoji={closeEmoji}
				onEmojiClick={onEmojiClick}
			/>
		</div>
	);
};

export default NewPalette;
