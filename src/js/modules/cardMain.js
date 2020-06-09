var cardMain = {
	card: document.querySelectorAll('.mainpage-order__card'),
	setActive: elm => {
		elm.classList.add('is-active')
	},
	setInactive: elm => {
		elm.classList.remove('is-active')
	},
	init: () => {
		console.log(navigator.userAgent)
		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			if (cardMain.card) {
				cardMain.card.forEach(card => {
					card.addEventListener('click', e => {
						e.stopPropagation();
						e.preventDefault();
						if (card.classList.contains('is-active')) {
							cardMain.card.forEach(card => { card.classList.remove('is-active') })
						} else {
							cardMain.card.forEach(card => { card.classList.remove('is-active') })
							card.classList.add('is-active');
						}

					})

					document.addEventListener('click', (e) => {
						if (e.target !== card) {
							cardMain.card.forEach(card => { card.classList.remove('is-active') })
						}
					})
				})


			}
		}
	}
}

export {
	cardMain
}
