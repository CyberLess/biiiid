var messageVideo = {
	NOT_FULLSCREEN_WIDTH: 154,

	changeElemsInSmallScreen: ($timePanel, $voiceBtn, $playerBottom, $fullscreenBtn) => {
		$timePanel.css('display', 'none');
		$voiceBtn.css('display', 'none');
		$playerBottom.css('right', '1rem');
		$fullscreenBtn.css({
			position: 'absolute',
			right: '-8px',
			bottom: '51px'
		});
	},

	changeElemsInFullScreen: ($timePanel, $voiceBtn, $playerBottom, $fullscreenBtn) => {
		$timePanel.css('display', '');
		$voiceBtn.css('display', '');
		$playerBottom.css('right', '');
		$fullscreenBtn.css({
			position: '',
			right: '',
			bottom: ''
		});
	},

	init: () => {
		const $messagePlayer = $('.dialog__player');
		const $timePanel = $messagePlayer.find('.player__panel-time');
		const $voiceBtn = $messagePlayer.find('.player__voice');
		const $fullscreenBtn = $messagePlayer.find('.player__fullscreen');
		const $playerBottom = $messagePlayer.find('.player__bottom');

		$messagePlayer.on('fullscreenchange', function () {
			const $activePlayBtn = $messagePlayer.find('.player__bar-cell_left');

			if ($(this).width() > messageVideo.NOT_FULLSCREEN_WIDTH) {
				$activePlayBtn.css({
					position: 'static',
					transform: 'translateX(0)'
				});
				messageVideo.changeElemsInFullScreen($timePanel, $voiceBtn, $playerBottom, $fullscreenBtn);
			} else {
				$activePlayBtn.css({
					position: '',
					transform: ''
				});
				messageVideo.changeElemsInSmallScreen($timePanel, $voiceBtn, $playerBottom, $fullscreenBtn);
			}
		});

		messageVideo.changeElemsInSmallScreen($timePanel, $voiceBtn, $playerBottom, $fullscreenBtn);
	}
};

export { messageVideo };
