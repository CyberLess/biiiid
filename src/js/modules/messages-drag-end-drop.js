import { messageHeight } from "./message-height";
import {forms} from "./forms";

var messagesDragAndDrop = {
  $dropArea: '',
  $dropzone: '',

  dropzoneDropContainer: () => {
    const container = `<div class="dropzone-drop-container"
      style="
        width: ${messageHeight.$dialogWrap.width()}px;
        height: ${messageHeight.$dialogWrap.outerHeight() + messageHeight.$send.outerHeight() + parseFloat(messageHeight.$send.css('margin-top'))}px;
        top: ${messageHeight.$dialogWrap.offset().top}px;
        left: ${messageHeight.$dialogWrap.offset().left}px;
      ">
      Перетащите сюда ваши файлы и мы загрузим их в сообщение.
    </div>`;

    return container;
  },

  onDragStart: (evt) => {
    evt.stopPropagation();
    messagesDragAndDrop.$dropArea
      .on('dragenter', function () {
        if (messagesDragAndDrop.$dropzone.find('.dropzone-drop-container')) {
          messagesDragAndDrop.$dropzone.find('.dropzone-drop-container').remove();
        }

        messagesDragAndDrop.$dropzone.prepend(messagesDragAndDrop.dropzoneDropContainer());
        const container = messagesDragAndDrop.$dropzone.find('.dropzone-drop-container');

        container.css({
          height: `${messageHeight.$dialogWrap.outerHeight() + messageHeight.$send.outerHeight() + parseFloat(messageHeight.$send.css('margin-top'))}px`})
          .on('dragenter', function (evt) {
            evt.preventDefault();
            evt.stopPropagation();

            $(this).css({
              border: '1px dashed #000000',
              backgroundColor: '#e7e9ec'
            });
          });

        container.on('dragleave', function (evt) {
          evt.preventDefault();
          evt.stopPropagation();

          $(this).css({
            border: '',
            backgroundColor: ''
          });
        });
      })
      .on('dragover', function (evt) {
        return false;
      })
      .on('drop', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        messagesDragAndDrop.$dropzone.trigger('dragleave');
      });
  },

  onDrop: () => {

    messagesDragAndDrop.$dropArea.trigger('dragover');

    messagesDragAndDrop.$dropzone.find('.dropzone-drop-container')
      .fadeOut(200, function () {
        $(this).off().remove();
    });
  },

  setDropListeners: () => {
    messagesDragAndDrop.$dropArea.on('dragenter', messagesDragAndDrop.onDragStart);
    messagesDragAndDrop.$dropArea.on('drop', messagesDragAndDrop.onDrop);
    messagesDragAndDrop.$dropArea.click(messagesDragAndDrop.onDrop);
    messagesDragAndDrop.$dropzone.on('drop', messagesDragAndDrop.onDrop);
    messagesDragAndDrop.$dropzone.on('dragleave', messagesDragAndDrop.onDrop);
  },

  init: () => {
    messagesDragAndDrop.$dropArea = $('body');
    messagesDragAndDrop.$dropzone = $('.dialog-form__dropzone .dropzone__area');
    messagesDragAndDrop.setDropListeners();
  }
};

export { messagesDragAndDrop };
