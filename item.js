goog.provide('tagjam13.Bucket');
goog.provide('tagjam13.Wax');
goog.provide('tagjam13.Dragon');

goog.require('lime.Sprite');

tagjam13.Item = function() {
    goog.base(this);
};

goog.inherits(tagjam13.Item, lime.Sprite);

tagjam13.Item.SIZE = 20;

tagjam13.Item.BUCKET = 0;
tagjam13.Item.WAX = 1;
tagjam13.Item.DRAGON = 2;
tagjam13.Item.NUM_ITEMS = 3;

tagjam13.Item.prototype.getId = function() {
    return this.id_;
};

tagjam13.Bucket = function() {
    goog.base(this);

    this.setSize(tagjam13.Item.SIZE, tagjam13.Item.SIZE)
        .setFill(tagjam13.resources.getBucket());
    this.id_ = tagjam13.Item.BUCKET;
};

goog.inherits(tagjam13.Bucket, tagjam13.Item);

tagjam13.Wax = function() {
    goog.base(this);

    this.setSize(tagjam13.Item.SIZE, tagjam13.Item.SIZE)
        .setFill(tagjam13.resources.getWax());
    this.id_ = tagjam13.Item.WAX;
};

goog.inherits(tagjam13.Wax, tagjam13.Item);

tagjam13.Dragon = function() {
    goog.base(this);

    this.setSize(tagjam13.Item.SIZE, tagjam13.Item.SIZE)
        .setFill(tagjam13.resources.getDragon());
    this.id_ = tagjam13.Item.DRAGON;
};

goog.inherits(tagjam13.Dragon, tagjam13.Item);
