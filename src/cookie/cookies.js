class Cookies {
    set(k, v, opts = {}) {
        if (!k || /^(?:expires|max-age|path|domain|secure)$/i.test(k)) { 
            return false; 
        }

        var cookie = encodeURIComponent(k) + "=" + encodeURIComponent(v);
        if (opts.expires) {
            switch (opts.expires.constructor) {
                case Number:
                    cookie += opts.expires === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + opts.expires;
                    break;
                case String:
                    cookie += "; expires=" + opts.expires;
                    break;
                case Date:
                    cookie += "; expires=" + opts.expires.toUTCString();
                    break;
                default:
                    break;
            }
        }
        if(opts.domain) {
            cookie += "; domain=" + opts.domain;
        }
        if(opts.path) {
            cookie += "; path=" + opts.path;
        }
        if(opts.secure) {
            cookie += "; secure";
        }
        document.cookie = cookie;
        return true;
    }
    get(k) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(k).replace(/[-.+*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    }
    del(k, opts) {
        if (!k || !this.exists(k)) { 
            return false; 
        }
        document.cookie = encodeURIComponent(k) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (opts.domain ? "; domain=" + opts.domain : "") + (opts.path ? "; path=" + opts.path : "");
        return true;
    }
    keys() {
        var keys = document.cookie.replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:=[^;]*)?;\s*/);
        for (var i = 0, l = keys.length; i < l; i++) { 
            keys[i] = decodeURIComponent(keys[i]); 
        }
        return keys;
    }
    exists(k) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(k).replace(/[-.+*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    }
}
export default (new Cookies());
