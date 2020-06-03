var cardMain = {
	card: document.querySelectorAll('.mainpage-order__card'),
	setActive: elm => {
		elm.classList.add('is-active')
	},
	setInactive: elm => {
		elm.classList.remove('is-active')
	},
	setAllInactive: array => {
		array.forEach(elm => {
			elm.classList.remove('is-active')
		})
	},
	init: () => {
		if (cardMain.card) {
			let getViewport = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

			cardMain.card.forEach(card => {
				if (getViewport > 581) {
					card.removeEventListener('click', () => { })
					card.addEventListener('mouseover', () => { cardMain.setActive(card) })
					card.addEventListener('mouseleave', () => { cardMain.setInactive(card) })
				} else {
					card.addEventListener('click', () => {
						card.classList.toggle('is-active')
					})
				}
			})

			window.addEventListener('resize', () => {
				cardMain.init()
			})
		}
	 }
}

export {
	cardMain
}
