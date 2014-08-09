goog.provide('tagjam13');

goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.Label');
goog.require('lime.animation.Spawn');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.MoveTo');

goog.require('lib.Keyboard');

goog.require('tagjam13.Spider');

var LEN = 44;
var WIDTH = 1024;
var HEIGHT = 768;

tagjam13.start = function(){

    var director = new lime.Director(document.body, 1024, 768);
    var scene = new lime.Scene();
    var keyboard = new lib.Keyboard(scene);

    var spider = new tagjam13.Spider();
    keyboard.bindWasd(function(dir) {
        spider.setIntention(dir);
    });

    scene.appendChild(spider);
    scene.getSpider = function() { return spider; };

    lime.scheduleManager.schedule(tick, scene);

    director.replaceScene(scene);
};

var tick = function(delta) {
    var spider = this.getSpider();
    var pos = spider.getPosition();
    var direction = spider.getIntention();
    spider.setPosition(pos.x + direction.x * spider.MAX_SPEED * delta,
                       pos.y + direction.y * spider.MAX_SPEED * delta);
    pos = spider.getPosition();
    spider.setIntention(spider.STOP);
};

goog.exportSymbol('tagjam13.start', tagjam13.start);
