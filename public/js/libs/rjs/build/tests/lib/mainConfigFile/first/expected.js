
define('dep1',{
    name: 'dep1'
});

define('dep2',{
    name: 'dep2'
});

requirejs.config({
    paths: {
        'dep2': 'sub/dep2'
    }
});

//Only the first call should be used.
requirejs.config({
    paths: {
        'dep2': 'BAD'
    }
});

requirejs(['dep1', 'dep2'], function () {

});

define("main", function(){});
