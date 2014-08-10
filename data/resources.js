goog.provide('tagjam13.data.Resources');

goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.Label');

tagjam13.data.Resources = function() {
    this.spriteSheet_ = new lime.SpriteSheet(
        'assets/spider.png', lime.ASSETS.spider.json, lime.parser.JSON);
};

tagjam13.data.Resources.prototype.getLabel = function() {
    return new lime.Label().setFontColor('#ACEBAE').setFontSize(44);
};

tagjam13.data.Resources.prototype.getSpider = function() {
    return this.spriteSheet_.getFrame('Spider_1.png');
};

tagjam13.data.Resources.prototype.getSpiderWalk = function() {
    var spiderWalk = new lime.animation.KeyframeAnimation()
        .setDelay(1/4).setLooping(true);
    spiderWalk.addFrame(this.spriteSheet_.getFrame('Spider_1.png'));
    spiderWalk.addFrame(this.spriteSheet_.getFrame('Spider_2.png'));
    return spiderWalk;
};

tagjam13.data.Resources.prototype.getFly = function() {
    return this.spriteSheet_.getFrame('Spider - Bugs_5.png');
};

tagjam13.data.Resources.prototype.getFlyFly = function() {
    var fly = new lime.animation.KeyframeAnimation()
        .setDelay(1/4).setLooping(true);
    fly.addFrame(this.spriteSheet_.getFrame('Spider - Bugs_5.png'));
    fly.addFrame(this.spriteSheet_.getFrame('Spider - Bugs_6.png'));
    return fly;
};

tagjam13.data.Resources.prototype.getDragonfly = function() {
    return this.spriteSheet_.getFrame('Spider - Bugs_3.png');
};

tagjam13.data.Resources.prototype.getDragonflyFly = function() {
    var fly = new lime.animation.KeyframeAnimation()
        .setDelay(1/4).setLooping(true);
    fly.addFrame(this.spriteSheet_.getFrame('Spider - Bugs_3.png'));
    fly.addFrame(this.spriteSheet_.getFrame('Spider - Bugs_4.png'));
    return fly;
};

tagjam13.data.Resources.prototype.getBee = function() {
    return this.spriteSheet_.getFrame('Spider - Bugs_1.png');
};

tagjam13.data.Resources.prototype.getBeeFly = function() {
    var fly = new lime.animation.KeyframeAnimation()
        .setDelay(1/4).setLooping(true);
    fly.addFrame(this.spriteSheet_.getFrame('Spider - Bugs_1.png'));
    fly.addFrame(this.spriteSheet_.getFrame('Spider - Bugs_2.png'));
    return fly;
};

tagjam13.data.Resources.prototype.getBucket = function() {
    return this.spriteSheet_.getFrame('Spider - Bugs_7.png');
};

tagjam13.data.Resources.prototype.getDragon = function() {
    return this.spriteSheet_.getFrame('Spider - Bugs_10.png');
};

tagjam13.data.Resources.prototype.getWax = function() {
    return this.spriteSheet_.getFrame('Spider - Bugs_9.png');
};

tagjam13.data.Resources.prototype.getDroplet = function() {
    return this.spriteSheet_.getFrame('Spider_8.png');
};

tagjam13.data.Resources.prototype.getWeb = function() {
    return this.spriteSheet_.getFrame('Web.png');
};
