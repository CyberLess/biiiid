var textareaLength = {
	min: 0,
	max: 250,
	separator: '/',
	target: document.querySelector('.profile__form-input_textarea'),
	output: document.querySelector('.profile__form-input_textarea-count'),
	count: e => {
		let length = textareaLength.target.value.length;

		if (length >= textareaLength.max) {
			e.preventDefault();
		} else {
			textareaLength.output.innerHTML = length + textareaLength.separator + textareaLength.max;
		}
	},
	init: () => {
		let target = textareaLength.target;
		if (target) {
			target.addEventListener("keydown", textareaLength.count);
		}
	}
}

export {
	textareaLength
}
