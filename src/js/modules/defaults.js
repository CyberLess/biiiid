var defaults = {

	events: () => {

		$('.js-toggle-categories').on('click', e => {

			let $this = $(e.currentTarget);

			let $category = $('.categories');

			$category.toggleClass('is-active');

			$this.toggleClass('is-active')

		})

		$(document).on('click', '.categories__list-item', e => {

			e.preventDefault()

			let $this = $(e.currentTarget);
			let index = $this.index();

			$('.categories__list-link')
				.removeClass('is-active')
				.parent()
				.eq(index)
				.find('.categories__list-link')
				.addClass('is-active')

			$('.categories__content')
				.removeClass('is-active')
				.eq(index)
				.addClass('is-active')
		})

		$(document).on("mouseup", function(e) {
		    var container = $(".categories, .js-toggle-categories");

		    // if the target of the click isn't the container nor a descendant of the container
		    if (!container.is(e.target) && container.has(e.target).length === 0) 
		    {

				let $category = $('.categories');
				$category.removeClass('is-active');
				$('.js-toggle-categories').removeClass('is-active');

		    }
		});
	},


	box: {

		hide: (item, count = 4) => {

			
			let $li = $(item).find(`li:nth-child(n+${(count + 1)})`);

			$li.hide()

			let $link = $(item).find('.js-morebox-link');

			let li_count = $li.length;



			if($link.length || li_count < count)
				return false;

			$(item).append(
				`<a class="border-link icon-link js-morebox-link" href="#" data-default="Показать еще ${li_count}" data-active="Скрыть">
					<span class="icon-link__text p">Показать еще ${li_count}</span>
					<span class="icon-link__icon icon-link__icon_more">
						<svg class="icon icon-arw" viewBox="0 0 12 7">
							<use xlink:href="/app/icons/sprite.svg#arw"></use>
						</svg>
					</span>
				</a>`
			)

		},

		show: (item) => {

			$(item).find(`li:hidden`).show()
		
		}

	},


	init: () => {

		defaults.events();

		$('.js-more-box').each((i, el) => {
			defaults.box.hide(el)
		})

		$(document).on('click', '.js-morebox-link', e => {

			e.preventDefault()

			let $this = $(e.currentTarget);
			let $parent = $this.closest('.js-more-box');

			let default_text = $this.data('default');
			let active_text = $this.data('active');

			$this.toggleClass('is-active');

			if($this.hasClass('is-active')){

				$this.find('.p').text(active_text)
				defaults.box.show($parent[0]);

			}else{

				$this.find('.p').text(default_text)
				defaults.box.hide($parent[0]);

			}
			

		})


	}
}

export { defaults }