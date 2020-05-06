import baron from "baron";

var notifications = {
	$body: $('body'),
	$notificationsRingBtn: $('.userdata__button_ring'),
	$notificationsMailBtn: $('.userdata__button_mail'),
	$notifications: $('.notifications'),
	$toggleNotifications: $('.notifications__toggle_notifications'),
	$toggleMessages: $('.notifications__toggle_messages'),
	$listWrapNotifications: $('.notifications__list-wrap_notifications'),
	$listWrapMessages: $('.notifications__list-wrap_messages'),
	$bottomWrap: $('.notifications__bottom'),
	isNotificationOpened: false,
	isMessagesOpened: false,

	setMessagesToggleListeners: () => {
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

	openNotificationsList: (openedListWrap, closedListWrap) => {
		closedListWrap.hide();
		openedListWrap.show();
	},

	setNotificationsToggleListeners: () => {
		notifications.$toggleNotifications.click(() => {
			notifications.$toggleNotifications.addClass('notifications__toggle_active');
			notifications.$toggleMessages.removeClass('notifications__toggle_active');

			notifications.openNotificationsList(
				notifications.$listWrapNotifications,
				notifications.$listWrapMessages
			);

			notifications.$bottomWrap.addClass('notifications__bottom_notifications');
		});
	},

	openMessages: (evt) => {
		evt.stopPropagation();

		if (notifications.isNotificationOpened) {
			notifications.closeNotifications(evt);
		}

		notifications.$notifications.fadeIn(400);
		notifications.isMessagesOpened = true;
		notifications.isNotificationOpened = false;
		notifications.$toggleMessages.trigger('click');
		notifications.$notificationsMailBtn.off();
		notifications.$body.children().not(notifications.$notifications).click(notifications.closeMessages);
		notifications.$notifications.children().click(notifications.onNotificationsChildrenClick);
	},

	openNotifications: (evt) => {
		evt.stopPropagation();

		if (notifications.isMessagesOpened) {
			notifications.closeMessages(evt);
		}

		notifications.$notifications.fadeIn(400);
		notifications.isNotificationOpened = true;
		notifications.isMessagesOpened = false;
		notifications.$toggleNotifications.trigger('click');
		notifications.$notificationsRingBtn.off();
		notifications.$body.children().not(notifications.$notifications).click(notifications.closeNotifications);
		notifications.$notifications.children().click(notifications.onNotificationsChildrenClick);
	},

	closeMessages: () => {
		notifications.$notifications.hide();
		notifications.removeCloseListeners();
		notifications.$notificationsMailBtn.off('click', notifications.closeNotifications);
		notifications.$notificationsMailBtn.click(notifications.openMessages);
	},

	closeNotifications: () => {
		notifications.$notifications.hide();
		notifications.removeCloseListeners();
		notifications.$notificationsRingBtn.off('click', notifications.closeMessages);
		notifications.$notificationsRingBtn.click(notifications.openNotifications);
	},

	onNotificationsChildrenClick: (evt) => {
		evt.stopPropagation();
	},

	removeCloseListeners: () => {
		notifications.$body.children()
			.off('click', notifications.closeNotifications)
			.off('click', notifications.closeMessages);
	},

	setListeners: () => {
		notifications.$notificationsRingBtn.click(notifications.openNotifications);
		notifications.$notificationsMailBtn.click(notifications.openMessages);

		notifications.setNotificationsToggleListeners();
		notifications.setMessagesToggleListeners();
	},

	init: () => {
		notifications.setListeners();

		baron({
			root: $(notifications.$listWrapNotifications.parent())[0],
			scroller: $(notifications.$listWrapNotifications)[0],
			bar: $(notifications.$listWrapNotifications.parent().find('.notifications__handle'))[0],
		});

		baron({
			root: $(notifications.$listWrapMessages.parent())[0],
			scroller: $(notifications.$listWrapMessages)[0],
			bar: $(notifications.$listWrapMessages.parent().find('.notifications__handle'))[0],
		});
	}
};

export { notifications };
