import { messageHeight } from "./message-height";
import { getMessages } from "./get-messages";
import { messageSend } from "./message-send";

var messagePre = {
	MAX_SYMBOLS_QUANTITY: 94,

	$dialogsBlock: $('.messages-dialogs'),
	$messagesPre: $('.messages-pre'),
	$message: () => {
		return messagePre.$messagesPre.find('.messages-pre__message');
	},

	cropMessageText: (text) => {
		if (text.length > messagePre.MAX_SYMBOLS_QUANTITY) {
			const result = text.substr(0, messagePre.MAX_SYMBOLS_QUANTITY);

			return `${result}`;
		}

		return text;
	},

	closeMobile: () => {
		messagePre.$dialogsBlock.hide();
		messagePre.$messagesPre.show();
		messageHeight.$send.addClass('send_no-active');
		messagePre.$dialogsBlock.css('opacity', '0');
		messageHeight.correctHeight();
	},

	openMobile: (id) => {
		messagePre.$messagesPre.hide();
		messagePre.$dialogsBlock.show();

		getMessages.getDialog(id, getMessages.params);
	},

	openDesktop: (id, currentItem, $message) => {
		if (!currentItem.hasClass('messages-pre__message_opened')) {
			$message.removeClass('messages-pre__message_opened');
			currentItem.addClass('messages-pre__message_opened');
			getMessages.getDialog(id, getMessages.params);
		}
	},

	openDialog: (evt) => {

		if ($(evt.target).hasClass('messages-pre__dialog-link')) {
			const userId = evt.target.getAttribute('data-user-id');
			const $parent = $(evt.target).parent();

			if ($parent.hasClass('messages-pre__message')) {
				$parent.removeClass('messages-pre__message_unread');
			}

			if ($(window).width() < messageHeight.MEDIUM_MOBILE) {
				messagePre.openMobile(Number(userId));
			} else {
				const $current = $(evt.target).parent();
				messagePre.openDesktop(Number(userId), $current, messagePre.$message());
			}
		}
	},

	init: () => {
		// Писал логику для загрузки превьюшек по аяксу, но она оказалась вроде как не нужна
		//
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

		const $link = messagePre.$messagesPre.find('.messages-pre__dialog-link');

		$link.click(function (evt) {
			evt.preventDefault();
			messagePre.openDialog(evt);
			messageSend.cleanTextarea();
		});

		$(window).resize(function () {
		  if ($(window).width() >= messageHeight.MEDIUM_MOBILE) {
				messagePre.$dialogsBlock.css({
					display: '',
					opacity: ''
				});
				messagePre.$messagesPre.css('display', '');
			}
		});

	}
};

export {messagePre};
