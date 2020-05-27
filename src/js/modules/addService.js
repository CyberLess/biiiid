import 'selectric';

var addService = {
	events: {
		activateTarget: target => {
			document.querySelector(`[data-action-target=${target}]`).classList.add('is-active')
		},
		deleteService: target => {
			document.querySelector(`[data-action=${target}]`).parentElement.parentElement.parentElement.remove()
		},
		saveService: elm => {
			const editor = elm.parentElement.parentElement.querySelector('.add-service__additional-editor');
			let name = editor.querySelector('input[name=service-name]').value;
			let descr = editor.querySelector('input[name=service-descr]').value;

			let serviceName = editor.parentElement.querySelector('.add-service__additional-input-text p')
			let serviceDescr = editor.parentElement.querySelector('.add-service__additional-input-text-hint p')

			if (!name) {
				editor.classList.add('is-shaking');
				setTimeout(() => {
					editor.classList.remove('is-shaking');
				}, 500)
			} else {
				serviceName.textContent = name;

				if (serviceDescr) {
					serviceDescr.textContent = descr;
				}

				elm.parentElement.parentElement.classList.remove('is-active');
				document.querySelector('.add-service__info-show[data-action=new-service]').classList.remove('is-hidden')
				name = '';
				descr = '';
				serviceName = '';
				serviceDescr = '';
			}
		},
		createService: elm => {
			const editor = elm.parentElement.parentElement.querySelector('.add-service__additional-editor');
			let name = editor.querySelector('input[name=service-name]').value;
			let descr = editor.querySelector('input[name=service-descr]').value;
			const wrapper = document.querySelector('[data-insert]');

			if (!name) {
				editor.classList.add('is-shaking');
				setTimeout(() => {
					editor.classList.remove('is-shaking');
				}, 500)
			} else {
				wrapper.insertAdjacentHTML('beforeend', addService.template(name, descr))
				document.querySelector('.add-service__info-show[data-action=new-service]').classList.remove('is-hidden')
				elm.parentElement.parentElement.classList.remove('is-active')
				$('select').selectric('refresh');
				addService.init()
			}
		}
	},
	template: (name, descr) => {
		const id = Math.round(Math.random() * 1001)
		const insName = `<div class="add-service__additional-input-text flex flex_vertical p">
							<div class="add-service__additional-input-box">
									<svg class="icon icon-check" viewBox="0 0 10 7">
										<use xlink:href="/app/icons/sprite.svg#check"></use>
									</svg>
							</div>
							<p>${name}</p>
						</div>`
		let insDescr = ''
		if (descr) {
			insDescr = `<div class="add-service__additional-input-text-hint p">
							<p>${descr}</p>
						</div>`
		}
		const markup = `
			<div class="add-service__info-row add-service__info-row_handled flex flex_justify" data-action-target="edit">
				<label class="add-service__additional flex flex_vertical" for="input-${id}">
						<input class="add-service__additional-input add-service__additional-input_checkbox" type="checkbox" name="handled" id="input-${id}">
						${insName}
						${insDescr}
				</label>
				<div class="add-service__additional-editor">
						<label class="add-service__additional-editor-name flex flex_vertical flex_justify">
							<p class="p">Название</p>
							<input class="add-service__additional-editor-input p" data-textarea="data-textarea" name="service-name" minlength="0" maxlength="45" type="text" placeholder="Название услуги" onfocus="this.placeholder=''" onblur="this.placeholder='Название услуги'">
							<div class="add-service__additional-editor-textcounter small" data-textcounter="data-textcounter">0/45</div>
						</label>
						<label class="add-service__additional-editor-description flex flex_vertical flex_justify">
							<p class="p">Описание</p>
							<input class="add-service__additional-editor-input add-service__additional-editor-input_max p" type="text" name="service-descr" placeholder="Описание услуги" onfocus="this.placeholder=''" onblur="this.placeholder='Описание услуги'">
						</label>
				</div>
				<label class="add-service__info-label add-service__info-label_term flex flex_vertical" for="handled-deadline">
					<p class="p">Сроки</p>
					<label class="add-service__info-label add-service__info-label_select add-service__info-label_select-med">
							<span class="add-service__info-select slct">
								<select name="select-deadline" id="handled-deadline" tabindex="-1">
									<option selected="">1 день</option>
									<option>2</option>
									<option>3</option>
								</select>
							</span>
					</label>
				</label>
				<label class="add-service__info-label flex flex_vertical" for="handled-price">
					<p class="p">Цена</p>
					<input class="add-service__info-input add-service__info-input_med" type="text" name="handled-price" id="handled-price" placeholder="1200" inputmode="numeric">
					<p class="p">₽</p>
				</label>
				<div class="add-service__additional-editor-more">
					<a class="add-service__additional-editor-more-button" href="javascript:void(0);" data-action="show-edit-controls">
						<svg class="icon icon-dots-vertical" viewBox="0 0 16 16">
								<use xlink:href="/app/icons/sprite.svg#dots-vertical"></use>
						</svg>
					</a>
					<div class="editor-more" data-action-target="show-edit-controls">
						<a class="editor-more__button small" href="javascript:void(0);" data-action="deleteServ">
								<svg class="icon icon-close" viewBox="0 0 18 18">
									<use xlink:href="/app/icons/sprite.svg#close"></use>
								</svg>
								<span>Удалить</span>
						</a>
						<a class="editor-more__button small" href="javascript:void(0);" data-action="edit">
								<svg class="icon icon-edit" viewBox="0 0 12 12">
									<use xlink:href="/app/icons/sprite.svg#edit"></use>
								</svg>
								<span>Редактировать</span>
						</a>
					</div>
			</div>
				<div class="add-service__additional-editor-actions flex"><a class="add-service__additional-editor-cancel flex small" href="javascript:void(0);" data-action="cancel">Отменить</a><a class="add-service__additional-editor-save flex small" href="javascript:void(0);" data-action="save">Сохранить</a>
			</div>
		</div>
	`
	return markup
	},
	init: () => {
		let triggers = document.querySelectorAll('.add-service__info-show');
		let closers = document.querySelectorAll('.add-service__info-hide');
		let actionTriggers = document.querySelectorAll('[data-action]');

		if (triggers && closers) {
			triggers.forEach(button => {
				button.addEventListener('click', () => {
					if (button.dataset.action === 'new-service') {
						button.classList.add('is-hidden');
					} else {
						button.classList.add('is-hidden');
						button.parentElement.querySelector('.add-service__info-row')
							.classList.remove('is-hidden')
						button.parentElement.querySelector('.add-service__info-row')
							.classList.add('is-active')
					}
				})
			})

			closers.forEach(button => {
				button.addEventListener('click', () => {
					button.parentElement.parentElement.parentElement.querySelector('.add-service__info-show').classList.remove('is-hidden');
					button.parentElement.parentElement
						.classList.remove('is-active')
					button.parentElement.parentElement
						.classList.add('is-hidden')
				})
			})
		}

		actionTriggers.forEach(trigger => {
			document.querySelectorAll('input[name=service-name]').forEach(input => {input.value = ''})
			document.querySelectorAll('input[name=service-descr]').forEach(input => {input.value = ''})
			trigger.removeEventListener('click', () => {});
			trigger.addEventListener('click', e => {
				e.preventDefault();
				let target = trigger.dataset.action;

				document.querySelectorAll('[data-action-target="show-edit-controls"]').forEach(menu => {
					document.addEventListener('click', e => {
						if (e.target.classList.contains('icon')) {
							menu.classList.add('is-active')
						} else {
							menu.classList.remove('is-active')
						}
					})
				})

				if (target === 'deleteServ') {
					addService.events.deleteService(target)
				} else if (target === 'edit') {
					trigger.parentElement.parentElement.parentElement.classList.add('is-active')
				} else if (target === 'show-edit-controls') {
					trigger.parentElement.querySelector(`[data-action-target=${target}]`).classList.add('is-active')
				} else if (target === 'cancel') {
					trigger.parentElement.parentElement.classList.remove('is-active')
					document.querySelector('.add-service__info-show[data-action=new-service]').classList.remove('is-hidden')
				} else if (target === 'save') {
					addService.events.saveService(trigger);
				} else if (target === 'create-new') {
					addService.events.createService(trigger);
				} else {
					addService.events.activateTarget(target);
				}
			})
		})
	}
}

export { addService }
