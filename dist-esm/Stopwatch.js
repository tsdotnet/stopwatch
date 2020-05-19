/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import TimeSpan from '@tsdotnet/date-time/dist/TimeSpan';
export default class Stopwatch {
    constructor() {
        this._startTimeStamp = NaN;
        this._elapsed = 0;
        this._isRunning = false;
    }
    /**
     * The number of time elapsed while this Stopwatch is/was running.
     * @return {}
     */
    get elapsed() {
        return TimeSpan.fromMilliseconds(this.elapsedMilliseconds);
    }
    /**
     * Returns true if the Stopwatch is currently active.
     * @return {boolean}
     */
    get isRunning() {
        return this._isRunning;
    }
    /**
     * The number of milliseconds elapsed for current lap.
     * @return {number}
     */
    get currentLapMilliseconds() {
        return this._isRunning
            ? (Date.now() - this._startTimeStamp)
            : 0;
    }
    /**
     * The current lap time.
     * @return {}
     */
    get currentLap() {
        return this._isRunning
            ? TimeSpan.fromMilliseconds(this.currentLapMilliseconds)
            : TimeSpan.zero;
    }
    /**
     * The number of milliseconds elapsed while this Stopwatch is/was running.
     * @return {number}
     */
    get elapsedMilliseconds() {
        const _ = this;
        let timeElapsed = _._elapsed;
        if (_._isRunning)
            timeElapsed += _.currentLapMilliseconds;
        return timeElapsed;
    }
    /**
     * Same as Date.now()
     * @return {number}
     */
    static getTimestampMilliseconds() {
        return Date.now();
    }
    /**
     * Starts a Stopwatch and returns it.
     * @return {Stopwatch}
     */
    static startNew() {
        const s = new Stopwatch();
        s.start();
        return s;
    }
    /**
     * Measures the amount of time the closure takes before completion.
     * @param {() => void} closure
     * @return {}
     */
    static measure(closure) {
        const start = Date.now();
        closure();
        return TimeSpan.fromMilliseconds(Date.now() - start);
    }
    /**
     * Starts this Stopwatch.
     * If previously stopped but not reset, acts like resume.
     */
    start() {
        const _ = this;
        if (!_._isRunning) {
            _._startTimeStamp = Date.now();
            _._isRunning = true;
        }
    }
    /**
     * Stops this Stopwatch.  Can then be restarted.
     * Elapsed time is cumulative.
     */
    stop() {
        const _ = this;
        if (_._isRunning) {
            _._elapsed += _.currentLapMilliseconds;
            _._isRunning = false;
        }
    }
    /**
     * Resets this Stopwatch for reuse.
     */
    reset() {
        const _ = this;
        _._elapsed = 0;
        _._isRunning = false;
        _._startTimeStamp = NaN;
    }
    /**
     * Marks the new lap time and returns the the elapsed time since the last lap (or start).
     * Has no effect if the Stopwatch is stopped.
     * @return {}
     */
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
//# sourceMappingURL=Stopwatch.js.map