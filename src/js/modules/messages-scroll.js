import baron from "baron";

var messagesScroll = {
	$frameDialog: () => {
		return $(".messages-dialogs__dialog-wrap").find(
			".messages-dialogs__dialog-frame"
		);
	},

	showHideScrollbar: (messagesList, messagesFrame, scrollBar) => {
		if (messagesList.height() <= messagesFrame.height()) {
			scrollBar.hide();
		} else {
			scrollBar.show();
		}
	},

	onDialogOpen: () => {
		const $frameDialog = messagesScroll.$frameDialog();

		if ($($frameDialog)[0]) {
			$($frameDialog)[0].scrollTop = $($frameDialog)[0].scrollHeight;
		}
	},

	init: () => {
		messagesScroll.init.$messagesPrevWrap = $(
			".messages-pre__messages-list-wrap"
		);
		messagesScroll.init.$messagesPrev = $(".messages-pre__list");
		messagesScroll.init.$dialogWrap = $(".messages-dialogs__dialog-wrap");

		messagesScroll.init.$framePrev = messagesScroll.init.$messagesPrevWrap.find(
			".messages-pre__massages-frame"
		);
		messagesScroll.init.$scrollBarPrev = messagesScroll.init.$messagesPrevWrap.find(
			".messages-pre__scrollbar"
		);
		messagesScroll.init.$scrollPrevHandle = messagesScroll.init.$messagesPrevWrap.find(
			".messages-pre__handle"
		);

		messagesScroll.init.$frameDialog = messagesScroll.init.$dialogWrap.find(
			".messages-dialogs__dialog-frame"
		);
		messagesScroll.init.$scrollBarDialog = messagesScroll.init.$dialogWrap.find(
			".messages-dialogs__scrollbar"
		);
		messagesScroll.init.$scrollBarHandle = messagesScroll.init.$dialogWrap.find(
			".messages-dialogs__handle"
		);
		messagesScroll.init.$dialog = messagesScroll.init.$dialogWrap.find(
			".dialog"
		);

		// const isMobile = {
		// 	Android: function () {
		// 		return navigator.userAgent.match(/Android/i);
		// 	},
		// 	BlackBerry: function () {
		// 		return navigator.userAgent.match(/BlackBerry/i);
		// 	},
		// 	iOS: function () {
		// 		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		// 	},
		// 	Opera: function () {
		// 		return navigator.userAgent.match(/Opera Mini/i);
		// 	},
		// 	Windows: function () {
		// 		return navigator.userAgent.match(/IEMobile/i);
		// 	},
		// 	any: function () {
		// 		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		// 	}
		// };

		baron({
			root: $(messagesScroll.init.$messagesPrevWrap)[0],
			scroller: $(messagesScroll.init.$framePrev)[0],
			bar: $(messagesScroll.init.$scrollPrevHandle)[0],
		});

		if ($(messagesScroll.init.$dialogWrap)[0]) {
			baron({
				root: $(messagesScroll.init.$dialogWrap)[0],
				scroller: $(messagesScroll.init.$frameDialog)[0],
				bar: $(messagesScroll.init.$scrollBarHandle)[0],
			});
		}

		messagesScroll.init.$messagesPrev.on("DOMSubtreeModified", function () {
			messagesScroll.showHideScrollbar(
				messagesScroll.init.$messagesPrev,
				messagesScroll.init.$framePrev,
				messagesScroll.init.$scrollBarPrev
			);
		});

		messagesScroll.init.$frameDialog.on("DOMSubtreeModified", function () {
			messagesScroll.showHideScrollbar(
				messagesScroll.init.$dialog,
				messagesScroll.init.$frameDialog,
				messagesScroll.init.$scrollBarDialog
			);
		});

		$(window).resize(() => {
			if (
				$(messagesScroll.init.$framePrev)[0] &&
				$(messagesScroll.init.$frameDialog)[0]
			) {
				baron($(messagesScroll.init.$framePrev)[0]).update();
				baron($(messagesScroll.init.$frameDialog)[0]).update();
			}
			messagesScroll.showHideScrollbar(
				messagesScroll.init.$messagesPrev,
				messagesScroll.init.$framePrev,
				messagesScroll.init.$scrollBarPrev
			);
			messagesScroll.showHideScrollbar(
				messagesScroll.init.$dialog,
				messagesScroll.init.$frameDialog,
				messagesScroll.init.$scrollBarDialog
			);
		});

		messagesScroll.showHideScrollbar(
			messagesScroll.init.$messagesPrev,
			messagesScroll.init.$framePrev,
			messagesScroll.init.$scrollBarPrev
		);
		messagesScroll.showHideScrollbar(
			messagesScroll.init.$dialog,
			messagesScroll.init.$frameDialog,
			messagesScroll.init.$scrollBarDialog
		);

		messagesScroll.init.correctedScrollElems = [
			messagesScroll.init.$framePrev,
			messagesScroll.init.$framePrev,
		];

		messagesScroll.onDialogOpen();
	},
};

export { messagesScroll };
