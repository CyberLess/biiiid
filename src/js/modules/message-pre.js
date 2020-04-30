import { messageHeight } from "./message-height";
import { messagesScroll } from "./messages-scroll";
import { getMessages } from "./get-messages";

var messagePre = {
	closeMobile: () => {
		$('.messages-dialogs').hide();
		$('.messages-pre').show();
		messageHeight.init.correctHeight();
	},

	init: () => {
		// Писал логику для загрузки превьюшек по аяксу, но она оказалась вроде как не нужна
		// const MAX_SYMBOLS_QUANTITY = 94;
		// const IMG_SRC = '/app/img/';
		//
		// const preConditionsMap = {
		// 	'read': 'messages-pre__message_read',
		// 	'delivered': 'messages-pre__message_delivered',
		// 	'no-opened': 'messages-pre__message_unread',
		// 	'opened': 'messages-pre__message_opened',
		// 	'online': 'messages-pre__message_online'
		// };
		//
		// const $messagesList = $('.messages-pre__list');
		// const $messagePreTemplate = $('#message-pre').contents().find('.messages-pre__message');
		// const $authorImgJpg = $messagePreTemplate.find('.messages-pre__author-avatar');
		// const $authorImgWebp = $authorImgJpg.prev();
		// const $authorName = $messagePreTemplate.find('.messages-pre__author-name');
		// const $messageText = $messagePreTemplate.find('.messages-pre__prev-text');
		// const $noOpenedQuantity = $messagePreTemplate.find('.messages-pre__quantity');
		// const $date = $messagePreTemplate.find('.messages-pre__date');
		//
		// const setUserId = (userId) => {
		// 	$messagePreTemplate.attr('data-user-id', userId);
		// };
		//
		// const getNoOpenedMessagesQuantity = (messagesArr) => {
		// 	let result = 0;
		//
		// 	for (let i = messagesArr.length - 1; i >= 0; i -= 1) {
		// 		if (messagesArr[i]['messageAuthor'] === 'customer' && messagesArr[i]['status'] === 'no-opened') {
		// 			result += 1;
		// 		} else {
		// 			return result;
		// 		}
		// 	}
		//
		// 	return result;
		// };
		//
		// const setCondition = (authorLastVisit, messagesArr) => {
		// 	const lastMessage = messagesArr[messagesArr.length - 1];
		// 	const isLastMessageCustomer = lastMessage['messageAuthor'] === 'customer';
		//
		// 	if (isLastMessageCustomer) {
		// 		$messagePreTemplate.addClass(preConditionsMap[lastMessage['status']]);
		//
		// 		if (lastMessage['status'] === 'no-opened') {
		// 			const noOpenedQuantity = getNoOpenedMessagesQuantity(messagesArr);
		//
		// 			$noOpenedQuantity.text(noOpenedQuantity);
		// 		}
		// 	} else {
		// 		$messagePreTemplate.addClass(preConditionsMap[lastMessage['status']]);
		// 	}
		//
		// 	if (authorLastVisit === 'online') {
		// 		$messagePreTemplate.addClass(preConditionsMap['online'])
		// 	}
		// };
		//
		// const setAvatar = (avatarData) => {
		// 	$authorImgJpg.attr('src', `${IMG_SRC}${avatarData}.jpg`);
		// 	$authorImgWebp.attr('srcset', `${IMG_SRC}${avatarData}.webp`);
		// };
		//
		// const cropMessageText = (text) => {
		// 	if (text.length > MAX_SYMBOLS_QUANTITY) {
		// 		const result = text.substr(0, MAX_SYMBOLS_QUANTITY);
		//
		// 		return `${result}...`;
		// 	}
		//
		// 	return text;
		// };
		//
		// const setText = (authorNameData, textData) => {
		// 	$authorName.text(authorNameData);
		// 	$messageText.text(cropMessageText(textData));
		// };
		//
		// const getDate = (dateTime) => {
		// 	return dateTime.split('T')[0];
		// };
		//
		// const dateToText = (date) => {
		// 	const year = date.slice(0, 4);
		// 	const month = date.slice(5, 7);
		// 	const day = date.slice(8);
		//
		// 	return `${day}.${month}.${year}`;
		// };
		//
		// const setSendDate = (dateTime) => {
		// 	const date = getDate(dateTime);
		//
		// 	$date.attr('datetime', date);
		// 	$date.text(dateToText(date));
		// };
		//
		// const getPreItem = (userObject) => {
		// 	setUserId(userObject['userId']);
		// 	setCondition(userObject['lastVisitDate'], userObject['messages']);
		// 	setAvatar(userObject['avatar']);
		// 	setText(userObject['authorName'], userObject['messages'][userObject['messages'].length - 1]['text']);
		// 	setSendDate(userObject['messages'][userObject['messages'].length - 1]['sendDate']);
		// };

		// Начало тестового временного кода
		const $messagesPre = $('.messages-pre');
		const $message = $messagesPre.find('.messages-pre__message');
		const $link = $messagesPre.find('.messages-pre__dialog-link');
		const $dialog = $('.messages-dialogs');

		const isHidden = (id) => {
			const $dialog = $(`.messages-dialogs__content-wrap[data-user-id=${id}]`);

			return {
				isHidden: !$dialog,
				dialog: $dialog
			}
		};

		const openMobile = (id) => {
			$messagesPre.hide();
			$('.messages-dialogs').show();
			const hiddenDialog = isHidden(id);

			if (hiddenDialog.isHidden) {
				hiddenDialog.dialog.show();
			} else {
				getMessages.init.getDialog(id, getMessages.params);
			}

			// messageHeight.init.correctHeight();
			// messagesScroll.init.onDialogOpen();
		};

		const openDesktop = (id, currentItem) => {
			if (!currentItem.hasClass('messages-pre__message_opened')) {
				$message.removeClass('messages-pre__message_opened');
				currentItem.addClass('messages-pre__message_opened');

				const hiddenDialog = isHidden(id);

				if (hiddenDialog.isHidden) {
					hiddenDialog.dialog.show();
				} else {
					getMessages.init.getDialog(id, getMessages.params);
				}
			}
		};

		const openDialog = (evt) => {
			if ($(evt.target).hasClass('messages-pre__dialog-link')) {
				const userId = evt.target.getAttribute('data-user-id');

				if ($(window).width() < 920) {
					openMobile(Number(userId));
				} else {
					const $current = $(evt.target).parent();
					openDesktop(Number(userId), $current);
				}
			}
		};

		$link.click(function (evt) {
			evt.preventDefault();
			openDialog(evt);
		});

		$(window).resize(function () {
		  if ($(window).width() >= 920) {
				$dialog.css('display', '');
				$messagesPre.css('display', '');
			}
		});
		// Конец тестового временного кода
	}
};

export {messagePre};
