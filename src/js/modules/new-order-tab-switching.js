var newOrderTabSwitching = {
	$tabs: $('.new-order-messages__menu-link'),
	$dialog: $('.new-order-messages__dialog-wrap'),
	$details: $('.order-details'),
	$detailsTab: $('.new-order-messages__menu-link_details'),

	switchTab: ($current) => {
		if (!$current.hasClass('new-order-messages__menu-link_active')) {
			newOrderTabSwitching.$tabs.removeClass('new-order-messages__menu-link_active');
			$current.addClass('new-order-messages__menu-link_active');

			if ($current.hasClass('new-order-messages__menu-link_dialog')) {
				newOrderTabSwitching.$details.hide();
				newOrderTabSwitching.$dialog.show();
			}

			if ($current.hasClass('new-order-messages__menu-link_details')) {
				newOrderTabSwitching.$dialog.hide();
				newOrderTabSwitching.$details.show();
			}
		}
	},

	onOrderLinkClick: (evt) => {
		evt.preventDefault();

		newOrderTabSwitching.$detailsTab.trigger('click');
	},

	setOrderLinkListener: () => {
		const $link = $('.dialog__status-details-link');

		if ($link.length > 0) {
			$link.click(newOrderTabSwitching.onOrderLinkClick);
		}
	},

	init: () => {
		newOrderTabSwitching.$tabs.click(function (evt) {
			evt.preventDefault();
			newOrderTabSwitching.switchTab($(this));
		})
	}
};

export { newOrderTabSwitching };
