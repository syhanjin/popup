document.addEventListener('DOMContentLoaded', function () {
    window.P = new Popup('popup');
})

class Popup {
    constructor(id) {
        var d = document.createElement('div');
        d.id = id;
        d.className = 'popup';
        d.style.display = 'none';
        document.body.appendChild(d);
        this.p = $(d);
        this.id = id;
        this.d = d;
        function fn(obj) {
            return function (e) {
                if (
                    e.target.className.indexOf('close') > -1 &&
                    e.target.className.indexOf('disabled') == -1
                ) obj.close(e);
            }
        }
        d.onclick = fn(this);
    }
    open(w = 320, h = 300, e,
        close_callback, callback, options = {
            btn: 'yes',
            up_offset: 15
        }) {
        if (this.opened) this.close();
        this.opened = true;
        if (close_callback && typeof close_callback == 'object' && close_callback.length === undefined) {
            options = close_callback;
            close_callback = null;
        }
        if (callback && typeof callback == 'object' && callback.length === undefined) {
            options = callback;
            callback = null;
        }
        options.btn = options.btn || 'yes';
        options.up_offset = options.up_offset || 25;
        this.e = e;
        this.close_callback = close_callback || function () { };
        var layout = document.createElement('div');
        layout.className = 'popup-layout';
        document.body.appendChild(layout);
        this.p.empty()
            .css({
                'width': (w > 80 ? w : 80) + 'px',
                'height': (h > 50 ? h : 50) + 'px',
                'top': '-' + (options.up_offset + 5) + 'px'
            }).show();
        this.layout = $(layout).animate({ 'opacity': '0.2' }, 300, 'linear');
        this.p.animate({
            'top': '-' + (options.up_offset) + 'px',
            'opacity': '1'
        }, 300, 'linear');
        this.d.innerHTML = '<div class="p-header"><div id="p-close" class="close"></div></div>'
        if (typeof e === typeof '')
            this.d.innerHTML += e;
        else
            this.d.appendChild(e);
        if (options.btn == 'yes') {
            this.d.innerHTML += '<div class="close">好的</div>'
        } else if (options.btn == 'yes-no') {
            this.d.innerHTML +=
                `<div class="choice-box">
                    <div class="close choice yes" data-rel="yes"></div>
                    <div class="close choice no" data-rel="no"></div>
                </div>`
        } else if (options.btn == 'none') {

        }
        (callback || function () { })();
    }
    close(e) {
        var rel, callback = this.close_callback;
        this.opened = false;
        if (e && e.preventDefault)
            rel = e.target.getAttribute('data-rel')
        else rel = e;
        // 因为..历史原因?...回调返回true则不执行
        if (callback(rel)) return;
        // this.p.children().hide();
        var layout = this.layout.animate({ 'opacity': '0' });
        this.p.animate({
            'top': '-150px',
            'opacity': '0'
        }, 300, 'linear', function () {
            layout.remove();
            $(this).hide();
        });
    }
}