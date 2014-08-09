goog.provide('tagjam13');

goog.require('lime.Director');

goog.require('lib.Keyboard');

var LEN = 44;
var WIDTH = 1024;
var HEIGHT = 768;

goog.require('tagjam13.Scene');
goog.require('tagjam13.Spider');

tagjam13.start = function(){

    var director = new lime.Director(document.body, 1024, 768);
    var spider = new tagjam13.Spider();
    var scene = new tagjam13.Scene(spider);

    var keyboard = new lib.Keyboard(scene);
    keyboard.bindWasd(goog.bind(spider.setIntention, spider));
    keyboard.bind(goog.events.KeyCodes.P, goog.bind(scene.pause, scene));
    keyboard.bind(goog.events.KeyCodes.B, goog.bind(scene.createBug, scene));
    keyboard.bind(goog.events.KeyCodes.SPACE, goog.bind(scene.useItem, scene));

    scene.appendChild(spider);
    scene.getSpider = function() { return spider; };

    lime.scheduleManager.schedule(scene.tick, scene);

    director.replaceScene(scene);
};

goog.exportSymbol('tagjam13.start', tagjam13.start);
