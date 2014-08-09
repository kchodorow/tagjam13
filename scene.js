goog.provide('tagjam13.Scene');

goog.require('lime.Scene');
goog.require('lime.Sprite');

goog.require('tagjam13.Bug');
goog.require('tagjam13.Droplet');

tagjam13.Scene = function(spider) {
    goog.base(this);

    this.spider_ = spider;
    this.bugs_ = [];
    this.droplets_ = [];
    this.paused_ = false;

    // TODO: make this general inventory.
    this.bucket_ = new lime.Sprite()
        .setSize(tagjam13.Scene.BUCKET_SIZE, tagjam13.Scene.BUCKET_SIZE)
        .setPosition(goog.math.randomInt(WIDTH), tagjam13.Scene.BOTTOM_OF_SILL)
        .setFill('#755');
    this.appendChild(this.bucket_);
};

goog.inherits(tagjam13.Scene, lime.Scene);

tagjam13.Scene.LEFT_MARGIN = 30;
tagjam13.Scene.RIGHT_MARGIN = WIDTH - 30;
tagjam13.Scene.TOP_OF_SILL = 30;
tagjam13.Scene.BOTTOM_OF_SILL = 300;
tagjam13.Scene.BOTTOM_OF_WINDOW = HEIGHT - 30;
tagjam13.Scene.BUCKET_SIZE = 20;

tagjam13.Scene.prototype.pause = function() {
    this.paused_ = !this.paused_;
};

tagjam13.Scene.prototype.createBug = function() {
    var bug = new tagjam13.Bug();
    this.appendChild(bug);
    this.bugs_.push(bug);
};

tagjam13.Scene.prototype.useItem = function() {
    if (this.spider_.hasItem()) {
        var bucket = this.spider_.dropItem();
        this.bucket_ = bucket;
        this.appendChild(bucket);
        bucket.setPosition(this.spider_.getPosition().clone());
    } else if (this.bucket_ != null && goog.math.Coordinate.distance(
        this.bucket_.getPosition(), this.spider_.getPosition()) < LEN/2) {
        this.removeChild(this.bucket_);
        this.spider_.setItem(this.bucket_);
        this.bucket_ = null;
    } else {
        // TODO: have spider shrug or something.
        this.spider_.shrug();
    }
};

tagjam13.Scene.prototype.tick = function(delta) {
    if (this.paused_) {
        return;
    }

    // TODO: prevent illegal movement.
    var pos = this.adjustPos_(this.spider_.getNewPosition(delta));
    this.spider_.setPosition(pos);
    this.drip_(delta);
    this.bugify_(delta);
};

tagjam13.Scene.prototype.adjustPos_ = function(pos) {
    pos.x = Math.max(pos.x, tagjam13.Scene.LEFT_MARGIN);
    pos.x = Math.min(pos.x, tagjam13.Scene.RIGHT_MARGIN);
    pos.y = Math.max(pos.y, tagjam13.Scene.BOTTOM_OF_SILL);
    pos.y = Math.min(pos.y, tagjam13.Scene.BOTTOM_OF_WINDOW);
    return pos;
};

tagjam13.Scene.prototype.drip_ = function(delta) {
    this.maybeSpawnDrop_();

    for (var i = 0; i < this.droplets_.length; ++i) {
        var drop = this.droplets_[i];
        drop.tick(delta);
        if (drop.isDone()) {
            goog.array.remove(this.droplets_, drop);
        }
    }

    if (goog.math.randomInt(100) != 0) {
        return;
    }
};


tagjam13.Scene.prototype.maybeSpawnDrop_ = function() {
    if (goog.math.randomInt(100) != 0) {
        return;
    }
    var drop = new tagjam13.Droplet();
    this.appendChild(drop);
    this.droplets_.push(drop);
};

tagjam13.Scene.prototype.bugify_ = function(delta) {
    if (goog.math.randomInt(1000) == 0) {
        this.createBug();
    }

    for (var i = 0; i < this.bugs_.length; ++i) {
        var bug = this.bugs_[i];
        bug.tick(delta);
        if (bug.isDone()) {
            goog.array.remove(this.bugs_, bug);
        }
    }
};
