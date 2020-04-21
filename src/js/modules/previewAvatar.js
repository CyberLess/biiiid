var previewAvatar = {
	input: document.querySelector('#file'),
	target: document.querySelector('.profile__form-input_file-button'),
	avatar: {
		img: document.querySelector('.profile__form-input_avatar'),
		source: document.querySelector('.profile__form-input_avatar').parentElement.querySelector('source'),
	},
	buttonText: document.querySelector('.profile__form-input_file-p'),
	events: {
		choose: () => {
			previewAvatar.input.click()
		},
		change: () => {
			previewAvatar.changeImage();
		}
	},
	changeImage: () => {
		let loadedImage = URL.createObjectURL(event.target.files[0]);
		previewAvatar.avatar.img.src = loadedImage;
		previewAvatar.avatar.source.setAttribute('srcset', loadedImage);
	},
	checkImage: () => {
		const target = previewAvatar.target;
		const img = previewAvatar.avatar.img;
		const text = previewAvatar.buttonText;

		if (img.getAttribute('src') === '' || img.getAttribute('src') === '#' || img.getAttribute('src') === null || img.getAttribute('src') === undefined) {
			target.classList.add('is-empty');
			text.innerHTML = 'Загрузить фото';
		} else {
			target.classList.add('is-filled');
			text.innerHTML = 'Заменить';
		}
	},
	init: () => {
		const target = previewAvatar.target;
		const input = previewAvatar.input;
		if (target) {
			target.addEventListener('click', () => {
				previewAvatar.events.choose()
			})
			input.addEventListener('change', () => {
				previewAvatar.events.change();
				previewAvatar.checkImage();
			})

			previewAvatar.checkImage();

		}
	}
}

export {
	previewAvatar
}
