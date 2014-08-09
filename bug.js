goog.provide('tagjam13.Bug');

goog.require('lime.Sprite');

tagjam13.Bug = function() {
    goog.base(this);

    this.initialY_ = tagjam13.Scene.BOTTOM_OF_SILL +
        goog.math.randomInt(tagjam13.Bug.WEB_HEIGHT);
    this.setSize(LEN/2, LEN/2).setFill('#070').setPosition(0, this.initialY_);

    this.flying_ = true;
    this.captureAt_ = goog.math.randomInt(WIDTH);
    this.done_ = false;
};

goog.inherits(tagjam13.Bug, lime.Sprite);

tagjam13.Bug.WEB_HEIGHT = 400;

tagjam13.Bug.BOUNCE = 30;
tagjam13.Bug.SPEED = .1;
tagjam13.Bug.PERIOD = (2 * Math.PI / 50); // 50px wide

tagjam13.Bug.prototype.isDone = function() {
    return this.done_;
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
    this.setFill('#900');
};
