$(function() {
  function buildHTML(message) {
    var html = $('<p class ="chat-message__body">').append(message.body);
    // console.log(html);
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
      // console.log(html);
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

