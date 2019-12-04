$(function() {

  function addUsers(user) {
    let html = `
    <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  </div>
`;
    $("#user-search-result").append(html);
  }
  function addNoUser() {
    let html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">ユーザーが見つかりません</p>
    </div>
  `;
    $("#user-search-result").append(html);
  }

  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      dataType: 'json',
      data:{ keyword: input },
    })
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            addUsers(user);
          });
        } else if (input.length == 0){
          return false;
        } else {
          addNoUser();
        }
      })
      .fail(function() {
        alert("失敗です");
      });
  });
  function appUser( name, id ){
    console.log(name)
    console.log(id)
    var html = `
    <div class='chat-group-user'>
      <input name='group[user_ids][]' type='hidden' value='${id}'>  
      <p class='chat-group-user__name'>${name}</p>
      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>`
    $("#chat-group-users").append(html)
  }
  
  $(document).on("click",".user-search-add",function(){
    
    var userId = $(this).data('user-id')
    var userName = $(this).data('user-name')
    appUser( userName,userId )
  
    console.log(userName)
    $(this).parent().remove();  

  });

  $(document).on("click",".user-search-remove",function(){

    $(this).parent().remove();
  });
});