goog.provide('tagjam13.Scene');

goog.require('lime.animation.ScaleBy');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.FadeTo');
goog.require('lime.Scene');
goog.require('lime.Sprite');

goog.require('tagjam13.Bucket');
goog.require('tagjam13.Bee');
goog.require('tagjam13.BucketFly');
goog.require('tagjam13.Dragonfly');
goog.require('tagjam13.Droplet');
goog.require('tagjam13.DropPoint');
goog.require('tagjam13.Web');

tagjam13.Scene = function(spider) {
    goog.base(this);

    var background = new lime.Sprite().setSize(WIDTH, HEIGHT)
            .setFill('#354242').setPosition(WIDTH/2, HEIGHT/2);
    this.appendChild(background);

    this.web_ = new tagjam13.Web();
    this.web_.setPosition(this.web_.getOffsets());
    this.appendChild(this.web_);
    this.ceiling_ = new tagjam13.Scene.Ceiling();

    var marginLeft = new lime.Sprite()
            .setFill(tagjam13.resources.getWoodGrain())
            .setPosition(tagjam13.Scene.LEFT_MARGIN/2, HEIGHT/2)
            .setSize(64, HEIGHT);
    var marginRight = new lime.Sprite()
            .setFill(tagjam13.resources.getWoodGrain())
            .setPosition(tagjam13.Scene.RIGHT_MARGIN +
                         tagjam13.Scene.LEFT_MARGIN/2, HEIGHT/2)
            .setSize(64, HEIGHT);
    var ceiling = new lime.Sprite()
            .setFill(tagjam13.resources.getWoodGrain())
            .setPosition(WIDTH/2, tagjam13.Scene.TOP_OF_SILL/2)
            .setSize(WIDTH, tagjam13.Scene.TOP_OF_SILL);
    var sill = new lime.Sprite()
            .setFill(tagjam13.resources.getWoodGrain())
            .setPosition(WIDTH/2, tagjam13.Scene.BOTTOM_OF_SILL+
                         tagjam13.Scene.TOP_OF_SILL/2)
            .setSize(WIDTH, tagjam13.Scene.TOP_OF_SILL);
    var bottom = new lime.Sprite()
            .setFill(tagjam13.resources.getWoodGrain())
            .setPosition(WIDTH/2, tagjam13.Scene.BOTTOM_OF_WINDOW+
                         tagjam13.Scene.TOP_OF_SILL/2)
            .setSize(WIDTH, tagjam13.Scene.TOP_OF_SILL);
    this.appendChild(ceiling);
    this.appendChild(sill);
    this.appendChild(bottom);
    this.appendChild(marginLeft);
    this.appendChild(marginRight);

    this.spider_ = spider;
    this.bugs_ = [];
    this.droplets_ = [];
    this.dropPoints_ = [];
    this.paused_ = false;

    this.items_ = [];

    this.pauseLabel_ = tagjam13.resources.getLabel().setSize(160,50)
        .setText('Paused')
        .setPosition(WIDTH/2, tagjam13.Scene.BOTTOM_OF_SILL/2);

    // If the game has started.
    this.begun_ = false;
};

goog.inherits(tagjam13.Scene, lime.Scene);

tagjam13.Scene.LEFT_MARGIN = 30;
tagjam13.Scene.RIGHT_MARGIN = WIDTH - 30;
tagjam13.Scene.TOP_OF_SILL = 30;
tagjam13.Scene.BOTTOM_OF_SILL = 300;
tagjam13.Scene.BOTTOM_OF_WINDOW = HEIGHT - 30;
tagjam13.Scene.TOUCHING = LEN/2;
tagjam13.Scene.DROPLET_DISTANCE = 100;

tagjam13.Scene.prototype.pause = function() {
    this.paused_ = !this.paused_;
    if (this.paused_) {
        this.appendChild(this.pauseLabel_);
    } else {
        this.removeChild(this.pauseLabel_);
    }
};

tagjam13.Scene.prototype.createBug = function() {
    var bugType = goog.math.randomInt(tagjam13.Bug.NUM_TYPES);
    var bug = null;
    if (bugType == tagjam13.Bug.BUCKET_FLY) {
        bug = new tagjam13.BucketFly();
    } else if (bugType == tagjam13.Bug.DRAGONFLY) {
        bug = new tagjam13.Dragonfly();
    } else {
        bug = new tagjam13.Bee();
    }
    this.appendChild(bug);
    this.bugs_.push(bug);
};

// Choose a random drip and drop it
tagjam13.Scene.prototype.dropDrip = function() {
    var num = this.dropPoints_.length;
    if (num == 0) {
        console.log("No drop point");
        return;
    }

    var dripIdx = goog.math.randomInt(this.dropPoints_.length);
    this.dropPoints_[dripIdx].setFalling(true);
};

tagjam13.Scene.prototype.useItem = function() {
    if (this.tutorial_ != null) {
        this.removeChild(this.tutorial_);
        this.tutorial_ = null;
        // Starting bug
        this.createBug();
        return;
    }

    if (this.spider_.hasItem()) {
        this.useItem_(this.spider_.dropItem());
    } else {
        var pickedUp = false;
        for (var i = 0; i < this.items_.length; ++i) {
            var item = this.items_[i];
            if (!this.isTouching_(item, this.spider_)) {
                continue;
            }
            item.equip();
            this.removeChild(item);
            this.spider_.setItem(item);
            goog.array.remove(this.items_, item);
            pickedUp = true;
            break;
        }
        if (!pickedUp) {
            // TODO: have spider shrug or something.
            this.spider_.shrug();
        }
    }
};

tagjam13.Scene.prototype.setTutorial = function(tutorial) {
    this.tutorial_ = tutorial;
    this.appendChild(this.tutorial_.setPosition(WIDTH/2, HEIGHT/2));
};

tagjam13.Scene.prototype.tick = function(delta) {
    if (this.paused_ || this.tutorial_ != null) {
        return;
    }

    this.handleSpider_(delta);
    this.drip_(delta);
    this.handleDropPoints_(delta);
    this.bugify_(delta);
};

tagjam13.Scene.prototype.handleSpider_ = function(delta) {
    var pos = this.adjustPos_(this.spider_.getNewPosition(delta));
    this.spider_.setPosition(pos);
    var nearbyBug = this.getBugNearSpider_();
    if (nearbyBug != null) {
        var treasure = this.spider_.eatBug(nearbyBug);
        goog.array.remove(this.bugs_, nearbyBug);
        this.items_.push(treasure);
        treasure.setPosition(this.spider_.getPosition().clone());
        this.appendChild(treasure);
    }
};

tagjam13.Scene.prototype.adjustPos_ = function(pos) {
    // Sanity checks.
    pos.y = Math.max(pos.y, tagjam13.Scene.TOP_OF_SILL);
    pos.y = Math.min(pos.y, tagjam13.Scene.BOTTOM_OF_WINDOW);
    pos.x = Math.max(pos.x, tagjam13.Scene.LEFT_MARGIN);
    pos.x = Math.min(pos.x, tagjam13.Scene.RIGHT_MARGIN);

    // In middle of BOTTOM_OF_SILL, don't let y < BOTTOM_OF_SILL unless
    // touching edges.
    // Check if we're on the ceiling.
    if (Math.abs(pos.y - tagjam13.Scene.TOP_OF_SILL) <
        tagjam13.Scene.TOUCHING) {
        if (Math.abs(pos.x - tagjam13.Scene.LEFT_MARGIN) >
            tagjam13.Scene.TOUCHING &&
            Math.abs(pos.x - tagjam13.Scene.RIGHT_MARGIN) >
            tagjam13.Scene.TOUCHING) {
            // If we're not near the corners, don't let us go down.
            pos.y = tagjam13.Scene.TOP_OF_SILL;
        }
        // Otherwise, let y increase.
    } else if (pos.y < tagjam13.Scene.BOTTOM_OF_SILL &&
               pos.y > tagjam13.Scene.TOP_OF_SILL) {
        // Check if we're on the walls.
        if (Math.abs(pos.x - tagjam13.Scene.LEFT_MARGIN) <
            tagjam13.Scene.TOUCHING) {
            pos.x = tagjam13.Scene.LEFT_MARGIN;
        } else if (Math.abs(pos.x - tagjam13.Scene.RIGHT_MARGIN) <
                   tagjam13.Scene.TOUCHING) {
            pos.x = tagjam13.Scene.RIGHT_MARGIN;
        } else {
            // Not on a wall.
            pos.y = tagjam13.Scene.BOTTOM_OF_SILL;
        }
    }
    // Otherwise, if we're in the web, we're done.

    return pos;
};

/**
 * Pretty regularly, spawn new droplets. If a droplet is spawned within
 * threshold (+/-random) of a dropPoint, make it head for that dropPoint:
 *
 * // Existing drop points (unmoving megadroplets at a certain x coordinate)
 * this.dropPoints_ = [];
 * // Existing droplets heading for drop points
 * this.droplets_ = []
 *
 * When it reaches the drop point, the drop point grows by... 2px? If it is
 * far away from a drop point, create a new one, +/- random distance from
 * where the droplet is.
 */
tagjam13.Scene.prototype.drip_ = function(delta) {
    this.maybeSpawnDrop_();

    for (var i = 0; i < this.droplets_.length; ++i) {
        var drop = this.droplets_[i];
        var done = drop.tick(delta);
        if (done) {
            this.removeChild(drop);
            goog.array.remove(this.droplets_, drop);
        }
    }

    if (goog.math.randomInt(100) != 0) {
        return;
    }
};

tagjam13.Scene.prototype.handleDropPoints_ = function(delta) {
    for (var i = 0; i < this.dropPoints_.length; ++i) {
        var dropPoint = this.dropPoints_[i];
        var done = dropPoint.tick(delta);
        if (!done) {
            continue;
        }

        // Check if it landed in a bucket.
        var caught = false;
        for (var j in this.items_) {
            var item = this.items_[j];
            if (item.getId() == tagjam13.Item.BUCKET &&
                this.isTouching_(dropPoint, item)) {
                // TODO: fill bucket
                caught = true;
            }
        }
        if (!caught) {
            var ruined = this.web_.dripOn();
            // TODO: game over
        }
        this.removeChild(dropPoint);
        goog.array.remove(this.dropPoints_, dropPoint);
    }
};

tagjam13.Scene.prototype.maybeSpawnDrop_ = function() {
    if (goog.math.randomInt(100) != 0) {
        return;
    }
    var drop = new tagjam13.Droplet();
    if (this.ceiling_.isWaxed(drop.getPosition().x)) {
        return;
    }
    this.appendChild(drop);
    this.droplets_.push(drop);

    // Find a place for it to roll to.
    for (var i = 0; i < this.dropPoints_.length; ++i) {
        var dropPoint = this.dropPoints_[i];
        if (this.isWithin_(dropPoint, drop, tagjam13.Scene.DROPLET_DISTANCE)) {
            drop.setDropPoint(dropPoint);
            return;
        }
    }

    dropPoint = new tagjam13.DropPoint(drop);
    this.appendChild(dropPoint);
    drop.setDropPoint(dropPoint);
    this.dropPoints_.push(dropPoint);
};

tagjam13.Scene.prototype.bugify_ = function(delta) {
    if (goog.math.randomInt(200) == 0) {
        this.createBug();
    }

    for (var i = 0; i < this.bugs_.length; ++i) {
        var bug = this.bugs_[i];
        bug.tick(delta);
    }
};

tagjam13.Scene.prototype.isWithin_ = function(thing1, thing2, distance) {
    return goog.math.Coordinate.distance(
        thing1.getPosition(), thing2.getPosition()) < distance;
};

tagjam13.Scene.prototype.isTouching_ = function(thing1, thing2) {
    return this.isWithin_(thing1, thing2, tagjam13.Scene.TOUCHING);
};

tagjam13.Scene.prototype.getBugNearSpider_ = function() {
    for (var i = 0; i < this.bugs_.length; ++i) {
        var bug = this.bugs_[i];
        if (bug.isTrapped() && this.isTouching_(bug, this.spider_)) {
            return bug;
        }
    }
    return null;
};

tagjam13.Scene.prototype.useItem_ = function(item) {
    var spiderPos = this.spider_.getPosition().clone();
    this.appendChild(item);
    item.setPosition(spiderPos);
    if (item.getId() == tagjam13.Item.BUCKET) {
        this.items_.push(item);
    } else if (item.getId() == tagjam13.Item.DRAGON) {
        var fire = new lime.Sprite().setFill(tagjam13.resources.getFire());
        item.appendChild(fire.setAnchorPoint(0, .5).setPosition(32, 0));
        fire.runAction(new lime.animation.Sequence(
             new lime.animation.ScaleBy(3, 2).setDuration(2),
             new lime.animation.FadeTo(0).setDuration(2)));
        this.web_.dryOff(this.spider_.getPosition());
    } else { // WAX
        if (this.spider_.getPosition().y == tagjam13.Scene.TOP_OF_SILL) {
            this.appendChild(tagjam13.resources.getCeilingWax()
                             .setPosition(spiderPos));
            var done = this.ceiling_.wax(spiderPos.x);
            if (done) {
                this.setTutorial(tagjam13.tutorial.win());
            }
        } else {
            this.items_.push(item);
            item.setPosition(spiderPos);
        }
    }
};

tagjam13.Scene.Ceiling = function() {
    this.intervals_ = [];
};

tagjam13.Scene.Ceiling.prototype.wax = function(pos) {
    var min = pos - 128;
    var max = pos + 128;
    var inExisting = false;
    for (var i = 0; i < this.intervals_.length; ++i) {
        var cur = this.intervals_[i];
        if (cur.min < min && min < cur.max) {
            if (cur.max < max) {
                cur.max = max;
            }
            inExisting = true;
        }
        if (cur.max > max && max > cur.min) {
            if (cur.min < min) {
                cur.min = min;
            }
            inExisting = true;
        }
    }

    if (!inExisting) {
        var index = 0;
        cur = this.intervals_[index];
        while (index < this.intervals_.length - 1 && cur.max < min) {
            cur = this.intervals_[++index];
        }
        goog.array.insertAt(this.intervals_, {min : min, max : max}, index);
    }

    this.fixOverlaps_();

    return this.intervals_.length == 1 &&
        this.intervals_[0].min <= 50 && this.intervals_[0].max >= 950;
};

tagjam13.Scene.Ceiling.prototype.isWaxed = function(pos) {
    for (var i in this.intervals_) {
        if (this.intervals_[i].min <= pos && this.intervals_[i].max >= pos) {
            return true;
        }
    }
    return false;
};

tagjam13.Scene.Ceiling.prototype.fixOverlaps_ = function() {
    if (this.intervals_.length <= 1) {
        return;
    }

    // Fix up overlapping ranges.
    var done = false;
    var index = 0;
    while (index < this.intervals_.length - 1) {
        var cur = this.intervals_[index];
        var next = this.intervals_[index+1];
        if (cur.max >= next.min) {
            cur.max = next.max;
            goog.array.remove(this.intervals_, next);
        } else {
            index++;
        }
    }
};
