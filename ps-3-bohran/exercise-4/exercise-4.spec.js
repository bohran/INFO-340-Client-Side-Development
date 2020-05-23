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

//console spy!
const LOG = []; //global to store the logged output
let storeLogFunction = (...inputs) => {
    LOG.push(inputs.reduce((out, arg) => {
        return out + ' ' + (typeof arg === 'string' ? arg : JSON.stringify(arg));
    }, '').trim()); //add it to the log
}
console['log'] = jest.fn(storeLogFunction) //store results of console.log

/** Begin tests **/

describe('Source code is valid', () => {
    test('JavaScript lints without errors', async () => {
        expect([JS_FILE_PATH]).toHaveNoEsLintErrors();
    })
});

//load the JavaScript file!
const solution = require(JS_FILE_PATH);

describe('Analyzes football games', () => {
    test('Extracts and log the array of opponents', () => {
        const val = ['Rutgers', 'Idaho', 'Portland State', 'Arizona', 'Stanford', 'Oregon',
            'Oregon State', 'Utah', 'Cal', 'USC', 'Arizona State', 'Washington State', 'Colorado',
            'Alabama']
        expect(LOG[0]).toEqual(JSON.stringify(val));
    });
    test('Filter and logs the games UW lost', () => {
        const val = [{
            date: '11/12/16',
            home: 'UW',
            opponent: 'USC',
            home_score: 13,
            opponent_score: 26,
            passing_yards: 259,
            rushing_yards: 17,
            fumbles: 0
        },
            {
                date: '12/31/16',
                home: 'UW',
                opponent: 'Alabama',
                home_score: 7,
                opponent_score: 24,
                passing_yards: 150,
                rushing_yards: 44,
                fumbles: 1
            }]
        expect(LOG[1]).toEqual(JSON.stringify(val));
    })
    test('Filter+maps and logs the opponents UW lost to', () => {
        const val = ['USC', 'Alabama'];
        expect(LOG[2]).toEqual(JSON.stringify(val));
    })
    test('Prints the game UW lost, each on their own line', () => {
        expect(LOG[3]).toEqual('USC at UW, 26 to 13');
        expect(LOG[4]).toEqual('Alabama at UW, 24 to 7');
    })
    test('Filter and logs how many games had fumbles', () => {
        expect(LOG[5]).toEqual('7');
    })
    test('Reduces and logs the game with most yards passed', () => {
        const val = {
            date: '11/5/16',
            home: 'Cal',
            opponent: 'UW',
            home_score: 27,
            opponent_score: 66,
            passing_yards: 417,
            rushing_yards: 287,
            fumbles: 2
        }
        expect(LOG[6]).toEqual(JSON.stringify(val));
    })
})
