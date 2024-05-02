function SpirographTool(){
    
    this.icon = "assets/spirograph.png";
    this.name = "spirograph";
    
    // x and y coordinates
    var x1;
    var x2;
    var y1;
    var y2;
    
    // angle
    var ang1 = 0;
    var ang2 = 0;
    
    var previousMouseX;
    var previousMouseY;
        
    // text variable
    var p1;
    var p2;
    
    // radius slider
    let radSlider;
    let radSlider2;
    
    // number slider
    let valueSlider;
    let valueSlider2;
    
    angleMode(DEGREES); // Make sure that angleMode is Degrees
    
    // This function makes sure that it will draw to the canvus
    var mousePressOnCanvas = function(c){
        if (mouseX > 0 &&
            mouseX < c.width &&
            mouseY > 0 &&
            mouseY < c.height
        ){
            return true;
        }
        return false;
    }
    
    this.draw = function(){
        // Translate so the spirograph appears where the mouse is
        translate(mouseX, mouseY);
    
        // Take the value from the slider and apply to these
        // variables to allow the user to choose the spirograph 
        // shape
        let rad1 = radSlider.value();
        let rad2 = radSlider2.value();
        
        let value1 = valueSlider.value();
        let value2 = valueSlider2.value();
        
        // If the mouse is held on canvus it will draw the spirograph
        if(mouseIsPressed && mousePressOnCanvas(c)){
            // Create for loops to make it draw faster
            for(var i = 0; i < 15; i++){
                for(var j = 0; j < 15; j++){
                    // x and y coordinates of the point of the line
                    // first line, the focus point
                    x1 = rad1 * cos(ang1);
                    y1 = rad1 * sin(ang1);
                    // second line goes around the focus point 
                    x2 = x1 + rad2 * cos(ang2);
                    y2 = y1 + rad2 * sin(ang2);

                    // Draw the line that creates the circles
                    line(previousMouseX, previousMouseY, x2, y2);

                    previousMouseX = x2;
                    previousMouseY = y2;

                    // Changes the angle every time
                    ang1 += value1;
                    ang2 += value2;
                }
            }
        }
        else{
            loadPixels(); // when mouse is released save what is drawn 
        }
    }
    
    // This function removes the buttons to clear the UI
    this.unselectTool = function() {
        // Removes the sliders
		radSlider.remove();
        radSlider2.remove();
        valueSlider.remove();
        valueSlider2.remove();
        
        // Removes the text
        p1.remove();
        p2.remove();   
	};
    
    // This function creates the buttons and populates the UI
    this.populateOptions = function() {
        loadPixels();
        // The radius of the spirograph (size)
        radSlider = createSlider(50, 70, 50, 0); // inner radius
        radSlider2 = createSlider(50, 70, 50, 0); // outer radius
        // The pattern of the spirograph 
        valueSlider = createSlider(0.1, 5, 0.5, 0); 
        valueSlider2 = createSlider(0.1, 5, 4.2, 0); 
    
        // Position of the four sliders
        radSlider.position(315, height + 145);
        radSlider2.position(465, height + 145);
        valueSlider.position(645, height + 145);
        valueSlider2.position(795, height + 145);
        
        // Some text position and styled on the page
        p1 = createDiv('Spirograph size');
        p1.style('font-size', '18px');
        p1.style('color', 'white');
        p1.position(400, height + 115);
        
        p2 = createDiv('Spirograph pattern');
        p2.style('font-size', '18px');
        p2.style('color', 'white');
        p2.position(725, height + 115);
    }
}