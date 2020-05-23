'use strict';

// Get a reference to the <canvas> element in the HTML
let canvas = document.querySelector('canvas');

// Call the getContext() method (passing a parameter of '2d') to get access
// to the canvas's context brush.
let brush = canvas.getContext('2d');

// We only want to draw on our canvas when our mouse is *held down*
// To keep track of this, create a global state variable that is an Object
// with an appropriate property for tracking when the mouse is down.
// Also create a color property of your state and set it to "black"
let state = {
    mousedown: false,
    color: 'black'
}

// To draw our lines when the mouse is down and moved, we'll need to create 3 events:

// Create a mousedown event that changes the mouse state in your global state object
// This event should then move your canvas context to the event.offSet location
// (of the click event) and begin a path
// It shoud also set the canvas's strokeStyle to the current color in your state
canvas.addEventListener('mousedown', function(event) {
    state.mousedown = true;
    brush.beginPath();
    brush.moveTo(event.offsetX, event.offsetY);
    brush.strokeStyle = state.color;
    brush.lineWidth = 10;
})

// Create a mousemove event that draws a line to your current mouse location
// This event should not draw a line if the mouse is up (check your state!)
canvas.addEventListener('mousemove', function(event) {
    if(state.mousedown) {
        brush.lineTo(event.offsetX, event.offsetY);
        brush.stroke();
    }
})

// Create a mouseup event that closes your path
// This event should change your state of your mouse (i.e., no longer down)
canvas.addEventListener('mouseup', function() {
    state.mousedown = false;
    brush.closePath();
})

// You should now we able to draw smooth lines!
// You may want to give the brush a thicker lineWidth.


// The provided HTML includes an <input type="color">, which is an element
// that gets a color input from the user. While this feature is not supported by
// IE or iOS (http://caniuse.com/#feat=input-color), it does work great on other
// browsers!
// 
// Add an event listener for this <input> that responds to 'input' events.
// The callback function should change the color stored in your state
// 
let input = document.querySelector('input');
input.addEventListener('input', function() {
    state.color = input.value;
    brush.strokeStyle = input.value;
})

// Now you can draw with color!


// Wouldn't it be nice to be able to save your fine artwork to share with others?
// Add code to do the following when the  "save" button is clicked:
//  1. Use the canvas's toDataUrl() function to convert the canvas content into
//     png format (pass the string 'image/png') as an argument to specify type.
//  2. Create a new <a> element that will serve as a link to the image. You do
//     NOT need to attach this to the DOM tree!
//  3. Set the link's href attribute to be the produced data url.
//  4. Set the link's download attribute to be the name of the file to save the
//     picture as (e.g., drawing.png). This attribute is also not supported by
//     IE and iOS (http://caniuse.com/#search=download).
//  5. Programmatically click the link by calling the click() method on it!
let button = document.querySelector('button');
button.addEventListener('click', function() {
    let dataURL = canvas.toDataURL('image/png');
    let a = document.createElement('a');
    a.setAttribute('href', dataURL);
    a.setAttribute('download','drawing.png');
    a.click();
})


// Draw a pretty picture and save it in the problem's img/ folder 🙂
// We'll check these manually