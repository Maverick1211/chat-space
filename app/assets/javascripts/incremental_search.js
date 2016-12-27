$(window).on('load', function(){
  function buildHTML(users) {
    var lists = "";
    var html;
    $.each(users, function(index, user){
      var user_name = $('<p class="chat-group-user__name">').append(user.name);
      var a_tag = $('<a href="", class = "user-search-add chat-group-user__btn chat-group-user__btn--add">').append("追加")
      var list = $('<div class="chat-group-user clearfix">').append(user_name).append(a_tag)
      var list = list.prop('outerHTML');
      lists += list
    });
    var html = $(lists).wrapAll('<div id="user-search-result">');
    return html;
  }
  var preFunc = null,
  ajaxSearch = function(input) {
    $.ajax({
      url: "/search",
      type: "GET",
      data: {
        keyword: input
      },
        dataType: 'json'
    })
    .done(function(data) {
      html = buildHTML(data.users);
      $("#user-search-result").html(html);

      })
    .fail(function() {
      alert('please create again');
    });
  };
  $('.chat-group-form__search').on('keyup', function(){
    input = $.trim($('.search_form').val());
      clearTimeout(preFunc);
      preFunc = setTimeout(ajaxSearch(input), 500);
  });
});
