var textareaLength = {
	target: document.querySelector('textarea[data-textarea]'),
	output: document.querySelector('div[data-textcounter]'),
	isControl: e => {
		let charCode = (e.which) ? e.which : e.keyCode
		if (charCode == 8 || charCode == 110 || charCode == 46)
			return true
		return false
	},
	count: e => {
		let length = textareaLength.target.value.length;
		let max = textareaLength.target.getAttribute('maxlength')

		if (length > textareaLength.max) {
			if (!textareaLength.isControl) {
				e.preventDefault();
			}
		} else {
			textareaLength.output.innerHTML = length + '/' + max;
		}
	},
	init: () => {
		let target = textareaLength.target;
		if (target) {
			target.addEventListener("input", textareaLength.count);
		}
	}
}

export {
	textareaLength
}
