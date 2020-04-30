import baron from 'baron';

var messageHeight = {
	init: () => {
		const LARGE_MOBILE = 580;
		const MEDIUM_MOBILE = 920;

		const BOTTOM_MOBILE = 20;
		const BOTTOM_MID_MOBILE = 40;
		const BOTTOM_DESK = 120;
		let bottom;

		const setBottom = () => {
			switch (true) {
				case $(window).width() <= LARGE_MOBILE:
					bottom = BOTTOM_MOBILE;
					break;
				case $(window).width() <= MEDIUM_MOBILE:
					bottom = BOTTOM_MID_MOBILE;
					break;
				default:
					bottom = BOTTOM_DESK;
			}
		};

		const $preFrame = $('.messages-pre__massages-frame');
		const $sendWrap = $('.messages-dialogs__send-wrap');
		const $inputsWrap = $('.dialog-form__inputs-wrap');
		const $textarea = $inputsWrap.find('textarea.dialog-form__message-text');
		const $textareaFrameWrap = $inputsWrap.find('.dialog-form__textarea-wrap');
		const $textareaFrame = $inputsWrap.find('.dialog-form__textarea-frame-wrap');
		const $textareaScrollHandle = $inputsWrap.find('.dialog-form__textarea-scroll-handle');

		const $dialogFrame = $('.messages-dialogs__dialog-frame');
		const $dialogWrap = $('.messages-dialogs__dialog-wrap');

		const showOrHideScroll = () => {
			if ($textareaFrame.height() > $textareaFrameWrap.height()) {
				$textareaScrollHandle.css('opacity', '1');
			} else {
				$textareaScrollHandle.css('opacity', '0');
			}
		};

		const correctHeight = () => {
			setBottom();

			if ($(window).width() <= LARGE_MOBILE && $($dialogWrap)[0] && $($dialogFrame)[0] && $($preFrame)[0] && $($sendWrap)[0]) {
				$dialogWrap.height($(window).height() - $dialogWrap.offset().top - $sendWrap.outerHeight() - bottom);
				$dialogFrame.height($(window).height() - $dialogFrame.offset().top - $sendWrap.outerHeight() - bottom);
				$preFrame.height($(window).height() - $preFrame.offset().top - bottom);
			} else if ($($dialogWrap)[0] && $($dialogFrame)[0] && $($preFrame)[0] && $($sendWrap)[0]) {
				$dialogWrap.height($(window).height() - $dialogWrap.offset().top - $sendWrap.outerHeight() - bottom /2);
				$dialogFrame.height($(window).height() - $dialogFrame.offset().top - $sendWrap.outerHeight() - bottom / 2);
				$preFrame.height($(window).height() - $preFrame.offset().top - bottom / 2);
			}
		};

		const setTextareaListeners = () => {
			$textarea.on('input', function(e) {
				$(this).height(`${1}px`);
				$(this).height(`${this.scrollHeight}px`);
				showOrHideScroll();
			});

			$inputsWrap.on('DOMSubtreeModified input', function () {
				correctHeight();
			});

			if ($($inputsWrap)[0]) {
				baron({
					root: $($inputsWrap)[0],
					scroller: $($textareaFrameWrap)[0],
					bar: $($textareaScrollHandle)[0],
				});
			}
		};

		setTextareaListeners();

		$(window).resize(() => {
			correctHeight();
		});

		correctHeight();
		showOrHideScroll();

		messageHeight.init.correctHeight = correctHeight;
	}
};

export { messageHeight };
