import './styles.css';
import countryNames from './countriesPL';
import values from './data';

new svgMap({
	targetElementID: 'svgMap',
	data: {
		data: {
			gdp: {
				name: 'GDP per capita',
				format: '{0} USD',
				thousandSeparator: ',',
				thresholdMax: 50000,
				thresholdMin: 1000,
			},
			change: {
				name: 'Change to year before',
				format: '{0} %',
			},
		},
		applyData: 'gdp',
		values,
	},
	hideMissingData: true,
	countryNames,
});

function onClick(e) {
	if (!e.target) {
		return;
	}

	const countryCode = e.target.getAttribute('data-id');
	const countryName = countryNames[countryCode];

	if (countryName.length > 0) {
		const audio = new SpeechSynthesisUtterance(countryName);
		audio.lang = 'pl-PL';
		audio.pitch = 0.8;
		audio.rate = 0.8;
		window.speechSynthesis.speak(audio);
	}
}

document
	.querySelectorAll('.svgMap-country')
	.forEach(() => addEventListener('mouseup', onClick));
document
	.querySelectorAll('.svgMap-country')
	.forEach(() => addEventListener('touchstart', onClick));
