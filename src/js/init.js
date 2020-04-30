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
import { messagesScroll } from "./modules/messages-scroll";
import { messageHeight } from "./modules/message-height";
import { dropPreview } from "./modules/drop-preview";
import { messageVideo } from "./modules/message-video";
import { messagePre } from "./modules/message-pre";
import { setDialogHeader } from "./modules/set-dialog-header";
import { setDialogContent } from "./modules/set-dialog-content";
import { getMessages } from "./modules/get-messages";

import { previewAvatar } from "./modules/previewAvatar";
import { textareaLength } from "./modules/textareaLength";
import { selectLanguage } from "./modules/selectLanguage";

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
	textareaLength.init();
	selectLanguage.init();
	previewAvatar.init();

	config.log("app init");
};

export { App };
