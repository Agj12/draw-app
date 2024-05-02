function RectangleTool(){

    this.name = "rectangle tool";
	this.icon = "assets/rectangle.png";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

    let rWidthSlider;
    let rHeightSlider;
    let strokeWeightSlider;
    let customFill;
    let customStroke;
    
    let para;
    let para2;
    let para3;
    let para4;
    let para5;
    
    // This function makes sure that it will draw to the canvus
    var mousePressOnCanvas = function(c){
        if (mouseX > 0 &&
            mouseX < c.width &&
            mouseY > 0 &&
            mouseY < c.height
        ) {
            return true;
        }
        return false;
    }
    
	//draws the line to the screen 
	this.draw = function(){
        
        // Get the values from the DOM elements to use to change 
        // the fill, size, stroke of the rect
        let rWidth = rWidthSlider.value();
        let rHeight = rHeightSlider.value();
        let rStrokeWeight = strokeWeightSlider.value();
        let fillColour = customFill.value();
        let strokeColour = customStroke.value();

		//only draw when mouse is clicked and when mouse is on canvus
		if(mouseIsPressed && mousePressOnCanvas(c)){
            // track where mouse is
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
				//save the current pixel Array
				loadPixels();
			}
			else{
				//update the screen with the saved pixels to hide any previous
				updatePixels();
                
                fill(fillColour);
                stroke(strokeColour);
                strokeWeight(rStrokeWeight);
				rect(mouseX, mouseY, rWidth, rHeight); //draw the rect at mouseX and Y
                strokeWeight(1); // change it back so it doesn't affect the other tools
                stroke(0);
			}

		}
		else if(drawing){
			//save the pixels with the most recent line and reset the
			//drawing bool and start locations
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};
    
    this.unselectTool = function() {
        updatePixels();
        // remove sliders
        rWidthSlider.remove();
        rHeightSlider.remove();
        strokeWeightSlider.remove();
        // remove input box
        customFill.remove();
        customStroke.remove();
        // remove text
        para.remove();
        para2.remove();
        para3.remove();
        para4.remove();
        para5.remove();
    }
    
    this.populateOptions = function() {
        loadPixels();
        
        rWidthSlider = createSlider(1, 300, 70, 0);// rect size
        rWidthSlider.position(315, height + 105); // position of slider
        
        rHeightSlider = createSlider(1, 230, 50, 0);// rect size
        rHeightSlider.position(315, height + 155); // position of slider
        
        strokeWeightSlider = createSlider(1, 20, 1, 0);// stroke weight slider
        strokeWeightSlider.position(720, height + 130); // position of slider
        
        // text to help user know what changes what
        para = createDiv('Width');
        para.style('font-size', '18px');
        para.style('color', 'white');
        para.position(365, height + 85);
        
        para2 = createDiv('Fill');
        para2.style('font-size', '18px');
        para2.style('color', 'white');
        para2.position(510, height + 100);
        
        para3 = createDiv('Stroke');
        para3.style('font-size', '18px');
        para3.style('color', 'white');
        para3.position(615, height + 100);
        
        para4 = createDiv('Stroke Weight');
        para4.style('font-size', '18px');
        para4.style('color', 'white');
        para4.position(735, height + 100);
        
        para5 = createDiv('Height');
        para5.style('font-size', '18px');
        para5.style('color', 'white');
        para5.position(365, height + 135);
        
        // Can change the fill to the colour the user decides and inputs 
        // in the input box
        customFill = createInput('white');
        customFill.position(490, height + 130);
        customFill.size(60);
        
        // Can change the stroke to the colour the user decides and inputs 
        // in the input box
        customStroke = createInput('black');
        customStroke.position(610, height + 130);
        customStroke.size(60);
    }
}