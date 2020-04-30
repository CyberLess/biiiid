import { setDialogContent } from "./set-dialog-content";
import { messageHeight } from "./message-height";
import { messagesScroll } from "./messages-scroll";
import { player } from "./player";
import { messagePre } from "./message-pre";

var getMessages = {
	params: {
		ID_TO_URL: {
			1: 'https://b-612.github.io/json/biiiid/user-id-1.json',
			2: 'https://b-612.github.io/json/biiiid/user-id-2.json',
			3: 'https://b-612.github.io/json/biiiid/user-id-3.json',
			4: 'https://b-612.github.io/json/biiiid/user-id-4.json',
			5: 'https://b-612.github.io/json/biiiid/user-id-5.json',
		}
	},

	init: () => {
		const requestParam = {
			GET_REQUEST: 'GET',
			GET_DATA_TYPE: 'json',

			POST_REQUEST: 'POST',

			REQUEST_TIMEOUT: 5000
		};

		$.ajaxSetup({
			method: requestParam.GET_REQUEST,
			timeout: requestParam.REQUEST_TIMEOUT,
			dataType: requestParam.GET_DATA_TYPE
		});

		const getDialog = (id, params) => {
			$.ajax(params.ID_TO_URL[id], {
				success: (resp) => {
					setDialogContent.init.pushMessagesOnPage(resp);
				},

				complete: (resp, result) => {
					if (result === 'success') {
						messageHeight.init();
						messagesScroll.init();
						player.init();

						if ($(window).width() < 920) {
							const $dialogClose = $('.dialog-header__to-prevs-wrap');
							$dialogClose.click(function () {
								messagePre.closeMobile();
							});
						}
					}
				},

				error: ''
			})
		};

		getMessages.init.getDialog = getDialog;
	}
};

export { getMessages };
