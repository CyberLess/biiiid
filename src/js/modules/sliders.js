import 'owl.carousel';
import { player } from "./player";
import { config } from "../config";

var sliders = {

	items: ['.js-case-slider', '.js-service-slider'],

	settings: {
		items: 1,
		nav: true,
		loop: false,
		autoplay: false,
		autoWidth: false,
		dots: false,
		margin: 30,	
		navText: ['<svg class="icon icon-arrow" viewBox="0 0 12 7"><use xlink:href="/app/icons/sprite.svg#arw"></use></svg>', '<svg class="icon icon-arrow" viewBox="0 0 12 7"><use xlink:href="/app/icons/sprite.svg#arw"></use></svg>']	
	},

	build: (item) => {

		let $this = $(item);

		let current = JSON.parse(JSON.stringify(sliders.settings));

		if(item == '.js-case-slider'){

			current['mouseDrag'] = false;

			$this.on('changed.owl.carousel', function(event) {
				let $slider = $(event.target);

				$slider.find('.js-player').each((i, el) => {
					player.stop(el)
				})

			})
		}

		$this.not('.owl-loaded').owlCarousel(current);

	},

	init: (slider = false) => {

		if(slider === false){
			$.each( sliders.items, (index, item) => {
				sliders.build(item)
			});
		}else{

			config.log('init single slider', sliders.items[slider])
			
			sliders.build(sliders.items[slider])
		}

	}

};

export { sliders }