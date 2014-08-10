goog.provide('tagjam13.data.Tutorial');

tagjam13.data.Tutorial = function() {

};

tagjam13.data.Tutorial.LINE_HEIGHT = LEN * 1.4;
tagjam13.data.Tutorial.FONT_SIZE = 30;

tagjam13.data.Tutorial.prototype.intro = function() {
    var directions = "Itsy Bitsy Spider\n\n" +
            "Catch raindrops in buckets to protect your web.\n" +
            "Use left, right, up, and down (or WASD) to move.\n" +
            "P to pause.\n(spacebar to begin)";
    return this.getBanner_(5).appendChild(
        this.getLabel_(directions));
};

tagjam13.data.Tutorial.prototype.item = function() {
    return this.getBanner_(3).appendChild(
        this.getLabel_("Bugs drop supplies, press spacebar\nto pick them up.\n"+
                       "(spacebar to continue)"));
};

tagjam13.data.Tutorial.prototype.bucket = function() {
    return this.getBanner_(2).appendChild(
        this.getLabel_("Place buckets beneath drips to catch raindrops.\n"+
                       "(spacebar to continue)"));
};

tagjam13.data.Tutorial.prototype.dragon = function() {
    return this.getBanner_(2).appendChild(
        this.getLabel_("Use dragons to dry out wet sections of web.\n"+
                       "(spacebar to continue)"));
};

tagjam13.data.Tutorial.prototype.wax = function() {
    return this.getBanner_(3).appendChild(
        this.getLabel_("Climb up the walls to plug holes in \nthe ceiling " +
                       "with beeswax.\n(spacebar to continue)"));
};

tagjam13.data.Tutorial.prototype.bug = function() {
    return this.getBanner_(2).appendChild(
        this.getLabel_("Eat bugs that get trapped in your web.\n"+
                       "(spacebar to continue)"));
};

tagjam13.data.Tutorial.prototype.win = function() {
    return this.getBanner_(2).appendChild(
        this.getLabel_("You win!"));
};

tagjam13.data.Tutorial.prototype.getLabel_ = function(text) {
    return tagjam13.resources.getLabel().setText(text)
        .setFontSize(tagjam13.data.Tutorial.FONT_SIZE)
        .setFontColor('#FFFF9D')
        .setMultiline(true);
};

tagjam13.data.Tutorial.prototype.getBanner_ = function(lines) {
    var height = tagjam13.data.Tutorial.LINE_HEIGHT * (lines+1);
    var background = new lime.Sprite().setSize(710, height+10)
            .setFill('#ACEBAE');
    return background.appendChild(
        new lime.Sprite().setSize(700, height).setFill('#7D9100')
            .setStroke(3, '#324242'));
};
