import { setDialogContent } from "./set-dialog-content";
import { messageHeight } from "./message-height";
import { messagesScroll } from "./messages-scroll";
import { player } from "./player";
import { messagePre } from "./message-pre";
import { setDialogHeader } from "./set-dialog-header";
import {messageVideo} from "./message-video";

var getMessages = {
	$emptyTemplate: $('#empty').contents('.messages-dialogs').find('.messages-dialogs__content-wrap'),

	params: {
		ID_TO_URL: {
			1: 'https://b-612.github.io/json/biiiid/user-id-.json',
			2: 'https://b-612.github.io/json/biiiid/user-id-2.json',
			3: 'https://b-612.github.io/json/biiiid/user-id-3.json',
			4: 'https://b-612.github.io/json/biiiid/user-id-4.json',
			5: 'https://b-612.github.io/json/biiiid/user-id-5.json',
		}
	},

	preloader: `<img class="messages__preloader" src="/app/img/preload.svg" alt="Загрузка...">`,

	debugSvgInDialog: () => {
		const $svgElems = setDialogHeader.$dialogWrap.find('svg');

		for (let i = 0; i < $svgElems.length; i += 1) {
			const $svgWrap = $($svgElems[i]).parent();
			const $svgCopy = $svgWrap.html();

			$svgWrap.html('');
			$svgWrap.html(`${$svgCopy}`);
		}
	},

	onError: () => {
		const openedId = Number($('.messages-pre__message_opened').find('.messages-pre__dialog-link').attr('data-user-id'));
		const $messagesEmpty = $('.messages-dialogs__empty');

		$messagesEmpty.html(
			`<span class="messages-dialogs__error">Что-то пошло не так... Ошибка ответа сервера.</span><button class="messages-dialogs__try-again p" type="button">Попробовать ещё раз</button>`
		);

		if ($(window).width() < 920) {
			const backBtn = `<button class="messages-dialogs__back p" type="button">Вернуться к диалогам</button>`;
			$messagesEmpty.append($(backBtn));
			$('.messages-dialogs__back').click(messagePre.closeMobile);
		}

		$('.messages-dialogs__try-again').click(() => {
			getMessages.getDialog(openedId, getMessages.params);
		});

		$('.messages-dialogs').css('opacity', '1');
		$('.messages__preloader').remove();
		$('.send').css('opacity', '0');
	},

	getDialog: (id, params) => {
		$.ajax(params.ID_TO_URL[id], {
			success: (resp) => {
				setDialogContent.init.pushMessagesOnPage(resp);
				$('.send').css('opacity', '1');
			},

			beforeSend: () => {
				if ($(window).width() < 920) {
					$('body').append(getMessages.preloader);
				}
			},

			complete: (resp, result) => {
				if (result === 'success') {
					messageHeight.init();
					messagesScroll.init();
					player.init();
					messageVideo.init();
					getMessages.debugSvgInDialog();

					if ($(window).width() < 920) {
						const $dialogClose = $('.dialog-header__to-prevs-wrap');
						$dialogClose.click(function () {
							messagePre.closeMobile();
						});

						$('.messages__preloader').remove();
						messagePre.$dialogsBlock.css('opacity', '1');
					}
				}
			},

			error: () => {
				const $dialogWrap = $('.messages-dialogs__content-wrap');
				const emptyHtml = getMessages.$emptyTemplate.html();
				$dialogWrap.empty();
				$dialogWrap.html(emptyHtml);

				getMessages.onError();
			}
		})
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
	}
};

export { getMessages };
