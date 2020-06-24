import { setDialogHeader } from "./set-dialog-header";
import { newOrderMessages } from "./new-order-messages";

var setDialogContent = {
	FILE_SRC: '/app/media/',

	dateToTextMap: {
		1: 'янв.',
		2: 'фев.',
		3: 'мар.',
		4: 'апр.',
		5: 'мая',
		6: 'июня',
		7: 'июля',
		8: 'авг.',
		9: 'сен.',
		10: 'окт.',
		11: 'ноя.',
		12: 'дек'
	},

	setAuthorName: (authorName, messageAuthor, nameElement) => {
		if (messageAuthor === 'customer') {
			nameElement.text(authorName);
		} else {
			nameElement.text('Я');
		}
	},

	setAvatar: (messageAuthor, avatarData, avatarImg, avatarWebp) => {
		if (messageAuthor !== 'me') {
			setDialogHeader.setAvatar(avatarData, avatarImg, avatarWebp);
		} else {
			setDialogHeader.setAvatar('avatar-me', avatarImg, avatarWebp);
		}
	},

	setMessageText: (messageTextData, textElem) => {
		if (messageTextData) {
			textElem.html($.trim(messageTextData.replace(/\n/g, '<br>')));
		}
	},

	getMessageDateTime: (dateTime) => {
		const now = new Date();
		const parsedDateTime = Date.parse(dateTime);
		const messageDateTime = new Date(parsedDateTime);

		const nowDate = now.getDate();

		const messageMonth = messageDateTime.getMonth();
		const messageDate = messageDateTime.getDate();
		const messageHours = messageDateTime.getHours();
		const messageMinutes = messageDateTime.getMinutes() < 10 ?
			`0${messageDateTime.getMinutes()}` : messageDateTime.getMinutes();

		if (messageDate < nowDate) {
			return `${messageDate} ${setDialogContent.dateToTextMap[messageMonth]} ${messageHours}:${messageMinutes}`
		}

		return `${messageHours}:${messageMinutes}`;
	},

	setDateTime: (dateTimeData, timeElem) => {
		timeElem.attr('datetime', dateTimeData)
			.text(setDialogContent.getMessageDateTime(dateTimeData));
	},

	makeAttachedFiles: (filesDataArr, $messageElem) => {
		filesDataArr.forEach((current) => {
			if (current['type'] !== 'video') {
				const $attachedFile = setDialogContent.init.$attachedFileTemplate.clone();
				$attachedFile.attr('href', `${setDialogContent.FILE_SRC}${current['name']}`);
				$attachedFile.find('.dialog__attached-name').text(current['name']);
				$attachedFile.find('.dialog__attached-size-wrap').text(current['size']);

				$messageElem.append($attachedFile);
			}
		})
	},

	setMessageStatus: (messageData, messageTemplate) => {
		if (messageData['messageAuthor'] === 'me') {
			if (messageData['status'] === 'read') {
				messageTemplate.addClass('dialog__message_read');
			} else if (messageData['status'] === 'delivered') {
				messageTemplate.addClass('dialog__message_delivered');
			}
		} else {
			if (messageData['status'] === 'no-opened') {
				messageTemplate.addClass('dialog__message_no-opened');
			}
		}
	},

	makeVideo: (filesDataArr, $messageElem) => {
		const $container = setDialogContent.init.$videoContainerTemplate.clone();
		$container.empty();

		filesDataArr.forEach((current) => {
			if (current['type'] === 'video') {
				const $item = $($(setDialogContent.init.$videoItemTemplate)[0].cloneNode(true));
				const $player = $item.find('.dialog__player');
				const $playerJpg = $item.find('.player__preview');
				const $playerWebp = $playerJpg.prev();
				const $videoName = $item.find('.dialog__video-name');
				const $videoSize = $item.find('.dialog__video-size');
				const $downloadLink = $item.find('.dialog__video-download');

				$player.attr('data-file', `${setDialogContent.FILE_SRC}${current['name']}`);
				setDialogHeader.setAvatar(current['prevImage'], $playerJpg, $playerWebp);
				$videoName.text(current['name']);
				$videoSize.text(current['size']);
				$downloadLink.attr('href', `${setDialogContent.FILE_SRC}${current['name']}`);

				$container.append($item);
			}
		});

		if ($container.html().trim() !== '') {
			$messageElem.append($container);
		}
	},

	makeBill: (billData, billTemplate) => {
		const $billWrap = billTemplate.clone();
		const $billTitle = $billWrap.find('.dialog__table-cell_order-name');
		const $billTime = $billWrap.find('.dialog__table-cell_time');
		const $billPrice = $billWrap.find('.dialog__table-cell_price');

		$billTitle.text(billData['title']);
		$billTime.text(billData['time']);
		$billPrice.text(billData['price']);

		return $billWrap;
	},

	makeMessage: (authorName, avatarData, messageData, messageTemplate, isOrderChatting = false) => {
		const $message = $($(messageTemplate)[0].cloneNode(true));
		const $avatarJpg = $message.find('.dialog__author-avatar');
		const $avatarWebp = $avatarJpg.prev();
		const $name = $message.find('.dialog__author-name');
		const $sendTime = $message.find('.dialog__time');
		const $messageTextWrap = $message.find('.dialog__text-wrap');
		const $messageText = $message.find('.dialog__message-text');

		setDialogContent.setMessageStatus(messageData, $message);
		setDialogContent.setAuthorName(authorName, messageData['messageAuthor'], $name);
		if (!isOrderChatting) {
			setDialogContent.setDateTime(messageData['sendDate'], $sendTime);
		}
		setDialogContent.setAvatar(messageData['messageAuthor'], avatarData, $avatarJpg, $avatarWebp);
		setDialogContent.setMessageText(messageData['text'], $messageTextWrap);

		if (messageData['files'].length > 0) {
			setDialogContent.makeAttachedFiles(messageData['files'], $messageTextWrap);
			setDialogContent.makeVideo(messageData['files'], $messageTextWrap);
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

	makeMessages: (authorName, avatarData, messagesDataArr, dialogList) => {
		dialogList.empty();

		messagesDataArr.forEach((current) => {
			if (current['messageAuthor'] === 'customer') {
				dialogList.append(setDialogContent.makeMessage(authorName, avatarData, current, setDialogContent.init.$userMessageTemplate));
			} else {
				dialogList.append(setDialogContent.makeMessage(authorName, avatarData, current, setDialogContent.init.$myMessageTemplate));
			}
		});
	},

	pushMessagesOnPage: (data) => {
		const fragmentWithHeader = setDialogHeader.setHeader(
			data['avatar'],
			data['authorName'],
			data['lastVisitDate'],
			data['userTime']
		);
		const $dialogList = $(fragmentWithHeader).find('.dialog');

		setDialogContent.makeMessages(
			data['authorName'],
			data['avatar'],
			data['messages'],
			$dialogList
		);

		setDialogContent.init.$dialogs.empty().html(fragmentWithHeader);
		window.messages.currentMessageUserId = data['userId'];
	},


	init: () => {
		setDialogContent.init.$dialogs = $('.messages-dialogs__content-wrap');
		setDialogContent.init.$userMessageTemplate = $('#user-message').contents().find('.dialog__message');
		setDialogContent.init.$myMessageTemplate = $('#my-message').contents().find('.dialog__message');
		setDialogContent.init.$attachedFileTemplate = $('#attached-file').contents();
		setDialogContent.init.$videoContainerTemplate = $('#video-item').contents('.dialog__video-container');
		setDialogContent.init.$videoItemTemplate = setDialogContent.init.$videoContainerTemplate.find('.dialog__video-item');
		setDialogContent.init.$myBillTemplate = $('#my-bill').contents('.dialog__bill-wrap');
		setDialogContent.init.$userBillTemplate = $('#customer-bill').contents('.dialog__bill-wrap');

		window.messages = {
			currentMessageUserId: false
		};
	}
};

export { setDialogContent };
