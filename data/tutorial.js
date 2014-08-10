goog.provide('tagjam13.data.Tutorial');

tagjam13.data.Tutorial = function() {

};

tagjam13.data.Tutorial.LINE_HEIGHT = LEN * 1.4;
tagjam13.data.Tutorial.FONT_SIZE = 30;

tagjam13.data.Tutorial.prototype.intro = function() {
    var directions = ["Catch raindrops in buckets to protect your web!",
                      "Use left, right, up, and down (or WASD) to move",
                      "P to pause", "Hit spacebar to begin"];
    var banner = this.getBanner_(directions.length);
    var padding = tagjam13.data.Tutorial.LINE_HEIGHT;
    for (var i = 0; i < directions.length; ++i) {
        banner.appendChild(
            this.getLabel_(directions[i])
                .setPosition(0, padding+i*tagjam13.data.Tutorial.LINE_HEIGHT));
    }
    return banner;
};

tagjam13.data.Tutorial.prototype.bucket = function() {
    return this.getBanner_(1).appendChild(
        this.getLabel_("Press spacebar to pick up a bucket"));
};

tagjam13.data.Tutorial.prototype.getLabel_ = function(text) {
    return tagjam13.resources.getLabel().setText(text)
        .setFontSize(tagjam13.data.Tutorial.FONT_SIZE)
        .setFontColor('#FFFF9D')
        .setPosition(0, tagjam13.data.Tutorial.LINE_HEIGHT);
};

tagjam13.data.Tutorial.prototype.getBanner_ = function(lines) {
    var height = tagjam13.data.Tutorial.LINE_HEIGHT * (lines+1);
    return new lime.Sprite().setSize(700, height).setFill('#7D9100')
            .setAnchorPoint(.5, 0);
};
