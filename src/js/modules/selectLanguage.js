import 'selectric';

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
	events: {
		showSelects: () => {
			if (!selectLanguage.labelsActive) {
				selectLanguage.setActive(selectLanguage.languageLabel)
				selectLanguage.setActive(selectLanguage.levelLabel)
				selectLanguage.setActive(selectLanguage.decline)
				selectLanguage.labelsActive = true
				/*
					при первом нажатии на кнопку языка
					показываем селекты и кнопку отмены, устанавливаем флаг фильтра
				*/
			} else {
				/*
					если селекты отображены
					переходим к проверке выбранного языка
				*/
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
			/*
				при первом нажатии на кнопку отмены
				скрываем селекты и кнопку отмены, устанавливаем флаг фильтра
			*/
		},
		delete: elm => {
			//удаляем выбанный язык
			elm.parentElement.remove()
		}
	},
	setActive: elm => {
		//устанавливаем класс для отображения элементы
		elm.classList.add('is-active')
	},
	setInactive: elm => {
		//удаляем класс для отображения элементы
		elm.classList.remove('is-active')
	},
	validate: () => {
		[selectLanguage.language, selectLanguage.level].forEach(select => {
			if (select.value === '0' || select.value === 'Ваш язык' || select.value === 'Ваш уровень') {
				selectLanguage.languageLabel.classList.add('is-invalid')
				selectLanguage.levelLabel.classList.add('is-invalid')
				selectLanguage.isValid = false
			} else {
				// проверка пройдена
				selectLanguage.languageLabel.classList.remove('is-invalid')
				selectLanguage.levelLabel.classList.remove('is-invalid')
				selectLanguage.isValid = true
			}
		})
		if (selectLanguage.isValid) {
			//добавляем язык в список выше
			selectLanguage.setLang()
		}
	},
	filterOptions: () => {
		let langs = document.querySelectorAll('.language'); //выбранные языки
		let levels = document.querySelectorAll('.language-level'); //выбранные уровни
		let langsOpts = [...(document.querySelector('#language').options)] //конвертируем опции селектов в массив
		let lvlOpts = [...(document.querySelector('#level').options)] //конвертируем опции селектов в массив
		// проверяем на существование выбранных языков
		if (langs.length && levels.length) {
			//временные массивы для хранения значений для сравнения
			let langDataset = [];
			let lvlDataset = ''; // переменная для опции "Родной", на случай изменения значений
			const langOptsValue = [];
			const lvlOptsValue = [];
			//пушим значения в массивы
			langs.forEach(language => langDataset.push(language.dataset.language))
			levels.forEach(level => {
				if (level.dataset.level === 'Родной') { // сравниеваем со значением опции "Родной", изменить на нужное в случае необходимости
					lvlDataset = level.dataset.level
				}
			})
			langsOpts.forEach(option => langOptsValue.push(option.value))
			lvlOpts.forEach(option => lvlOptsValue.push(option.value))

			//выключаем ранее выбранные языки
			langsOpts.forEach(option => {
				if (langDataset.includes(option.value)) {
					option.setAttribute('disabled', true);
				}
			})
			//выключаем функцию "Родной"
			lvlOpts.forEach(option => {
				if (option.value === lvlDataset) {
					option.setAttribute('disabled', true)
				}
			})
			//обновляем селекты
			selectLanguage.language.selectedIndex = 0;
			selectLanguage.level.selectedIndex = 0;
			$('select').selectric('refresh');
		}
	},
	setLang: () => {
		selectLanguage.slctLang = selectLanguage.language.value
		selectLanguage.slctLvl = selectLanguage.level.value
		//рендерим выбранный язык
		selectLanguage.wrapper.insertAdjacentHTML('beforeend', selectLanguage.render(selectLanguage.slctLang, selectLanguage.slctLvl))
		//переиницилизируем скрипт, чтобы повесить event listeners на все элементы и отфлитровать элементы в селектах
		selectLanguage.init();
	},
	render: (lang, lvl) => {
		const template = `
			<div class="profile__form-select profile__form-select_selected-language flex">
					<p class="profile__form-text p language" data-language="${lang}">${lang}</p>
					<p class="profile__form-text p language-level" data-level="${lvl}">(${lvl})</p>
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
		document.querySelectorAll('.profile__form-select_delete').forEach(button => button.addEventListener('click', () => {
			selectLanguage.events.delete(button)
		}))
		selectLanguage.filterOptions()
	}
}


export {
	selectLanguage
}
