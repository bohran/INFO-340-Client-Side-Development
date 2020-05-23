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
        expect(md5(nospace)).toBe('0969fead8329bf89694bee8b8b510f8d');
    });
});


describe('Supports User Events', () => {
    let solution; //define at global scope for unit testing functions

    beforeAll(() => {
        //load the HTML file as the document
        document.documentElement.innerHTML = html;

        //load JavaScript libraries separately
        $ = require('jquery'); //jQuery for convenience    
        solution = require(JS_FILE_PATH); //actually load the JavaScript file!
    });

    test('Renders all items in the task list', () => {
        expect($('ol li').length).toBe(2);
        expect($('ol li:first').text()).toEqual('Complete problemA');
    })

    test('Can add new user-specified items to the list', () => {
        $('input').val('Test adding task'); //enter value
        $('input')[0].dispatchEvent(new Event('input')); //pretend I typed that!
        $('#add-task').click(); //click the button
        expect($('ol li').length).toBe(3);
        expect($('ol li:last-child').text()).toEqual('Test adding task');
    })

    test('Input clears when tasks added', () => {
        $('input').val('Test clearing input'); //enter value
        $('input')[0].dispatchEvent(new Event('input')); //pretend I typed that!
        $('#add-task').click(); //click the button
        expect($('input').val()).toEqual('');
    })

    test('Add button is disabled only for blank input', () => {
        $('input').val('Testing typing content'); //enter value
        $('input')[0].dispatchEvent(new Event('input')); //pretend I typed that!
        expect($('#add-task').attr('disabled')).toEqual(undefined); //should not have value?

        $('input').val(''); //enter value
        $('input')[0].dispatchEvent(new Event('input')); //pretend I typed that!
        expect($('#add-task').attr('disabled')).not.toEqual(undefined); //should have value    
    })

    test('Can cross off (and restore) completed tasks', () => {
        expect($('ol li:first').hasClass('font-strike')).toBe(true); //just to check
        $('ol li:first').click(); //click on first item (which was)
        expect($('ol li:first').hasClass('font-strike')).toBe(false); //now incomplete 

        expect($('ol li:last').hasClass('font-strike')).toBe(false); //just to check
        $('ol li:last').click(); //click on first item (which was)
        expect($('ol li:last').hasClass('font-strike')).toBe(true); //now complete 
    })
})
