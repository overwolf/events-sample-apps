function uiEventRegister()
{
	var requiredFeatures = [];
	
	overwolf.games.events.onInfoUpdates2.addListener(function (d) {getGameInfo(d);});

	overwolf.games.events.onNewEvents.addListener(function(x) {getGameInfo(x);});
	
	overwolf.games.events.setRequiredFeatures(['player'], function(x) { console.log(x); });
	
	function getGameInfo(data)
	{
		//$('#resulttextarea').val($('#resulttextarea').val() + info + "\n");	
		
		if (data.info) {
			console.log(data.info);
			for (var i=0; i < data.info.length; i++) {
				$('#resulttextarea').val($('#resulttextarea').val() + '\n' + data.info[i].category  + " " + data.info[i].key + " " +data.info[i].value + "\n");	
			}
		}
		else {
			for (var i = 0; i < data.events.length; i++) {
				console.log(data.events[i]);
				$('#resulttextarea').val($('#resulttextarea').val() + '\n' + JSON.stringify(data.events[i]));
			}
		}
		
		
	}
	

	
	$('#resizeGripTopLeft').mousedown(function(){
		overwolf.windows.dragResize( currentWindowId , overwolf.windows.enums.WindowDragEdge.TopLeft );	
	});

	$('#resizeGripTopRight').mousedown(function(){
		overwolf.windows.dragResize( currentWindowId , overwolf.windows.enums.WindowDragEdge.TopRight );	
	});

	$('#resizeGripTop').mousedown(function(){
		overwolf.windows.dragResize( currentWindowId , overwolf.windows.enums.WindowDragEdge.Top );	
	});

	$('#resizeGripRight').mousedown(function(){
		overwolf.windows.dragResize( currentWindowId , overwolf.windows.enums.WindowDragEdge.Right );	
	});

	$('#resizeGripLeft').mousedown(function(){
		overwolf.windows.dragResize( currentWindowId , overwolf.windows.enums.WindowDragEdge.Left );	
	});

	$('#resizeGripBottomRight').mousedown(function(){
		overwolf.windows.dragResize( currentWindowId , overwolf.windows.enums.WindowDragEdge.BottomRight );	
	});

	$('#resizeGripBottomLeft').mousedown(function(){
		overwolf.windows.dragResize( currentWindowId , overwolf.windows.enums.WindowDragEdge.BottomLeft );	
	});

	$('#resizeGripBottom').mousedown(function(){
		overwolf.windows.dragResize( currentWindowId , overwolf.windows.enums.WindowDragEdge.Bottom );	
	});
		

	$( "#dragWindow" ).mousedown(function() {
	  overwolf.windows.dragMove(currentWindowId , function (d) 
	  {console.log("Drag move" + d.status + " --> " + d.horizontalChange + ":" + d.verticalChange)});
	});


	$( "#close" ).click(function() {
		overwolf.windows.close(currentWindowId,function(result){});
	});
	
		
	
	$( "#resize" ).click(function() {
		var widthtxt = $( "#widthTextBox" ).val();
		widthtxt = parseInt(widthtxt);
		var heighttxt = $( "#heightTextBox").val();
		heighttxt = parseInt(heighttxt);
	  overwolf.windows.changeSize(currentWindowId,widthtxt,heighttxt,function(result){});
	});
		
}