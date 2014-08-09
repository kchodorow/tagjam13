goog.provide('tagjam13.Droplet');

goog.require('lime.Sprite');

tagjam13.Droplet = function() {
    goog.base(this);

    var dropPos = goog.math.randomInt(WIDTH);
    var dropSize = goog.math.randomInt(20) + tagjam13.Droplet.MIN_DROP_SIZE;
    this.setSize(dropSize, dropSize).setFill('#008')
        .setPosition(dropPos, tagjam13.Scene.TOP_OF_SILL);

    this.falling_ = false;
    this.dropPoint_ = null;
};

goog.inherits(tagjam13.Droplet, lime.Sprite);

tagjam13.Droplet.MIN_DROP_SIZE = 10;
tagjam13.Droplet.SIZE_DELTA = 3;
tagjam13.Droplet.SIZE_SCALER = .1;
tagjam13.Droplet.SPEED = .1;

/**
 * @returns boolean true if droplet is finished.
 */
tagjam13.Droplet.prototype.tick = function(delta) {
    // Hack to get isTouching function.
    var scene = this.getParent();
    // TODO: use stricter isTouching function?
    if (scene.isTouching_(this, this.dropPoint_)) {
        this.dropPoint_.addDrop(this);
        return true;
    }
    var pos = this.getPosition();
    var goal = this.dropPoint_.getPosition();
    var direction = (goal.x - pos.x)/Math.abs(goal.x - pos.x); // +/-1
    pos.x += direction * tagjam13.Droplet.SPEED * delta;
    this.setPosition(pos.x, pos.y);
    // TODO: roll
    return false;
};

tagjam13.Droplet.prototype.setDropPoint = function(dropPoint) {
    this.dropPoint_ = dropPoint;
};
