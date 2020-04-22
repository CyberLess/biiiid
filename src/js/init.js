import {
	defaults
} from "./modules/defaults";
import {
	forms
} from "./modules/forms";
import {
	modals
} from "./modules/modals";
import {
	tooltips
} from "./modules/tooltips";
import {
	sliders
} from "./modules/sliders";
import {
	thumbnails
} from "./modules/thumbnails";
import {
	filters
} from "./modules/filters";
import {
	menu
} from "./modules/menu";
import {
	player
} from "./modules/player";
import {
	order
} from "./modules/order";
import {
	previewAvatar
} from "./modules/previewAvatar";
import {
	textareaLength
} from "./modules/textareaLength";
import {
	selectLanguage
}
from "./modules/selectLanguage";
import {
	config
} from "./config";

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
	textareaLength.init();
	selectLanguage.init();
	previewAvatar.init();

	config.log('app init')
};

export {
	App
};
