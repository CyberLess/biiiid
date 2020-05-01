var messageVideo = {
	init: () => {
		const NOT_FULLSCREEN_WIDTH = 154;

		const $messagePlayer = $('.dialog__player');
		const $playBtn = $messagePlayer.find('.player__nav-button');
		const $timePanel = $messagePlayer.find('.player__panel-time');
		const $voiceBtn = $messagePlayer.find('.player__voice');
		const $fullscreenBtn = $messagePlayer.find('.player__fullscreen');
		const $playerBottom = $messagePlayer.find('.player__bottom');

		const changeElemsInSmallScreen = () => {
			$timePanel.css('display', 'none');
			$voiceBtn.css('display', 'none');
			$playerBottom.css('right', '1rem');
			$fullscreenBtn.css({
				position: 'absolute',
				right: '-8px',
				bottom: '51px'
			});
		};

		const changeElemsInFullScreen = () => {
			$timePanel.css('display', '');
			$voiceBtn.css('display', '');
			$playerBottom.css('right', '');
			$fullscreenBtn.css({
				position: '',
				right: '',
				bottom: ''
			});
		};

		$messagePlayer.on('fullscreenchange', function () {
			const $activePlayBtn = $messagePlayer.find('.player__bar-cell_left');

			if ($(this).width() > NOT_FULLSCREEN_WIDTH) {
				$activePlayBtn.css({
					position: 'static',
					transform: 'translateX(0)'
				});
				changeElemsInFullScreen();
			} else {
				$activePlayBtn.css({
					position: '',
					transform: ''
				});
				changeElemsInSmallScreen();
			}
		});

		changeElemsInSmallScreen();
	}
};

export { messageVideo };
