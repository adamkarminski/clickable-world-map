import './styles.css';
import countryNames from './countriesPL';
import values from './data';
import capitals from './capitals';

import EasySpeech from 'easy-speech';

new svgMap({
	targetElementID: 'svgMap',
	data: {
		data: {
			continents: {},
		},
		applyData: 'continents',
		values,
	},
	hideMissingData: true,
	countryNames,
});

async function onClick(e) {
	if (!e.target) {
		return;
	}

	const countryCode = e.target.getAttribute('data-id');
	const countryName = countryNames[countryCode];
	const countryCapital = capitals[countryCode].capital;

	if (countryName.length > 0) {
		await EasySpeech.speak({ text: `${countryName}. Stolica: ${countryCapital}` });
	}
}

EasySpeech.detect();

EasySpeech.init({ maxTimeout: 5000, interval: 250 })
	.then(() => {
		const voice = EasySpeech.voices().filter(
			(voice) => voice.lang && voice.lang.startsWith('pl')
		)[0];

		EasySpeech.defaults({
			voice,
			pitch: 0.9,
			rate: 0.8,
			volume: 1,
		});

		document
			.querySelectorAll('.svgMap-country')
			.forEach(() => addEventListener('mouseup', onClick));
		document
			.querySelectorAll('.svgMap-country')
			.forEach(() => addEventListener('touchend', onClick));
	})
	.catch((e) => console.error(e));
