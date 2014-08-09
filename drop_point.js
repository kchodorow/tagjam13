goog.provide('tagjam13.DropPoint');

goog.require('lime.Sprite');

tagjam13.DropPoint = function(drop) {
    goog.base(this);

    var dropPos = drop.getPosition();
    if (goog.math.randomInt(2) == 0) {
        this.setPosition(
            dropPos.x + goog.math.randomInt(tagjam13.DropPoint.MAX_DISTANCE),
            dropPos.y);
    } else {
        this.setPosition(
            dropPos.x - goog.math.randomInt(tagjam13.DropPoint.MAX_DISTANCE),
            dropPos.y);
    }

    this.numDroplets_ = 0;
    this.falling_ = false;
    this.time_ = 0;
};

goog.inherits(tagjam13.DropPoint, lime.Sprite);

tagjam13.DropPoint.MAX_DISTANCE = 100;
tagjam13.DropPoint.THRESHOLD = LEN;
tagjam13.DropPoint.GRAVITY = .0001; // px/s^2

/**
 * @returns boolean true if drop point is finished.
 */
tagjam13.DropPoint.prototype.tick = function(delta) {
    if (!this.falling_) {
        return false;
    }

    // Time starts when it starts falling.
    this.time_ += delta;

    var pos = this.getPosition();
    var newY = Math.min(
        pos.y + tagjam13.DropPoint.GRAVITY * this.time_ * this.time_,
        tagjam13.Scene.BOTTOM_OF_SILL);
    this.setPosition(pos.x, newY);
    if (newY == tagjam13.Scene.BOTTOM_OF_SILL) {
        return true;
    }
    return false;
};

tagjam13.DropPoint.prototype.addDrop = function(drop) {
    this.numDroplets_++;
    if (this.numDroplets_ == 1) {
        this.setSize(drop.getSize()).setFill(drop.getFill());
    } else {
        var size = this.getSize();
        this.setSize(size.width + 2, size.height + 2);
        if (size.width + 2 > tagjam13.DropPoint.THRESHOLD) {
            this.falling_ = true;
        }
    }
};

// For debugging.
tagjam13.DropPoint.prototype.setFalling = function(falling) {
    this.falling_ = falling;
};
