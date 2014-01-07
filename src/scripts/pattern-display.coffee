class PatternDisplay

	constructor: ->
		@pattern_canvas = $('#pattern-canvas')[0]
		@pattern_canvas.width = @pattern_canvas.height = 490
		@pattern_display = $('#pattern-display')[0]
		@context = @pattern_display.getContext('2d')

	drawPattern: (svg)->
		canvg(@pattern_canvas, svg)
		pattern = @context.createPattern(@pattern_canvas, 'repeat')
		@context.rect(0, 0, @pattern_display.width, @pattern_display.height)
		@context.fillStyle = pattern
		@context.fill()

	clear: ->
		@context.clearRect 0, 0, @pattern_display.width, @pattern_display.height