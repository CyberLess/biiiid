var setDialogHeader = {
	IMG_SRC: '/app/img/',
	fragment: document.createDocumentFragment(),
	$dialogWrap: $('#messages-content-wrap').contents('.messages__messages-fragment-wrap'),

	setAvatar: (avatarData, avatarImg, avatarWebp) => {
		avatarImg.attr('src', `${setDialogHeader.IMG_SRC}${avatarData}.jpg`);
		avatarWebp.attr('srcset', `${setDialogHeader.IMG_SRC}${avatarData}.webp`);
	},

	setHeaderName: (nameData) => {
		setDialogHeader.init.$headerName.text(nameData);
	},

	setHeaderLastVisit: (lastVisit) => {
		if (lastVisit === 'Онлайн') {
			setDialogHeader.init.$headerOnlineText.text('Онлайн');
			setDialogHeader.init.$headerOnlineTime.text('');
		} else {
			setDialogHeader.init.$headerOnlineText.text('Был(а) ');
			setDialogHeader.init.$headerOnlineTime.text(lastVisit);
		}
	},

	setUserTime: (userTime) => {
		setDialogHeader.init.$headerUserTime.text(userTime);
	},

	setHeaderTime: (lastVisitData, userTimeData) => {
		setDialogHeader.setHeaderLastVisit(lastVisitData);
		setDialogHeader.setUserTime(userTimeData);
	},

	setHeaderOnline: (lastVisitDate) => {
		if (lastVisitDate === 'Онлайн') {
			setDialogHeader.init.$dialogHeaderTemplate.addClass('dialog-header_online');
			setDialogHeader.init.$dialogsWrap.addClass('messages-dialogs_online');
		} else {
			setDialogHeader.init.$dialogHeaderTemplate.removeClass('dialog-header_online');
			setDialogHeader.init.$dialogsWrap.removeClass('messages-dialogs_online');
		}
	},

	setHeader: (
		avatarData,
		nameData,
		lastVisitData,
		userTimeData
	) => {
		setDialogHeader.setHeaderOnline(lastVisitData);
		setDialogHeader.setAvatar(avatarData, setDialogHeader.init.$headerImgJpg, setDialogHeader.init.$headerImgWebp);
		setDialogHeader.setHeaderName(nameData);
		setDialogHeader.setHeaderTime(lastVisitData, userTimeData);

		return setDialogHeader.makeDialogFragment();
	},

	makeDialogFragment: () => {
		setDialogHeader.$dialogWrap.prepend(setDialogHeader.init.$dialogHeaderTemplate);
		setDialogHeader.fragment.appendChild($(setDialogHeader.$dialogWrap)[0]);

		return setDialogHeader.fragment;
	},

	init: () => {
		setDialogHeader.init.$dialogHeaderTemplate = $('#dialog-header').contents('.dialog-header');
		setDialogHeader.init.$headerImgJpg = setDialogHeader.init.$dialogHeaderTemplate.find('.dialog-header__author-avatar');
		setDialogHeader.init.$headerImgWebp = setDialogHeader.init.$headerImgJpg.prev();
		setDialogHeader.init.$headerName = setDialogHeader.init.$dialogHeaderTemplate.find('.dialog-header__author-name');
		setDialogHeader.init.$headerOnlineText = setDialogHeader.init.$dialogHeaderTemplate.find('.dialog-header__online-text');
		setDialogHeader.init.$headerOnlineTime = setDialogHeader.init.$dialogHeaderTemplate.find('.dialog-header__online-time');
		setDialogHeader.init.$headerUserTime = setDialogHeader.init.$dialogHeaderTemplate.find('.dialog-header__user-time');
		setDialogHeader.init.$dialogsWrap = $('.messages-dialogs');
	}
};

export { setDialogHeader };
