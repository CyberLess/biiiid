import { newOrderMessages } from "./new-order-messages";
import { setDialogHeader } from "./set-dialog-header";
import { reviewSend } from "./review-send";

var reviewToReview = {
	SendParam: {
		URL: 'https://echo.htmlacademy.ru/',
		METHOD: 'POST',
		TIMEOUT: 5000
	},

	makeReviewToReview: (text) => {
		const dateNow = new Date();
		const dateTime = newOrderMessages.getDateTime(dateNow);

		const reviewTemplate = $(newOrderMessages.$reviewToReviewTemplate)[0].cloneNode(true);
		const $message = $(reviewTemplate);

		const $avatarImg = $message.find('.dialog__author-avatar');
		const $avatarWebp = $avatarImg.prev();
		const $authorName = $message.find('.dialog__author-name');
		const $time = $message.find('.dialog__time');
		const $timeWrap = $time.find('.dialog__time-wrap');
		const $text = $message.find('.dialog__text-wrap');

		setDialogHeader.setAvatar('avatar-me', $avatarImg, $avatarWebp);
		$authorName.text('Я').removeClass('dialog__author-name_user');
		$time.attr('datetime', reviewSend.dateToIso(dateNow));
		$timeWrap.text(`${dateTime.hours}:${dateTime.minutes}, ${dateTime.dayOfWeek} ${dateTime.dayOfMonth} ${dateTime.month} ${dateTime.year}`);
		$text.text(text);

		return $message;
	},

	appendReviewToReview: (targetBtn, $message) => {
		const $container = $(targetBtn).closest('.dialog__message').find('.dialog__message-text-wrap');
		const $form = $(targetBtn).closest('.answer-review-form');

		$form.remove();
		$container.append($message);
	},

	onFormSubmit: ($form, sendParam, btn) => {
		const formData = $form.serializeArray();

		$.ajax({
			url: sendParam.URL,
			method: sendParam.METHOD,
			timeout: sendParam.TIMEOUT,
			data: formData,
			dataType: 'html',

			success: () => {
				const messageText = formData[0].value;

				reviewToReview.appendReviewToReview(btn, reviewToReview.makeReviewToReview(messageText));
			},

			// error: () => {}
		});
	},

	init: () => {
		reviewToReview.init.$answerForm = $('.answer-review-form');
		reviewToReview.init.$submitBtn = reviewToReview.init.$answerForm.find('.answer-review-form__submit');

		reviewToReview.init.$submitBtn.click(function (evt) {
			evt.preventDefault();

			const text = reviewToReview.init.$answerForm.find('.answer-review-form__message-field').val();

			if (text.replace(/\s/g, '') !== '') {
				reviewToReview.onFormSubmit(
					reviewToReview.init.$answerForm,
					reviewToReview.SendParam,
					evt.target
					);
			}
		});
	}
};

export { reviewToReview };
