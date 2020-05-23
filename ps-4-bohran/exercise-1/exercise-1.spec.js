//dependencies
const fs = require('fs');
const path = require('path');
const md5 = require('md5');

//problem config
const HTML_FILE_PATH = (__dirname + '/index.html');
const JS_FILE_PATH = __dirname + '/js/index.js';

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

//load the HTML content to test with
const html = fs.readFileSync(HTML_FILE_PATH, 'utf-8');

/** Begin tests **/

describe('Source code is valid', () => {
    test('JavaScript lints without errors', async () => {
        expect([JS_FILE_PATH]).toHaveNoEsLintErrors();
    })

    test('HTML source has not been modified', () => {
        let nospace = html.replace(/\s/g, ''); //strip all whitespace to account for platform modifications
        expect(md5(nospace)).toBe('510add848f03b80be746b67cfdd09c7d');
    //console.log(md5(html));
    });
});


describe('Manipulates the DOM', () => {
    let solution; //define at global scope for unit testing functions

    beforeAll(() => {
        //load the HTML file as the document
        document.documentElement.innerHTML = html;

        //load JavaScript libraries separately
        $ = require('jquery'); //jQuery for convenience    
        solution = require(JS_FILE_PATH); //actually load the JavaScript file!
    });

    test('Changes the heading content', () => {
        expect($('h1').text()).toEqual("Which Swatch?");
    })

    test('Gives the img an alt attribute', () => {
        expect($('img').attr('alt')).toEqual("A beautiful rainbow");
    })

    test('The image floats to the right', () => {
        expect($('img').attr('class')).toEqual('float-right'); //string comparison for clearer errors
    })

    test('The image attribution is small', () => {
        expect($('footer small').length).toBe(1);
        expect($('footer small').html().trim()).toEqual('Icon made by <a href="http://www.freepik.com">Freepik</a> from <a href="https://www.flaticon.com/">www.flaticon.com</a>.') //should catch textContent issues.
    })

    test('Implemented the createColorBox() function', () => {
        let blueBox = solution.createColorBox('blue', 100);
        expect(blueBox.classList[0]).toEqual('d-inline-block');
        expect(blueBox.style.backgroundColor).toEqual('blue');
        expect(blueBox.style.width).toEqual('100px');
        expect(blueBox.style.height).toEqual('100px');
    })

    test('Implemented the renderPalette() function', () => {
        let paletteBox = document.createElement('main');
        solution.renderPalette(['red', 'green', 'blue'], paletteBox);
        let main = $(paletteBox); //jQuery for help
        let colorBoxes = $(paletteBox).find('.d-inline-block'); //find the boxes
        expect(colorBoxes.length).toBe(3); //should be one per color
        expect(colorBoxes.eq(0).css('background-color')).toEqual('red'); //colors should be right
        expect(colorBoxes.eq(1).css('background-color')).toEqual('green');
        expect(colorBoxes.eq(2).css('background-color')).toEqual('blue');
    })

    test('Implemented and called the renderPaletteTable() function', () => {
        let boxes = $('main .d-inline-block');
        expect(boxes.length).toBe(5 * 9); //should have 5 rows of 9
        expect(boxes.eq(1).css('background-color')).toEqual('rgb(244, 109, 67)'); //spot check... should be consistent
        expect(boxes.eq(9).css('background-color')).toEqual('rgb(255, 245, 240)');
        expect(boxes.eq(27).css('background-color')).toEqual('rgb(247, 252, 245)');
    })
})
