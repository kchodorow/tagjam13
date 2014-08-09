goog.provide('tagjam13.Bucket');
goog.provide('tagjam13.Wax');
goog.provide('tagjam13.Dragon');

goog.require('lime.Sprite');

tagjam13.Item = function() {
    goog.base(this);
};

goog.inherits(tagjam13.Item, lime.Sprite);

tagjam13.Item.SIZE = 20;

tagjam13.Bucket = function() {
    goog.base(this);

    this.setSize(tagjam13.Item.SIZE, tagjam13.Item.SIZE).setFill('#733');
};

goog.inherits(tagjam13.Bucket, tagjam13.Item);

tagjam13.Wax = function() {
    goog.base(this);

    this.setSize(tagjam13.Item.SIZE, tagjam13.Item.SIZE).setFill('#a71');
};

goog.inherits(tagjam13.Wax, tagjam13.Item);

tagjam13.Dragon = function() {
    goog.base(this);

    this.setSize(tagjam13.Item.SIZE, tagjam13.Item.SIZE).setFill('#171');
};

goog.inherits(tagjam13.Dragon, tagjam13.Item);
