import baron from 'baron';

var dropPreview = {
	init: () => {
		const dropPrevWrap = document.querySelector('.dialog-form__dropzone-wrap');
		const dropArea = dropPrevWrap.querySelector('.dialog-form__dropzone');
		const $scrollHandle = $(dropPrevWrap).find('.dropzone__drop-prev-bar');

		$(dropPrevWrap).on('DOMSubtreeModified', function () {
			if ($(this).height() >= 130) {
				$scrollHandle.css({
					opacity: 1
				});
			} else {
				$scrollHandle.css({
					opacity: 0
				});
			}
		});

		baron({
			root: dropPrevWrap,
			scroller: dropArea,
			bar: '.dropzone__drop-prev-bar',
			scrollingCls: '_scrolling'
		});

		$(dropPrevWrap).on('DOMSubtreeModified', function () {
			if($(this).height() > 0) {
				$(this).css({
					marginTop: '3.6rem'
				})
			} else {
				$(this).css({
					marginTop: ''
				})
			}
		});
	}
};

export { dropPreview };
