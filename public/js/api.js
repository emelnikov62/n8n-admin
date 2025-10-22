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
        $('.add_record_btn').click(() => {
            $('.chat-input-text').val($('.add_record_btn').text());
            $('.chat-input-send-button').click();
        });

        $('.cancel_record_btn').click(() => {
            $('.chat-input-text').val($('.cancel_record_btn').text());
            $('.chat-input-send-button').click();
        });
    });
}, 500);

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
    var id = Math.floor(Math.random(10000000000) * 10000000000);
    var message = $(`<div class="chat-message chat-message-from-bot"><div class="chat-message-markdown"><p>${text}</p></div><span class="speech-root" id="speech-${id}"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_144)"> <rect width="24" height="24" fill="none"></rect> <rect x="9.5" y="3.5" width="5" height="12" rx="2.5" stroke="#000000" stroke-linejoin="round"></rect> <path d="M17 12V13C17 15.7614 14.7614 18 12 18V18C9.23858 18 7 15.7614 7 13V12" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 18V21M12 21H9M12 21H15" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_15_144"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg></span></div>`)
    $('.chat-messages-list').append(message);
    $(`#speech-${id}`).on('click', function () {
        syntezSpeech(text);
    });
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

function syntezSpeech(text) {
    $.post({ url: 'https://n8n-agent-emelnikov62.amvera.io/webhook/syntez-speech', crossDomain: true, timeout: 30000, data: { text: text } })
        .done(function (data) {
            if (data.status.toLocaleLowerCase() == 'SUCCESS'.toLocaleLowerCase()) {
                var snd = new Audio("data:audio/wav;base64," + data.audio_data);
                snd.play();
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.error(errorThrown);
        });
}
