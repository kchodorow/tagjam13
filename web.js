goog.provide('tagjam13.Web');

goog.require('lime.Sprite');

tagjam13.Web = function() {
    goog.base(this);

    var sectionWidth = (WIDTH - 2*tagjam13.Scene.LEFT_MARGIN)/2;
    var sectionHeight = (HEIGHT - tagjam13.Scene.LEFT_MARGIN -
                         tagjam13.Scene.BOTTOM_OF_SILL)/2;

    this.midpointY_ = tagjam13.Scene.BOTTOM_OF_SILL + sectionHeight;
    this.sections_ = [[], []];
    for (var i = 0; i < 2; i++) {
        var sectionT = new lime.Sprite().setSize(sectionWidth, sectionHeight)
            .setPosition(sectionWidth * i, 0)
            .setFill(tagjam13.Web.FILLS[tagjam13.Web.MAX_HEALTH]);
        sectionT.health_ = tagjam13.Web.MAX_HEALTH;
        this.appendChild(sectionT);
        var sectionB = new lime.Sprite().setSize(sectionWidth, sectionHeight)
            .setPosition(sectionWidth * i, sectionHeight)
            .setFill(tagjam13.Web.FILLS[tagjam13.Web.MAX_HEALTH]);
        sectionB.health_ = tagjam13.Web.MAX_HEALTH;
        this.appendChild(sectionB);
        this.sections_[i] = [sectionT, sectionB];
    }
};

goog.inherits(tagjam13.Web, lime.Sprite);

tagjam13.Web.MAX_HEALTH = 2;
tagjam13.Web.FILLS = ['#444', '#888', '#ddd'];

tagjam13.Web.prototype.getOffsets = function() {
    var size = this.sections_[0][0].getSize();
    return new goog.math.Coordinate(
        size.width/2 + tagjam13.Scene.LEFT_MARGIN,
        size.height/2 + tagjam13.Scene.BOTTOM_OF_SILL);
};

// Returns if the web is ruined.
tagjam13.Web.prototype.dripOn = function() {
    var quadrant = goog.math.randomInt(4);
    var section = null;
    switch (quadrant) {
    case 0:
        section = this.sections_[0][0];
        break;
    case 1:
        section = this.sections_[0][1];
        break;
    case 2:
        section = this.sections_[1][0];
        break;
    default:
        section = this.sections_[1][1];
        break;
    }

    section.health_ = Math.max(section.health_ - 1, 0);
    section.setFill(tagjam13.Web.FILLS[section.health_]);
    return section.health_ <= 0;
};

tagjam13.Web.prototype.dryOff = function(pos) {
    var x = 0, y = 0;
    if (pos.x > WIDTH/2) {
        x = 1;
    }
    if (pos.y > this.midpointY_) {
        y = 1;
    }

    this.sections_[x][y].health_ = Math.min(
        this.sections_[x][y].health_ + 1, tagjam13.Web.MAX_HEALTH);
    this.sections_[x][y].setFill(
        tagjam13.Web.FILLS[this.sections_[x][y].health_]);
};
