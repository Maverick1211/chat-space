  function search_resultHTML(users) {
    function each_user_resultsHTML(user) {
      var user_name = $('<p class="chat-group-user__name">').append(user.name);
      var a_tag = $('<a href="", class = "user-search-add chat-group-user__btn chat-group-user__btn--add">').attr({'id': "chat-group-user-add-url-" + user.id}).attr({ 'data-user-id': user.id, 'data-user-name': user.name }).append("追加")
      var list = $('<div class="chat-group-user clearfix">').attr({'id': "chat-group-user-add-" + user.id}).append(user_name).append(a_tag)
      return  list.prop('outerHTML');
    }
    var lists = users.reduce(function(prev, user, index){
      return prev + each_user_resultsHTML(user);
    },"");
    var html = $(lists).wrapAll('<div id="user-search-result">');
    return html;
  };


  function add_resultHTML(user) {
    var input = $('<input name="group[user_ids][]" type="hidden">').attr({'value': user.id})
    var user_name_tag = $('<p class="chat-group-user__name">').append(user.name);
    var a_tag = $('<a href="", class = "user-search-add chat-group-user__btn chat-group-user__btn--remove">').attr({'id': "chat-group-user-remove-url-" + user.id}).attr({ 'data-user-id': user.id}).append("削除")
    var html = $('<div class="chat-group-user clearfix">').attr({'id': "chat-group-user-remove-" + user.id}).append(input).append(user_name_tag).append(a_tag)
    return html;
  };


  function ajaxSearch(input) {
    $.ajax({
      url: "/search",
      type: "GET",
      data: {
        keyword: input
      },
        dataType: 'json'
    })
    .done(function(data) {
      html = search_resultHTML(data.users);
      $("#user-search-result").html(html);

      $(document).on("click", ".chat-group-user__btn--add", function(e){
        e.preventDefault();
        $(this).parent().remove();
        var user = { id: $(this).data('user_id'), name: $(this).data('user-name') }
        add_member_html = add_resultHTML(user);
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

$(window).on('load', function(){
  var preFunc = null;
  $('.chat-group-form__search').on('keyup', function(){
    input = $.trim($('.search_form').val());
    clearTimeout(preFunc);
    preFunc = setTimeout(ajaxSearch(input), 500);
  });
});
