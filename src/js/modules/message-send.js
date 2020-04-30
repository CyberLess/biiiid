import baron from 'baron';

var messageSend = {
	init: () => {
		const NORMAL_TEXTAREA_HEIGHT = 60;
		const DIALOG_WRAP_NORMAL_HEIGHT = '53.2vh';
		const DIALOG_FRAME_NORMAL_HEIGHT = '53.2vh';

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

		const viewportToPixels = (value) => {
			const parts = value.match(/([0-9\.]+)(vh|vw)/);
			const q = Number(parts[1]);
			const side = window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]];

			return side * (q/100);
		};

		let lastTextWrapHeight = NORMAL_TEXTAREA_HEIGHT;

		const regularMessagesAreaHeight = () => {
			if (lastTextWrapHeight !== $($inputsWrap)[0].offsetHeight) {
				const difference = $($inputsWrap)[0].offsetHeight - NORMAL_TEXTAREA_HEIGHT;

				$dialogWrap.height(viewportToPixels(DIALOG_WRAP_NORMAL_HEIGHT) - difference);

				$dialogFrame.height(viewportToPixels(DIALOG_FRAME_NORMAL_HEIGHT) - difference);

				lastTextWrapHeight = $($inputsWrap)[0].offsetHeight;
			} else if (lastTextWrapHeight === NORMAL_TEXTAREA_HEIGHT) {
				$dialogWrap.css('height', '');
				$dialogFrame.css('height', '');
			}
		};

		$textarea.on('input', function(e) {
			$(this).height(`${1}px`);
			$(this).height(`${this.scrollHeight}px`);
			showOrHideScroll();
		});

		$inputsWrap.on('DOMSubtreeModified input', function () {
			regularMessagesAreaHeight();
		});

		$(window).resize(() => {
			regularMessagesAreaHeight();
		});

		baron({
			root: $($inputsWrap)[0],
			scroller: $($textareaFrameWrap)[0],
			bar: $($textareaScrollHandle)[0],
		});

		showOrHideScroll();
	}
};

export { messageSend };
