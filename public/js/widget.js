var wrgsv = {
    // идентификатор HTML элемента в который будет размещен виджет 
    idBox: 'wrgsv',
    // путь до страницы возвращающей виджет 
    url_wiget: 'https://n8n-agent-emelnikov62.amvera.io/webhook/getWidget',
    // путь до страницы стилей виджета 
    url_style: 'https://n8n-agent-emelnikov62.amvera.io/webhook/widget.css',
    url_api: 'https://n8n-agent-emelnikov62.amvera.io/webhook/api.js',
    url_jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js',
    // метод инициализации виджета 
    init: function (id) {
        // если идентификатор отсутствует, то будем использовать 
        // идентификатор HTML элемента для размещения виджета по умолчанию (т.е. "wrgsv") 
        if (!id) { id = this.idBox; }
        if (document.getElementById(id)) {
            // подключаем стили виджета 
            this.addStyle();
            this.addJquery();
            try {
                // для кросс-доменного запроса создаем один из ниже указанных объектов 
                var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
                // создаем экземпляр объекта 
                var xhr = new XHR();
                // запрос на другой домен (асинхронный) 
                xhr.open('GET', this.url_wiget, true);
                // событие отслеживает, что запрос был успешно завершён 
                xhr.onload = function () {
                    // если существует ответ 
                    if (this.response) {
                        // добавляем полученный ответ в HTML элемент 
                        var json = JSON.parse(this.response);
                        document.getElementById(id).innerHTML = json[0].html;

                        api = document.createElement('script');
                        api.type = 'text/javascript';
                        api.src = 'https://n8n-agent-emelnikov62.amvera.io/webhook/api.js';
                        document.head.appendChild(api);
                    }
                }
                xhr.onerror = function () { console.log('onerror ' + this.status); }
                // отсылаем запрос 
                xhr.send();
            } catch (e) { }
        }
        // если на странице не существует HTML элемента с указаным идентификатором 
        // выводим сообщение: блок с идентификатором id="id" отсутствует 
        else { console.log('The specified block id="' + id + '" is missing'); }
    },
    // метод подключения стилей виджета 
    addStyle: function () {
        style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = this.url_style;
        document.head.appendChild(style);
    },
    addJquery: function () {
        jquery = document.createElement('script');
        jquery.type = 'text/javascript';
        jquery.src = this.url_jquery;
        document.head.appendChild(jquery);
    }
}; 