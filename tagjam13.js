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

var LEN = 44;
var WIDTH = 1024;
var HEIGHT = 768;

tagjam13.start = function(){

    var director = new lime.Director(document.body, 1024, 768);
    var scene = new lime.Scene();
    var keyboard = new lib.Keyboard(scene);

    var spider = new lime.Sprite().setSize(LEN, LEN).setFill('#000')
            .setPosition(WIDTH/2, 100);
    spider.setIntention = function(direction) {
        spider.intention_ = direction;
    };
    spider.getIntention = function() {
        return spider.intention_;
    };
    spider.intention_ = spider.STOP = new goog.math.Vec2(0, 0);
    spider.MAX_SPEED = 1;
    scene.appendChild(spider);
    scene.getSpider = function() { return spider; };

    keyboard.bindWasd(function(direction, e) {
        spider.setIntention(direction);
    });

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
