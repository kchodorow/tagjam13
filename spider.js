goog.provide('tagjam13.Spider');

goog.require('lime.Sprite');

tagjam13.Spider = function() {
    goog.base(this);

    this.setSize(LEN, LEN).setFill('#000')
        .setPosition(WIDTH/2, tagjam13.Scene.BOTTOM_OF_SILL);
    this.intention_ = this.STOP;
};

goog.inherits(tagjam13.Spider, lime.Sprite);

tagjam13.Spider.prototype.STOP = new goog.math.Vec2(0, 0);
tagjam13.Spider.prototype.MAX_SPEED = .5;

tagjam13.Spider.prototype.tick = function(delta) {
    var pos = this.getPosition();
    var direction = this.getIntention();
    this.setPosition(
        pos.x + direction.x * this.MAX_SPEED * delta,
        pos.y + direction.y * this.MAX_SPEED * delta);
    pos = this.getPosition();
    this.setIntention(this.STOP);
};

tagjam13.Spider.prototype.setIntention = function(direction) {
    this.intention_ = direction;
};

tagjam13.Spider.prototype.getIntention = function() {
    return this.intention_;
};
