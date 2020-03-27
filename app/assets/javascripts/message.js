$(function(){

  var buildHTML = function(message){
    var html =
      `<div class="message" data-message-id=${message.id}>
      <div class="message__info">
        <div class="message__info--name">
          ${message.user_name}
        </div>
        <div class="message__info--date-time">
          ${message.created_at}
        </div>
      </div>
      <div class="message__text">
      `

    if (message.content && message.image) {
      var html = html
        `<p class="message__text--plaintext">
          ${message.content}
        </p>
        <img src="${message.image}" class="message__text--image">
        `
    } else if (message.content) {
      var html = html +
        `<p class="message__text--plaintext">
          ${message.content}
        </p>
        `
    } else if (message.image) {
      var html = html +
        `<img src="${message.image}" class="message__text--image" >`
    };
    var html = html + `</div>`
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

  var reloadMessages = function(){
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});