var regLogin = {
	init: () => {
		const $firstForm = $('#reg-step-one');
		const $secondForm =$('#reg-step-two');
		const $passRecoveryForm = $('#pass-recovery-form');

		$firstForm.on('submit', function () {
			if (!$(this).find('.error').length) {
				$.magnificPopup.open({
					items: {
						src: '#registration-popup-final'
					}
				});
			}
		});

		$secondForm.on('submit', function () {
			if (!$(this).find('.error').length) {
				$.magnificPopup.close();
			}
		});

		$passRecoveryForm.on('submit', function () {
			if (!$(this).find('.error').length) {
				$.magnificPopup.open({
					items: {
						src: '#recovery-success'
					}
				});
			}
		});
	}
};

export { regLogin };
