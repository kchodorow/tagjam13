goog.provide('tagjam13.Spider');

goog.require('lime.Sprite');

tagjam13.Spider = function() {
    goog.base(this);

    this.setSize(LEN, LEN).setFill('#000')
        .setPosition(WIDTH/2, tagjam13.Scene.BOTTOM_OF_SILL);
    this.intention_ = this.STOP;
    this.item_ = null;
};

goog.inherits(tagjam13.Spider, lime.Sprite);

tagjam13.Spider.prototype.STOP = new goog.math.Vec2(0, 0);
tagjam13.Spider.prototype.MAX_SPEED = .5;

tagjam13.Spider.prototype.hasItem = function() {
    return this.item_ != null;
};

tagjam13.Spider.prototype.setItem = function(item) {
    this.item_ = item;
    this.item_.setPosition(0, 0);
    this.appendChild(item);
};

tagjam13.Spider.prototype.dropItem = function() {
    if (this.item_ == null) {
        // TODO: throw?
        return null;
    }
    var tempItem = this.item_;
    this.removeChild(this.item_);
    this.item_ = null;
    return tempItem;
};

tagjam13.Spider.prototype.shrug = function() {
    // TODO: animation.
};

tagjam13.Spider.prototype.getNewPosition = function(delta) {
    var pos = this.getPosition();
    var direction = this.getIntention();
    pos.x += direction.x * this.MAX_SPEED * delta,
    pos.y += direction.y * this.MAX_SPEED * delta;
    this.setIntention(this.STOP);
    return pos;
};

tagjam13.Spider.prototype.setIntention = function(direction) {
    this.intention_ = direction;
};

tagjam13.Spider.prototype.getIntention = function() {
    return this.intention_;
};
