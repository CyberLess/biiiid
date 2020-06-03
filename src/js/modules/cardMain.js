var cardMain = {
	card: document.querySelectorAll('.mainpage-order__card'),
	viewport: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
	setActive: elm => {
		elm.classList.add('is-active')
	},
	setInactive: elm => {
		elm.classList.remove('is-active')
	},
	toggleActive: elm => {
		elm.classList.toggle('is-active')
	},
	setAllInactive: array => {
		array.forEach(elm => {
			elm.classList.remove('is-active')
		})
	},
	init: () => {
		if (cardMain.card) {
			cardMain.card.forEach(card => {
				if (cardMain.viewport > 581) {
					card.addEventListener('mouseover', () => { cardMain.setActive(card) })
					card.addEventListener('mouseleave', () => { cardMain.setInactive(card) })
				} else {
					let trigger = card.querySelector('.mainpage-order__card-header')
					trigger.addEventListener('click', () => {
						// cardMain.setAllInactive(cardMain.card)
						cardMain.toggleActive(card)
					})
				}
			})
		}
	 }
}

export {
	cardMain
}
