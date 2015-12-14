'use strict';

const BRACKET_START = '['; // 〚
const BRACKET_END = ']';   //  〛
const EMPTY = '.';  // ░
const FILLER = '#'; // █

const input = process.stdin;
const stream = process.stderr;

const processBar = {
    init(limit) {
        //input.pause();
        //input.setRawMode(true);

        stream.write('\n');

        this._i = 0;
        this._text = '';
        this._limit = limit;

        this._render();
    },

    tick(text) {
        if (this._i !== this._limit) {
            this._i++;

            var status = '';
            const percent = this._i / this._limit;
            const filled = Math.round(40 * percent);

            for (let i = 0; i < filled; ++i) {
                status += FILLER;
            }

            for (let i = 40 - filled; i > 0; --i) {
                status += EMPTY;
            }

            this._text = ' ' + BRACKET_START + status + BRACKET_END + ' ' + formatPercent(percent) + ' ' + text;

            this._render();

            return true;
        } else {
            //stream.clearLine();
            //stream.cursorTo(0);
            //input.setRawMode(false);
            //input.resume();
        }
    },

    _render() {
        stream.moveCursor(0, -1);
        stream.clearLine();
        stream.cursorTo(0);
        stream.write(this._text);
        stream.cursorTo(0);
        stream.moveCursor(0, 1);
    }
};

function formatPercent(percent) {
    var str = Math.floor(percent * 100).toFixed(1);

    while (str.length < 5) {
        str = ' ' + str;
    }

    return str + '%';
}


processBar.init(20);
var ok = true;

const intervalId = setInterval(() => {
    if (ok) {
        ok = processBar.tick(Math.random());
    } else {
        console.log('Completed.');
        clearInterval(intervalId);
    }
}, 200);
