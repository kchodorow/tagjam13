goog.provide('tagjam13.Bucket');

goog.require('lime.Sprite');

tagjam13.Bucket = function() {
    goog.base(this);

    this.setSize(tagjam13.Bucket.SIZE, tagjam13.Bucket.SIZE).setFill('#733');
};

goog.inherits(tagjam13.Bucket, lime.Sprite);

tagjam13.Bucket.SIZE = 20;
