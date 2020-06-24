import { newOrderMessages } from "./new-order-messages";

var reviewSend = {
	messageData: {
		stars: '',
		text: '',
		portfolio: ''
	},

	SendParam: {
		URL: 'https://echo.htmlacademy.ru/',
		METHOD: 'POST',
		TIMEOUT: 5000
	},

	pad: (number) => {
		if (number < 10) {
			return '0' + number;
		}

		return number;
	},

	transformHours: (hours) => {
		if (hours > 23) {
			return hours - 24;
		}

		return hours;
	},

	dateToIso: (date) => {
		const timezoneDifferenceHours = date.getTimezoneOffset() / 60;
		const difference = Math.sign(timezoneDifferenceHours) > 0 ? -timezoneDifferenceHours : Math.abs(timezoneDifferenceHours);

		return `${date.getUTCFullYear()}-${reviewSend.pad(date.getUTCMonth() + 1)}-${reviewSend.pad(date.getUTCDate())}T${reviewSend.pad(reviewSend.transformHours(date.getUTCHours() + difference))}:${reviewSend.pad(date.getUTCMinutes())}`;
	},

	makeReviewMessage: (text, rating, portfolio) => {
		const dateNow = new Date();
		const dateTime = newOrderMessages.getDateTime(dateNow);

		const myMessageRatingTemplate = $(newOrderMessages.$myMessageRatingTemplate)[0].cloneNode(true);
		const $time = $(myMessageRatingTemplate).find('.dialog__time');
		const $timeWrap = $time.find('.dialog__time-wrap');
		const $date = $time.find('.dialog__date-wrap');
		const $text = $(myMessageRatingTemplate).find('.dialog__text-wrap');
		const $stars = $(myMessageRatingTemplate).find('.stars__item');
		const $portfolioResolution = $(myMessageRatingTemplate).find('.dialog__portfolio-resolution');

		$time.attr('datetime', reviewSend.dateToIso(dateNow));
		$timeWrap.text(`${dateTime.hours}:${dateTime.minutes}`);
		$date.text(`${dateTime.dayOfWeek} ${dateTime.dayOfMonth} ${dateTime.month} ${dateTime.year}`);
		$text.text(text);

		for (let i = 0; i < Number(rating); i += 1) {
			$($stars[i]).addClass('stars__item_active');
		}

		if (portfolio === '') {
			$portfolioResolution.hide();
		}

		return myMessageRatingTemplate;
	},

	appendReview: (reviewMessage) => {
		const $messagesContainer = $('.new-order-messages__dialogs .dialog');
		const $reviewFormContainer = $messagesContainer.find('.dialog__review-wrap');
		const $completeNotific = $messagesContainer.find('.dialog__message_complete-notific');

		$reviewFormContainer.remove();
		$completeNotific.before($(reviewMessage));
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
				reviewSend.messageData.stars = '';
				reviewSend.messageData.text = '';
				reviewSend.messageData.portfolio = '';

				formData.forEach((current) => {
					switch (current['name']) {
						case 'rating':
							reviewSend.messageData.stars = current['value'];
							break;
						case 'comment':
							reviewSend.messageData.text = current['value'];
							break;
						case 'portfolio':
							reviewSend.messageData.portfolio = current['value'];
					}
				});

				reviewSend.appendReview(reviewSend.makeReviewMessage(
					reviewSend.messageData.text,
					reviewSend.messageData.stars,
					reviewSend.messageData.portfolio
				));
			},

			// error: sendParams.ON_ERROR
		});
	},

	init: () => {
		reviewSend.init.$reviewForm = $('.rating-form');

		reviewSend.init.$reviewForm.on('submit', function (evt) {
			evt.preventDefault();

			const $starInputs = reviewSend.init.$reviewForm.find('.rating-form__star-input:checked');

			if ($starInputs.length > 0) {
				reviewSend.onFormSubmit($(this), reviewSend.SendParam);
			}
		});
	}
};

export { reviewSend };
