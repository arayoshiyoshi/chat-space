$(function(){
  function buildHTML(message){
    if(message.image){
      // 画像があるとき
      var html =
        `<div class='message'>
          <div class='message__info'>
            <div class='message__info--name'>
              ${message.user_name}
            </div>
            <div class='message__info--date-time'>
              ${message.created_at}
            </div>
          </div>
          <div class='message__text'>
            <p class='message__text--plaintext'>
              ${message.content}
            </p>
            <p>
              <img class="message__text--image" src="${message.image}" alt="Test image" />
            </p>
          </div>
        </div>`
    }else{
      // 画像がないとき
      var html = 
        `<div class='message'>
          <div class='message__info'>
            <div class='message__info--name'>
              ${message.user_name}
            </div>
            <div class='message__info--date-time'>
              ${message.created_at}
            </div>
          </div>
          <div class='message__text'>
            <p class='message__text--plaintext'></p>
              ${message.content}
            </p>
          </div>
        </div>`
    }
    return html;
  }

  $('#new_post').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
  })
});