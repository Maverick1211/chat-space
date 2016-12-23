$(function() {
  function buildHTML(message) {
    var body = $('<p class ="chat-message__body">').append(message.message_body);
    var name = $('<p class ="chat-message__header__name">').append(message.message_name);
    var time = $('<p class ="chat-message__header__time">').append(message.message_time);
    var header = $('<div class ="chat-message__header">').append(name).append(time);
    var html = $('<li class ="chat-message">').append(header).append(body);
    return html;
  }

  $('.chat-footer').on('submit', function(e) {
    e.preventDefault();
    var textField = $('#message_body');
    // console.log(textField);
    var message = textField.val();
    // console.log(message);
    $.ajax({
      type: 'POST',
      url: './messages',
      data: {
        message: {
          body: message
        }
      },
      dataType: 'json'
    })
    .done(function(data) {
      var html = buildHTML(data);
      chat_messages = $('.chat-messages').append(html);
      // console.log(chat_messages);
      textfield = textField.val('');
      // console.log(textfield);
    })
    .fail(function() {
      alert('please create again');
    });
  });
});

