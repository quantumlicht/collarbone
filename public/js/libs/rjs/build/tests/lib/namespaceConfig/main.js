require(['modules/one', 'modules/two', 'modules/three'], function (one, two, three) {
    console.log("One's name is: " + one.name);
    console.log("Two's name is: " + two.name);
    console.log("Two's color is: " + two.color);
    console.log("Two's name is: " + three.name);
    console.log("Three's fourName is: " + three.fourName);
    console.log("Three's fiveName is: " + three.fiveName);
});
