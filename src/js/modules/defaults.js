import { config } from "../config";

var defaults = {

	events: () => {

		$('.js-toggle-categories').on('click', e => {

			let $this = $(e.currentTarget);

			let $category = $('.categories');

			$category.toggleClass('is-active');

			$this.toggleClass('is-active')

		});

		$('.service__checkbox').on('change', e => {

			let $this = $(e.currentTarget);
			$this.closest('.service__more-row').toggleClass('is-active');

		})

		$(document).on('mouseenter', '.js-cetegories-parent', e => {

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
		});

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
		
		let editInput = $('.js-edit-status'),
			editText = $('.js-edit-text');
		
		editInput.each(function(){
			let placeholder = $(this).attr('placeholder');
			
			$(this).focus(function(){ 
				$(this).attr('placeholder', '');
				$(this).val( editText.text() );
			});
			$(this).blur(function(){             
				$(this).val('').attr('placeholder', placeholder);
				$(this).parent().removeClass('is-edit');
			});
			
			$(this).keyup(function(){
				let thisVal = $(this).val();
				
				editText.text( thisVal );
			});
			
		});
		
		editText.click(function(){
			$(this).parent().addClass('is-edit');
			editInput.select();
		});
		
		$(".service-list__more-vertical").click(function(){
			
			if ( $(this).closest(".service-list__item").hasClass('is-active') ) {
				
			} else {
				
				$(".service-list__item, .service-list__more-vertical").removeClass('is-active');
				
			}
			
			$(this).toggleClass("is-active");
			$(this).closest(".service-list__item").toggleClass('is-active');
			
			return false;
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

	moving: () => {
		let ww = $(window).width();

		$('.js-move-item').each((i, el) => {

			let $this = $(el);
			
			let $to = $($this.data('to'));
			let $from = $($this.data('from'));

			let point = $this.attr('data-point') ? parseInt($this.data('point')) : 1024;

			if(ww <= point)
				$this.appendTo($to).addClass('is-moved')
			else
				if($this.hasClass('is-moved'))
					$this.appendTo($from).removeClass('is-moved')

		})	
	},

	// fluid: ($item) => {

	// 	if(!$item.length)
	// 		return false;

 //        $(window).on("scroll load", () => {

 //        	let $parent = $item.parent()
 //            let windowpos = $(window).scrollTop() + $(window).height() - $item.outerHeight();
 //            let top = $parent.offset().top - parseFloat($item.css('marginTop').replace(/auto/, 0));

 //            if(windowpos < top) {
 //                $item.removeClass('is-window-fluid')
 //                // $parent.removeAttr('style')
 //            } else {
 //            	// $parent.css('height', $item.outerHeight())
	// 			$item.addClass('is-window-fluid')
 //            }

 //        });

	// },

	fluid: ($item) => {

		if(!$item.length)
			return false;

        $(window).on("scroll load", () => {

        	let $parent = $item.parent()
            let windowpos = $(window).scrollTop();// - $item.outerHeight();
            let top = $parent.offset().top - parseFloat($item.css('marginTop').replace(/auto/, 0));

            if(windowpos < top) {
                $item.removeClass('is-window-fluid')
                $parent.removeAttr('style')
            } else {
            	$parent.css('height', $item.outerHeight())
				$item.addClass('is-window-fluid')
            }

        });

	},


	init: () => {

		defaults.events();

		defaults.fluid($('.js-window-fluid'))

		$(window).on('load resize', defaults.moving);

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