import React from 'react';
import Palette from './components/Palette';
import './App.css';
import seedColors from './seedColors';
import Shades from './components/Shades';
import PalettesPreview from './components/PalettesPreview';
import { Switch, Route } from 'react-router-dom';
import { generateLevels } from './colorHelpers';
import NewPalette from './components/NewPalette';

function App() {
	const [palettes, setPalettes] = React.useState(seedColors);
	const findPalette = (id) => palettes.find((palette) => palette.id === id);
	const savePalette = (newPalette) => {
		setPalettes([...palettes, newPalette]);
	};
	return (
		<div className='App'>
			<Switch>
				<Route
					exact
					path='/palettes'
					render={(props) => <PalettesPreview palettes={palettes} {...props} />}
				/>
				<Route
					exact
					path='/palette/:id'
					render={(props) => (
						<Palette
							palette={generateLevels(findPalette(props.match.params.id))}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path='/palettes/:id/:hex'
					render={(props) => (
						<Shades
							palette={generateLevels(findPalette(props.match.params.id))}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path='/palettes/new'
					render={() => (
						<NewPalette savePalette={savePalette} palettes={palettes} />
					)}
				/>
			</Switch>
		</div>
	);
}

export default App;
