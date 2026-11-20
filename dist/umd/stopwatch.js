(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tsdotnet/date-time')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tsdotnet/date-time'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.tsdotnet = global.tsdotnet || {}, global.tsdotnet.stopwatch = global.tsdotnet.stopwatch || {}), global.tsdotnet.dateTime));
})(this, (function (exports, dateTime) { 'use strict';

    class Stopwatch {
        _startTimeStamp = NaN;
        _elapsed = 0;
        get elapsed() {
            return dateTime.TimeSpan.fromMilliseconds(this.elapsedMilliseconds);
        }
        _isRunning = false;
        get isRunning() {
            return this._isRunning;
        }
        get currentLapMilliseconds() {
            return this._isRunning
                ? (Date.now() - this._startTimeStamp)
                : 0;
        }
        get currentLap() {
            return this._isRunning
                ? dateTime.TimeSpan.fromMilliseconds(this.currentLapMilliseconds)
                : dateTime.TimeSpan.zero;
        }
        get elapsedMilliseconds() {
            const _ = this;
            let timeElapsed = _._elapsed;
            if (_._isRunning)
                timeElapsed += _.currentLapMilliseconds;
            return timeElapsed;
        }
        static getTimestampMilliseconds() {
            return Date.now();
        }
        static startNew() {
            const s = new Stopwatch();
            s.start();
            return s;
        }
        static measure(closure) {
            const start = Date.now();
            closure();
            return dateTime.TimeSpan.fromMilliseconds(Date.now() - start);
        }
        start() {
            const _ = this;
            if (!_._isRunning) {
                _._startTimeStamp = Date.now();
                _._isRunning = true;
            }
        }
        stop() {
            const _ = this;
            if (_._isRunning) {
                _._elapsed += _.currentLapMilliseconds;
                _._isRunning = false;
            }
        }
        reset() {
            const _ = this;
            _._elapsed = 0;
            _._isRunning = false;
            _._startTimeStamp = NaN;
        }
        lap() {
            const _ = this;
            if (_._isRunning) {
                const t = Date.now();
                const s = _._startTimeStamp;
                const e = t - s;
                _._startTimeStamp = t;
                _._elapsed += e;
                return dateTime.TimeSpan.fromMilliseconds(e);
            }
            else
                return dateTime.TimeSpan.zero;
        }
    }

    exports.default = Stopwatch;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=stopwatch.js.map
