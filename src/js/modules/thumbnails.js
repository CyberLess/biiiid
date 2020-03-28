import { player } from "./player";
import { sliders } from "./sliders";
import { config } from "../config";
require('sly-scrolling/dist/sly');

var thumbnails = {

	items: $('.js-thumbnails'),

	init: () => {

		if(!thumbnails.items.length)
			return false;

		config.log('thumbnails init')


		thumbnails.items.each((i, el) => {

			let $box = $(el).find('.thumbnails__box'),
				$scrollbar = $(el).find('.thumbnails__scrollbar');

			$box.sly({
				horizontal: 1,
				itemNav: 'basic',
				smart: 1,
				activateOn: 'click',
				mouseDragging: 1,
				touchDragging: 1,
				releaseSwing: 1,
				// startAt: 3,
				scrollBar: $scrollbar,
				scrollBy: 1,
				// pagesBar: $wrap.find('.pages'),
				// activatePageOn: 'click',
				speed: 300,
				elasticBounds: 1,
				// easing: 'easeOutExpo',
				dragHandle: 1,
				dynamicHandle: 1,
				clickBar: 1,
			}).sly('on', 'active', (eventName, itemIndex ) => {
				// config.log('thumbnails change', eventName, itemIndex  )

				let $parent = $box.closest('.js-slider-parent');

				let owl = $parent.find('.owl-carousel');

				owl.owlCarousel();

				owl.trigger('to.owl.carousel', [itemIndex]);

				
			});


			// .on('activePage', (eventName, pageIndex ) => {
			// 	config.log('thumbnails change', eventName, pageIndex )
			// })
					
		})



	}

};

export {thumbnails};