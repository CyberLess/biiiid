import { config } from "../config";
import { defaults } from "./defaults";
import { tooltips } from "./tooltips";

var filters = {

	panel: $('.filter-modal'),
	mobile_panel_values: $('.filter-modal__panel_values'),

	checkbox: (item, blockName, reverse = false, checked = false) => {

		let help = item.hasOwnProperty("count") ? `<i>(${item.count})</i>` : '';
		
		let input = 
			`<li class="${blockName}__list-item">
				<label class="${blockName}__${item.type} ${item.type} ${(reverse ? `${item.type}_reverse`: "")}">
				    <input class="${item.type}__input js-virtual-input" ${(checked ? 'checked=""' : '')} name="${item.name}" type="${item.type}" value="${item.label}"><span class="${item.type}__text"> ${item.label} ${help}<span class="${item.type}__icon"><svg class="icon icon-check" viewBox="0 0 10 7"><use xlink:href="/app/icons/sprite.svg#check"></use></svg></span></span>
				</label>
			</li>`;

		return input;

	},

	virtual: {
		
		form: {},

		resetItem: $('.js-reset-form'),

		send: () => {

			$.ajax({

				type: "POST",
				url: api.catalog,
				data: filters.virtual.form,
				// contentType: "application/json; charset=utf-8",
				// dataType: "json",
				success: msg => {
					config.log("ajax success", msg);
				},
				error: msg => {
					config.log("ajax error", msg);
				},

			});

		},

		check: () => {
			if(jQuery.isEmptyObject(filters.virtual.form)){
				filters.virtual.resetItem.removeClass('is-active')
			}else{
				filters.virtual.resetItem.addClass('is-active')
			}
		},

		reset: () => {

			filters.virtual.form = {};

			filters.tag.removeAll();

			filters.virtual.print("reset all form fields");

			$('.js-virtual-input').prop('checked', false);

			filters.virtual.check();

			// for (var item in filters.virtual.form) delete filters.virtual.form[item];


		},

		print: (status) => {
			config.log(`${status} :`, filters.virtual.form)
		},

		update: (name, value) => {

			if(value == '')
				return false;

			filters.virtual.form[name] = value;

			filters.virtual.beauty();

			filters.virtual.print("update form item");

			filters.virtual.check();

		},

		beauty: () => {

			for (var item in filters.virtual.form) {

				if(Array.isArray(filters.virtual.form[item])){

					if(filters.virtual.form[item].length <= 1)
						filters.virtual.form[item] = filters.virtual.form[item].toString()

				}

			}

		},

		remove: (item) => {
			delete filters.virtual.form[item];

			filters.virtual.print("remove form item");

			filters.virtual.check();
		},

		input: e => {

			let 
				$this = $(e.currentTarget),
				$parent = $this.closest('div'),
				name = $this.attr('name').replace('[]', ''),
				type = $this.attr('type'),
				value = $this.val()
			;

			if ( type == 'radio' || type == 'checkbox' ) {

				let values = [];

				$parent.find('input').each((i, el) => {

					let check = $(el).prop('checked');

					let $duplicate = $(`input[value="${$(el).val()}"][name="${$(el).attr('name')}"]`).not($this);

					$duplicate.each((i, el) => {

						$(el).prop('checked', check);

						if($(el).closest('.tooltip__item').length){

							tooltips.input($(el))

						}

					})
					

					if(check){

						values.push($(el).val())

					}

				}) 

				$(`.js-mobile-filter[data-name="${name}"] .mobile-filter__item`).remove()

				if(!values.length){

					// $list.append(`<div class="mobile-filter__item p">${$(el).val()}</div>`)

					// $(`.js-mobile-filter[data-name="${name}"] .mobile-filter__list`)
					// 	.append(`<div class="mobile-filter__item p">${$(el).val()}</div>`)

					delete filters.virtual.form[name];

				}else{

					for (var i in values) {

						$(`.js-mobile-filter[data-name="${name}"] .mobile-filter__list`)
							.append(`<div class="mobile-filter__item p">${values[i]}</div>`)

					}

					filters.virtual.update(name, values);

				}

			}else{

				$(`input[name="${name}"]`).not($this).val(value);

				filters.virtual.update(name, value);

			}

			// $(`input[name="${name}"]`).val(value)

		}

	},

	tag: {

		list: $('#tag-list'),

		template: (name, value, before, after) => {
			return `<div class="catalog__tag tag" data-name="${name}" data-value="${value}">
                    <div class="tag__text">${(before) ? before + " ": ""}${value}${(after) ? " " + after : ""}</div>
                    <div class="tag__close js-tag-delete">
                        <svg class="icon icon-close" viewBox="0 0 18 18">
                            <use xlink:href="/app/icons/sprite.svg#close"></use>
                        </svg>
                    </div>
                </div>`;
		},

		rules: {
			online: {
				notag: true
			},
			sort: {
				notag: true
			},

			price_min: {
				before: "от",
				merge: "price_max",
				after: "₽"
			},

			price_max: {
				before: "до",
				merge: "price_min",
				after: "₽"
			}
		},

		add: (name, value) => {

			if(filters.tag.rules.hasOwnProperty(name) && 
				filters.tag.rules[name].hasOwnProperty("notag") &&
				filters.tag.rules[name]["notag"] == true)
				return false;

			// config.log(`merge - ${name}`, filters.tag.rules[name.toString()])

			// config.log("merge is ", filters.tag.rules[name])


			if(!filters.tag.rules.hasOwnProperty(name) || !filters.tag.rules[name].hasOwnProperty("merge")){

				config.log("tag dont have merge")

				filters.tag.list.removeAttr('style').append(filters.tag.template(name, value))

			}else{

				let merge = filters.tag.rules[name]['merge'];
				let before = filters.tag.rules[name]['before'];
				let after = filters.tag.rules[name]['after'];


				config.log("tag have merge", merge)

				if(!filters.virtual.form.hasOwnProperty(merge)){

					config.log("merge", filters.virtual.form.hasOwnProperty(merge))

					filters.tag.list.removeAttr('style').append(filters.tag.template(name, value, before, after))

				}else{

					let second = filters.virtual.form[merge];
					let second_before = filters.tag.rules[merge]['before'];
					let second_after = filters.tag.rules[merge]['after'];

					let string = (Number(value) < Number(second)) ? `${value + " " + after} - ${second}` : `${second + ' ' + second_after} - ${value + " " + after}`;

					if($(`.tag[data-name="${merge}"]`).length)
						return false;

					filters.tag.list.removeAttr('style').append(filters.tag.template(name, string, "", after))

				}

			}

			

		},

		destroy: (e) => {

			let $this = $(e.currentTarget);
			let $tag = $this.closest('.tag');

			let name = $tag.data('name'),
				value = $tag.data('value');

			if(Array.isArray(filters.virtual.form[name])){

				let pos = filters.virtual.form[name].indexOf(value);

				// ошибка #11 здесь

				delete filters.virtual.form[name][pos];

				filters.virtual.print("tag delete array item");

			}else{

				config.log("tag is not array");

				filters.virtual.remove(name);
			}

			$(`input[name="${name}"][value="${value}"]`).prop('checked', false);

			$tag.remove();

			if(filters.tag.list.find('.tag').length == 0){
				filters.tag.list.empty().hide();
			}

		},

		remove: (name, value) => {

			let $item = (value) ? $(`.tag[data-name="${name}"][data-value="${value}"]`) : $(`.tag[data-name="${name}"]`);
				
			config.log('remove tag', $item);

			$item.remove();

			filters.virtual.print("after remove tag");

			if(filters.tag.list.find('.tag').length == 0){
				filters.tag.list.empty().hide();
			}

		},

		removeAll: () => {

			filters.tag.list.empty().hide();

		},

		update: () => {

			filters.tag.removeAll();

			for (var i in filters.virtual.form) {

				if(Array.isArray(filters.virtual.form[i])){

					filters.virtual.form[i].forEach((item,index) => {

						filters.tag.add(i, item);

					})

				}else{

					filters.tag.add(i, filters.virtual.form[i]);

				}
				
			}

		}

	},

	close: () => {

		filters.panel.removeClass('is-active');
		config.container.removeClass('js-lock');

	},

	open: () => {

		config.container.addClass('js-lock');
		filters.panel.addClass('is-active');

	},

	resize: () => {

		if($(window).width() > 1024){
			filters.close()
		}

	},

	setup: {

		desktop: () => {

			let $container = $('#desktop-filters');

			let $template = '';

			$container.empty();

			filters_data.forEach((cat,index) => {

				if(cat.hasOwnProperty('status') && cat.status == "mobile"){
					return;
				}

				$template += 	
					`<div class="modals__box js-more-box">
						<div class="modals__label h5">${cat.label}</div>
						<ul class="modals__list flex flex_vertical">`;

				cat.list.forEach((item) => {					
					$template += filters.checkbox(item, 'modals');
				})

				$template += 
						`</ul>
					</div>`;

			})

			$container.append($template);

			$container.find('.js-more-box').each((i, el) => {
				defaults.box.hide(el)
			})

		},


		mobile: () => {
			let $container = $('#mobile-filters');

			let $template = '';

			$container.empty();

			filters_data.forEach((cat,index) => {

				$template += 	
					`<div class="filter-modal__filter mobile-filter js-mobile-filter" data-id="${index}" data-name="${cat.list[0].name.replace('[]', '')}">
						<div class="mobile-filter__list">
							<div class="mobile-filter__label p">${cat.label}</div>
						</div>
					    <div class="mobile-filter__icon">
					        <svg class="icon icon-arw" viewBox="0 0 12 7">
					            <use xlink:href="/app/icons/sprite.svg#arw"></use>
					        </svg>
					    </div>
					</div>`;

			})
			
			$container.append($template);
		}

	},

	reset: {

		see: (e) => {
			
			let $this = $(e.currentTarget);

			let $parent = $this.closest('.js-reset-parent');

			let $reset = $parent.find('.js-reset-filters');

			if($parent.find('input:checked').length){

				$reset.removeClass('is-gray')

			}

		},

		do: e => {

			let $this = $(e.currentTarget);

			let $parent = $this.closest('.js-reset-parent');

			if(!$parent.find('input:checked').length)
				return false;

			$parent.find('input:checked').prop('checked', false);

			$parent.find('input').each((i, el) => {

				let name = $(el).attr('name').replace('[]', '');

				filters.virtual.remove(name);

			})

			filters.virtual.print();

			$this.addClass('is-gray')

		}

	},

	openMobile: () => {
		filters.mobile_panel_values.addClass('is-visible')
	},

	closeMobile: () => {
		filters.mobile_panel_values.removeClass('is-visible')
	},

	updateMobile: (e) => {

		let $this = $(e.currentTarget);

		let id = filters.mobile_panel_values.attr('data-id');

		let $mylist = $(`.js-mobile-filter[data-id="${id}"] .mobile-filter__list`);

		let name = $this.attr('name');

		$mylist.find('.mobile-filter__item').remove();

		filters.mobile_panel_values.find(`input:checked`).each((i, el) => {

		    $mylist.append(`<div class="mobile-filter__item p">${$(el).val()}</div>`)

		});
	},

	get: (id) => {
		let current = filters_data[id];
		let $container = filters.mobile_panel_values.find('.menu-modal__content-list');
		let $template = '';
		let $getlist = $(`.js-mobile-filter[data-id="${id}"]`);

		
		$container.empty();

		filters.mobile_panel_values.find('.menu-modal__head span').text(current.label);

		current.list.forEach((item,index) => {

			let checked = $getlist.text().replace(/&nbsp;/gi, " ").indexOf(item.label.replace(/&nbsp;/gi, " ")) !== -1;

			$template += filters.checkbox(item, 'menu-modal', true, checked);
			
		})

		filters.mobile_panel_values.attr('data-id', id)

		$container.append($template);

		filters.openMobile()
	},

	init: () => {

		filters.setup.desktop();
		filters.setup.mobile();

		
		$(document).on('click', '.js-close-mobile-filter', filters.closeMobile)

		$(document).on('click', '.js-mobile-filter', e => {

			let id = parseInt($(e.currentTarget).data('id'));

			filters.get(id);

		});

		$(document).on('click', '.js-close-filters', filters.close);

		$(document).on('click', '.js-open-filters', filters.open);

		$(document).on('click', '.js-send-filters', e => {
			filters.virtual.send();
			tooltips.close();
		});

		$(document).on('change', '.filter-modal__panel_values input', filters.updateMobile);

		$(document).on('change', '.js-virtual-input', e => {

			filters.virtual.input(e);

			filters.tag.update();

			if($(e.currentTarget).hasClass('js-send-input')){
				filters.virtual.send();
			}

		});

		$('.js-reset-parent input').on('change', filters.reset.see);

		$('.js-reset-filters').on('click', filters.reset.do);

		$(document).on('click', '.js-tag-delete', filters.tag.destroy);

		filters.virtual.resetItem.on('click', filters.virtual.reset);

		$(window).on('resize load', filters.resize)

	}

};

export { filters }