goog.provide('tagjam13.Droplet');

goog.require('lime.Sprite');

tagjam13.Droplet = function() {
    goog.base(this);

    var dropPos = goog.math.randomInt(WIDTH);
    var dropSize = goog.math.randomInt(20) + tagjam13.Droplet.MIN_DROP_SIZE;
    this.setSize(dropSize, dropSize).setFill('#008').setPosition(dropPos, 0);

    this.falling_ = false;
    this.done_ = false;
};

goog.inherits(tagjam13.Droplet, lime.Sprite);

tagjam13.Droplet.GRAVITY = .01; // px/s^2

tagjam13.Droplet.MIN_DROP_SIZE = 10;
tagjam13.Droplet.THRESHOLD = LEN;
tagjam13.Droplet.SIZE_DELTA = 3;
tagjam13.Droplet.SIZE_SCALER = .1;

tagjam13.Droplet.prototype.tick = function(delta) {
    if (this.falling_) {
        this.fall(delta);
    } else {
        this.grow(delta);
    }
};

tagjam13.Droplet.prototype.grow = function(delta) {
    var size = this.getSize();
    size.width = size.height = size.width +
        goog.math.randomInt(tagjam13.Droplet.SIZE_DELTA) *
        tagjam13.Droplet.SIZE_SCALER * delta;
    this.falling_ = size.width > tagjam13.Droplet.THRESHOLD;
};

tagjam13.Droplet.prototype.fall = function(delta) {
    var pos = this.getPosition();
    var newY = Math.min(
        pos.y + tagjam13.Droplet.GRAVITY * delta * delta,
        tagjam13.Scene.BOTTOM_OF_SILL);
    this.setPosition(pos.x, newY);
    if (newY == tagjam13.Scene.BOTTOM_OF_SILL) {
        this.getParent().removeChild(this);
        this.done_ = true;
    }
};

tagjam13.Droplet.prototype.isDone = function() {
    return this.done_;
};
