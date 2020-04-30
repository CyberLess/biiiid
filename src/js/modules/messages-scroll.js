import baron from 'baron';

var messagesScroll = {
	init: () => {
		const $messagesPrevWrap = $('.messages-pre__messages-list-wrap');
		const $framePrev = $messagesPrevWrap.find('.messages-pre__massages-frame');
		const $scrollBarPrev = $messagesPrevWrap.find('.messages-pre__scrollbar');
		const $scrollPrevHandle = $messagesPrevWrap.find('.messages-pre__handle');
		const $messagesPrev = $('.messages-pre__list');

		const $dialogWrap =  $('.messages-dialogs__dialog-wrap');
		const $frameDialog = $dialogWrap.find('.messages-dialogs__dialog-frame');
		const $scrollBarDialog = $dialogWrap.find('.messages-dialogs__scrollbar');
		const $scrollBarHandle = $dialogWrap.find('.messages-dialogs__handle');
		const $dialog = $dialogWrap.find('.dialog');

		const isMobile = {
			Android: function () {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function () {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function () {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function () {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function () {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function () {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
		};

		const showHideScrollbar = (messagesList, messagesFrame, scrollBar) => {
			if (messagesList.height() <= messagesFrame.height() || isMobile.any()) {
				scrollBar.hide();
			} else {
				scrollBar.show();
			}
		};

		const onDialogOpen = () => {
			if ($($frameDialog)[0]) {
				$($frameDialog)[0].scrollTop = $($frameDialog)[0].scrollHeight;
			}
		};

		baron({
			root: $($messagesPrevWrap)[0],
			scroller: $($framePrev)[0],
			bar: $($scrollPrevHandle)[0],
		});

		if ($($dialogWrap)[0]) {
			baron({
				root: $($dialogWrap)[0],
				scroller: $($frameDialog)[0],
				bar: $($scrollBarHandle)[0],
			});
		}

		$messagesPrev.on('DOMSubtreeModified', function () {
			showHideScrollbar($messagesPrev, $framePrev, $scrollBarPrev);
		});

		$frameDialog.on('DOMSubtreeModified', function () {
			showHideScrollbar($dialog, $frameDialog, $scrollBarDialog);
		});

		$(window).resize(() => {
			if ($($framePrev)[0] && $($frameDialog)[0]) {
				baron($($framePrev)[0]).update();
				baron($($frameDialog)[0]).update();
			}
			showHideScrollbar($messagesPrev, $framePrev, $scrollBarPrev);
			showHideScrollbar($dialog, $frameDialog, $scrollBarDialog);
		});

		showHideScrollbar($messagesPrev, $framePrev, $scrollBarPrev);
		showHideScrollbar($dialog, $frameDialog, $scrollBarDialog);
		onDialogOpen();

		messagesScroll.init.onDialogOpen = onDialogOpen;
	}
};

export { messagesScroll };
