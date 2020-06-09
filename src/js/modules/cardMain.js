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
				document.addEventListener('click', (e) => {
					cardMain.card.forEach(card => {
						if (e.target !== card) {
							cardMain.card.forEach(card => card.classList.remove('is-active'))
						} else {
							if (card.classList.contains('is-active')) {
								card.classList.remove('is-active');
							} else {
								card.classList.add('is-active');
							}
						}
					})


				})
			}
		} else {
			if (cardMain.card) {
				cardMain.card.forEach(card => {
					card.addEventListener('mouseenter', () => {
						card.classList.add('is-active');
					})
					card.addEventListener('mouseleave', () => {
						card.classList.remove('is-active');
					})
				})
			}
		}
	}
}

export {
	cardMain
}
