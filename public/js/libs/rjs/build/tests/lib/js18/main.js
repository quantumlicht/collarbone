define(function (require) {
    let a = require('a');
    var {name, other} = a;

    var c = 1;
    var d = 3;

    [c, d] = [d, c];

    function generator() {
        var i = 0;
        while (i < 10) {
            ++i;
            if ((i % 2) == 0) {
                yield true;
            }
        }
        yield false;
    }
});
