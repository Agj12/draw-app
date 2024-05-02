function EraserTool(){
    
	this.name = "eraser";
	this.icon = "assets/eraser.jpg";
    
    var prevX = -1;
	var prevY = -1; 
    
	this.draw = function(){            
        // Make this white to remove what you have drawn
        if(mouseIsPressed){
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (prevX == -1){
				prevX = mouseX;
				prevY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else{
                stroke(255);
                strokeWeight(25); // make it so that you can remove more
				line(prevX, prevY, mouseX + 1, mouseY + 1);
				prevX = mouseX;
				prevY = mouseY;
                strokeWeight(1); // change the stroke back so that it don't affect other tools
                stroke(0);
			}
		}
		//if the user has released the mouse we want to set the previousMouse values 
		//back to -1.
		else{
			prevX = -1;
			prevY = -1;
		}
	}
}