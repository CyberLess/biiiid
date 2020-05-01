import {
	config
} from "../config";
window.Dropzone = require('dropzone');

var order = {

	clear: (e) => {

		e.preventDefault()

		let clearParent = $(e.currentTarget).closest('.input');

		clearParent.find('input, textarea').val('')

		clearParent.find('.file-list').empty()

		$('.js-evaluation-words').text('0 слов')
		$('.js-evaluation-time').text('0')
		$('.js-evaluation-summ').text('0')

		Dropzone.forElement(clearParent.find('.dropzone__area')[0]).removeAllFiles(true);


	},

	run: (section) => {

		if (!$(section).length)
			return false;




		$(section).each(function () {
			var $wrapper = $(this),
				$field = $('textarea.js-evaluation-field'),
				$onfill = $('.js-evaluation-onfill'),
				$words = $('.js-evaluation-words'),
				$time = $('.js-evaluation-time'),
				// $options = $('.js-evaluation-option'),
				$summ = $('.js-evaluation-summ');

			var newdata = $(this).data('options');

			config.log('order run', newdata)

			$field.on('change input', function () {

				var priceCalc = newdata['priceCalc'];

				// $options = $('.js-evaluation-option');

				$onfill = $(this).closest('.input').find('.js-evaluation-onfill');

				var orderSpeaker = $('[name="orderSpeaker"]').val();
				var orderName = $('[name="NAME"]').val();

				if ($(this).attr('name') == 'TEXT') {
					if ($(this).val().length) {
						$onfill.removeClass('disabled').not(':visible').fadeIn(300);
						if ($('.ordering-check__done_btn').hasClass('disabled') && orderSpeaker && orderName) $('.ordering-check__done_btn').removeClass('disabled');
					} else {
						$onfill.addClass('disabled').not('.js-evaluation-onfill_nohide').fadeOut(300);
						if (!$('.ordering-check__done_btn').hasClass('disabled') && (!$('.ordering__field_files input[type="file"]')[0].files.length || !orderSpeaker || !orderName)) $('.ordering-check__done_btn').addClass('disabled');
					}
				}



				if (!priceCalc) return false;

				// Количество слов
				var text = $field.val();
				var pattern = new RegExp('\n', "g");
				text = text.replace(pattern, " ");
				var pattern = new RegExp('\r', "g");
				text = text.replace(pattern, " ");
				var tarray = text.split(" ");
				var wrdsCount = 0;
				var index = 0;
				var indexstart = 0
				var ltrsCount = 0;
				wrdsCount = config.strcount(text, "№", wrdsCount);
				text = config.strreplace(text, "№");
				wrdsCount = config.strcount(text, "@", wrdsCount);
				text = config.strreplace(text, "@");
				wrdsCount = config.strcount(text, "$", wrdsCount);
				text = config.strreplace(text, "$");
				wrdsCount = config.strcount(text, "%", wrdsCount);
				text = config.strreplace(text, "%");
				wrdsCount = config.strcount(text, "&", wrdsCount);
				text = config.strreplace(text, "&");
				wrdsCount = config.strcount(text, "Є", wrdsCount);
				text = config.strreplace(text, "Є");
				wrdsCount = config.strcount(text, " пр.", wrdsCount);
				text = config.strreplace(text, " пр\\.");
				wrdsCount = config.strcount(text, " ул.", wrdsCount);
				text = config.strreplace(text, " ул\\.");
				wrdsCount = config.strcount(text, " г.", wrdsCount);
				text = config.strreplace(text, " г\\.");
				wrdsCount = config.strcount(text, " т.", wrdsCount);
				text = config.strreplace(text, " т\\.");
				wrdsCount = config.strcount(text, " д.", wrdsCount);
				text = config.strreplace(text, " д\\.");
				wrdsCount = config.strcount(text, " кв.", wrdsCount);
				text = config.strreplace(text, " кв\\.");
				wrdsCount = config.strcount(text, " кг.", wrdsCount);
				text = config.strreplace(text, " кг\\.");
				wrdsCount = config.strcount(text, " см.", wrdsCount);
				text = config.strreplace(text, " см\\.");
				wrdsCount = config.strcount(text, " гр.", wrdsCount);
				text = config.strreplace(text, " гр\\.");
				var a_len = tarray.length;
				for (var el = 0; el < a_len; el++) {
					if (config.isNumber(tarray[el])) {
						wrdsCount += tarray[el].length;
						continue;
					}
					var tmpStrArr = tarray[el].split("");
					for (var tmpel in tmpStrArr) {
						if (config.isNumber(tmpStrArr[tmpel])) {
							wrdsCount += 1;
							continue;
						}
					}
					text = config.strreplace(text, '0');
					text = config.strreplace(text, '1');
					text = config.strreplace(text, '2');
					text = config.strreplace(text, '3');
					text = config.strreplace(text, '4');
					text = config.strreplace(text, '5');
					text = config.strreplace(text, '6');
					text = config.strreplace(text, '7');
					text = config.strreplace(text, '8');
					text = config.strreplace(text, '9');
				}
				var txarray = text.split(" ");
				var a_len2 = txarray.length;
				for (var el = 0; el < a_len2; el++) {
					var sElement = txarray[el].toString();
					index = sElement.indexOf('.', 0);
					if (index >= 1 && index < (sElement.length - 1)) {
						tmpStrArr2 = sElement.split('.');
						wrdsCount += tmpStrArr2.length;
						wrdsCount += tmpStrArr2.length - 1;
					} else {
						if (sElement.length > 2 && sElement.length <= 14)
							wrdsCount += 1;
						if (sElement.length > 14)
							wrdsCount += 2;
						if ((sElement.length < 3) && (sElement != "-") && (sElement != " ") && (sElement != ".") && (sElement != ",") && (sElement != "№") && (sElement != "@") && (sElement != "Є") && (sElement != "$") && (sElement != "%") && (sElement != "&") && (sElement != "")) {
							ltrsCount++;
						}
					}
				}
				if (ltrsCount > 0)
					wrdsCount += Math.ceil(ltrsCount / 4);
				wrdsCount = wrdsCount.toFixed(0);
				if (text == '')
					wrdsCount = '0';

				var textLength = wrdsCount,
					word = '';

				if ($field.val().length === 0) textLength = 0;
				if (textLength > 10 && textLength < 20) {
					word = 'слов';
				} else {
					switch (textLength % 10) {
						case 0:
						case 5:
						case 6:
						case 7:
						case 8:
						case 9:
							word = 'слов';
							break;
						case 1:
							word = 'слово';
							break;
						case 2:
						case 3:
						case 4:
							word = 'слова';
							break;
					}
				}
				$words.text(textLength + ' ' + word);

				// Хронометраж
				var textTime = parseInt(textLength / 2);
				var min = parseInt(textTime / 60);

				if (min > 0) {
					textTime = min + ' мин. ' + (textTime - min * 60);
				}
				$time.text(textTime); // Слов в минуту

				// Добавочный процент
				var percent = 100;
				var ruble = 0;
				// $options.filter(':checked').each(function() {
				// 	if($(this).data('percent')) percent += parseInt($(this).data('percent'));
				// 	if($(this).data('ruble')) ruble += parseInt($(this).data('ruble'));
				// });

				percent = percent / 100;

				// Стоимость
				var founded = false;
				/*priceCalc.forEach(function(item, i, array) {
	                if(textLength <= item.words && !founded) {
	                    founded = true;

	                    var summ = item.cost * percent * item.multiplier;
	                    if(textLength === 0) summ = 0;

	                    summ = summ.toString().replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1 ');
	                    if($('[name="CALCULATE_COST_MANUALLY"]').prop('checked')){
							$summ.data('price', summ);
						}
						else{
							$summ.text(summ);
						}
	                }

	            });*/
				//config.log(priceCalc);
				if (textLength > priceCalc[2].words) {
					var text_without_spaces = text.replace(/\s*/g, '');
					var koef = text_without_spaces.length / 1800;
					var summ = priceCalc[3].cost * koef;

					if (summ < priceCalc[2].cost) summ = priceCalc[2].cost;
					//summ =  summ * percent;
					summ = Math.round(Math.round(summ / 100).toString().replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1 ') * 100 * percent);
					config.log(percent);
					summ += ruble;
					// let addPrice = getOrderTotalAddPrice(true)
					if ($('[name="CALCULATE_COST_MANUALLY"]').prop('checked')) {
						$summ.data('price', Number(summ));
						$summ.text('Вручную');
					} else {

						$summ.text(Number(summ));
					}

					//config.log(summ);

				} else {
					priceCalc.forEach(function (item, i, array) {
						if (textLength <= item.words && !founded) {
							founded = true;

							var summ = item.cost * percent * item.multiplier + ruble;
							if (textLength === 0) summ = 0;

							summ = Math.round(summ).toString().replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1 ');
							// let addPrice = getOrderTotalAddPrice(true)

							if ($('[name="CALCULATE_COST_MANUALLY"]').prop('checked')) {
								$summ.data('price', Number(summ));
								$summ.text('Вручную');
							} else {

								$summ.text(Number(summ));

							}
						}

					});
				}

			});

			// $(document).on('change', '.js-evaluation-option', function() {
			//     $field.trigger('change');
			// });
		});
	},

	init: () => {

		order.run('.js-evaluation');

		$('.js-clear-fieldset').on('click', order.clear)

	}

};

export {
	order
};
