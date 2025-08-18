import { TimeSpan } from '@tsdotnet/date-time';

class Stopwatch {
    _startTimeStamp = NaN;
    _elapsed = 0;
    get elapsed() {
        return TimeSpan.fromMilliseconds(this.elapsedMilliseconds);
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
            ? TimeSpan.fromMilliseconds(this.currentLapMilliseconds)
            : TimeSpan.zero;
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
        return TimeSpan.fromMilliseconds(Date.now() - start);
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
            return TimeSpan.fromMilliseconds(e);
        }
        else
            return TimeSpan.zero;
    }
}

export { Stopwatch as default };
//# sourceMappingURL=Stopwatch.js.map
