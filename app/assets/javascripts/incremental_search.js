$(window).on('load', function(){
  function buildHTML(users) {
    var lists = [];
    $.each(users, function(index, user){
      var user_name = $('<p class="chat-group-user__name">').append(user.name);
      var a_tag = $('<a href="", class = "user-search-add chat-group-user__btn chat-group-user__btn--add">').attr({'id': "chat-group-user-add-url-" + user.id}).attr({ 'data-user-id': user.id, 'data-user-name': user.name }).append("追加")
      var list = $('<div class="chat-group-user clearfix">').attr({'id': "chat-group-user-add-" + user.id}).append(user_name).append(a_tag)
      var list = list.prop('outerHTML');
      lists.push(list);
    });
    reduce_lists = lists.reduce(function(x, y){
      return x + y;
    });
    var html = $(reduce_lists).wrapAll('<div id="user-search-result">');
    return html;
  }


  function buildAddHTML(user_id, user_name) {
    var input = $('<input name="group[user_ids][]" type="hidden">').attr({'value': user_id})
    var user_name_tag = $('<p class="chat-group-user__name">').append(user_name);
    var a_tag = $('<a href="", class = "user-search-add chat-group-user__btn chat-group-user__btn--remove">').attr({'id': "chat-group-user-remove-url-" + user_id}).attr({ 'data-user-id': user_id}).append("削除")
    var html = $('<div class="chat-group-user clearfix">').attr({'id': "chat-group-user-remove-" + user_id}).append(input).append(user_name_tag).append(a_tag)
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

      $(document).on("click", ".chat-group-user__btn--add", function(e){
        e.preventDefault();
        $(this).parent().remove();
        var user_id = $(this).data('user-id');
        var user_name = $(this).data('user-name');
        add_member_html = buildAddHTML(user_id, user_name);
        $("#chat-group-users").append(add_member_html);
      });

      $(document).on("click", ".chat-group-user__btn--remove", function(e){
        e.preventDefault();
        $(this).parent().remove();
      });
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
