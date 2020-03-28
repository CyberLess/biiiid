import Inputmask from "inputmask";
import validate from 'jquery-validation';
import 'jquery-ui/ui/widgets/slider';
import 'selectric';
import { config } from "../config";
import { filters } from "./filters";

window.Dropzone = require('dropzone');

Dropzone.autoDiscover = false;

var forms = {

	mask: () => {
		var selector = document.querySelectorAll("input[name='phone']");

		var im = new Inputmask({
			"mask": "+7 (999) 999-99-99",
			clearMaskOnLostFocus: true,
			clearIncomplete: true			
		});

		im.mask(selector);
	},

	number: (event) => {

		let $this = $(event.currentTarget);

		$this.val($this.val().replace(/[^\d].+/, ""));

		if ((event.which < 48 || event.which > 57)) {
		    event.preventDefault();
		}

	},

	dropzone: {

		trigger: ($item) => {

			config.log('trigger dropzone', $item)

			// $item.get(0).dropzone
			$item.find('.dropzone__area').get(0).dropzone.hiddenFileInput.click();

		},

		init: () =>{

			let $dropzone = $('.js-dropzone');

			if(!$dropzone.length)
				return false;


			$dropzone.each((i, el) => {

				let template = $(el).find('.dropzone__preview').html();

				config.log('dropzone template', template)


				$(el).find('.dropzone__area').dropzone({ 
					url: api.files,
					previewTemplate: template,
					uploadprogress: function(file, progress, bytesSent) {
					    if (file.previewElement) {
					        var progressElement = file.previewElement.querySelector("[data-dz-uploadprogress]");
					        progressElement.style.width = progress + "%";
					        progressElement.querySelector(".progress-text").textContent = progress + "%";
					    }
					}
				});		
						
			})


		}

	},

	select: () => {

		let $select = $('select');
		
		if(!$select.length)
			return false;

		$select.selectric({
			maxHeight: 187
		}).on('selectric-change', (event, element, selectric) => {

			let val = $(element).val();

			let $select = $(element).closest('.select');

			let placeholder = $select.attr('data-placeholder') ? $select.data('placeholder') : false;

			if(val.length == 0 && placeholder){

				$select.find('.label').text(placeholder)

			}

		});
	

	},

	price:  {

		reset: ($item) => {

			config.log('range clear')
			
			let $slider   = $item,
				path	  = $slider.find('.range__line'),
				min    	  = Number($slider.find('.range__min').text().replace(/ /g, '')),
				max    	  = Number($slider.find('.range__max').text().replace(/ /g, '')),
				range 	  = $slider.find('.ui-slider-range');

			$slider.find('input[type="text"]').val("").trigger('change');
			// $slider.find('.range__input_min').val("");
 
			// path.slider("values", 0, min);
			// path.slider("values", 1, max);

			// path.slider('refresh');


			// range.css({
			// 	'left': '0%',
			// 	'width': '100%',
			// })	

		},

		init: () => {

			if(!$('.range').length)
				return false;

			let active_set = (min, max, slider) => {
				if(min != Number(slider.slider( "values", 0 )) || 
					max != Number(slider.slider( "values", 1 ))){
				}
			}

			let update_tag = (min_input, max_input, name, value, add = true) => {

				let min_name = min_input.attr('name');
				let max_name = max_input.attr('name');

				filters.tag.remove(min_name);
				filters.tag.remove(max_name);	

				filters.virtual.remove(min_name)	
				filters.virtual.remove(max_name)	

				if(add)
					filters.tag.add(name, value);

			}

			$('.range').each(function() {
				let slider 	  = $(this),
					min    	  = Number(slider.find('.range__min').text().replace(/ /g, '')),
					max    	  = Number(slider.find('.range__max').text().replace(/ /g, '')),
					path	  = slider.find('.range__line'),
					min_input = slider.find('.range__input_min'),
					max_input = slider.find('.range__input_max');

				// min_input.val(min)
				// max_input.val(max)

				path.slider({
					range: true,
					min: min,
					max: max,
					values: [ min, max ],
					slide: function( event, ui ) {

						if (ui.values[ 0 ] != min){
							min_input.val(ui.values[ 0 ])
						}else{
							min_input.val("")
						}
					
						if (ui.values[1] != max){
							max_input.val(ui.values[1])
						}else{
							max_input.val("")
						}

						active_set(min, max, path)	
					},

					stop: function( event, ui ) {

						min_input.trigger('change')
						max_input.trigger('change')

						// if (min_input.val() == ''){
						// 	update_tag(min_input, max_input, max_input.attr('name'), ui.values[1]);
						// }
					
						// if (max_input.val() == ''){
						// 	update_tag(min_input, max_input, min_input.attr('name'), ui.values[0]);
						// }	

						// if (min_input.val() == '' && max_input.val() == ''){
						// 	update_tag(min_input, max_input, 0, 0, false);
						// }		
					}
				});

				slider.find('.range__input').on({
					"change keyup input": function() {
						let minval = min_input.val() ? Number(min_input.val()) : min,
							maxval = max_input.val() ? Number(max_input.val()) : max;

							if (maxval < minval)
								maxval = minval

						path.slider("values", 0, minval);
						path.slider("values", 1, maxval);	

						active_set(min, max, path)				
					},
					"focusout" : function() {

						let minval = min_input.val() ? Number(min_input.val()) : min,
							maxval = max_input.val() ? Number(max_input.val()) : max;

						if($(this).val() != ""){
							if($(this).hasClass('range__input_min')){
								$(this).val(path.slider( "values", 0 ))
								if (maxval < minval)
									max_input.val(minval)
							}else{
								$(this).val(path.slider( "values", 1 ))
							}
						}
					}
				})
			})
		},


	},

	validate: () => {
		$("form").each((i, el) => {
			var $form = $(el);

			$form.validate({
				errorPlacement: function(error, element) { 
					//just nothing, empty  
				},
				highlight: (element, errorClass, validClass) => {
					$(element).parent().addClass(errorClass).removeClass(validClass);
				},
				unhighlight: (element, errorClass, validClass) => {
					$(element).parent().removeClass(errorClass).addClass(validClass);
				},
				submitHandler: (form) => {

					var data = $(form).serialize();

					$.ajax({
						type: 'POST',
						url: '/app/mail/',
						data: data,
						success: function(data) {
							$(form)[0].reset()
						}
					});

				},             
				rules: {
					phone:{
						required: true,
						minlength: 10,
					},  
				}		
			})

		})
	},

	events: () => {
		$('.form__input')
			.on('focus', (e)=>{
				let $input = $(e.target)
				$input.parent().addClass('is-focus')
			})
			.on('blur change', (e)=>{
				let $input = $(e.target)

				if($input.val() == '')
					$input.parent().removeClass('is-focus')
		 	})		
	},

	init: () => {

		forms.mask();
		forms.select();
		forms.dropzone.init();
		forms.validate();
		forms.price.init();
		forms.events();

		$('.js-number').on('keypress keyup blur', forms.number);
		$('.js-dropzone-trigger').on('click', e => {
			let area = $(e.currentTarget).closest('.js-dropzone');
			forms.dropzone.trigger(area)
		});

	}

}

export {forms};