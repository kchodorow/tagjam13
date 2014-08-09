goog.provide('tagjam13.Scene');

goog.require('lime.Scene');

goog.require('tagjam13.Droplet');

tagjam13.Scene = function() {
    goog.base(this);

    this.droplets_ = [];
};

goog.inherits(tagjam13.Scene, lime.Scene);

tagjam13.Scene.TOP_OF_SILL = 30;
tagjam13.Scene.BOTTOM_OF_SILL = 200;

tagjam13.Scene.prototype.tick = function(delta) {
    var spider = this.getSpider();
    var pos = spider.getPosition();
    var direction = spider.getIntention();
    spider.setPosition(pos.x + direction.x * spider.MAX_SPEED * delta,
                       pos.y + direction.y * spider.MAX_SPEED * delta);
    pos = spider.getPosition();
    spider.setIntention(spider.STOP);

    this.maybeSpawnDrop();

    for (var i = 0; i < this.droplets_.length; ++i) {
        var drop = this.droplets_[i];
        drop.tick(delta);
        if (drop.isDone()) {
            goog.array.remove(this.droplets_, drop);
        }
    }
};


tagjam13.Scene.prototype.maybeSpawnDrop = function() {
    if (goog.math.randomInt(100) != 0) {
        return;
    }
    var drop = new tagjam13.Droplet();
    this.appendChild(drop);
    this.droplets_.push(drop);
};
