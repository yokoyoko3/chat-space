$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="upper-message>
                    <div class="upper-message__user-name">
                      ${message.user}
                    </div>
                    <div class="upper-message__data">
                    ${message.data}
                    </div>
                  </div>
                  <div class="lower-message">
                    <div class="lower-message__content">
                      ${message.content}
                    </div>
                  </div>
                  <div>
                    <img class="lower-message__image" alt="${message.image}">
                    </div>
                  </div>`
                  return html;
    } else {
      var html = `<div class="upper-message>
                    <div class="upper-message__user-name">
                      ${message.user}
                    </div>
                    <div class="upper-message__data">
                    ${message.data}
                    </div>
                  </div>
                  <div class="lower-message">
                    <div class="lower-message__content">
                      ${message.content}
                    </div>
                  </div>`
                  return html;            
    }
  }
  $(".new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      console.log(html)
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.form__message').val('');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});

