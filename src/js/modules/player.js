import { config } from "../config";
import "jquery-ui/ui/widgets/slider";

var player = {
	updateProgressBar: (playerContainer) => {
		let item = playerContainer.find(".player__item")[0];
		let percentage = (100 / item.duration) * item.currentTime;
		// let percentage = Math.floor((100 / item.duration) * item.currentTime);
		let $dot = playerContainer.find(".player__bar-dot");
		let $progress = playerContainer.find(".player__bar-progress");

		playerContainer
			.find(".player__panel-time")
			.text(
				`${config.formatTime(item.currentTime)} / ${config.formatTime(
					item.duration
				)}`
			);

		if (!$dot.hasClass("ui-draggable-dragging")) {
			$dot.removeAttr("style").css("left", `${percentage}%`);

			$progress.removeAttr("style").width(`${percentage}%`);
		}
	},

	reset: (item) => {
		let playerContainer = $(item).closest(".js-player");
		let $button = playerContainer.find(".player__nav-button");
		let $dot = playerContainer.find(".player__bar-dot");
		let $progress = playerContainer.find(".player__bar-progress");

		item[0].currentTime = 0;
		$button.removeClass("is-active");
		$dot.removeAttr("style");
		$progress.removeAttr("style");
		playerContainer.removeClass("is-playing");
	},

	position: (x, playerContainer, dot = false) => {
		let $item = playerContainer.find(".player__item"),
			$dot = playerContainer.find(".player__bar-dot"),
			$button = playerContainer.find(".player__nav-button"),
			item = $item[0];

		if (!$item.length) return false;

		item.pause();
		playerContainer.removeClass("is-playing");

		if (!dot) {
			playerContainer
				.find(".player__bar-dot")
				.removeAttr("style")
				.css("left", `${x}%`);
		}

		playerContainer
			.find(".player__bar-progress")
			.removeAttr("style")
			.width(`${x}%`);

		// let position = 100 / (playerContainer.find('.player__bar-line').width() / x);
		let sound_position = (item.duration / 100) * x;

		item.currentTime = sound_position;

		if (!dot) {
			item.play();
			playerContainer.addClass("is-playing");
			$button.addClass("is-active");
		}
	},

	stop: (e) => {
		let $t = $(e);
		let $item = $t.find(".player__item");
		let $button = $t.find(".player__nav-button");

		if ($item.length) {
			$t.removeClass("is-playing");
			$button.removeClass("is-active");
			$item[0].pause();
		}
	},

	load: (file, playerContainer, type = "video", callback) => {
		let playerItem = playerContainer.find(".player__item");

		if (!playerItem.length) {
			config.log("loading video", file);

			playerContainer.addClass("is-loading").append(config.preloader);

			let req = new XMLHttpRequest();

			req.open("GET", file, true);

			req.responseType = "blob";

			req.onload = function () {
				if (this.status === 200) {
					let template =
						type == "video"
							? `<video controls="false" autoplay="false" width="300" height="170" class="player__item object-fit"><source src="${file}" type="video/mp4"/></video>`
							: `<audio class="player__item"><source src="${file}" type="audio/mpeg"></audio>`;

					let video = template;

					let jsPlayer = playerContainer.closest(".js-player");

					playerContainer
						.removeClass("is-loading")
						.prepend(video)
						.find(".preloader")
						.addClass("is-hidden")
						.on(config.transitionEnd, (e) => {
							if (e.originalEvent.propertyName == "opacity") {
								playerContainer.find(".preloader").remove();
							}
						});

					playerItem = playerContainer.find(".player__item");

					playerContainer
						.find(".player__panel-time")
						.text(
							`${config.formatTime(
								playerItem[0].currentTime
							)} / ${config.formatTime(playerItem[0].duration)}`
						);

					playerItem.bind({
						timeupdate: (e) => {
							player.updateProgressBar(jsPlayer);
						},
						ended: (e) => {
							config.log("onended");
							player.reset(playerItem);
						},
					});

					jsPlayer.addClass("is-loaded");

					callback();
				}
			};

			req.onerror = () => {
				// Error
			};

			req.send();
		} else {
			config.log("video already loaded", file);

			callback();
		}
	},

	play: (e, item) => {
		let $this = item;
		let $button = $this.find(".player__nav-button");
		let $container = $this.find(".player__container");
		let video = $this.data("file");

		let type = $this.attr("data-audio") ? "audio" : "video";

		$(".js-player")
			.not($this)
			.each((i, el) => {
				player.stop(el);
			});

		if (
			$container.hasClass("is-loading") ||
			$(e.target).attr("class").indexOf("player__bar") !== -1 ||
			$(e.target).attr("class").indexOf("player__panel") !== -1 ||
			$(e.target).attr("class").indexOf("player__voice") !== -1 ||
			$(e.target).attr("class").indexOf("player__fullscreen") !== -1
		)
			return false;

		player.load(video, $container, type, () => {
			let $item = $container.find(".player__item");

			if ($item.length) {
				if (!$button.hasClass("is-active")) {
					$item[0].play();
					$this.addClass("is-playing");
					config.log("video play", video);
				} else {
					$item[0].pause();
					$this.removeClass("is-playing");
					config.log("video pause", video);
				}
			}

			$button.toggleClass("is-active");
		});
	},

	fullscreen: {
		open: ($elem) => {
			let elem = $elem[0];

			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				/* Firefox */
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				/* Chrome, Safari and Opera */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) {
				/* IE/Edge */
				elem.msRequestFullscreen();
			}
		},

		close: () => {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				/* Firefox */
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				/* Chrome, Safari and Opera */
				document.webkitExitFullscreen();
			} else if (document.msExitFullscreen) {
				/* IE/Edge */
				document.msExitFullscreen();
			}
		},
	},

	muted: ($player, mute = true) => {
		let $sound = $player.find(".player__voice"),
			media = $player.find(".player__item")[0],
			$dot = $player.find(".player__voice-dot"),
			$progress = $player.find(".player__voice-bar");

		// var l = ( 100 * parseFloat($dot.position().left / ($dot.parent().width() - $dot.width()/2)) );
		var l = $dot.position().left;

		var volume = 100 * parseFloat($dot.position().left / $dot.parent().width());

		// config.log('muted volume is ', volume)

		if (mute) {
			$sound.attr("data-volume", volume);
			$sound.attr("data-position", l);

			media.volume = 0;

			$sound.removeClass("is-low-sound").addClass("is-muted");

			$dot.css("left", `${0}%`);
			$progress.css("width", `${0}%`);

			config.log("player is muted");
		} else {
			let volume = $sound.attr("data-volume")
				? $sound.attr("data-volume")
				: 100;
			let position = $sound.attr("data-position")
				? $sound.attr("data-position")
				: 100;

			$dot.css("left", `${position}px`);
			$progress.css("width", `${position}px`);

			player.sound($player, volume);

			config.log("player is unmuted");
		}
	},

	sound: ($player, status, mute = false) => {
		let $sound = $player.find(".player__voice"),
			media = $player.find(".player__item")[0];

		config.log("sound status", status / 100);

		if (!mute) {
			$sound.removeClass("is-muted");

			if (status < 50) {
				$sound.addClass("is-low-sound");
			} else {
				$sound.removeClass("is-low-sound");
			}

			media.volume = status / 100;
		} else {
			player.muted($player);
		}
	},

	init: (items = false) => {
		let $items = items ? items : $(".js-player:not(.js-initialized)");

		$items.each((i, el) => {
			$(el).addClass("js-initialized");

			if ($(el).find(".js-sub-play").length) {
				$(el)
					.find(".js-sub-play")
					.on("click", (e) => {
						let $parent = $(e.currentTarget).closest(".js-player");
						player.play(e, $parent);
					});
			} else {
				$(el).on("click", (e) => {
					let $item = $(e.currentTarget);
					player.play(e, $item);
				});
			}

			$(el)
				.find(".player__voice-field")
				.slider({
					min: 0,
					max: 100,
					step: 1,
					value: 100,
					slide: function (event, ui) {
						let $this = $(this);
						let $player = $this.closest(".js-player");
						let $voice = $player.find(".player__voice");

						$voice.addClass("is-active");
						$player.addClass("is-ui-active");

						$player
							.find(".player__voice-bar")
							.removeAttr("style")
							.width(`${ui.value}%`);

						let mute = ui.value == 0 ? 1 : 0;

						player.sound($player, ui.value, mute);
					},
					stop: function (event, ui) {
						let $this = $(this);
						let $player = $this.closest(".js-player");
						let item = $player.find(".player__item")[0];
						let $button = $player.find(".player__nav-button");

						let $voice = $player.find(".player__voice");
						$voice.removeClass("is-active");
						$player.removeClass("is-ui-active");
					},
				});

			$(el)
				.find(".player__bar-line")
				.slider({
					min: 0,
					max: 100,
					step: 1,
					value: 1,
					slide: function (event, ui) {
						let $this = $(this);
						let $player = $this.closest(".js-player");
						let $bar = $player.find(".player__bar-line");

						player.position(ui.value, $player, true);

						$player.addClass("is-ui-active");
					},
					stop: function (event, ui) {
						let $this = $(this);
						let $player = $this.closest(".js-player");
						let item = $player.find(".player__item")[0];
						let $button = $player.find(".player__nav-button");

						item.play();
						$player.addClass("is-playing");
						$button.addClass("is-active");

						$player.removeClass("is-ui-active");
					},
				});

			$(el)
				.find(".player__voice-button")
				.on("click", (e) => {
					let $this = $(e.currentTarget);
					let $player = $this.closest(".js-player");

					let mute = !$this.parent().hasClass("is-muted");

					config.log("player__voice-button on click, mute is", mute);

					player.muted($player, mute);
				});

			$(el)
				.find(".js-fullscreen")
				.on("click", (e) => {
					let $this = $(e.currentTarget),
						$video = $this.closest(".js-player");

					$this.toggleClass("is-active");

					if ($this.hasClass("is-active")) {
						player.fullscreen.open($video);
					} else {
						player.fullscreen.close();
					}
				});
		});
	},
};

export { player };
