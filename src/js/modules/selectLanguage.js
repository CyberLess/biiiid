var selectLanguage = {
	language: document.querySelector('#language'),
	level: document.querySelector('#level'),
	languageLabel: document.querySelector('label[for=language]'),
	levelLabel: document.querySelector('label[for=level]'),
	wrapper: document.querySelector('.profile__form-select_selected'),
	labelsActive: false,
	isValid: false,
	slctLang: '',
	slctLvl: '',
	add: document.querySelector('.profile__form-select_add'),
	decline: document.querySelector('.profile__form-select_decline'),
	delete: document.querySelectorAll('.profile__form-select_delete'),
	events: {
		showSelects: () => {
			if (!selectLanguage.labelsActive) {
				selectLanguage.setActive(selectLanguage.languageLabel)
				selectLanguage.setActive(selectLanguage.levelLabel)
				selectLanguage.setActive(selectLanguage.decline)
				selectLanguage.labelsActive = true
			} else {
				selectLanguage.validate()
			}
		},
		hideSelects: () => {
			selectLanguage.setInactive(selectLanguage.languageLabel)
			selectLanguage.setInactive(selectLanguage.levelLabel)
			selectLanguage.labelsActive = false
			selectLanguage.setInactive(selectLanguage.decline)
			selectLanguage.languageLabel.classList.remove('is-invalid')
			selectLanguage.levelLabel.classList.remove('is-invalid')
			selectLanguage.isValid = false
		},
		delete: elm => {
			console.log('delete')
			elm.parentElement.remove()
		}
	},
	setActive: elm => {
		elm.classList.add('is-active')
	},
	setInactive: elm => {
		elm.classList.remove('is-active')
	},
	validate: () => {
		[selectLanguage.language, selectLanguage.level].forEach(select => {
			if (select.value === '0' || select.value === 'Ваш язык' || select.value === 'Ваш уровень') {
				selectLanguage.languageLabel.classList.add('is-invalid')
				selectLanguage.levelLabel.classList.add('is-invalid')
				selectLanguage.isValid = false
			} else {
				selectLanguage.languageLabel.classList.remove('is-invalid')
				selectLanguage.levelLabel.classList.remove('is-invalid')
				selectLanguage.isValid = true
			}
		})
		if (selectLanguage.isValid) {
			selectLanguage.setLang()
		}
	},
	setLang: () => {
		selectLanguage.slctLang = selectLanguage.language.value
		selectLanguage.slctLvl = selectLanguage.level.value
		selectLanguage.wrapper.insertAdjacentHTML('beforeend', selectLanguage.render(selectLanguage.slctLang, selectLanguage.slctLvl))
		selectLanguage.init()
	},
	render: (lang, lvl) => {
		const template = `
			<div class="profile__form-select profile__form-select_selected-language flex">
					<p class="profile__form-text p language">${lang}</p>
					<p class="profile__form-text p language-level">(${lvl})</p>
					<a class="profile__form-select profile__form-select_delete" href="javascript:void(0)">
							<svg class="icon icon-cls" viewBox="0 0 15 15">
									<use xlink:href="/app/icons/sprite.svg#cls"></use>
							</svg>
					</a>
			</div>`
		return template
	},
	init: () => {
		selectLanguage.add.addEventListener('click', selectLanguage.events.showSelects)
		selectLanguage.decline.addEventListener('click', selectLanguage.events.hideSelects)
		selectLanguage.delete.forEach(button => button.addEventListener('click', () => {
			selectLanguage.events.delete(button)
		}))
	}
}


export {
	selectLanguage
}
