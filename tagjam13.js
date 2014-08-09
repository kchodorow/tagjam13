goog.provide('tagjam13');

goog.require('lime.Director');

goog.require('lib.Keyboard');

goog.require('tagjam13.Scene');
goog.require('tagjam13.Spider');

var LEN = 44;
var WIDTH = 1024;
var HEIGHT = 768;

tagjam13.start = function(){

    var director = new lime.Director(document.body, 1024, 768);
    var scene = new tagjam13.Scene();
    var keyboard = new lib.Keyboard(scene);

    var spider = new tagjam13.Spider();
    keyboard.bindWasd(function(dir) {
        spider.setIntention(dir);
    });

    scene.appendChild(spider);
    scene.getSpider = function() { return spider; };
    scene.drops_ = [];

    lime.scheduleManager.schedule(scene.tick, scene);

    director.replaceScene(scene);
};

goog.exportSymbol('tagjam13.start', tagjam13.start);
