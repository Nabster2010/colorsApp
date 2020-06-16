import React from 'react';
import './NewPalette.css';
import clsx from 'clsx';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';

const NewPaletteNav = ({ classes, open, handleDrawerOpen, openDialog }) => {
	const history = useHistory();
	return (
		<>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar className={classes.toolBar}>
					<div className={classes.toolBarContainer}>
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
					</div>
					<div className={classes.toolBarButtons}>
						<Button
							variant='contained'
							color='secondary'
							onClick={() => history.goBack()}
						>
							BACK
						</Button>

						<Button
							variant='contained'
							color='primary'
							onClick={openDialog}
							className={classes.saveBtn}
						>
							SAVE
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default NewPaletteNav;
