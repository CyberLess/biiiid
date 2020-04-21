var selectLanguage = {
	language: document.querySelector('#language'),
	level: document.querySelector('#level'),
	languageLabel: document.querySelectorAll('label[for=language]'),
	levelLabel: document.querySelectorAll('label[for=level]'),
	slctLang: '',
	slctLvl: '',
	add: document.querySelector('.profile__form-select_add'),
	decline: document.querySelector('.profile__form-select_decline'),
	delete: document.querySelectorAll('.profile__form-select_delete'),
	events: {
		showSelects: () => {
			$this.languageLabel.forEach(label => $this.setActive(label))
			$this.levelLabel.forEach(label => $this.setActive(label))
			$this.setActive(decline);
		},
		hideSelects: () => {
			$this.languageLabel.forEach(label => $this.setInactive(label))
			$this.levelLabel.forEach(label => $this.setInactive(label))
			$this.setInactive(decline);
		},
		delete: elm => {
			elm.parentElement.remove()
		}
	},
	setActive: elm => {
		elm.classList.add('is-active');
	},
	setInactive: elm => {
		elm.classList.remove('is-active');
	},
	init: () => {
		trigger.addEventListener('click', $this.events.showSelects)
		decline.addEventListener('click', $this.events.hideSelects)
		del.forEach(button => button.addEventListener('click', () => {
			$this.events.delete(button)
		}))
	}
}

var $this = selectLanguage;
var trigger = $this.add;
var del = $this.delete;
var decline = $this.decline;
var labels = [selectLanguage.languageLabel, selectLanguage.levelLabel];
export {
	selectLanguage
}
