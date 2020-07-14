var previewAvatar = {
	input: document.querySelector("input[data-file]"),
	target: document.querySelector("[data-covertarget]"),
	avatar: {
		img: document.querySelector(".data-cover"),
	},
	buttonText: document.querySelector("[data-covertrigger]"),
	events: {
		choose: () => {
			previewAvatar.input.click();
		},
		change: () => {
			previewAvatar.changeImage();
		},
	},
	changeImage: () => {
		let loadedImage = URL.createObjectURL(event.target.files[0]);
		previewAvatar.avatar.img.src = loadedImage;
		document
			.querySelector(".data-cover")
			.parentElement.querySelector("source")
			.setAttribute("srcset", loadedImage);
	},
	checkImage: () => {
		const target = previewAvatar.target;
		const img = previewAvatar.avatar.img;
		const text = previewAvatar.buttonText;

		if (
			img.getAttribute("src") === "" ||
			img.getAttribute("src") === "#" ||
			img.getAttribute("src") === null ||
			img.getAttribute("src") === undefined
		) {
			target.classList.remove("is-filled");
			target.classList.add("is-empty");
			text.innerHTML = "Загрузить фото";
		} else {
			target.classList.remove("is-empty");
			target.classList.add("is-filled");
			text.innerHTML = "Заменить";
		}
	},
	init: () => {
		const target = previewAvatar.target;
		const input = previewAvatar.input;
		if (target !== null && target !== undefined) {
			target.addEventListener("click", previewAvatar.events.choose());
			input.addEventListener("change", () => {
				previewAvatar.events.change();
				previewAvatar.checkImage();
			});
			previewAvatar.checkImage();
		}
	},
};

export { previewAvatar };
