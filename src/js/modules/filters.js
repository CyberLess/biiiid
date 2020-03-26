import { config } from "../config";
import { defaults } from "./defaults";
import { tooltips } from "./tooltips";
import { sliders } from "./sliders";
import { player } from "./player";
import { modals } from "./modals";
import { forms } from "./forms";

var filters = {

	panel: $('.filter-modal'),
	mobile_panel_values: $('.filter-modal__panel_values'),
	list: $('#catalog-list'),

	template: {
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

		slide: (image, source, type) => {
			let slide, img;

			if(image){
				img = 
					`<picture>
						${image.hasOwnProperty("webp") ? `<source type="image/webp" srcset="${image.webp}">` : ""}
						${image.hasOwnProperty("jpg") ? `<img src="${image.jpg}" class="player__preview object-fit" alt="" role="presentation" />` : ""}
			        </picture>`;
			}

			slide =  
				`<div class="case__preview">`;

				if (type) {

					slide += 
						`<div class="case__player player player_fluid js-player" ${(type == "music") ? `data-audio="true"` : ""} ${(source) ? `data-file="${source}"` : ""}>
					        ${img}
					        <div class="player__container"></div>
					        <div class="player__bar">
					            <div class="player__bar-line">
					                <div class="player__bar-progress"></div>
					                <div class="player__bar-dot"></div>
					            </div>
					        </div>
					        <div class="player__nav">
					            <div class="player__nav-button">
					                <div class="player__nav-icon player__nav-icon_play is-active">
					                    <svg class="icon icon-play" viewBox="0 0 9 12">
					                        <use xlink:href="/app/icons/sprite.svg#play"></use>
					                    </svg>
					                </div>
					                <div class="player__nav-icon player__nav-icon_pause">
					                    <svg class="icon icon-pause" viewBox="0 0 10 12">
					                        <use xlink:href="/app/icons/sprite.svg#pause"></use>
					                    </svg>
					                </div>
					            </div>
					        </div>
					    </div>`;

				}else{

					slide += img;

				}

			slide +=
				`</div>`;

			return slide;

		}
	},

	virtual: {
		
		form: {},

		rules: {
			online: {
				nofilter: true
			},
			sort: {
				nofilter: true
			},
		},

		resetItem: $('.js-reset-form'),

		build: (data) => {

			data.forEach((item, index) => {

				let tag = item.hasOwnProperty("tag") ? 
					`<div class="case__top-cell case__top-cell_static">
                        <div class="case__label label ${(item.tag.hasOwnProperty("className")) ? item.tag.className : ""}">${item.tag.label}</div>
                    </div>` : "";

                let rating = item.hasOwnProperty("rating") ?
					`<div class="case__top-cell case__top-cell_static">
					    <div class="case__rating rating rating_purple small">
					        <div class="rating__icon">
					            <svg class="icon icon-star" viewBox="0 0 18 18">
					                <use xlink:href="/app/icons/sprite.svg#star"></use>
					            </svg>
					        </div>${item.rating.status} <span>(${item.rating.count})</span>
					    </div>
					</div>` : "";

				let $template = 
					`<div class="case__item">`;

						if (item.hasOwnProperty("gallery")) {

							let gallery_list = "";

							item.gallery.forEach((slide,index) => {

								let image = slide.hasOwnProperty("image") ? slide.image : false;
								let source = slide.hasOwnProperty("source") ? slide.source : false;
								let type = slide.hasOwnProperty("type") ? slide.type : false;

								gallery_list += filters.template.slide(
									
									image,
									source,
									type,

								);

							})

							if(item.gallery.length > 1){
								$template +=
									`<div class="case__gallery js-case-slider owl-carousel">
										${gallery_list}
									</div>`;
							}else{
								$template += gallery_list;
							}

						}

                    $template += `<div class="case__top">
                            ${tag}
                            <div class="case__top-cell case__top-cell_fluid">
                                <a href="${item.author.name}" class="case__name nickname nickname_online small">${item.author.name}</a>
                            </div>
							${rating}
                        </div>
                        <div class="case__content content">
                            <p>${item.name}</p>
                        </div>
                        <div class="case__bottom flex flex_justify flex_vertical">
                            <div class="case__price h6">${(item.hasOwnProperty("price")) ? item.price : ""}</div>
                            <div class="case__like like">
                                <svg class="icon icon-like" viewBox="0 0 18 16">
                                    <use xlink:href="/app/icons/sprite.svg#like"></use>
                                </svg>
                            </div>
                        </div>
                    </div>`;

                filters.list.append($template);

			})
		},

		send: () => {

			filters.list.addClass('is-loading');

			config.log('virtualForm send start', filters.virtual.form)

			setTimeout(() => {

				$.ajax({

					type: "GET",
					url: api.catalog,
					data: filters.virtual.form,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: msg => {
						filters.list.empty();
						filters.virtual.build(msg);
						sliders.init(0);
						player.init();

						filters.list.removeClass('is-loading');

						config.log('virtualForm send success', msg)
					},
					error: msg => {
						config.log("ajax error", msg);
					},

				});

			}, 500)

		},

		buttonCheck: (el) => {
			let $this = $(el);
			let $parent = $this.closest('.tooltip__item').length ? $this.closest('.tooltip__item') : $this.closest('.modals');
			let $button = $parent.hasClass('modals') ? $(`*[data-modal="#${$parent.attr('id')}"]`) : $(`*[data-tooltip="#${$parent.attr('id')}"]`);
			let inputLength = $parent.find('input[type="text"]').filter(function () {
			    return !!this.value;
			}).length;

			config.log('button check')


			if($parent.find('input:checked').length || inputLength) {
				$button.addClass('is-active')
			}else{
				$button.removeClass('is-active')
			}
		},

		check: () => {

			
			let show = false;

			for (var item in filters.virtual.form) {

				config.log("filters virtual check", item);


				show = true;

				if(filters.virtual.rules.hasOwnProperty(item)){



					if(filters.virtual.rules[item].hasOwnProperty("nofilter")){
						show = false;

						config.log('each filters.virtual.rules has nofilter', item, filters.virtual.rules[item]);
					}

				}

			}
			
			if(!show){
				filters.virtual.resetItem.removeClass('is-active')
			}else{
				filters.virtual.resetItem.addClass('is-active')
			}
			
			
			// if(jQuery.isEmptyObject(filters.virtual.form)){
			// 	filters.virtual.resetItem.removeClass('is-active')
			// }else{
			// 	filters.virtual.resetItem.addClass('is-active')
			// }
		},

		reset: () => {

			let subform = {}

			for (var item in filters.virtual.form) {

				if(filters.virtual.rules.hasOwnProperty(item)){

					if(filters.virtual.rules[item].hasOwnProperty("nofilter")){

						subform[item] = filters.virtual.form[item];

					}

				}

			}

			filters.virtual.form = subform;

			filters.tag.removeAll();

			filters.virtual.print("reset all form fields");

			//  тут проблема
			$('.js-virtual-input:not(.js-send-input)').prop('checked', false);

			$('.js-reset-filters').addClass('is-gray')

			forms.price.reset($('.range'));

			$('.js-virtual-input').each((i, el) => {
				filters.virtual.buttonCheck(el);
			})			

			$('.mobile-filter__item').remove()

			filters.close();

			filters.virtual.check();

			filters.virtual.send();

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

			filters.virtual.print(`update form item -> ${name}`);

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
				$this = $(e),
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

				config.log(`text input name is ${name} and value is ${value}`, $this)

				if(value != ''){

					$(`input[name="${name}"]`).not($this).val(value);

					filters.virtual.update(name, value);	

				}else{

					filters.virtual.remove(name);
				
				}



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

			filters.virtual.send();

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
					$template += filters.template.checkbox(item, 'modals');
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

			let inputLength = $parent.find('input[type="text"]').filter(function () {
			    return !!this.value;
			}).length;

			config.log('see trigger', inputLength);

			if($parent.find('input:checked').length 
				|| inputLength){

				$reset.removeClass('is-gray')

			}

		},

		do: e => {

			let $this = $(e.currentTarget);

			let $parent = $this.closest('.js-reset-parent');

			let inputLength = $parent.find('input[type="text"]').filter(function () {
			    return !!this.value;
			}).length;

			if(!$parent.find('input:checked').length && !inputLength)
				return false;

			$parent.find('input:checked').prop('checked', false);

			forms.price.reset($(".range"));

			$parent.find('input').each((i, el) => {

				let name = $(el).attr('name').replace('[]', '');
				// let value = $(el).attr('value');

				filters.virtual.buttonCheck(el);

				filters.virtual.remove(name);

				filters.tag.remove(name);

			})

			filters.virtual.print();

			$this.addClass('is-gray')

			filters.virtual.send();
			modals.close();
			tooltips.close();

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

		config.log("open mobile checkbox items", current.list, $getlist.text())

		current.list.forEach((item,index) => {

			let checked = $getlist.text().replace(/&nbsp;/gi, " ").indexOf(item.label.replace(/&nbsp;/gi, " ")) !== -1;

			$template += filters.template.checkbox(item, 'menu-modal', true, checked);
			
		})

		filters.mobile_panel_values.attr('data-id', id)

		$container.append($template);

		filters.openMobile()
	},

	init: () => {

		filters.setup.desktop();
		filters.setup.mobile();

		filters.virtual.send();
		
		$(document).on('click', '.js-close-mobile-filter', filters.closeMobile)

		$(document).on('click', '.js-mobile-filter', e => {

			let id = parseInt($(e.currentTarget).data('id'));

			filters.get(id);

		});

		$(document).on('click', '.js-close-filters', filters.close);

		$(document).on('click', '.js-open-filters', filters.open);

		$(document).on('click', '.js-mobile-send-filters', e => {

			$('.filter-modal').find('.js-virtual-input').each((i, el) => {
				filters.virtual.buttonCheck(el);
				filters.virtual.input(el);
			})		

			filters.tag.update();
			filters.virtual.send();		
			
			filters.close();		

		})


		$(document).on('click', '.js-send-filters', e => {


			$(e.currentTarget).closest('.js-reset-parent').find('.js-virtual-input').each((i, el) => {
				filters.virtual.buttonCheck(el);
				filters.virtual.input(el);
			})

			filters.tag.update();
			filters.virtual.send();
			tooltips.close();
			modals.close();

			filters.virtual.print("after js-send-filters");

		});

		$(document).on('change', '.filter-modal__panel_values input', filters.updateMobile);

		$(document).on('change', '.js-virtual-input', e => {

			

			if($(e.currentTarget).hasClass('js-send-input')){
				filters.virtual.input(e.currentTarget);
				filters.virtual.send();
				filters.tag.update();
			}

		});

		$('.js-reset-parent input').on('change', filters.reset.see);

		$('.js-reset-filters').on('click', e => {

			filters.reset.do(e);
		});

		$(document).on('click', '.js-tag-delete', filters.tag.destroy);

		filters.virtual.resetItem.on('click', filters.virtual.reset);



		$(window).on('resize load', filters.resize)

	}

};

export { filters }