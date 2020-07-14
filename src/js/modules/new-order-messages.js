import { setDialogContent } from "./set-dialog-content";
import { reviewSend } from "./review-send";
import { reviewToReview } from "./review-to-review";
import { acceptOrder } from "./accept-order";
import { player } from "./player";
import { messageVideo } from "./message-video";
import { getOrderDetails } from "./get-order-details";
import { newOrderTabSwitching } from "./new-order-tab-switching";

var newOrderMessages = {
	orderStatusToIdMap: {
		'orderCreate': 'order-created',
		'orderReady': 'order-ready',
		'orderDebug': 'order-debug',
		'orderBill': 'order-bill',
		'orderCancel': 'order-cancel',
		'orderConclusion': 'order-conclusion',
		'orderFeedback': 'order-feedback'
	},

	daysMap: {
		1: 'Пн.',
		2: 'Вт.',
		3: 'Ср.',
		4: 'Чт.',
		5: 'Пт.',
		6: 'Сб.',
		7: 'Вс.',
	},

	isOrderClose: ['orderCancel', 'orderConclusion', 'orderFeedback'],
	isReviewTextFieldHidden: false,
	$readyWrap: $('#files-wrap').contents().find('.dialog__order-complete-wrap'),

	setPerformerAndWorkStatus: (isPerformer, isInWork) => {
		if (isPerformer) {
			window.isPerformer = true;
		}

		if (isInWork) {
			window.isInWork = true;
		}
	},

	url: (path) => { // Это временная реализация url в виде метода. На самом деле это будет свойство с одним единственным адресом запроса
		newOrderMessages.url.pageUrlToAjaxUrl = {
			'/order-correspondence-client-create.html': 'https://b-612.github.io/json/biiiid/order-messages-create.json',
			'/order-correspondence-client-create-ready.html': 'https://b-612.github.io/json/biiiid/order-messages-create-ready.json',
			'/order-correspondence-client-cancel.html': 'https://b-612.github.io/json/biiiid/order-messages-cancel.json',
			'/order-correspondence-client-conclusion.html': 'https://b-612.github.io/json/biiiid/order-messages-conclusion.json',
			'/order-correspondence-client-conclusion-1.html': 'https://b-612.github.io/json/biiiid/order-messages-conclusion-rewiew-not-answered.json',

			'/perf-order-correspondence-client-not-accept.html': 'https://b-612.github.io/json/biiiid/perf-order-not-work.json',
			'/perf-order-correspondence-client-create.html': 'https://b-612.github.io/json/biiiid/perf-order-messages-create.json',
			'/perf-order-correspondence-client-create-ready.html': 'https://b-612.github.io/json/biiiid/perf-order-messages-create-ready.json',
			'/perf-order-correspondence-client-cancel.html': 'https://b-612.github.io/json/biiiid/perf-order-messages-cancel.json',
			'/perf-order-correspondence-client-conclusion.html': 'https://b-612.github.io/json/biiiid/perf-order-messages-conclusion.json',
			'/perf-order-correspondence-client-conclusion-1.html': 'https://b-612.github.io/json/biiiid/perf-order-messages-conclusion-rewiew-not-answered.json',
		};

		return newOrderMessages.url.pageUrlToAjaxUrl[path];
	},

	fragment: document.createDocumentFragment(),
	$dialogList: $('.new-order-messages__dialogs .messages-dialogs__dialog-list'),
	$completeNotific: $('#complete-notific').contents().find('.dialog__message_complete-notific'),
	$myMessageRatingTemplate: $('#review-message-my').contents().find('.dialog__message'),
	$userMessageRatingTemplate: $('#review-message-user').contents().find('.dialog__message'),
	$reviewToReviewTemplate: $('#review-to-review').contents().find('.dialog__answer-to-review'),

	getDateTime: (date) => {
		const timeStamp = Date.parse(date);
		const currentDate = new Date(timeStamp);

		return {
			dayOfWeek: newOrderMessages.daysMap[currentDate.getDay()],
			dayOfMonth: currentDate.getDate(),
			month: setDialogContent.dateToTextMap[currentDate.getMonth() + 1],
			monthNumber: currentDate.getMonth() + 1 > 9 ?
				`${currentDate.getMonth() + 1}`:
				`0${currentDate.getMonth() + 1}`,
			year: currentDate.getUTCFullYear(),
			hours: currentDate.getHours(),
			minutes: currentDate.getMinutes() > 9 ?
				`${currentDate.getMinutes()}`:`0${currentDate.getMinutes()}`
		}
	},

	setOrderDate: ($orderElem, date) => {
		const dateTime = newOrderMessages.getDateTime(date);

		const $timeElem = $orderElem.find('.dialog__time');
		const $dateDesktop = $orderElem.find('.dialog__date-wrap_desktop');
		const $dateMobile = $orderElem.find('.dialog__date-wrap_mobile');
		const $timeDesktop = $dateDesktop.find('.dialog__time-wrap').eq(0);
		const $timeMobile = $dateMobile.find('.dialog__time-wrap').eq(0);

		$timeElem.attr('datetime', date);
		$timeDesktop.text(`${dateTime.hours}:${dateTime.minutes}`);
		$timeMobile.text(`${dateTime.hours}:${dateTime.minutes}`);
		$dateDesktop.text(`${dateTime.dayOfWeek} ${dateTime.dayOfMonth} ${dateTime.month} ${dateTime.year}, `).append($timeDesktop);
		$dateMobile.text(`${dateTime.dayOfMonth}.${dateTime.monthNumber}.${dateTime.year},`).append($timeMobile);
	},

	setMessageDate: ($messageTemplate, date) => {
		const dateTime = newOrderMessages.getDateTime(date);

		const $timeElem = $messageTemplate.find('.dialog__time');
		const time = document.createElement('span');
		const dateElem = document.createElement('span');

		$(time).addClass('dialog__time-wrap');
		$(dateElem).addClass('dialog__date-wrap');

		$timeElem.attr('datetime', date).text('');
		$(time).text(`${dateTime.hours}:${dateTime.minutes},`);
		$(dateElem).text(`${dateTime.dayOfWeek} ${dateTime.dayOfMonth} ${dateTime.month} ${dateTime.year}`);
		$timeElem.append($(time)).append($(dateElem));
	},

	setStatusInOrderInfo: (orderType) => {
		if (window.isPerformer) {
			$('.sticky-order__additional-action').remove();
		} else {
			$('.send__bill').remove()
		}

		if (window.isPerformer && window.isInWork) {
			$('.sticky-order__btn_upload').show();
		}

		if (orderType === 'orderConclusion' || orderType === 'orderCancel') {
			const $statusElem = $('.sticky-order__info_status');
			const $additionalAction = $('.sticky-order__additional-action');

			$statusElem.removeClass('sticky-order__info_status-work')
				.addClass('sticky-order__info_status-completed');
			$additionalAction.hide();

			if (!window.isPerformer && !window.isInWork) {
				$('.sticky-order__btn_repeat').show();
			} else {
				$('.sticky-order__btn').hide();
			}

			if (orderType === 'orderConclusion') {
				$statusElem.text('Завершен');
			} else if (orderType === 'orderCancel') {
				$statusElem.text('Отменен');
			}
		}

		if (window.isPerformer && !window.isInWork && (orderType !== 'orderConclusion' && orderType !== 'orderCancel' && orderType !== 'orderFeedback')) {
			$('.sticky-order__btn_accept').show();
		}
	},

	setOrderStatus: (orderType, orderDate, fragment) => {
		const $statusTemplate = $(`#${newOrderMessages.orderStatusToIdMap[orderType]}`);
		const $statusMessage = $statusTemplate.contents().find('.dialog__message_order');
		const $notific = $statusMessage.find('.dialog__order-notific');
		const $textWrap = $statusMessage.find('.dialog__text-wrap');

		switch (true) {
			case window.isPerformer && orderType === 'orderCreate':
				const link = document.createElement('a');
				const $link = $(link);

				$link.attr('href', '#').addClass('dialog__status-details-link').text('Ознакомьтесь с деталями заказа');

				$notific.text('Вы получили новый заказ');
				$textWrap.empty().append($link);
				break;
			case window.isPerformer && orderType === 'orderCancel':
				$textWrap.text('Заказчик отменил заказ');
				break;
			case window.isPerformer && orderType === 'orderReady':
				$notific.text('Вы отправили заказ');
				$textWrap.text('Если заказчик не примет файл в течение трех дней, заказ автоматически завершится и вы получите за него оплату на свой счет.');
				break;
			case window.isPerformer && orderType === 'orderDebug':
				$notific.text('Заказчик отправил файл на доработку');
			}

		if (newOrderMessages.isOrderClose.includes(orderType) || orderType === 'orderDebug' || window.isPerformer) {
			window.isRemoveOrderBtns = true;
		}

		newOrderMessages.setOrderDate($statusMessage, orderDate);
		fragment.appendChild($($statusMessage)[0]);
	},

	appendFilesInReadyWrap: ($container) => {
		const readyTemplate = $(newOrderMessages.$readyWrap)[0].cloneNode(true);
		const $readyWrap = $(readyTemplate);
		const $appendContainer = $readyWrap.find('.dialog__complete-files-wrap');
		const $videoWrap = $container.find('.dialog__video-container');
		const $files = $container.find('.dialog__attached-file');

		$readyWrap.find('.dialog__buttons-wrap').remove();

		$files.each(function () {
			$($appendContainer)[0].appendChild($(this)[0]);
		});

		if ($($videoWrap)[0]) {
			$($appendContainer)[0].appendChild($($videoWrap)[0]);
		}

		$($container)[0].appendChild($($readyWrap)[0]);
	},

	makeMessage: (authorName, avatarData, messageData, messageTemplate) => {
		const $message = $($(messageTemplate)[0].cloneNode(true));
		const $avatarJpg = $message.find('.dialog__author-avatar');
		const $avatarWebp = $avatarJpg.prev();
		const $name = $message.find('.dialog__author-name');
		const $messageTextWrap = $message.find('.dialog__text-wrap');
		const $messageText = $message.find('.dialog__message-text');

		setDialogContent.setAuthorName(authorName, messageData['messageAuthor'], $name);
		newOrderMessages.setMessageDate($message, messageData['sendDate']);
		setDialogContent.setAvatar(messageData['messageAuthor'], avatarData, $avatarJpg, $avatarWebp);
		setDialogContent.setMessageText(messageData['text'], $messageTextWrap);

		if (messageData['files'].length > 0) {
			setDialogContent.makeAttachedFiles(messageData['files'], $messageTextWrap);
			setDialogContent.makeVideo(messageData['files'], $messageTextWrap);
		}

		if (messageData['type'] === 'inOrderReady') {
			newOrderMessages.appendFilesInReadyWrap($messageTextWrap);
		}

		if (messageData['bill']) {
			if (messageData['messageAuthor'] === 'me') {
				$messageText.append(setDialogContent.makeBill(messageData['bill'], setDialogContent.init.$myBillTemplate));
			} else {
				$messageText.append(setDialogContent.makeBill(messageData['bill'], setDialogContent.init.$userBillTemplate));
			}
		}

		return $message;
	},

	removeOrderBtns: ($fragment) => {
		if (window.isRemoveOrderBtns && $fragment.contents().find('.js-order-complete-btns').length > 0) {
			$fragment.contents().find('.js-order-complete-btns').remove();
		}
	},

	setMessagesInStatus: (usersMessages, $fragment, $myMessageTemplate, $userMessageTemplate) => {
		const currentMyMessageTemplate = $($myMessageTemplate)[0].cloneNode(true);
		const currentUserMessageTemplate = $($userMessageTemplate)[0].cloneNode(true);

		usersMessages['messages'].forEach((current) => {
			if (current['messageAuthor'] === 'customer') {
				const $message = newOrderMessages.makeMessage(usersMessages['authorName'], usersMessages['avatar'], current, $(currentUserMessageTemplate), true);

				$fragment.append($message);
			} else {
				const $message = newOrderMessages.makeMessage(usersMessages['authorName'], usersMessages['avatar'], current, $(currentMyMessageTemplate), true);

				$fragment.append($message);
			}
		});
	},

	setStars: ($messageTemplate, current) => {
		const $stars = $messageTemplate.find('.stars__item');

		for (let i = 0; i < $stars.length; i += 1) {
			if (i < Number(current['rating'])) {
				$($stars)[i].classList.add('stars__item_active');
			}
		}
	},

	setAnswerBtnListener: (fragment) => {
		const $answerBtn = $(fragment).find('.dialog__answer-btn');
		const $answerForm = $(fragment).find('.dialog__answer-review-form');

		$answerBtn.click(function () {
			$(this).hide();
			$answerForm.show();
		});
	},

	makeReviewToReview: (
		$revToRev,
		answerData,
		authorName,
		avatarData,
		messageAuthor
	) => {
		const currentTemplate = $($revToRev)[0].cloneNode(true);

		const $message = $(currentTemplate);
		const $name = $message.find('.dialog__author-name');
		const $avatarJpg = $message.find('.dialog__author-avatar');
		const $avatarWebp = $avatarJpg.prev();
		const $messageTextWrap = $message.find('.dialog__text-wrap');


		setDialogContent.setAuthorName(authorName, messageAuthor, $name);
		newOrderMessages.setMessageDate($message, answerData['date']);
		setDialogContent.setAvatar(messageAuthor, avatarData, $avatarJpg, $avatarWebp);
		setDialogContent.setMessageText(answerData['text'], $messageTextWrap);

		if (answerData['text']) {
			return $message;
		}

		return null;
	},

	appendReviewToReview: (
		$reviewMessage,
		$revToRev,
		answerData,
		authorName,
		avatarData,
		messageAuthor
	) => {
		if ($reviewMessage !== null) {
			const $textElem = $reviewMessage.find('.dialog__message-text');
			const $revToRevElem = newOrderMessages.makeReviewToReview($revToRev, answerData, authorName, avatarData, messageAuthor);

			if (messageAuthor === 'customer') {
				$revToRevElem.find('.dialog__author-name').addClass('dialog__author-name_user');
			}
			$textElem.append($revToRevElem);
		}
	},

	setPortfolioCheck: (portfolioData, $message, messageAuthor) => {
		const $portfolioCheck = $message.find('.dialog__portfolio-resolution');
		const $resolutionText = $portfolioCheck.find('.dialog__resolution-text');

		if (portfolioData !== 'on') {
			$portfolioCheck.hide();
		} else {
			if (messageAuthor === 'customer') {
				$resolutionText.text('Пользователь разрешил добавить в портфолио заказ');
			} else {
				$resolutionText.text('Вы разрешили добавить в портфолио заказ');
			}
		}
	},

	setReviewMessages: (
		usersMessages,
		$fragment,
		$myMessageRatingTemplate,
		$userMessageRatingTemplate
	) => {
		usersMessages['messages'].forEach((current) => {
			const currentMyMessageRatingTemplate = $($myMessageRatingTemplate)[0].cloneNode(true);
			const currentUserMessageRatingTemplate = $($userMessageRatingTemplate)[0].cloneNode(true);

			if (current['messageAuthor'] === 'customer') {
				const $message = newOrderMessages.makeMessage(usersMessages['authorName'],
					usersMessages['avatar'],
					current,
					$(currentUserMessageRatingTemplate)
				);

				newOrderMessages.setStars($message, current);
				newOrderMessages.setPortfolioCheck(current['portfolio'], $message, current['messageAuthor']);

				if (current['answer']) {
					newOrderMessages.appendReviewToReview(
						$message,
						newOrderMessages.$reviewToReviewTemplate,
						current['answer'],
						usersMessages['authorName'],
						usersMessages['avatar'],
						current['answer']['author']
					);
				}

				$fragment.append($message);

				newOrderMessages.setAnswerBtnListener(newOrderMessages.fragment);
			} else {
				newOrderMessages.isReviewTextFieldHidden = true;

				const $message = newOrderMessages.makeMessage(usersMessages['authorName'],
					usersMessages['avatar'],
					current,
					$(currentMyMessageRatingTemplate)
				);

				newOrderMessages.setStars($message, current);
				newOrderMessages.setPortfolioCheck(current['portfolio'], $message, current['messageAuthor']);

				if (current['answer']) {
					newOrderMessages.appendReviewToReview(
						$message,
						newOrderMessages.$reviewToReviewTemplate,
						current['answer'],
						usersMessages['authorName'],
						usersMessages['avatar'],
						current['answer']['author']
					);
				}

				$fragment.append($message);

				$(newOrderMessages.fragment).find('.dialog__review-wrap').addClass('hidden');
			}
		});
	},

	setStatusWithMessages: (order) => {
		newOrderMessages.setOrderStatus(order['orderType'], order['orderDate'], newOrderMessages.fragment);
		newOrderMessages.setStatusInOrderInfo(order['orderType']);

		if (order['orderType'] !== 'orderFeedback') {
			newOrderMessages.setMessagesInStatus(order['usersMessages'], $(newOrderMessages.fragment), setDialogContent.init.$myMessageTemplate, setDialogContent.init.$userMessageTemplate);

			newOrderMessages.removeOrderBtns($(newOrderMessages.fragment));
		} else {
			newOrderMessages.setReviewMessages(order['usersMessages'], $(newOrderMessages.fragment), newOrderMessages.$myMessageRatingTemplate, newOrderMessages.$userMessageRatingTemplate);
		}
	},

	stopChatting: (orderStatus, isOrderClose, statusArr, i) => {
		if (isOrderClose.includes(orderStatus) && !window.isChattingClosed) {
			if (i === statusArr.length - 1) {
				newOrderMessages.fragment.appendChild($(newOrderMessages.$completeNotific)[0]);
				window.isChattingClosed = true;
				$('.new-order-messages__send-wrap').hide();
			}
		}
	},

	setContent: (data) => {
		data.forEach((current, i) => {
			newOrderMessages.setStatusWithMessages(current);
			newOrderMessages.stopChatting(current['orderType'], newOrderMessages.isOrderClose, data, i);
		});

		newOrderMessages.$dialogList.append($(newOrderMessages.fragment));
	},

	getDialog: () => {
		$.ajax(newOrderMessages.url(window.location.pathname), {
			success: (resp) => {
				newOrderMessages.setPerformerAndWorkStatus(resp['performer'], resp['inWork']);
				newOrderMessages.setContent(resp['dialog']);
				getOrderDetails.makeOrderDetails(resp['orderDetails']);
			},

			complete: (resp, result) => {
				if (result === 'success') {
					reviewSend.init();
					reviewToReview.init();
					acceptOrder.init();
					player.init();
					messageVideo.init();
					newOrderTabSwitching.setOrderLinkListener();
				}
			}
		})
	},

	init: () => {
		window.isChattingClosed = false;
		window.isRemoveOrderBtns = false;
		newOrderMessages.getDialog();
	}
};

export { newOrderMessages };
