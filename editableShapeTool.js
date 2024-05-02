function EditableShapeTool(){
    
    this.name = "editable shapes";
    this.icon = "assets/shapes.jpg";
    
    var editButton;
    var finishButton;
    var editMode = false;
    var currentShape = [];
    
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
    
    // Pushes the mouse x and y into the currentshape array
    // if the mouse is on the canvus and pressed push mouse x and y to array
    this.draw = function(){
        updatePixels();
        if(mouseIsPressed && mousePressOnCanvas(c)){
            if(!editMode){
                currentShape.push({ 
                    x: mouseX, 
                    y: mouseY
                    })
            }
            // figure out the distance from mouse x and y to the previous mouse x and 
            // y stored in the array and then replace the array with the new mouse x and y
            else{
                for(var i = 0; i < currentShape.length; i++){
                    if(dist(currentShape[i].x,
                           currentShape[i].y,
                           mouseX,
                           mouseY)< 15){
                        currentShape[i].x = mouseX;
                        currentShape[i].y = mouseY;
                    }
                }
            }
        }

        beginShape();
        for(var i = 0; i < currentShape.length; i++){
            noFill(); // make sure that only the vertex changes colour when differnt colour chosen
            // Draw lines from the co-ordinates pushed into the array.
            vertex(currentShape[i].x, 
                  currentShape[i].y);
            // Shows the verticies that can be moved with a blue ellipse
            if(editMode){
                fill('blue'); // shape can be edited with blue circles
                ellipse(currentShape[i].x,
                       currentShape[i].y,
                       10);
                noFill(); // ensures only the lines are changed to 
                          // blue when clicked to edit shape
            }
        }
        endShape();
    }
    
    // This function removes the buttons to clear the UI
    this.unselectTool = function(){
        updatePixels();
        // removes button when tool is unselected 
		editButton.remove();
        finishButton.remove();
	};
    
    // This function creates the buttons and populates the UI
    this.populateOptions = function(){
        noFill(); // ensure that changing colours won't affect the drawing
        loadPixels();
        editButton = createButton('Edit shape');
        // If button is pressed the user to edit the shape, also the button changes
        // If pressed again the user can continue drawing
        editButton.mousePressed(function(){
            if(editMode){
                editMode = false;
                editButton.html("Edit shape");
            }
            else{
                editMode = true;
                editButton.html("Add vertices");
            }
        });

        finishButton = createButton('Finish shape');
        // When finish button is pressed that shape/drawing will be completed
        // and a new one can be created
        finishButton.mousePressed(function(){
            editMode = false;
            draw(); // call the draw function 
            loadPixels(); // loads the pixels
            currentShape = [];
        });
    
        // Position of the two buttons
        editButton.position(315, height + 90);
        finishButton.position(415, height + 90);
    }
} 