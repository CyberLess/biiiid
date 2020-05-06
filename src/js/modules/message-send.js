import { messagePre } from "./message-pre";
import { setDialogContent } from "./set-dialog-content";
import { setDialogHeader } from "./set-dialog-header";
import { messagesScroll } from "./messages-scroll";
import { getMessages } from "./get-messages";
import { player } from "./player";
import { messageVideo } from "./message-video";
import { bill } from "./bill";
import { config } from "../config";

var messageSend = {
  ENTER_KEYCODE: 13,
  pressed: [],

  $dialogForm: $('.dialog-form.send__form'),
  $textarea: $('.dialog-form__message-text'),

  removingClasses: [
    'messages-pre__message_read',
    'messages-pre__message_delivered',
    'messages-pre__message_unread'
  ],

  setSendTextInPreItem: (text) => {
    if (window.messages.currentMessageUserId) {
      const currentText = messagePre.cropMessageText(text);
      const $currentItem = $(`.messages-pre__dialog-link[data-user-id=${window.messages.currentMessageUserId}]`).parent();
      const $textElem = $currentItem.find('.messages-pre__prev-text');

      messageSend.removingClasses.forEach((elemClass) => {
        if ($currentItem.hasClass(elemClass)) {
          $currentItem.removeClass(elemClass);
        }
      });

      $textElem.text(`Вы: ${currentText}`);
    }
  },

  cleanTextarea: () => {
    messageSend.$textarea.val('');
    $('.dialog-form .dropzone__area').children('.dropzone__item').find('.js-remove-file').trigger('click');
    messageSend.$textarea.trigger('input');
  },

  pushMessageInDialog: (data, $messageTemplate) => {
    const $newMessage = setDialogContent.makeMessage (
      data['authorName'],
      data['avatarData'],
      data['messageData'],
      $messageTemplate
    );

    $(setDialogHeader.fragment).append($newMessage);
    $('.dialog').append($(setDialogHeader.fragment));
    messagesScroll.onDialogOpen();
    player.init();
    messageVideo.init();
    getMessages.debugSvgInDialog();
  },

  createFilesArray: () => {
    const videoFormats = ['avi', 'mkv', 'mov', 'mp4', 'mpeg', 'mpg', 'mts'];

    const $filesItems = $('.dialog-form .dropzone__area').children('.dropzone__item');

    if ($filesItems.length > 0) {
      const fileNames = [];
      const fileSizes = [];
      const fileTypes = [];

      for (let i = 0; i < $filesItems.length; i += 1) {
        const name = $($filesItems[i]).find('[data-dz-name]').text();
        fileNames.push(name);
        fileSizes.push($($filesItems[i]).find('[data-dz-size]').text());

        const splitedName = name.split('.');
        const format = splitedName[splitedName.length - 1];

        if (videoFormats.includes(format)) {
          fileTypes.push('video');
        } else {
          fileTypes.push('document');
        }
      }

      const files = [];

      for (let i = 0; i < fileNames.length; i += 1) {
        if (fileTypes[i] === 'video') {
          files.push({
            'name': fileNames[i],
            'prevImage': fileNames[i].split('.')[0],
            'type': fileTypes[i],
            'size': fileSizes[i]
          });
        } else {
          files.push({
            'name': fileNames[i],
            'type': fileTypes[i],
            'size': fileSizes[i]
          });
        }
      }

      return files;
    }

    return '';
  },

  getBillSendData: () => {
    if (bill.$billTextarea.val() === '') {
      return '';
    }

    return {
      title: bill.$billTextarea.val(),
      price: `${config.numberWithSpaces(bill.$priceInput.val())},00`,
      time: `${bill.$quantitySelect.val()} ${bill.$hoursDaySelectric.find('.selectric .label').text().toLowerCase()}`
    }
  },

  onFormSubmit: () => {
    const newMessageData = {
      authorName: 'Я',
      avatarData: 'avatar-me',
      messageData: {
        messageAuthor: 'me',
        status: 'no-opened',
        text: messageSend.$textarea.val(),
        files: messageSend.createFilesArray(),
        sendDate: new Date(),
        bill: messageSend.getBillSendData()
      }
    };

    const elementsLength = messageSend.$dialogForm.find('.dropzone__item').length - 1;

    if (messageSend.$textarea.val() !== '' || elementsLength !== 0 || messageSend.bill !== '') {
      messageSend.pushMessageInDialog(newMessageData, setDialogContent.init.$myMessageTemplate);

      if (elementsLength !== 0) {
        let filesText = 'файлов';

        switch (true) {
          case elementsLength < 2:
            filesText = 'файл';
            break;
          case elementsLength > 1 && elementsLength < 5:
            filesText = 'файла';
            break;
        }

        messageSend.setSendTextInPreItem(`${elementsLength} ${filesText}`)
      } else {
        messageSend.setSendTextInPreItem(messageSend.$textarea.val());
      }
    }

    messageSend.cleanTextarea();
  },

  onEnterKeydown: (evt) => {
    messageSend.pressed.push(evt.keyCode);

    if (evt.keyCode === messageSend.ENTER_KEYCODE && messageSend.pressed.length < 2) {
      evt.preventDefault();

      if (messageSend.$textarea.val().replace(/\s/g, '') !== '') {
        messageSend.$dialogForm.submit();
      }
    }
  },

  init: () => {
    messageSend.$dialogForm.on('submit', messageSend.onFormSubmit);
    messageSend.$textarea.on('keydown', messageSend.onEnterKeydown)
      .on('keyup', (evt) => {
        while (messageSend.pressed.includes(evt.keyCode)) {
          const index = messageSend.pressed.indexOf(evt.keyCode);
          messageSend.pressed.splice(index);
        }
      });
  }
};

export { messageSend };
