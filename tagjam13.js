goog.provide('tagjam13');

goog.require('lime.Director');
goog.require('lime.parser.JSON');
goog.require('lime.ASSETS.spider.json');
goog.require('lime.SpriteSheet');

goog.require('lib.Keyboard');

var LEN = 44;
var WIDTH = 1024;
var HEIGHT = 768;

goog.require('tagjam13.data.Resources');
goog.require('tagjam13.data.Tutorial');
goog.require('tagjam13.Scene');
goog.require('tagjam13.Spider');

tagjam13.start = function(){
    tagjam13.resources = new tagjam13.data.Resources();
    tagjam13.tutorial = new tagjam13.data.Tutorial();

    var director = new lime.Director(
        document.getElementById('game'), WIDTH, HEIGHT);
    var spider = new tagjam13.Spider();
    var scene = new tagjam13.Scene(spider);

    var keyboard = new lib.Keyboard(scene);
    keyboard.bindWasd(goog.bind(spider.setIntention, spider));
    keyboard.bind(goog.events.KeyCodes.P, goog.bind(scene.pause, scene));
    keyboard.bind(goog.events.KeyCodes.B, goog.bind(scene.createBug, scene));
    keyboard.bind(goog.events.KeyCodes.D, goog.bind(scene.dropDrip, scene));
    keyboard.bind(goog.events.KeyCodes.SPACE, goog.bind(scene.useItem, scene));

    scene.appendChild(spider);
    scene.tutorial_ = tagjam13.tutorial.intro().setPosition(WIDTH/2, 100);
    scene.appendChild(scene.tutorial_);

    director.replaceScene(scene);
};

goog.exportSymbol('tagjam13.start', tagjam13.start);
