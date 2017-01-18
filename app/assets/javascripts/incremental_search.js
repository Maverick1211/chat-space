  function each_user_resultsHTML(user) {
    return  '<div class="chat-group-user clearfix", id="chat-group-user-add-'+ user.id + '">' +
              '<p class="chat-group-user__name">' +
              user.name +
              '</p>' +
              '<a class = "user-search-add chat-group-user__btn chat-group-user__btn--add", id="chat-group-user-add-url-'+ user.id + '"data-user-id="' + user.id + '"data-user-name="' + user.name + '">追加' +
              '</a>' +
            '</div>';
  }

  function search_resultHTML(users) {
    var lists = users.reduce(function(prev, user){
      return prev + each_user_resultsHTML(user);
    },"");
    var html = $(lists).wrapAll('<div id="user-search-result">');
    return html;
  };


  function add_resultHTML(user) {
    return  '<div class="chat-group-user clearfix", id="chat-group-user-remove-'+ user.id + '">' +
              '<input name="group[user_ids][]" type="hidden" value="' + user.id + '">' +
              '<p class="chat-group-user__name">' +
                user.name +
              '</p>' +
              '<a class = "user-search-add chat-group-user__btn chat-group-user__btn--remove" id="chat-group-user-remove-url-' + user.id + '"data-user-id="' + user.id + '">削除' +
              '</a>' +
            '</div>';
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
        var user = { id: $(this).data('user-id'), name: $(this).data('user-name') }
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
    input = $.trim($('#user-search-field').val());
    console.log(input);
    clearTimeout(preFunc);
    ajaxSearch(input);
  });
});
