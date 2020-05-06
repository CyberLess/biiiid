import baron from 'baron';

var dropPreview = {
	dropPrevWrap: document.querySelector('.dialog-form__dropzone-wrap'),

	init: () => {
		const dropArea = dropPreview.dropPrevWrap.querySelector('.dialog-form__dropzone');
		const $scrollHandle = $(dropPreview.dropPrevWrap).find('.dropzone__drop-prev-bar');

		$(dropPreview.dropPrevWrap).on('DOMSubtreeModified', function () {
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
			root: dropPreview.dropPrevWrap,
			scroller: dropArea,
			bar: '.dropzone__drop-prev-bar',
		});

		$(dropPreview.dropPrevWrap).on('DOMSubtreeModified', function () {
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
