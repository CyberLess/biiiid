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
					// card.addEventListener('mouseenter', () => {
					// 	cardMain.setActive(card)
					// })
					// card.addEventListener('mouseleave', () => {
					// 	cardMain.setInactive(card)
					// })
					card.addEventListener('click', e => {
						e.stopPropagation();
						e.preventDefault();
						card.classList.toggle('is-active');
					})
					// card.addEventListener('touchend', e => {
					// 	e.stopPropagation();
					// 	e.preventDefault();
					// 	card.classList.toggle('is-active');
					// })
				})
			}
		}
	}
}

export {
	cardMain
}
