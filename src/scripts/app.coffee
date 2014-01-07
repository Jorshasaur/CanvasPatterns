$(document).ready ->
	@drawing_board = new DrawingBoard()
	@pattern_display = new PatternDisplay()	
	$("#pattern-display").attr("width", $(window).width()).attr("height", $(window).height())

	$(document).on "refreshPattern", =>
		updatePattern()

	updatePattern = =>
		svg = @drawing_board.export()
		@pattern_display.drawPattern svg

	$("#circle").click =>
		@drawing_board.addCircle()
		updatePattern()

	$("#rect").click =>
		@drawing_board.addRectangle()		
		updatePattern()

	$("#random").click =>
		@drawing_board.random()
		updatePattern()

	$("#clear").click =>
		@drawing_board.clear()			
		@pattern_display.clear()

	$("#svg").click =>		
		svg = @drawing_board.export()
		console.log svg