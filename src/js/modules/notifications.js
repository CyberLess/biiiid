import baron from "baron";

var notifications = {
	$notificationsRingBtn: $('.userdata__button_ring'),
	$notifications: $('.notifications'),
	$toggleNotifications: $('.notifications__toggle_notifications'),
	$toggleMessages: $('.notifications__toggle_messages'),
	$listWrapNotifications: $('.notifications__list-wrap_notifications'),
	$listWrapMessages: $('.notifications__list-wrap_messages'),
	$bottomWrap: $('.notifications__bottom'),

	closeNotifications: () => {
		notifications.$notifications.hide();
		notifications.removeCloseListeners();
		notifications.$notificationsRingBtn.off('click', notifications.closeNotifications);
	},

	onNotificationsChildrenClick: (evt) => {
		evt.stopPropagation();
	},

	setCloseListeners: () => {
		$('body').children().not(notifications.$notificationsRingBtn, notifications.$notifications).click(notifications.closeNotifications);
		notifications.$notifications.children().click(notifications.onNotificationsChildrenClick)
	},

	removeCloseListeners: () => {
		$('body').children().not(notifications.$notificationsRingBtn, notifications.$notifications).off('click', notifications.closeNotifications);
	},

	openNotifications: (evt) => {
		evt.stopPropagation();
		notifications.$toggleNotifications.trigger('click');
		notifications.$notifications.show();
		notifications.setCloseListeners();
		notifications.$notificationsRingBtn.click(notifications.closeNotifications);

	},

	openNotificationsList: (openedListWrap, closedListWrap) => {
		closedListWrap.hide();
		openedListWrap.fadeIn(300);
	},

	setListeners: () => {
		notifications.$notificationsRingBtn.click(notifications.openNotifications);

		notifications.$toggleNotifications.click(() => {
			notifications.$toggleNotifications.addClass('notifications__toggle_active');
			notifications.$toggleMessages.removeClass('notifications__toggle_active');
			notifications.openNotificationsList(
				notifications.$listWrapNotifications,
				notifications.$listWrapMessages
			);

			notifications.$bottomWrap.addClass('notifications__bottom_notifications');
		});

		notifications.$toggleMessages.click(() => {
			notifications.$toggleMessages.addClass('notifications__toggle_active');
			notifications.$toggleNotifications.removeClass('notifications__toggle_active');
			notifications.openNotificationsList(
				notifications.$listWrapMessages,
				notifications.$listWrapNotifications
			);

			notifications.$bottomWrap.removeClass('notifications__bottom_notifications');
		})
	},

	init: () => {
		notifications.setListeners();

		baron({
			root: $(notifications.$listWrapNotifications.parent())[0],
			scroller: $(notifications.$listWrapNotifications)[0],
			bar: $(notifications.$listWrapNotifications.parent().find('.notifications__handle'))[0],
			scrollingCls: '_scrolling'
		});

		baron({
			root: $(notifications.$listWrapMessages.parent())[0],
			scroller: $(notifications.$listWrapMessages)[0],
			bar: $(notifications.$listWrapMessages.parent().find('.notifications__handle'))[0],
			scrollingCls: '_scrolling'
		});
	}
};

export { notifications };
