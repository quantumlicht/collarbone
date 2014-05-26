define(["app", "handlebars"], function(app, Handlebars){

	Handlebars.registerHelper('parseDate', function(date) {
        return new Date(String(date)).toLocaleDateString();
    });


    Handlebars.registerHelper('normalizeLength', function(text) {
    	var shortenedText = text.slice(0, app.maxTextLength);
    	if (text.length > app.maxTextLength) {
    		shortenedText += "...";
    	}
    	return shortenedText
    });
    
});
