'use strict';

/** Basic Types */

//Define a new variable `motto` for the value "The iSchool is my school"
let motto = "The iSchool is my school";

//Log out the motto
console.log(motto);

//Define a variable `mottoLength` that stores the length of the motto.
//Use the `.length` property
//Log out the length
let mottoLength = motto.length;
console.log(mottoLength);

//Use the `indexOf()` String method to see if the word "cool" is in the string.
//See http://www.w3schools.com/jsref/jsref_obj_string.asp for String methods
//Log out a boolean whether it is or not
console.log(motto.indexOf("cool") != -1);

//Create a variable `newMotto` by replacing the word "iSchool" in the motto 
// with the words "Information School". Use the `replace` method on your `motto`.
//Log out the new motto
let newMotto = (motto.replace("iSchool", "Information School"));
console.log(newMotto);

//Calculate the ratio between the length of the new motto and the length of the 
//old. Log out this ratio as a percentage with two decimal places of precision
//(e.g., `"123.45%"`). Your ratio should include the percent symbol ("%")
//You can use the `.toFixed()` number method. 

let newLength = newMotto.length;
let oldLength = motto.length;
let ratio = ((newLength / oldLength) * 100);
console.log(ratio.toFixed(2) + "%");


/** Arrays **/

//Create an array `numbers` that contains these ten decimals
//(e.g., 1 4 1 5 9 2 6 5 3 5).
//Log out the array
let numbers = [1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
console.log(numbers);

//Use bracket notation to change the `4` in the array to a `4.2`.
//Log out the updated array
numbers[1] = 4.2;
console.log(numbers);

//Add the number 3 to the end of the array.
//Log out the updated array
numbers.push(3);
console.log(numbers);

//Find the median (middle) value of the numbers in the array.
//Hint: sort() the array, then access the middle index of the sorted values.
//Hint: you can only use integers as indices. 
//Log out the median value 
numbers.sort();
let median = Math.floor(numbers.length / 2);
console.log(numbers[median]);


/** Objects **/

//Create a variable `rect` that represents a rectangle. This should be an Object
//with properties:
//  `x` (coordinate) of 30, `y` of 50, `width` of 100, `height` of 50
//Log out the rectangle object
let rect = {
    x: 30,
    y: 50,
    width: 100,
    height: 50
};
console.log(rect);

//Log out the x- and y- coordinates of the rectangle (its location). Your output 
//should have the format `"X, Y"`.
console.log(rect.x + ", " + rect.y);

//Set the rectangle's height to be the square root of its width. Use Math.sqrt()
//Use *dot notation* to access the properties!
rect.height = (Math.sqrt(rect.width));

//Log out the rectangle's area. Use *dot notation* to access the properties!
let area = rect.width * rect.height;
console.log(area);

//Create a variable `circle` that represents a circle. This should be an object
//with properties
//  `cx` (center-x-coordinate) of 34, 
//  `cy` of 43, and
//  `radius` equal to the LAST value in the (sorted) `numbers` array.
//Log out the circle
let circle = {
    cx: 34,
    cy: 43,
    radius: numbers[numbers.length - 1]
};
console.log(circle);

//Create an array `shapes` that represents a list of shapes. The array should
//contain the rectangle and the circle objects defined above.
//Log out the variable. Be sure to inspect it in the developer console!
let shapes = [rect, circle];
console.log(shapes);

//Add a new ANONYMOUS object (i.e., don't define the object before passing it into the array) 
//to the `shapes` array representing a right triangle.
//The triangle should have a `base` of 33 and a `height` of 44.
//Log out the updated shapes array
let triangle = {};
shapes.push(triangle);
triangle.base = 33;
triangle.height = 44; 
console.log(shapes);

//Log out the triangle's `hypotenuse` property. Determine why you got that result.
//Hint; you don't need to compute this -- just log the *current* value. 
console.log(triangle.hypotenuse); 

//Assign the triangle inside the `shapes` array a 'hypotenuse' property of 55
//Log out the `shapes` array again.
//Check: what happens if you inspect the previously logged array in the Chrome
//developer console?
triangle.hypotenuse = 55; 
console.log(shapes);
