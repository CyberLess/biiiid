var addService = {
	triggers: document.querySelectorAll('.add-service__info-show'),
	closers: document.querySelectorAll('.add-service__info-hide'),
	init: () => {
		if (addService.triggers && addService.closers) {
			addService.triggers.forEach(button => {
				button.addEventListener('click', () => {
					button.classList.add('is-hidden');
					button.parentElement.querySelector('.add-service__info-row')
						.classList.remove('is-hidden')
					button.parentElement.querySelector('.add-service__info-row')
						.classList.add('is-active')
				})
			})

			addService.closers.forEach(button => {
				button.addEventListener('click', () => {
					button.parentElement.parentElement.parentElement.querySelector('.add-service__info-show').classList.remove('is-hidden');
					button.parentElement.parentElement
						.classList.remove('is-active')
					button.parentElement.parentElement
						.classList.add('is-hidden')
				})
			})
		}
		console.log('init add')
	}
}

export { addService }
