goog.provide('tagjam13.Scene');

goog.require('lime.Scene');

goog.require('tagjam13.Bug');
goog.require('tagjam13.Droplet');

tagjam13.Scene = function(spider) {
    goog.base(this);

    this.spider_ = spider;
    this.bugs_ = [];
    this.droplets_ = [];
    this.paused_ = false;
};

goog.inherits(tagjam13.Scene, lime.Scene);

tagjam13.Scene.TOP_OF_SILL = 30;
tagjam13.Scene.BOTTOM_OF_SILL = 200;

tagjam13.Scene.prototype.pause = function() {
    this.paused_ = !this.paused_;
};

tagjam13.Scene.prototype.createBug = function() {
    var bug = new tagjam13.Bug();
    this.appendChild(bug);
    this.bugs_.push(bug);
};

tagjam13.Scene.prototype.tick = function(delta) {
    if (this.paused_) {
        return;
    }

    this.spider_.tick(delta);
    this.drip_(delta);
    this.bugify_(delta);
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
