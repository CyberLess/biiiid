var setDialogHeader = {
	IMG_SRC: '/app/img/',
	fragment: document.createDocumentFragment(),
	$dialogWrap: $('#messages-content-wrap').contents('.messages__messages-fragment-wrap'),

	setAvatar: (avatarData, avatarImg, avatarWebp) => {
		avatarImg.attr('src', `${setDialogHeader.IMG_SRC}${avatarData}.jpg`);
		avatarWebp.attr('srcset', `${setDialogHeader.IMG_SRC}${avatarData}.webp`);
	},

	init: () => {
		const $dialogHeaderTemplate = $('#dialog-header').contents('.dialog-header');
		const $headerImgJpg = $dialogHeaderTemplate.find('.dialog-header__author-avatar');
		const $headerImgWebp = $headerImgJpg.prev();
		const $headerName = $dialogHeaderTemplate.find('.dialog-header__author-name');
		const $headerOnlineText = $dialogHeaderTemplate.find('.dialog-header__online-text');
		const $headerOnlineTime = $dialogHeaderTemplate.find('.dialog-header__online-time');
		const $headerUserTime = $dialogHeaderTemplate.find('.dialog-header__user-time');

		const $dialogsWrap = $('.messages-dialogs');

		const setHeaderName = (nameData) => {
			$headerName.text(nameData);
		};

		const setHeaderLastVisit = (lastVisit) => {
			if (lastVisit === 'Онлайн') {
				$headerOnlineText.text('Онлайн');
				$headerOnlineTime.text('');
			} else {
				$headerOnlineText.text('Был(а) ');
				$headerOnlineTime.text(lastVisit);
			}
		};

		const setUserTime = (userTime) => {
			$headerUserTime.text(userTime);
		};

		const setHeaderTime = (lastVisitData, userTimeData) => {
			setHeaderLastVisit(lastVisitData);
			setUserTime(userTimeData);
		};

		const setHeaderOnline = (lastVisitDate) => {
			if (lastVisitDate === 'Онлайн') {
				$dialogHeaderTemplate.addClass('dialog-header_online');
				$dialogsWrap.addClass('messages-dialogs_online');
			} else {
				$dialogHeaderTemplate.removeClass('dialog-header_online');
				$dialogsWrap.removeClass('messages-dialogs_online');
			}
		};

		const makeDialogFragment = () => {
			setDialogHeader.$dialogWrap.prepend($dialogHeaderTemplate);
			setDialogHeader.fragment.appendChild($(setDialogHeader.$dialogWrap)[0]);

			return setDialogHeader.fragment;
		};

		setDialogHeader.init.setHeader = (
			avatarData,
			nameData,
			lastVisitData,
			userTimeData
		) => {
			setHeaderOnline(lastVisitData);
			setDialogHeader.setAvatar(avatarData, $headerImgJpg, $headerImgWebp);
				setHeaderName(nameData);
				setHeaderTime(lastVisitData, userTimeData);

				return makeDialogFragment();
		};
	}
};

export { setDialogHeader };
