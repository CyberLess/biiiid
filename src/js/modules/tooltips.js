import {
	config
} from "../config";

var tooltips = {

	open: e => {

		if (!e)
			return false;

		e.preventDefault();

		let tooltip = $($(e.currentTarget).attr('data-tooltip') ?
			$(e.currentTarget).data('tooltip') :
			$(e.currentTarget).attr('href'));

		let offset = $(e.currentTarget).offset(),
			x = offset.left,
			y = offset.top,
			b_width = $(e.currentTarget).outerWidth(),
			b_height = $(e.currentTarget).outerHeight(),
			id;

		config.log(x, y)

		if (!$(e.currentTarget).hasClass('js-tooltip-open')) {

			$('.tooltip__item').removeClass('tooltip__item_active')

			if (!$(e.currentTarget).attr('data-tooltip-id')) {
				id = config.guidGenerator();
				$(e.currentTarget).attr('data-tooltip-id', id)
			} else
				id = $(e.currentTarget).attr('data-tooltip-id')

			if ($(e.currentTarget).attr('data-tab')) {
				let tabs = tooltip.find('.tabs')

				if (tabs.length) {
					tabs
						.find('.tabs__label, .tabs__item')
						.removeClass('js-active')

					tabs
						.find('.tabs__item')
						.eq(Number($(e.currentTarget).data('tab')))
						.addClass('js-active')

					tabs
						.find('.tabs__label')
						.eq(Number($(e.currentTarget).data('tab')))
						.addClass('js-active')
				}

			}

			let final_x, final_y;

			if (tooltip.hasClass('tooltip__item_right')) {
				let width = tooltip.outerWidth();
				let button_width = tooltip.hasClass('tooltip__item_arrow') ? b_width / 2 : b_width;

				final_x = x - width + button_width;
				final_y = y + b_height;

			} else if (tooltip.hasClass('tooltip__item_toheader')) {

				let $header = $('.header');

				let headerPos = $header.outerHeight();

				final_x = 0;
				final_y = headerPos;

			} else {
				final_x = x;
				final_y = y + b_height;
			}

			tooltip
				.css({
					left: `${final_x}px`,
					top: `${final_y}px`
				})

			$(e.currentTarget).addClass('js-tooltip-open')

			tooltip
				.attr('data-for-button', id)
				.addClass('tooltip__item_active')

			$('.tooltip').addClass('is-active')
		} else {
			$(e.currentTarget).removeClass('js-tooltip-open')

			$('.tooltip').removeClass('is-active')

			tooltip
				.removeAttr('style')
				.removeClass('tooltip__item_active')
		}
	},

	close: () => {
		$('.tooltip').removeClass('is-active')

		$('.js-tooltip-open').removeClass('js-tooltip-open')

		$('.tooltip__item_active')
			.removeAttr('style')
			.removeClass('tooltip__item_active')
	},

	change: function () {

		$('.tooltip .for-current').on('change', function () {
			let button = $('[data-tooltip-id="' + $(this).closest('.tooltip__item').attr('data-for-button') + '"]')

			if (button.find('.current').length) {
				let val = $(this).closest('.tooltip__item').find('.for-current:checked').val()
				button.find('.current').text(val)
			}
		})

		$(document).on("mouseup", function (e) {
			var container = $(".tooltip__item_active, .js-tooltip-open");

			// if the target of the click isn't the container nor a descendant of the container
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				tooltips.close();
			}
		});
	},

	input: ($this) => {
		let
			$parent = $this.closest('.tooltip__item'),
			dataFor = $parent.attr('id'),
			$button = $(`*[data-tooltip="#${dataFor}"]`),
			val = $this.val();;

		$button.find('.select__top span').text(val);
		// tooltips.close();
	},

	init: function () {
		// $('[data-tooltip], .js-tooltip').on('click', tooltips.open(e))

		tooltips.change();

		$('[data-tooltip], .js-tooltip').on('click', e => {
			tooltips.open(e)
		})

		$('.tooltip input:radio').on('change', e => {
			tooltips.input($(e.currentTarget))
		})
	}

}

export {
	tooltips
};
