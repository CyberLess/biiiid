var config = {

	debug: true,

	animationEnd: "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",

	transitionEnd: "transitionend webkitTransitionEnd oTransitionEnd",

	container: $('html, body'),

	preloader: `<div class="preloader">
			<div class="preloader__line">
				<div class="preloader__parent">
					<div class="preloader__circle">
						<svg class="preloader__circle-svg" viewBox="25 25 50 50">
							<circle cx="50" cy="50" r="20"></circle>
						</svg>
					</div>
				</div>
			</div>
		</div>`,

	getRandomInt: (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	formatTime: seconds => {
		var hrs = ~~(seconds / 3600);
		var mins = ~~((seconds % 3600) / 60);
		var secs = ~~seconds % 60;

		// Output like "1:01" or "4:03:59" or "123:03:59"
		var ret = "";
		if (hrs > 0) {
			ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}
		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;
		return ret;
	},

	strcount: (strObj, need, count) => {
		let index = 0;
		let indexstart = 0;
		while (index != -1) {
			index = strObj.indexOf(need, indexstart);
			if (index >= 0) {
				indexstart = index + 1;
				count++;
			}
		}
		return count;
	},

	strreplace: (strObj, need) => {
		var re = new RegExp(need, "g");
		var newstrObj = strObj.replace(re, " ");
		return newstrObj;
	},

	isNumber: (str) => {
		var re = /^[0-9]*$/;
		if (!re.test(str))
			return false;
		else
			return true;
	},

	log: (...args) => {

		if (!config.debug)
			return false;

		console.log(...args);

	},

	URLToArray: url => {

		var request = {};
		var pairs = url.substring(url.indexOf('?') + 1).split('&');
		for (var i = 0; i < pairs.length; i++) {
			if (!pairs[i])
				continue;
			var pair = pairs[i].split('=');
			request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		}
		return request;
	},

	ArrayToURL: array => {
		var pairs = [];
		for (var key in array)
			if (array.hasOwnProperty(key))
				pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(array[key]));

		return pairs.join('&');
	},

	numberWithSpaces: x => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	},

	delay: (fn, ms) => {
		let timer = 0
		return function (...args) {
			clearTimeout(timer)
			timer = setTimeout(fn.bind(this, ...args), ms || 0)
		}
	},

	guidGenerator: () => {
		var S4 = function () {
			return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		};
		return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
	}

};

export {
	config
};
