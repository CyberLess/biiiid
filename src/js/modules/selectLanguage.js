var selectLanguage = {
	language: document.querySelector('#language'),
	level: document.querySelector('#level'),
	slctLang: '',
	slctLvl: '',
	init: () => {
		let selects = [selectLanguage.language, selectLanguage.level];
		selects.forEach(select => {
			select.addEventListener('change', () => {
				console.log(select.value)
			})
		})
	}
}

export {
	selectLanguage
}
