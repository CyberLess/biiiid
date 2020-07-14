import { newOrderMessages } from "./new-order-messages";
import { reviewSend } from "./review-send";
import { setDialogContent } from "./set-dialog-content";

var sendOrderFiles = {
	videoFormats: ['avi', 'mkv', 'mov', 'mp4', 'mpeg', 'mpg', 'mts'],

	SendParam: {
		URL: 'https://echo.htmlacademy.ru/',
		METHOD: 'POST',
		TIMEOUT: 5000
	},

	$form: $('.upload-order-files__btns-wrap'),
	$submitBtn: $('.upload-order-files__submit'),
	$closeBtn: $('.upload-order-files__close-btn'),
	$orderReadyTemplate: $('#order-ready').contents().find('.dialog__message').eq(0),
	$messageTemplate: $('#my-message').contents().find('.dialog__message').eq(0),
	$uploadBtn: $('.upload-order-files__upload-btn'),

	makeReadyStatus: () => {
		const dateNow = new Date();
		const dateTime = newOrderMessages.getDateTime(dateNow);

		const $statusMessage = sendOrderFiles.$orderReadyTemplate.clone();
		const $notific = $statusMessage.find('.dialog__order-notific');
		const $textWrap = $statusMessage.find('.dialog__text-wrap');
		const $time = $statusMessage.find('.dialog__time');
		const $timeWrap = $time.find('.dialog__time-wrap');
		const $date = $time.find('.dialog__date-wrap');

		$notific.text('Вы отправили заказ');
		$textWrap.text('Если заказчик не примет файл в течение трех дней, заказ автоматически завершится и вы получите за него оплату на свой счет.');
		$time.attr('datetime', reviewSend.dateToIso(dateNow));
		$timeWrap.text(`${dateTime.hours}:${dateTime.minutes}`);
		$date.text(`${dateTime.dayOfWeek} ${dateTime.dayOfMonth} ${dateTime.month} ${dateTime.year}`);

		return $statusMessage;
	},

	appendOrderReady: () => {
		const $messagesContainer = $('.new-order-messages__dialogs .dialog');
		const $btnUpload = $('.sticky-order__btn_upload');

		$messagesContainer.append(sendOrderFiles.makeReadyStatus());
		$btnUpload.hide();
	},

	makeMessage: (text, filesData) => {
		const dateNow = new Date();
		const dateTime = newOrderMessages.getDateTime(dateNow);

		const message = $(sendOrderFiles.$messageTemplate)[0].cloneNode(true);
		const $message = $(message);
		const $time = $message.find('.dialog__time');
		const $text = $message.find('.dialog__text-wrap');

		$time.attr('datetime', reviewSend.dateToIso(dateNow)).text(`${dateTime.hours}:${dateTime.minutes}, ${dateTime.dayOfWeek} ${dateTime.dayOfMonth} ${dateTime.month} ${dateTime.year}`);

		if (text) {
			$text.text(text);
		}

		setDialogContent.makeAttachedFiles(filesData, $text);
		setDialogContent.makeVideo(filesData, $text);
		newOrderMessages.appendFilesInReadyWrap($text);

		return $message;
	},

	appendReadyMessageAndFiles: (text) => {
		const $messagesContainer = $('.new-order-messages__dialogs .dialog');
		const filesData = sendOrderFiles.makeFilesData();
		const $message = sendOrderFiles.makeMessage(text, filesData);


		$messagesContainer.append($message);
	},

	makeFilesData: () => {
		const $fileItems = $('.upload-order-files .dropzone__area .dz-complete');
		const result = [];

		if ($fileItems.length > 0) {
			for (let i = 0; i < $fileItems.length; i += 1) {
				const dataObj = {};

				dataObj.name = $fileItems.eq(i).find('span[data-dz-name="data-dz-name"]').text();
				dataObj.prevImage = dataObj.name.replace(/\..+$/, '');
				dataObj.size = $fileItems.eq(i).find('span[data-dz-size]').text();
				dataObj.type = sendOrderFiles.videoFormats.includes(dataObj.name.split('.').pop()) ? 'video' : 'document';

				result.push(dataObj);
			}
		}

		return result;
	},

	onFormSubmit: ($form, sendParam) => {
		const formData = $form.serializeArray();

		$.ajax({
			url: sendParam.URL,
			method: sendParam.METHOD,
			timeout: sendParam.TIMEOUT,
			data: formData,
			dataType: 'html',

			success: () => {
				sendOrderFiles.$closeBtn.trigger('click');
				sendOrderFiles.appendOrderReady();
				sendOrderFiles.appendReadyMessageAndFiles(formData[0]['value']);
			},

			// error: sendParams.ON_ERROR
		});
	},

	init: () => {
		sendOrderFiles.$submitBtn.click(function (evt) {
			evt.preventDefault();

			const $fileItems = $('.dropzone__area .dz-complete');

			if ($fileItems.length > 0) {
				sendOrderFiles.onFormSubmit(sendOrderFiles.$form, sendOrderFiles.SendParam);
			} else {
				sendOrderFiles.$uploadBtn.addClass('upload-error');
			}
		});

		sendOrderFiles.$uploadBtn.click(function () {
			$(this).removeClass('upload-error');
		});
	}
};

export { sendOrderFiles };
