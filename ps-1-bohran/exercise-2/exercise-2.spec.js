'use strict';
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const stylelint = require('stylelint');
const inlineCss = require('inline-css'); //for css testing
const md5 = require('md5');

//load the HTML file, since we're gonna need it.
const html = fs.readFileSync(__dirname + '/index.html', 'utf-8');
//absolute path for relative loading (if needed)
const baseDir = 'file://' + __dirname + '/';
describe('Source code is valid', () => {
    test('CSS validates without errors', async () => {
        let cssValidityObj = await stylelint.lint({
            files: __dirname + '/css/style.css'
        });
        expect(cssValidityObj).cssLintResultsContainsNoErrors();
    })

    test('HTML has not been modified', () => {
        let nospace = html.replace(/\s/g, ''); //strip all whitespace to account for platform modifications
        expect(md5(nospace)).toBe('9a52209021219d8bcce615657790842d');
    });
});


describe('Includes required CSS rules', () => {
    let $; //cheerio instance
    beforeAll(async () => {
        //test CSS by inlining properties and then reading them from cheerio
        let inlined = await inlineCss(html, {
            url: baseDir,
            removeLinkTags: false
        });
        $ = cheerio.load(inlined);
    })

    test('1. First circles are filled gray', () => {
        let nodes = $("svg>circle:not(.small)")
        nodes.each(function (node) {
            expect($(this).css('fill').toLowerCase()).toEqual('#5f5f5f');
        })
    })

    test('2. Paths have stroke', () => {
        let paths = $('svg>path:nth-of-type(1), svg>path:nth-of-type(2)')
        paths.each(function (path) {
            expect($(this).css('stroke').toLowerCase()).toEqual('#5f5f5f');
            expect($(this).css('stroke-width')).toEqual('8px');
        })
    })

    test('3. Appropriate circles are filled white', () => {
        let circles = $('svg>circle.small');
        circles.each(function () {
            expect($(this).css('fill').toLowerCase()).toEqual('white');
        })
    })

    test('4. Appropriate circles are filled brown', () => {
        let circles = $('g.contained>circle.small');
        circles.each(function () {
            expect($(this).css('fill').toLowerCase()).toEqual('#573d29');
        })
    })

    test('5. Contained circle and rect are filled light gray', () => {
        let nodes = $("g.contained:nth-of-type(2)").children()
        nodes.each(function (index) {
            expect($(this).css('fill')).toBeDefined();
            expect($(this).css('fill').toLowerCase()).toEqual('#c0c0c0');
            if (index == 1) {
                expect($(this).css('opacity')).not.toEqual('0');
            }
        })
    })

    test('6. Path is filled gray with red stroke', () => {
        let node = $('#interactive');
        expect(node.css('fill').toLowerCase()).toEqual('#c0c0c0');
        expect(node.css('stroke').toLowerCase()).toEqual('#bd250d');
        expect(node.css('stroke-width')).toEqual('4px');
    })

    test('7. Path changes color on hover (no test)', () => {
        // no test
    })

    test('8. Last 3 rectangles have opacity of 0', () => {
        let nodes = $('rect:nth-of-type(n+2)');
        nodes.each(function () {
            expect($(this).css('opacity')).toEqual('0');
        })
    })

    test('9. Path has no stroke', () => {
        let node = $('path:last-of-type');
        let removed = (node.css('stroke') == 'none') || /^0(px)?$/.test(node.css('stroke-width'));
        expect(removed).toBe(true);
    })
})


//Custom code validation matchers (for error output)
expect.extend({
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