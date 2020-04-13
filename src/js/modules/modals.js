import "magnific-popup";
import { config } from "../config";
import { player } from "./player";

var modals = {

	close: (e) => {

		if(e)
			e.preventDefault();

		config.log('close modal');

		$.magnificPopup.close();	

	},

	gallery:  {

		image: 
			`<div class="modals modals_media">

				<div class="modals__container">
					<div class="modals__part modals__part_static">
						<div class="modals__author">
							<div class="modals__author-cell modals__author-cell_avatar">
								<img src="/app/img/avatar3.jpg" alt="" class="modals__avatar" />
							</div>
							<div class="modals__author-cell modals__author-cell_content">
								<a href="#" class="modals__author-name p strong">ivanivanov</a>
								<div class="modals__author-info flex vertical">
									<div class="modals__author-case mfp-title p"></div>
									<a href="#" class="modals__author-link p">Перейти на страницу услуги</a>
								</div>
							</div>
						</div>
					</div>
					<div class="modals__part modals__part_fluid">
						<div class="modals__inside">
							<div class="mfp-figure">
								<div class="mfp-img"></div>
							</div>
						</div>					
					</div>
				</div>
			</div>`,

		inline: (image, video) => {
			return `<div class="modals modals_media">
						<div class="modals__container">
							<div class="modals__part modals__part_static">
								<div class="modals__author">
									<div class="modals__author-cell modals__author-cell_avatar">
										<img src="/app/img/avatar3.jpg" alt="" class="modals__avatar" />
									</div>
									<div class="modals__author-cell modals__author-cell_content">
										<a href="#" class="modals__author-name p strong">ivanivanov</a>
										<div class="modals__author-info flex vertical">
											<div class="modals__author-case p"></div>
											<a href="#" class="modals__author-link p">Перейти на страницу услуги</a>
										</div>
									</div>
								</div>
							</div>
							<div class="modals__part modals__part_fluid">
								<div class="modals__inside">
									<div class="mfp-figure">
										<div class="modal__player player player_big js-player" data-file="${video}">
										    <picture>
										        <img src="${image}" class="player__preview object-fit" alt="" role="presentation" />
										    </picture>
										    <div class="player__container"></div>
										    <div class="player__mobile">
										        <div class="player__nav player__nav_default">
										            <div class="player__nav-button">
										                <div class="player__nav-icon player__nav-icon_play">
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
										    </div>
										    <div class="player__center">
										        <div class="player__nav player__nav_default">
										            <div class="player__nav-button player__nav-button_big">
										                <div class="player__nav-icon player__nav-icon_play">
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
										    </div>
										    <div class="player__bottom">
										        <div class="player__panel flex flex_vertical">
										            <div class="player__panel-time small"></div>
										            <div class="player__voice flex flex_vertical">
										                <div class="player__voice-button">
										                    <div class="player__voice-icon player__voice-icon_default">
										                        <svg class="icon icon-voiceDefault" viewBox="0 0 20 20">
										                            <use xlink:href="/app/icons/sprite.svg#voiceDefault"></use>
										                        </svg>
										                    </div>
										                    <div class="player__voice-icon player__voice-icon_small">
										                        <svg class="icon icon-voiceSmall" viewBox="0 0 20 20">
										                            <use xlink:href="/app/icons/sprite.svg#voiceSmall"></use>
										                        </svg>
										                    </div>
										                    <div class="player__voice-icon player__voice-icon_none">
										                        <svg class="icon icon-voiceNone" viewBox="0 0 20 20">
										                            <use xlink:href="/app/icons/sprite.svg#voiceNone"></use>
										                        </svg>
										                    </div>
										                </div>
										                <div class="player__voice-range">
										                    <div class="player__voice-field">
										                        <div class="player__voice-bar"></div>
										                        <div class="player__voice-dot"></div>
										                    </div>
										                </div>
										            </div>
										            <div class="player__fullscreen js-fullscreen">
										                <div class="player__fullscreen-icon player__fullscreen-icon_default">
										                    <svg class="icon icon-fullscreen" viewBox="0 0 20 20">
										                        <use xlink:href="/app/icons/sprite.svg#fullscreen"></use>
										                    </svg>
										                </div>
										                <div class="player__fullscreen-icon player__fullscreen-icon_opened">
										                    <svg class="icon icon-fsactive" viewBox="0 0 16 16">
										                        <use xlink:href="/app/icons/sprite.svg#fsactive"></use>
										                    </svg>
										                </div>
										            </div>
										        </div>
										        <div class="player__bar player__bar_static">
										            <div class="player__bar-row">
										                <div class="player__bar-cell player__bar-cell_left">
										                    <div class="player__nav player__nav_default">
										                        <div class="player__nav-button">
										                            <div class="player__nav-icon player__nav-icon_play">
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
										                </div>
										                <div class="player__bar-cell player__bar-cell_right">
										                    <div class="player__bar-line">
										                        <div class="player__bar-progress"></div>
										                        <div class="player__bar-dot"></div>
										                    </div>
										                </div>
										            </div>
										        </div>
										    </div>
										</div>
									</div>
								</div>					
							</div>
						</div>
					</div>`;
		},

		defaultHeight: 0,

		imageHeight: (item) => {
			
            let img = item.find('.mfp-figure');
            let maxHeight = img.closest('.modals__part_fluid').height();

            modals.gallery.defaultHeight = maxHeight;

            img.css('max-height', `${maxHeight}px`);
		},

		init: () => {
			$('.js-gallery-modal').magnificPopup({
				delegate: 'a',
				type: 'image',
				tLoading: 'Загрузка изображения #%curr%...',
				mainClass: 'mfp-img-mobile',
				closeBtnInside: false,
				// closeOnBgClick: false,
				closeMarkup: '<div class="modals__closefluid js-close-modal"><svg class="icon icon-close" viewBox="0 0 34 34"><use xlink:href="/app/icons/sprite.svg#closeSecond"></use></svg></div>',
				gallery: {
					enabled: true,
					navigateByImgClick: false,
					arrowMarkup: '<div class="modals__arrow modals__arrow_%dir% owl-nav owl-nav_big"><button type="button" role="presentation" class="owl-%dir%"><svg class="icon icon-arrow" viewBox="0 0 12 7"><use xlink:href="/app/icons/sprite.svg#arw"></use></svg></button></div>', // markup of an arrow button
					preload: [0,1] // Will preload 0 - before current, and 1 after the current image
				},
				image: {
					markup: modals.gallery.image,
					tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
				},
				callbacks: {
					// change: modals.gallery.imageHeight(),
			        // resize: modals.gallery.imageHeight(),
			        beforeOpen: () => {
			        	$('html, body').addClass('js-lock')
			        },
			        afterClose: () => {
			        	$('html, body').removeClass('js-lock')
			        },
			        change: function(item) {
			        	let img = this.content.find('.mfp-figure');
			        	img.css('max-height', `${modals.gallery.defaultHeight}px`);

			        	if(item.el.hasClass("js-video-link")){
			        		let $name = this.content.find('.modals__author-case'),
			        			$player = this.content.find('.js-player');

							$name.text(item.el.attr('title'))
							player.init($player);
			        	}
			        },
			        resize: function() {
			        	modals.gallery.imageHeight(this.content)
			        },
					elementParse: function(item) {
						// the class name
						if(item.el.hasClass("js-video-link")){
							config.log("is modal video in gallery")
							item.type = 'inline';
							item.src = modals.gallery.inline(item.el.attr('href'), item.el.data('video'));
						}else {
							item.type = 'image';
						}
					}
				},
			});
		}



	},

	open: (e, modal) => {

		e = e || false;

		if(e) e.preventDefault();

		// modals.close();

		// $.magnificPopup.close();

		modal = modal || (e != false ? ($(e.currentTarget).attr('href') ? $(e.currentTarget).attr('href') : $(e.currentTarget).data('modal')) : e);

		if(!modal)
			return false;

		let open = $.magnificPopup.instance.isOpen;

		if(open){

			var mfp = $.magnificPopup.instance;

			mfp.items = [];

			// modify the items array (push/remove/edit)
			mfp.items.push({
				src: modal,
				type: 'inline'
			});

			config.log('updateItemHTML')

			// call update method to refresh counters (if required)
			mfp.updateItemHTML();

		}else{
			if(e && $(e.currentTarget).attr('data-youtube')){
				$(modal + ' iframe').attr('src', 'https://www.youtube.com/embed/'+$(e.currentTarget).data('youtube')+'?autoplay=1&showinfo=0&rel=0&controls=0')
			}

			if(e && $(e.currentTarget).attr('data-input')){
				$(modal + ' input[name="form"]').val($(e.currentTarget).data('input'))
			}	

			$.magnificPopup.open({
				tClose: 'Закрыть',
				removalDelay: 600,
				fixedContentPos: true,
				fixedBgPos: true,
				overflowY: 'scroll',			
				closeMarkup: '<div class="modals__close close js-close-modal"><svg class="icon icon-close close2" viewBox="0 0 612 612"><use xlink:href="/app/icons/sprite.svg#cls"></use></svg></div>',
				mainClass: 'css-modal-animate',				
				items: {
					src: modal,
					type: 'inline'
				},
				callbacks: {
					beforeOpen: () => {
					},

					beforeClose: () => {
					}
				}
			}, 0);			
		}



	},


	init: (e) => {

		modals.gallery.init();

		$(document).on('click', '.js-close-modal', modals.close);

		$(document).on('click', '.js-modal', e => {
			config.log('modal open')
			modals.open(e)
		});
	}

};


export { modals };