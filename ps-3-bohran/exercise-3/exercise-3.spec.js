//dependencies
const fs = require('fs');
const path = require('path');
const util = require('util');

//problem config
const baseDir = 'file://' + __dirname + '/';
const html = fs.readFileSync(__dirname + '/index.html', 'utf-8');
const JS_FILE_PATH = __dirname + '/js/index.js';

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

//image matching
const {toMatchImageSnapshot} = require('jest-image-snapshot');
expect.extend({
    toMatchImageSnapshot
});

const Canvas = require('canvas-prebuilt');
//mock the query method to access our canvas
document['getElementById'] = jest.fn(() => new Canvas.createCanvas(500, 500));


describe('Source code is valid', () => {
    test('JavaScript lints without errors', async () => {
        expect([JS_FILE_PATH]).toHaveNoEsLintErrors();
    })
});

//load the JavaScript file!
const solution = require(JS_FILE_PATH);

describe('Canvas-drawn rocket ship', () => {
    test('has the expected appearance', () => {
        const capture = solution.canvas.toBuffer();
        expect(capture).toMatchImageSnapshot({
            customDiffConfig: {
                threshold: 0.01 //very small threshold
            }
        });
    })
})
