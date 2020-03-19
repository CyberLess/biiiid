import { config } from "../config";

var menu = {

	panel: $('.menu-modal:not(.filter-modal__panel)'),

	close: () => {

		menu.panel.removeClass('is-active');
		config.container.removeClass('js-lock');

	},

	open: () => {

		config.container.addClass('js-lock');
		menu.panel.addClass('is-active');

	},

	resize: () => {

		if($(window).width() > 1024){
			menu.close()
		}

	},

	catsOpen: (e) => {
		e.preventDefault();

		let $list = $('.menu-modal__panel_cats .menu-modal__content-list');

		$list.empty()

		categories.forEach((cat,index) => {
			$list.append(
				`<li class="menu-modal__content-item">
					<a class="menu-modal__content-link small js-mobile-open-links ${(index == 0 ? "is-active" : "")}" href="${cat.link}">${cat.name}</a>
				</li>`
            );
		})

		$('.menu-modal__panel_cats').addClass('is-visible')
	},

	catsClose: (e) => {
		e.preventDefault()
		$('.menu-modal__panel_cats').removeClass('is-visible')
	},

	linksOpen: (e) => {
		e.preventDefault()

		let $list = $('.menu-modal__panel_links .menu-modal__content-list');

		let ind = $(e.currentTarget).parent().index();

		config.log("ind", categories[ind]['list'])

		$list.empty();


		categories[ind]['list'].forEach((box) => {

			config.log("box", box)

			box.forEach((list) => {

				list.boxlist.forEach((link) => {

					config.log("link", link)

					let help = (typeof link.help !== 'undefined') ? link.help : '';

					$list.append(
						`<li class="menu-modal__content-item">
							<a class="menu-modal__content-link small" href="${link.href}">${link.name} ${help}</a>
						</li>`
		            );

				})


			})
		

		})

		$('.menu-modal__panel_links').addClass('is-visible')
	},
	linksClose: (e) => {
		e.preventDefault()
		$('.menu-modal__panel_links').removeClass('is-visible')
	},

	build: () => {

		categories.forEach((cat,index) => {

			let $template = '';

			$('.categories__cell_left .categories__list').append(
				`<li class="categories__list-item">
					<a class="categories__list-link ${(index == 0 ? "is-active" : "")} p" href="${cat.link}">${cat.name}</a>
				</li>`
            );

			$template += `<div class="categories__content ${(index == 0 ? "is-active" : "")} flex">`;

            cat.list.forEach((column) => {

            	$template += `<div class="categories__part">`;

	            	column.forEach((box) => {

	            		$template += '<div class="categories__box">';

		            		$template += `<div class="categories__label p">${box.boxName}</div>`;

		            		$template += `<ul class="categories__list">`;

			            		box.boxlist.forEach((link) => {

			            			let help = (typeof link.help !== 'undefined') ? link.help : '';

			            			$template += `
										<li class="categories__list-item">
											<a class="categories__list-link categories__list-link_gray p" href="${link.href}">${link.name}</a>
											${help}
										</li>
			            			`;

			            		})

		            		$template += `</ul>`;

	            		$template += '</div>';

	            	})

            	$template += '</div>';

            });

            $template += '</div>';

            $('.categories__cell_right').append($template);

		});

	},


	init: () => {

		menu.build();

		$(document).on('click', '.js-close-menu', menu.close);
		$(document).on('click', '.js-open-menu', menu.open);

		$(document).on('click', '.js-mobile-open-cats', menu.catsOpen);
		$(document).on('click', '.js-mobile-close-cats', menu.catsClose);

		$(document).on('click', '.js-mobile-open-links', menu.linksOpen);
		$(document).on('click', '.js-mobile-close-links', menu.linksClose);

		$(window).on('resize load', menu.resize)

	}

};

export { menu }