var cardMain = {
	card: document.querySelectorAll('.mainpage-order__card'),
	setActive: elm => {
		elm.classList.add('is-active')
	},
	setInactive: elm => {
		elm.classList.remove('is-active')
	},
	init: () => {
		if (cardMain.card) {
				cardMain.card.forEach(card => {
					card.addEventListener('mouseenter', () => {
						cardMain.setActive(card)
					})
					card.addEventListener('mouseleave', () => {
						cardMain.setInactive(card)
					})
					card.addEventListener('touchend', () => {
						card.classList.toggle('is-active')
					})
				})
			}
		}
	 }

export {
	cardMain
}
