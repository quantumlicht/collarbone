define(["app", "handlebars"], function(app, Handlebars){

	Handlebars.registerHelper('formatDate', function(date) {
        return new Date(String(date)).toLocaleDateString();
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
