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

document.querySelectorAll('path.svgMap-country').forEach((country) => {
	country.addEventListener('click', (e) => {
		const countryCode = e.target.getAttribute('data-id');
		const countryName = countryNames[countryCode];

		if (countryName.length > 0) {
			const audio = new SpeechSynthesisUtterance(countryName);
			audio.lang = 'pl-PL';
			audio.pitch = 0.8;
			audio.rate = 0.8;
			window.speechSynthesis.speak(audio);
		}
	});
});
