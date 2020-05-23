'use strict';
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const htmllint = require('htmllint');
const stylelint = require('stylelint');
const inlineCss = require('inline-css'); //for css testing
const css = require('css');

//load the HTML file, since we're gonna need it.
const html = fs.readFileSync(__dirname + '/index.html', 'utf-8');

//absolute path for relative loading (if needed)
const baseDir = 'file://' + __dirname + '/';

// load the css file to parse
const cssFile = fs.readFileSync(__dirname + '/css/style.css', 'utf-8');
let options = {}
let cssObj = css.parse(cssFile, options);

describe('Source code is valid', () => {
    test('HTML validates without errors', async () => {
        const lintOpts = {
            'attr-bans': ['align', 'background', 'bgcolor', 'border', 'frameborder', 'marginwidth', 'marginheight', 'scrolling', 'style', 'width', 'height'], //adding height, allow longdesc
            'doctype-first': true,
            'doctype-html5': true,
            'html-req-lang': true,
            'attr-name-style': false,
            'line-end-style': false, //either way
            'indent-style': 'nonmixed', //can mix/match
            'indent-width': 4, //don't need to beautify
        }

        let htmlValidityObj = await htmllint(html, lintOpts);
        expect(htmlValidityObj).htmlLintResultsContainsNoErrors();
    })

    test('CSS validates without errors', async () => {
        let cssValidityObj = await stylelint.lint({
            files: 'problem1/css/style.css'
        });
        expect(cssValidityObj).cssLintResultsContainsNoErrors();
    })
});

describe('Has required HTML', () => {
    let $; //cheerio instance
    beforeAll(() => {
        $ = cheerio.load(html);
    })

    test('Has a top-level heading', () => {
        let h1 = $('h1');
        expect(h1.length).toEqual(1);
        expect(h1.text()).toBeTruthy();
    })

    test('Includes a table', () => {
        expect($('table').length).toEqual(1);
    })

    test('Table contains rows', () => {
        let table = $('table').children(); //gather from tbody, etc
        expect(table.children('tr').length).toEqual(6); //6 rows
        expect(table.children().not('tr').length).toEqual(0); //nothing else
    })

    test('First row has header cells', () => {
        let row = $('table tr:first-of-type');
        let th = row.children('th');
        expect(th.length).toEqual(4); // 4 cells
        expect(row.children().not('th').length).toEqual(0); //nothing else
        //no empty items!
        let empty = th.filter(function (i, elem) {
            return $(this).text().length == 0;
        })
        expect(empty.length).toBe(0);
    });

    test('Contains 5 rows with 4 cells each', () => {
        let rows = $('table tr').slice(1); //get body rows (not first)
        expect(rows.length).toEqual(5); //5 rows

        rows.each(function (i, row) { //check each row
            row = $(this); //why does this not happen automatically?            
            expect(row.children('td').length).toEqual(4); // 4 cells
            expect(row.children().not('td').length).toEqual(0); //nothing else
            expect(row.children().first().text().length).toBeGreaterThan(0); //first cell non-empty;
        })
    })
    test('Each table row contains an image with an alt attribute', () => {
        let rows = $('table tr').slice(1); //get body rows (not first)

        rows.each(function (i, row) { //check each row
            row = $(this); //why does this not happen automatically?
            let img = row.find('img');
            expect(img.length).toEqual(1); //3 cells
            expect(img.attr('alt').length).toBeGreaterThan(0)

        })
    })
    test('Each image is inide a link that opens in a new tab', () => {
        let rows = $('table tr').slice(1); //get body rows (not first)

        rows.each(function (i, row) { //check each row
            row = $(this);
            let img = row.find('img');
            expect(img.parent().is('a')).toEqual(true); //3 cells
            expect(img.parent().attr('target')).toEqual('_blank')
        })
    })
})

describe('Has required CSS', () => {
    let $; //cheerio instance
    beforeAll(async () => {
        //test CSS by inlining properties and then reading them from cheerio
        let inlined = await inlineCss(html, {
            url: baseDir,
            removeLinkTags: false
        });
        $ = cheerio.load(inlined);
    })

    test('The h1 element is properly styled', () => {
        let h1 = $('h1');
        expect(h1.css('text-align')).toEqual('center');
        expect(h1.css('font-family').replace(/['"]+/g, '').replace(/\s/g, '')).toMatch('Roboto,sans-serif');
        expect(h1.css('font-weight')).toEqual("100");

    })
    test('Table width is half the page', () => {
        expect($('table').css('width')).toEqual('50%');
    })
    test('Table has proper margins', () => {
        expect($('table').css('margin-left')).toEqual('auto');
        expect($('table').css('margin-right')).toEqual('auto');
    })

    test('Cells have bottom border', () => {
        let cells = $('td');
        cells.each(function () {
            expect($(this).css('border-bottom')).toMatch(/1px solid #d3d3d3/);
        })
    })

    test('Table borders are collapsed', () => {
        expect($('table').css('border-collapse')).toEqual('collapse');
    })

    test('Header cells are left-aligned', () => {
        let cells = $('th');
        cells.each(function () {
            expect($(this).css('text-align')).toMatch('left');
        })
    })

    test('Header cells are colored correctly (green on gray)', () => {
        let cells = $('th');
        cells.each(function () {
            expect($(this).css('color').toLowerCase()).toMatch('#1db954');
            expect($(this).css('background-color').toLowerCase()).toMatch('#eee');
        })
    })

    test('Header cells are correct height', () => {
        let cells = $('th');
        cells.each(function () {
            expect($(this).css('height')).toMatch('2rem');
        })
    })

    test('All cells have padding', () => {
        let cells = $('th, td');
        cells.each(function () {
            expect($(this).css('padding')).toMatch('5px');
        })
    })
    test('Image height is set properly', () => {
        let imgs = $("img");
        imgs.each(function () {
            expect($(this).css('height')).toEqual("100px")
        })
    })
    test("Hover rule is applied to rows", () => {
        let hoverRule = cssObj.stylesheet.rules.filter((d) => d.type === "rule" && d.selectors.indexOf("tr:hover") !== -1);
        expect(hoverRule.length).toEqual(1);
        expect(hoverRule[0].declarations[0].property).toEqual('background-color');
        expect(hoverRule[0].declarations[0].value).toEqual('pink');
    })
    test("Styles applied to odd rows", () => {
        let oddRule = cssObj.stylesheet.rules.filter((d) => d.type === "rule" && d.selectors.indexOf("tr:nth-child(odd)") !== -1);
        expect(oddRule.length).toEqual(1);
        expect(oddRule[0].declarations[0].property).toEqual('background-color');
        expect(oddRule[0].declarations[0].value).toEqual('#eee');
    })
})

//Custom code validation matchers (for error output)
expect.extend({
    //using htmllint
    htmlLintResultsContainsNoErrors(validityObj) {
        const pass = validityObj.length === 0;
        if (pass) {
            return {
                pass: true,
                message: () => "expected html to contain validity errors"
            };
        } else {
            return {
                pass: false,
                message: () => (
                    //loop through and build the result string
                    //these error messages could be more detailed; maybe do manually later
                    validityObj.reduce((out, msg) => {
                        return out + `Error: '${msg.rule}' at line ${msg.line}, column ${msg.column}.\n`
                    }, '')
                )
            };
        }
    },

    //using stylelint errors
    cssLintResultsContainsNoErrors(validityObj) {
        const pass = validityObj.errored === false;
        if (pass) {
            return {
                pass: true,
                message: () => "expected CSS to contain validity errors"
            };
        } else {
            return {
                pass: false,
                message: () => (
                    //loop through and build the result string
                    JSON.parse(validityObj.output)[0].warnings.reduce((out, msg) => {
                        return out + `${msg.severity}: ${msg.text}\n       At line ${msg.line}, column ${msg.column}.\n`
                    }, '')
                )
            };
        }
    }
});