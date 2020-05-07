import { config } from "../config";
import { messageSend } from "./message-send";

var bill = {
  BACKSPACE_KEYCODE: 8,
  prevValue: '',


  $form: $('.bill__form'),
  $priceInput: $('.bill__price-input'),
  $textareaCharsQuantity: $('.bill__chars-current'),
  $billTextarea: $('.bill__textarea'),
  $quantitySelect: $('#how-much-field'),
  $hoursDaysSelect: $('#hours-days-field'),
  $quantitySelectric: $('.bill__form-select_quantity'),
  $hoursDaySelectric: $('.bill__form-select_hours-days'),
  $closeBtn: $('.bill__close-btn'),

  onHoursDaySelectricChange: ($changedSelectric) => {
    $changedSelectric.find('.selectric .label').text($changedSelectric.find('.selectric-scroll .selected').text());
  },

  onTimeQuantityChange: ($quantitySelect, $changedSelect, $changedSelectric) => {
    let quantityToTime = ['День', 'Час'];
    const $options = $changedSelect.find('option');

    switch (true) {
      case $quantitySelect.val() > 1 && $quantitySelect.val() < 5:
        quantityToTime = ['Дня', 'Часа'];
        break;
      case $quantitySelect.val() >= 5:
        quantityToTime = ['Дней', 'Часов'];
        break;
    }

    $($options[0]).val(quantityToTime[0]).text(quantityToTime[0]);
    $($options[1]).val(quantityToTime[1]).text(quantityToTime[1]);
    $changedSelectric.find('.selectric-scroll li[data-index=0]').text(quantityToTime[0]);
    $changedSelectric.find('.selectric-scroll li[data-index=1]').text(quantityToTime[1]);
    $changedSelectric.find('.selectric .label').text($changedSelectric.find('.selectric-scroll .selected').text());
  },

  onBackspaceKeydown: (evt, currentElem) => {
    if (evt.keyCode === bill.BACKSPACE_KEYCODE && currentElem.value.length === 1) {
      bill.prevValue = '';
      currentElem.value = bill.prevValue;
    }
  },

  setAndRangeNumberOnInput: (element) => {
    const lastChar = element.value[element.value.length - 1];

    element.value = element.value
      .replace(/[A-Za-zА-Яа-яЁё]/, '')
      .replace(/\D/, '');

    if (element.value !== '' && $.isNumeric(lastChar)) {
      bill.prevValue = Number(element.value.replace(/\s/g, ''));
      element.value = config.numberWithSpaces(Number(element.value.replace(/\s/g, '')));
    } else {
      element.value = config.numberWithSpaces(bill.prevValue);
    }
  },

  countCharsOnInput: (input, output) => {
    output.text(input.val().length);
  },

  resetForm: () => {
    bill.$quantitySelect.find('option:first').attr('selected', 'selected');
    bill.$quantitySelect.val(bill.$quantitySelect.find('option:first').val());
    bill.$quantitySelect.trigger('change');
    bill.$priceInput.val('');
    bill.$billTextarea.val('');
    bill.$quantitySelectric.find('.selectric .label').text('1');
    bill.$billTextarea.trigger('input');
    $(bill.$form)[0].reset();
  },

  onBillFormSubmit: () => {
    messageSend.onFormSubmit();
    bill.$closeBtn.trigger('click');
    setTimeout(bill.resetForm, 1000);
  },

  init: () => {
    bill.$priceInput
      .on('input', function () {
      bill.setAndRangeNumberOnInput($(this)[0]);
    })
      .on('keydown', function (evt) {
        bill.onBackspaceKeydown(evt, this);
      });

    bill.$billTextarea.on('input', function () {
      bill.countCharsOnInput($(this), bill.$textareaCharsQuantity);
    });

    bill.$quantitySelect.on('change', function () {
      bill.onTimeQuantityChange(bill.$quantitySelect, bill.$hoursDaysSelect, bill.$hoursDaySelectric);
    });

    bill.$hoursDaySelectric.on('change', function () {
      bill.onHoursDaySelectricChange(bill.$hoursDaySelectric);
    });

    bill.$form.on('submit', function () {
      if ($(this).find('.error').length === 0) {
        bill.onBillFormSubmit();
      }
    });
  }
};

export { bill };
