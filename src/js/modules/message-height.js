import baron from "baron";

var messageHeight = {
	LARGE_MOBILE: 580,
	MEDIUM_MOBILE: 920,
	BOTTOM_MOBILE: 20,
	BOTTOM_MID_MOBILE: 40,
	BOTTOM_DESK: 120,
	AMENDMENT: 5,
	bottom: "",

	$send: "",
	$preFrame: "",
	$sendWrap: "",
	$inputsWrap: "",
	$dialogFrame: "",
	$dialogWrap: "",

	setBottom: () => {
		switch (true) {
			case $(window).width() <= messageHeight.LARGE_MOBILE:
				messageHeight.bottom = messageHeight.BOTTOM_MOBILE;
				break;
			case $(window).width() <= messageHeight.MEDIUM_MOBILE:
				messageHeight.bottom = messageHeight.BOTTOM_MID_MOBILE;
				break;
			default:
				messageHeight.bottom = messageHeight.BOTTOM_DESK;
		}
	},

	showOrHideScroll: ($textareaFrameWrap, $textareaScrollHandle) => {
		const $textareaFrame = messageHeight.$inputsWrap.find(
			".dialog-form__textarea-frame-wrap"
		);
		if ($textareaFrame.height() > $textareaFrameWrap.height()) {
			$textareaScrollHandle.css("opacity", "1");
		} else {
			$textareaScrollHandle.css("opacity", "0");
		}
	},

	showSend: () => {
		if (messageHeight.$send.hasClass("send_no-active")) {
			messageHeight.$send.removeClass("send_no-active");
		}
	},

	correctHeight: () => {
		messageHeight.setBottom();

		if ($(window).width() < messageHeight.MEDIUM_MOBILE) {
			if (
				$(messageHeight.$dialogWrap)[0] &&
				$(messageHeight.$dialogFrame)[0] &&
				$(messageHeight.$preFrame)[0] &&
				$(messageHeight.$sendWrap)[0]
			) {
				messageHeight.$dialogWrap.height(
					$(window).height() -
						messageHeight.$dialogWrap.offset().top -
						messageHeight.$sendWrap.outerHeight() -
						messageHeight.bottom
				);
				messageHeight.$dialogFrame.height(
					$(window).height() -
						messageHeight.$dialogFrame.offset().top -
						messageHeight.$sendWrap.outerHeight() -
						messageHeight.bottom - messageHeight.AMENDMENT
				);

				messageHeight.showSend();
			}

			if ($(messageHeight.$preFrame)[0]) {
				messageHeight.$preFrame.height(
					$(window).height() - messageHeight.$preFrame.offset().top
				);
			}
		} else {
			if (
				$(messageHeight.$dialogWrap)[0] &&
				$(messageHeight.$dialogFrame)[0] &&
				$(messageHeight.$preFrame)[0] &&
				$(messageHeight.$sendWrap)[0]
			) {
				messageHeight.$dialogWrap.height(
					$(window).height() -
						messageHeight.$dialogWrap.offset().top -
						messageHeight.$sendWrap.outerHeight() -
						messageHeight.bottom / 2
				);
				messageHeight.$dialogFrame.height(
					$(window).height() -
						messageHeight.$dialogFrame.offset().top -
						messageHeight.$sendWrap.outerHeight() -
						messageHeight.bottom / 2
				);

				messageHeight.showSend();
			}

			if ($(messageHeight.$preFrame)[0]) {
				messageHeight.$preFrame.height(
					$(window).height() -
					messageHeight.$preFrame.offset().top -
					messageHeight.bottom / 2 +
					26
				);
			}
		}
	},

	setTextareaListeners: (
		$textarea,
		$textareaFrameWrap,
		$textareaScrollHandle
	) => {
		if (!$textarea || !$textareaFrameWrap || !$textareaScrollHandle) {
			return false;
		}

		$textarea.on("input", function (e) {
			$(this).height(`${1}px`);
			$(this).height(`${this.scrollHeight}px`);
			messageHeight.showOrHideScroll(
				$textareaFrameWrap,
				$textareaScrollHandle
			);
		});

		messageHeight.$inputsWrap.on("DOMSubtreeModified input", function () {
			messageHeight.correctHeight();
		});

		if ($(messageHeight.$inputsWrap)[0]) {
			baron({
				root: $(messageHeight.$inputsWrap)[0],
				scroller: $($textareaFrameWrap)[0],
				bar: $($textareaScrollHandle)[0],
			});
		}
	},

	init: () => {
		messageHeight.$send = $(".send");
		messageHeight.$preFrame = $(".messages-pre__massages-frame");
		messageHeight.$sendWrap = $(".messages-dialogs__send-wrap");
		messageHeight.$inputsWrap = $(".dialog-form__inputs-wrap");
		messageHeight.$dialogFrame = $(".messages-dialogs__dialog-frame");
		messageHeight.$dialogWrap = $(".messages-dialogs__dialog-wrap");

		const $textarea = messageHeight.$inputsWrap.find(
			"textarea.dialog-form__message-text"
		);
		const $textareaFrameWrap = messageHeight.$inputsWrap.find(
			".dialog-form__textarea-wrap"
		);
		const $textareaScrollHandle = messageHeight.$inputsWrap.find(
			".dialog-form__textarea-scroll-handle"
		);

		messageHeight.setTextareaListeners(
			$textarea,
			$textareaFrameWrap,
			$textareaScrollHandle
		);
		messageHeight.correctHeight();
		messageHeight.showOrHideScroll(
			$textareaFrameWrap,
			$textareaScrollHandle
		);

		$(window).resize(() => {
			messageHeight.correctHeight();
		});
	},
};

export { messageHeight };
