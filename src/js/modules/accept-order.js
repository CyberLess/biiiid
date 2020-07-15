import { newOrderMessages } from "./new-order-messages";
import { reviewSend } from "./review-send";
import { reviewToReview } from "./review-to-review";
import { setDialogContent } from "./set-dialog-content";
import { messageSend } from "./message-send";
import {player} from "./player";
import {messageVideo} from "./message-video";

var acceptOrder = {
	SendParam: {
		URL: 'https://echo.htmlacademy.ru/',
		METHOD: 'POST',
		TIMEOUT: 5000
	},

	$acceptStatus: $('#order-conclusion').contents().find('.dialog__message_order-conclusion'),
	$debugStatus: $('#order-debug').contents().find('.dialog__message_order-debug'),
	$feedbackStatus: $('#order-feedback').contents().find('.dialog__message_order-feedback'),
	$debugMessageTemplate: $('#my-message').contents().find('.dialog__message'),

	makeStatusMessage: ($statusTemplate) => {
		const dateNow = new Date();
		const dateTime = newOrderMessages.getDateTime(dateNow);

		const status = $($statusTemplate)[0].cloneNode(true);
		const $statusMessage = $(status);

		const $timeElem = $statusMessage.find('.dialog__time');
		const $dateWrapDesktop = $statusMessage.find('.dialog__date-wrap_desktop');
		const $dateWrapMobile = $statusMessage.find('.dialog__date-wrap_mobile');
		const $timeDesktop = $dateWrapDesktop.find('.dialog__time-wrap').eq(0);
		const $timeMobile = $dateWrapMobile.find('.dialog__time-wrap').eq(0);

		$timeElem.attr('datetime', reviewSend.dateToIso(dateNow));
		$timeDesktop.text(`${dateTime.hours}:${dateTime.minutes}`);
		$timeMobile.text(`${dateTime.hours}:${dateTime.minutes}`);
		$dateWrapDesktop.text(`${dateTime.dayOfWeek} ${dateTime.dayOfMonth} ${dateTime.month} ${dateTime.year}, `).append($timeDesktop);
		$dateWrapMobile.text(`${dateTime.dayOfMonth}.${dateTime.monthNumber}.${dateTime.year},`).append($timeMobile);

		return $statusMessage;
	},

	appendStatusMessage: ($messagesContainer, $statusTemplate) => {
		const $statusMessage = acceptOrder.makeStatusMessage($statusTemplate);

		$messagesContainer.append($statusMessage);
	},

	makeDebugMessage: (text, filesLength) => {
		const dateNow = new Date();
		const dateTime = newOrderMessages.getDateTime(dateNow);

		const myMessageDebug = $(acceptOrder.$debugMessageTemplate)[0].cloneNode(true);
		const $time = $(myMessageDebug).find('.dialog__time');
		const $text = $(myMessageDebug).find('.dialog__text-wrap');

		$time.attr('datetime', reviewSend.dateToIso(dateNow)).text(`${dateTime.hours}:${dateTime.minutes}, ${dateTime.dayOfWeek} ${dateTime.dayOfMonth} ${dateTime.month} ${dateTime.year}`);
		$text.text(text);
		$(myMessageDebug).find('.dialog__icons-wrap').remove();

		if (filesLength > 0) {
			const filesArray = messageSend.createFilesArray('.accept-order-popup__btns-wrap');

			setDialogContent.makeAttachedFiles(filesArray, $(myMessageDebug).find('.dialog__text-wrap'));
			setDialogContent.makeVideo(filesArray, $(myMessageDebug).find('.dialog__text-wrap'));
		}

		return myMessageDebug;
	},

	appendDebugMessage: ($messagesContainer, text, filesLength) => {
		$($messagesContainer)[0].appendChild(acceptOrder.makeDebugMessage(text, filesLength));
	},

	appendFeedback: ($messagesContainer, $template) => {
		const feedbackTempl = $($template)[0].cloneNode(true);
		const $feedback = $(feedbackTempl);

		$messagesContainer.append($feedback);
		$($messagesContainer)[0].appendChild($(newOrderMessages.$completeNotific)[0]);
		$('.new-order-messages__send-wrap').hide();
		$('.sticky-order__additional-action').hide();
		// $('.sticky-order__btn').show();
		$('.sticky-order__info_status').removeClass('sticky-order__info_status-work').addClass('sticky-order__info_status-completed').text('Завершен');
		reviewSend.init();
		reviewToReview.init();
	},

	onOrderAccept: (params) => {
		const formData = params.$form.serializeArray();

		$.ajax({
			url: params.sendParam.URL,
			method: params.sendParam.METHOD,
			timeout: params.sendParam.TIMEOUT,
			data: formData,
			dataType: 'html',

			success: () => {
				params.$closeBtn.trigger('click');
				params.$orderBtns.remove();
				acceptOrder.appendStatusMessage(params.$messagesContainer, params.$statusTemplate);

				if (params.$feedback) {
					acceptOrder.appendFeedback(params.$messagesContainer, params.$feedback);
				}

				if (params.$statusTemplate.hasClass('dialog__message_order-debug')) {
					acceptOrder.appendDebugMessage(params.$messagesContainer, formData['0'].value, params.filesLength);
					player.init();
					messageVideo.init();
				}
			},

			// error: () => {}
		});
	},

	init: () => {
		acceptOrder.$formAccept = $('.accept-order-popup__btns-wrap_accept');
		acceptOrder.$formDebug = $('.accept-order-popup__btns-wrap_debug');
		acceptOrder.$closeBtn = $('.accept-order-popup__close-btn');
		acceptOrder.$submitBtn = $('.accept-order-popup__accept_accept');
		acceptOrder.$submitDebugBtn = $('.accept-order-popup__accept_debug');
		acceptOrder.$hiddenInput = $('.accept-order-popup__accept-field');
		acceptOrder.$orderBtnsWrap = $('.new-order-messages .dialog__buttons-wrap');
		acceptOrder.$messagesList = $('.new-order-messages__dialogs .dialog');

		acceptOrder.$submitBtn.click(function (evt) {
			evt.preventDefault();

			const params = {
				$form: acceptOrder.$formAccept,
				sendParam: acceptOrder.SendParam,
				$closeBtn: acceptOrder.$closeBtn,
				$orderBtns: acceptOrder.$orderBtnsWrap,
				$messagesContainer: acceptOrder.$messagesList,
				$statusTemplate: acceptOrder.$acceptStatus,
				$feedback: acceptOrder.$feedbackStatus,
				filesLength: 0
			};

			acceptOrder.$hiddenInput.val('accept');
			acceptOrder.onOrderAccept(params);
		});

		acceptOrder.$submitDebugBtn.click(function (evt) {
			evt.preventDefault();

			const $textarea = $(this).closest('.accept-order-popup__btns-wrap_debug').find('.accept-order-popup__accept-field');
			const params = {
				$form: acceptOrder.$formDebug,
				sendParam: acceptOrder.SendParam,
				$closeBtn: acceptOrder.$closeBtn,
				$orderBtns: acceptOrder.$orderBtnsWrap,
				$messagesContainer: acceptOrder.$messagesList,
				$statusTemplate: acceptOrder.$debugStatus,
				$feedback: false,
				filesLength: $('.dropzone__item.dz-complete').length
			};

			if ($textarea.val() !== '') {
				acceptOrder.onOrderAccept(params);
			} else {
				$textarea.css('border-color', 'red').on('input', function () {
					if ($textarea.val() === '') {
						$(this).css('border-color', 'red');
					} else {
						$(this).css('border-color', '');
					}
				});
			}
		})
	}
};

export { acceptOrder };
