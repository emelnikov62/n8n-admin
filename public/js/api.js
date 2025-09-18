var sessionId = Math.floor(Math.random(10000000000) * 10000000000);

setTimeout(() => {
    $(document).ready(() => {
        $('.chat-window-toggle').click(() => {
            showChat();
        });

        $('.chat-input-send-button').click(() => {
            sendMessage();
        });

        $('.chat-input-text').keypress(function (e) {
            if (e.which == 13) {
                $('.chat-input-send-button').click();
                return false;
            }
        });
    });
}, 100);

function showChat() {
    if ($('.chat-window').is(':hidden')) {
        $('.chat-window').show();
        $('.chat-window-toggle-btn-hide').removeClass('hide');
        $('.chat-window-toggle-btn-show').addClass('hide');
    } else {
        $('.chat-window').hide();
        $('.chat-window-toggle-btn-hide').addClass('hide');
        $('.chat-window-toggle-btn-show').removeClass('hide');
    }
}

function sendMessage() {
    changeButtonStatus(true);

    var text = $('.chat-input-text').val();
    addUserMessage(text);
    var wait = addWait();
    scrollMessageList();

    $.post({ url: 'https://n8n-agent-emelnikov62.amvera.io/webhook/receivedMessage', crossDomain: true, timeout: 30000, data: { message: text, sessionid: sessionId, id: 2 } })
        .done(function (data) {
            removeWait();
            addBotMessage(data);
            scrollMessageList();
            changeButtonStatus(false);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.error(errorThrown);
            removeWait();
        });
}

function addBotMessage(text) {
    var message = $(`<div class="chat-message chat-message-from-bot"><div class="chat-message-markdown"><p>${text}</p></div></div>`)
    $('.chat-messages-list').append(message);
}

function addUserMessage(text) {
    var message = $(`<div class="chat-message chat-message-from-user"><div class="chat-message-markdown"><p>${text}</p></div></div>`)
    $('.chat-messages-list').append(message);

    $('.chat-input-text').val('');
}

function addWait() {
    var wait = $(`<div class="chat-message chat-message-from-bot chat-message-typing chat-message-typing-animation-bouncing" data-test-id="chat-message-typing"><!----><div class="chat-message-typing-body"><span class="chat-message-typing-circle"></span><span class="chat-message-typing-circle"></span><span class="chat-message-typing-circle"></span></div></div>`);
    $('.chat-messages-list').append(wait);

    return wait;
}

function removeWait() {
    $('.chat-message-typing').remove();
}

function changeButtonStatus(status) {
    $('.chat-input-send-button').prop('disabled', status);
}

function scrollMessageList() {
    $('.chat-messages-list').animate({ scrollTop: $('.chat-messages-list')[0].scrollHeight }, 1000);
}
