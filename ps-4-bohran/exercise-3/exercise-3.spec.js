//dependencies
const fs = require('fs');
const path = require('path');

const JS_FILE_PATH = __dirname + '/js/index.js';

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

/** Begin tests **/

describe('Source code is valid', () => {
    test('JavaScript lints without errors', async () => {
        expect([JS_FILE_PATH]).toHaveNoEsLintErrors();
    })
});

//No other tests for now!