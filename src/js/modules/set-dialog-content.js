import { setDialogHeader } from "./set-dialog-header";

var setDialogContent = {
	//dialog__video-container
	init: () => {
		const dateToTextMap = {
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
		};

		const FILE_SRC = '/app/media/';

		const $dialogs = $('.messages-dialogs__content-wrap');
		const $userMessageTemplate = $('#user-message').contents().find('.dialog__message');
		const $myMessageTemplate = $('#my-message').contents().find('.dialog__message');
		const $attachedFileTemplate = $('#attached-file').contents();
		const $videoContainerTemplate = $('#video-item').contents('.dialog__video-container');
		const $videoItemTemplate = $videoContainerTemplate.find('.dialog__video-item');
		const $myBillTemplate = $('#my-bill').contents('.dialog__bill-wrap');
		const $userBillTemplate = $('#customer-bill').contents('.dialog__bill-wrap');


		const setAuthorName = (authorName, messageAuthor, nameElement) => {
			if (messageAuthor === 'customer') {
				nameElement.text(authorName);
			} else {
				nameElement.text('Я');
			}
		};

		const setAvatar = (messageAuthor, avatarData, avatarImg, avatarWebp) => {
			if (messageAuthor !== 'me') {
				setDialogHeader.setAvatar(avatarData, avatarImg, avatarWebp);
			} else {
				setDialogHeader.setAvatar('avatar-me', avatarImg, avatarWebp);
			}
		};

		const setMessageText = (messageTextData, textElem) => {
			if (messageTextData) {
				textElem.html(messageTextData);
			} else {
				textElem.remove();
			}
		};

		const getMessageDateTime = (dateTime) => {
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
				return `${messageDate} ${dateToTextMap[messageMonth]} ${messageHours}:${messageMinutes}`
			}

			return `${messageHours}:${messageMinutes}`;
		};

		const setDateTime = (dateTimeData, timeElem) => {
			timeElem.attr('datetime', dateTimeData)
				.text(getMessageDateTime(dateTimeData));
		};

		const makeAttachedFiles = (filesDataArr, messageElem) => {
			filesDataArr.forEach((current) => {
				if (current['type'] !== 'video') {
					const $attachedFile = $attachedFileTemplate.clone();
					$attachedFile.attr('href', `${FILE_SRC}${current['name']}`);
					$attachedFile.find('.messages__attached-name').text(current['name']);
					$attachedFile.find('.messages__attached-name').text(current['size']);

					messageElem.append($attachedFile);
				}
			})
		};

		const setMessageStatus = (messageData, messageTemplate) => {
			if (messageData['messageAuthor'] === 'me') {
				if (messageData['status'] === 'read') {
					messageTemplate.addClass('dialog__message_read');
				} else {
					messageTemplate.addClass('dialog__message_delivered');
				}
			} else {
				if (messageData['status'] === 'no-opened') {
					messageTemplate.addClass('dialog__message_no-opened');
				}
			}
		};

		const makeVideo = (filesDataArr, messageElem) => {
			const $container = $videoContainerTemplate.clone();
			$container.empty();

			filesDataArr.forEach((current) => {
				if (current['type'] === 'video') {
					const $item = $($($videoItemTemplate)[0].cloneNode(true));
					const $player = $item.find('.dialog__player');
					const $playerJpg = $item.find('.player__preview');
					const $playerWebp = $playerJpg.prev();
					const $videoName = $item.find('.dialog__video-name');
					const $videoSize = $item.find('.dialog__video-size');
					const $downloadLink = $item.find('.dialog__video-download');

					$player.attr('data-file', `${FILE_SRC}${current['name']}`);
					setDialogHeader.setAvatar(current['prevImage'], $playerJpg, $playerWebp);
					$videoName.text(current['name']);
					$videoSize.text(current['size']);
					$downloadLink.attr('href', `${FILE_SRC}${current['name']}`);

					$container.append($item);
				}
			});

			if ($container.html().trim() !== '') {
				messageElem.append($container);
			}
		};

		const makeBill = (billData, billTemplate) => {
			const $billWrap = billTemplate.clone();
			const $billTitle = $billWrap.find('.dialog__table-cell_order-name');
			const $billTime = $billWrap.find('.dialog__table-cell_time');
			const $billPrice = $billWrap.find('.dialog__table-cell_price');

			$billTitle.text(billData['title']);
			$billTime.text(billData['time']);
			$billPrice.text(billData['price']);

			return $billWrap;
		};

		const makeMessage = (authorName, avatarData, messageData, messageTemplate) => {
			const $message = $($(messageTemplate)[0].cloneNode(true));
			const $avatarJpg = $message.find('.dialog__author-avatar');
			const $avatarWebp = $avatarJpg.prev();
			const $name = $message.find('.dialog__author-name');
			const $sendTime = $message.find('.dialog__time');
			const $messageTextWrap = $message.find('.dialog__text-wrap');
			const $messageText = $message.find('.dialog__message-text');

			setMessageStatus(messageData, $message);
			setAuthorName(authorName, messageData['messageAuthor'], $name);
			setDateTime(messageData['sendDate'], $sendTime);
			setAvatar(messageData['messageAuthor'], avatarData, $avatarJpg, $avatarWebp);
			setMessageText(messageData['text'], $messageTextWrap);

			if (messageData['files'].length > 0) {
				makeAttachedFiles(messageData['files'], $messageTextWrap);
				makeVideo(messageData['files'], $messageTextWrap);
			}

			if (messageData['bill']) {
				if (messageData['messageAuthor'] === 'me') {
					$messageText.append(makeBill(messageData['bill'], $myBillTemplate));
				} else {
					$messageText.append(makeBill(messageData['bill'], $userBillTemplate));
				}
			}

			return $message;
		};

		const makeMessages = (authorName, avatarData, messagesDataArr, dialogList) => {
			dialogList.empty();

			messagesDataArr.forEach((current) => {
				if (current['messageAuthor'] === 'customer') {
					dialogList.append(makeMessage(authorName, avatarData, current, $userMessageTemplate));
				} else {
					dialogList.append(makeMessage(authorName, avatarData, current, $myMessageTemplate));
				}
			});
		};

		const pushMessagesOnPage = (data) => {
			const fragmentWithHeader = setDialogHeader.init.setHeader(
				data['avatar'],
				data['authorName'],
				data['lastVisitDate'],
				data['userTime']
			);
			const $dialogList = $(fragmentWithHeader).find('.dialog');

			makeMessages(
				data['authorName'],
				data['avatar'],
				data['messages'],
				$dialogList
			);

			$dialogs.empty().html(fragmentWithHeader);
		};

		setDialogContent.init.pushMessagesOnPage = pushMessagesOnPage;
	}
};

export { setDialogContent };
