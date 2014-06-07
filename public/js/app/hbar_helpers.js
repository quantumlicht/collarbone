define(["app", "handlebars"], function(app, Handlebars){

	Handlebars.registerHelper('formatDate', function(to_check) {
        var SECOND_IN_MS = 1 *1000,
        MINUTE_IN_MS     = 60 * SECOND_IN_MS,
        HOUR_IN_MS       = 60 * MINUTE_IN_MS,
        DAY_IN_MS        = 24 * HOUR_IN_MS,
        YEAR_IN_MS       = 365 * DAY_IN_MS;

        var now = new Date().getTime();
        // console.log('now', now);
        var date = new Date(to_check).getTime();
        // console.log('date', date);
        var diff = now - date;

        // console.log('formatDate', 'diff', diff);

        if (diff < SECOND_IN_MS) {
            return 'Just now';
        }
        else if (diff < MINUTE_IN_MS) {
            res = (diff / SECOND_IN_MS).toFixed();
            suffix = res == 1 ? ' second ago': ' seconds ago';
            return res + suffix;
        }
        else if (diff < HOUR_IN_MS) {
            res = (diff / MINUTE_IN_MS).toFixed();
            suffix = res == 1 ? ' minute ago': ' minutes ago';
            return res + suffix;
        }
        else if (diff < DAY_IN_MS) {
            res = (diff / HOUR_IN_MS).toFixed();
            suffix = res == 1 ? ' hour ago': ' hours ago';
            return res + suffix;
        }
        else if (diff < YEAR_IN_MS) {
            res = (diff / DAY_IN_MS).toFixed();
            suffix = res == 1 ? ' day ago': ' days ago';
            return res + suffix;
        }
        else if (diff > YEAR_IN_MS) {
            res = (diff / YEAR_IN_MS).toFixed();
            suffix = res == 1 ? ' year ago': ' years ago';
            return res + suffix;
        }


        // return new Date(String(date)).toLocaleString();
    });


    Handlebars.registerHelper('normL', function(text, length) {
        length = typeof length ==='object' ? app.maxTextLength : length;

        var shortenedText = text.slice(0, length);
        if (text.length > length) {
            shortenedText += "...";
        }
        return shortenedText;
    });
    
});
