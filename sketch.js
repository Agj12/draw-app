// Global variables that will store the toolbox colour palette
// and the helper functions.
var toolbox = null;
var colourP = null;
var helpers = null;

function setup() {
    
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	c = createCanvas(canvasContainer.size().width, canvasContainer.size().height);
	c.parent("content");

    // This allows you to drop an image on the canvus
    c.drop(gotFile);
    
	//create helper functions and the colour palette
    helpers = new HelperFunctions();
	colourP = new ColourPalette();

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox.
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new MirrorDrawTool());
    toolbox.addTool(new EditableShapeTool());
    toolbox.addTool(new EraserTool());
    toolbox.addTool(new SpirographTool());
    toolbox.addTool(new RectangleTool());    
	background(255);
}

// this function gets the image data and makes sure that the
// image can be used, when dropedthe image is drawn on the canvus
function gotFile(file){
    var img = createImg(file.data)
    img.hide();
    // When droped the image will be on the canvus
    image(img, 0, 0, img.width, img.height);
}

function draw() {
	//call the draw function from the selected tool.
	//hasOwnProperty is a javascript function that tests
	//if an object contains a particular method or property
	//if there isn't a draw method the app will alert the user
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	} else {
		alert("it doesn't look like your tool has a draw method!");
	}
}