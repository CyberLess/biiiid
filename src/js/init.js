import { defaults } from "./modules/defaults";
import { forms } from "./modules/forms";
import { modals } from "./modules/modals";
import { tooltips } from "./modules/tooltips";
import { sliders } from "./modules/sliders";
import { thumbnails } from "./modules/thumbnails";
import { filters } from "./modules/filters";
import { menu } from "./modules/menu";
import { player } from "./modules/player";
import { order } from "./modules/order";
import { previewAvatar } from "./modules/previewAvatar";
import { textareaLength } from "./modules/textareaLength";
import { selectLanguage } from "./modules/selectLanguage";
import { messagesScroll } from "./modules/messages-scroll";
import { messageHeight } from "./modules/message-height";
import { dropPreview } from "./modules/drop-preview";
import { messageVideo } from "./modules/message-video";
import { messagePre } from "./modules/message-pre";
import { setDialogHeader } from "./modules/set-dialog-header";
import { setDialogContent } from "./modules/set-dialog-content";
import { getMessages } from "./modules/get-messages";
import { notifications } from "./modules/notifications";
import { messageSend } from "./modules/message-send";
import { bill } from "./modules/bill";
import { newOrderMessages } from "./modules/new-order-messages";
import { newOrderTabSwitching } from "./modules/new-order-tab-switching";
import { sendOrderFiles } from "./modules/send-order-files";
import { addService } from "./modules/addService";
import { cardMain } from './modules/cardMain'
import { regLogin } from "./modules/reg-login";

import { config } from "./config";

var App = () => {};

App.prototype.init = () => {
	defaults.init();
	forms.init();
	modals.init();
	tooltips.init();
	sliders.init();
	thumbnails.init();
	filters.init();
	order.init();
	menu.init();
	player.init();
	messagesScroll.init();
	messageHeight.init();
	dropPreview.init();
	messageVideo.init();
	messagePre.init();
	setDialogHeader.init();
	setDialogContent.init();
	getMessages.init();
	notifications.init();
	textareaLength.init();
	selectLanguage.init();
	previewAvatar.init();
	bill.init();
	messageSend.init();
	newOrderMessages.init();
	newOrderTabSwitching.init();
	sendOrderFiles.init();
	addService.init();
	cardMain.init();
	regLogin.init();

	config.log("app init");
};

export { App };
