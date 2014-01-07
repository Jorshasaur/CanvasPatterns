class DrawingBoard

	constructor: ->
		@paper = Raphael $("#drawing-board")[0], 0, 0, 490, 490
		@drawBackground()

	drawBackground: ->
		circle = @paper.rect 0, 0, 490, 490
		circle.attr "fill", "#fff"
		circle.attr "stroke", "#fff"

	addCircle: ->
		radius = @range 5, 50
		x = @range 0, 500
		y = @range 0, 500	

		circle = @paper.circle x, y, radius
		circle.attr "fill", @randomHex()
		circle.attr "stroke", "none"
		circle.drag @moveCircle, @startCircle, @up

	addRectangle: ->
		size = @range 5, 50
		x = @range 0, 500
		y = @range 0, 500

		rect = @paper.rect(x, y, size, size)
		rect.attr "fill", @randomHex()
		rect.attr "stroke", "none"
		rect.drag @move, @start, @up

	startCircle: ->
		@ox = @attr "cx"
		@oy = @attr "cy"

	moveCircle: (dx, dy)->
		@attr({cx: @ox + dx, cy: @oy + dy })

	start: ->
		@ox = @attr "x"
		@oy = @attr "y"

	up: ->
		$.event.trigger
			type: "refreshPattern"

	move: (dx, dy)->
		@attr({x: @ox + dx, y: @oy + dy })		

	range: (lower, upper)->
		range = upper - lower
		return Math.round(Math.random() * range) + lower

	randomHex: ->
        '#'+Math.floor(Math.random()*16777215).toString(16)

    random: ->
    	numShapes = @range 10, 300
    	for i in [0..numShapes] by 1
    		shape = @range 1, 2
    		if shape is 2
    			@addRectangle()
    		else 
    			@addCircle()

    clear: ->
    	@paper.clear()
    	@drawBackground()

    export: ->
    	@paper.setSize 490, 490
    	return @paper.toSVG()
