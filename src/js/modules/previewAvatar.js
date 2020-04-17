import {
	config
} from "../config";

var previewAvatar = {
	input: document.querySelector('#file'),
	target: document.querySelector('.profile__form-input_file-button'),
	events: {
		choose: () => {
			previewAvatar.input.click()
			console.log('1')
		},
		change: elm => {
			console.log(elm.files)
		}
	},
	changeImage: () => {},
	init: () => {
		const target = previewAvatar.target;
		const input = previewAvatar.input;
		if (target) {
			target.addEventListener('click', () => {
				previewAvatar.events.choose()
			})
			input.addEventListener('change', () => {
				previewAvatar.events.change(input)
			})
		}
	}
}

export {
	previewAvatar
}
