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

tagjam13.data.Tutorial.prototype.item = function() {
    return this.getBanner_(1).appendChild(
        this.getLabel_("Bugs drop supplies, press spacebar\nto pick them up"));
};

tagjam13.data.Tutorial.prototype.bug = function() {
    return this.getBanner_(1).appendChild(
        this.getLabel_("Eat bugs that get trapped in your web\n"+
                       "(spacebar to continue)"));
};

tagjam13.data.Tutorial.prototype.getLabel_ = function(text) {
    return tagjam13.resources.getLabel().setText(text)
        .setFontSize(tagjam13.data.Tutorial.FONT_SIZE)
        .setFontColor('#ACEBAE')
        .setPosition(0, tagjam13.data.Tutorial.LINE_HEIGHT)
        .setMultiline(true);
};

tagjam13.data.Tutorial.prototype.getBanner_ = function(lines) {
    var height = tagjam13.data.Tutorial.LINE_HEIGHT * (lines+1);
    var background = new lime.Sprite().setSize(710, height+10)
            .setFill('#ACEBAE').setAnchorPoint(.5, 0);
    return background.appendChild(
        new lime.Sprite().setSize(700, height).setFill('#7D9100')
            .setAnchorPoint(.5, 0).setPosition(0, 5)).setStroke(3, '#324242');
};
