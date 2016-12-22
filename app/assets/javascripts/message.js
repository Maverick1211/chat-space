$(function() {
  function buildHTML(todo) {
    var html = $('<p class="chat-message__body">').append(message.body);
    return html;
  }

  $('.submit-btn').on('submit', function(e) {
    e.preventDefault();
    var textField = $('.chat-footer__body');
    var message = textField.val();
    $.ajax({
      type: 'POST',
      url: './messages.json',
      data: {
        message: {
          body: message
        }
      },
      dataType: 'json'
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.chat-messages').append(html);
      textField.val('');
    })
    .fail(function() {
      notice('please create again');
    });
  });
});
