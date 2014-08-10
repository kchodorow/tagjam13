goog.provide('tagjam13.BucketFly');
goog.provide('tagjam13.Dragonfly');
goog.provide('tagjam13.Bee');

goog.require('lime.Sprite');

goog.require('tagjam13.Bucket');
goog.require('tagjam13.Wax');
goog.require('tagjam13.Dragon');

tagjam13.Bug = function() {
    goog.base(this);

    this.initialY_ = tagjam13.Scene.BOTTOM_OF_SILL +
        goog.math.randomInt(tagjam13.Bug.WEB_HEIGHT);
    this.setSize(LEN/2, LEN/2).setPosition(0, this.initialY_);

    this.flying_ = true;
    this.captureAt_ = goog.math.randomInt(WIDTH);
};

goog.inherits(tagjam13.Bug, lime.Sprite);

tagjam13.Bug.WEB_HEIGHT = 400;

tagjam13.Bug.BOUNCE = 25;
tagjam13.Bug.SPEED = .1;
tagjam13.Bug.PERIOD = (2 * Math.PI / 50); // 50px wide

tagjam13.Bug.BUCKET_FLY = 0;
tagjam13.Bug.DRAGONFLY = 1;
tagjam13.Bug.BEE = 2;
tagjam13.Bug.NUM_TYPES = 3;

tagjam13.Bug.prototype.getId = function() {
    return this.id_;
};

tagjam13.Bug.prototype.isTrapped = function() {
    return !this.flying_;
};

tagjam13.Bug.prototype.tick = function(delta) {
    if (this.flying_) {
        this.fly(delta);
    } else {
        this.flail(delta);
    }
};

tagjam13.Bug.prototype.fly = function(delta) {
    var pos = this.getPosition();
    var nextPos = pos.x + tagjam13.Bug.SPEED * delta;
    pos.x = Math.min(nextPos, this.captureAt_);
    pos.y = this.initialY_ +
        (Math.sin(pos.x * tagjam13.Bug.PERIOD) * tagjam13.Bug.BOUNCE);
    this.setPosition(pos.x, pos.y);
    this.flying_ = pos.x < this.captureAt_;
};

tagjam13.Bug.prototype.flail = function(delta) {
    // TODO
};

tagjam13.Bug.prototype.eaten = function() {
    this.getParent().removeChild(this);
    return new tagjam13.Bucket();
};

tagjam13.BucketFly = function() {
    goog.base(this);

    this.runAction(tagjam13.resources.getFlyFly());
    this.id_ = tagjam13.Bug.BUCKET_FLY;
};

goog.inherits(tagjam13.BucketFly, tagjam13.Bug);

tagjam13.Dragonfly = function() {
    goog.base(this);

    this.runAction(tagjam13.resources.getDragonflyFly());
    this.id_ = tagjam13.Bug.DRAGONFLY;
};

goog.inherits(tagjam13.Dragonfly, tagjam13.Bug);

tagjam13.Dragonfly.prototype.eaten = function() {
    this.getParent().removeChild(this);
    return new tagjam13.Dragon();
};

tagjam13.Bee = function() {
    goog.base(this);

    this.runAction(tagjam13.resources.getBeeFly());
    this.id_ = tagjam13.Bug.BEE;
};

goog.inherits(tagjam13.Bee, tagjam13.Bug);

tagjam13.Bee.prototype.eaten = function() {
    this.getParent().removeChild(this);
    return new tagjam13.Wax();
};
