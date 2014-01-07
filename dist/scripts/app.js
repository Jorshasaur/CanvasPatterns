(function() {
  var DrawingBoard, PatternDisplay;

  $(document).ready(function() {
    var updatePattern,
      _this = this;
    this.drawing_board = new DrawingBoard();
    this.pattern_display = new PatternDisplay();
    $("#pattern-display").attr("width", $(window).width()).attr("height", $(window).height());
    $(document).on("refreshPattern", function() {
      return updatePattern();
    });
    updatePattern = function() {
      var svg;
      svg = _this.drawing_board["export"]();
      return _this.pattern_display.drawPattern(svg);
    };
    $("#circle").click(function() {
      _this.drawing_board.addCircle();
      return updatePattern();
    });
    $("#rect").click(function() {
      _this.drawing_board.addRectangle();
      return updatePattern();
    });
    $("#random").click(function() {
      _this.drawing_board.random();
      return updatePattern();
    });
    $("#clear").click(function() {
      _this.drawing_board.clear();
      return _this.pattern_display.clear();
    });
    return $("#svg").click(function() {
      var svg;
      svg = _this.drawing_board["export"]();
      return console.log(svg);
    });
  });

  DrawingBoard = (function() {
    function DrawingBoard() {
      this.paper = Raphael($("#drawing-board")[0], 0, 0, 490, 490);
      this.drawBackground();
    }

    DrawingBoard.prototype.drawBackground = function() {
      var circle;
      circle = this.paper.rect(0, 0, 490, 490);
      circle.attr("fill", "#fff");
      return circle.attr("stroke", "#fff");
    };

    DrawingBoard.prototype.addCircle = function() {
      var circle, radius, x, y;
      radius = this.range(5, 50);
      x = this.range(0, 500);
      y = this.range(0, 500);
      circle = this.paper.circle(x, y, radius);
      circle.attr("fill", this.randomHex());
      circle.attr("stroke", "none");
      return circle.drag(this.moveCircle, this.startCircle, this.up);
    };

    DrawingBoard.prototype.addRectangle = function() {
      var rect, size, x, y;
      size = this.range(5, 50);
      x = this.range(0, 500);
      y = this.range(0, 500);
      rect = this.paper.rect(x, y, size, size);
      rect.attr("fill", this.randomHex());
      rect.attr("stroke", "none");
      return rect.drag(this.move, this.start, this.up);
    };

    DrawingBoard.prototype.startCircle = function() {
      this.ox = this.attr("cx");
      return this.oy = this.attr("cy");
    };

    DrawingBoard.prototype.moveCircle = function(dx, dy) {
      return this.attr({
        cx: this.ox + dx,
        cy: this.oy + dy
      });
    };

    DrawingBoard.prototype.start = function() {
      this.ox = this.attr("x");
      return this.oy = this.attr("y");
    };

    DrawingBoard.prototype.up = function() {
      return $.event.trigger({
        type: "refreshPattern"
      });
    };

    DrawingBoard.prototype.move = function(dx, dy) {
      return this.attr({
        x: this.ox + dx,
        y: this.oy + dy
      });
    };

    DrawingBoard.prototype.range = function(lower, upper) {
      var range;
      range = upper - lower;
      return Math.round(Math.random() * range) + lower;
    };

    DrawingBoard.prototype.randomHex = function() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    DrawingBoard.prototype.random = function() {
      var i, numShapes, shape, _i, _results;
      numShapes = this.range(10, 300);
      _results = [];
      for (i = _i = 0; _i <= numShapes; i = _i += 1) {
        shape = this.range(1, 2);
        if (shape === 2) {
          _results.push(this.addRectangle());
        } else {
          _results.push(this.addCircle());
        }
      }
      return _results;
    };

    DrawingBoard.prototype.clear = function() {
      this.paper.clear();
      return this.drawBackground();
    };

    DrawingBoard.prototype["export"] = function() {
      this.paper.setSize(490, 490);
      return this.paper.toSVG();
    };

    return DrawingBoard;

  })();

  PatternDisplay = (function() {
    function PatternDisplay() {
      this.pattern_canvas = $('#pattern-canvas')[0];
      this.pattern_canvas.width = this.pattern_canvas.height = 490;
      this.pattern_display = $('#pattern-display')[0];
      this.context = this.pattern_display.getContext('2d');
    }

    PatternDisplay.prototype.drawPattern = function(svg) {
      var pattern;
      canvg(this.pattern_canvas, svg);
      pattern = this.context.createPattern(this.pattern_canvas, 'repeat');
      this.context.rect(0, 0, this.pattern_display.width, this.pattern_display.height);
      this.context.fillStyle = pattern;
      return this.context.fill();
    };

    PatternDisplay.prototype.clear = function() {
      return this.context.clearRect(0, 0, this.pattern_display.width, this.pattern_display.height);
    };

    return PatternDisplay;

  })();

}).call(this);
