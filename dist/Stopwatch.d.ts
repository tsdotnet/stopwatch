/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import TimeSpan from '@tsdotnet/date-time/dist/TimeSpan';
import Timer from './Timer';
export { Timer };
export default class Stopwatch implements Timer {
    private _startTimeStamp;
    private _elapsed;
    /**
     * The number of time elapsed while this Stopwatch is/was running.
     * @return {}
     */
    get elapsed(): TimeSpan;
    private _isRunning;
    /**
     * Returns true if the Stopwatch is currently active.
     * @return {boolean}
     */
    get isRunning(): boolean;
    /**
     * The number of milliseconds elapsed for current lap.
     * @return {number}
     */
    get currentLapMilliseconds(): number;
    /**
     * The current lap time.
     * @return {}
     */
    get currentLap(): TimeSpan;
    /**
     * The number of milliseconds elapsed while this Stopwatch is/was running.
     * @return {number}
     */
    get elapsedMilliseconds(): number;
    /**
     * Same as Date.now()
     * @return {number}
     */
    static getTimestampMilliseconds(): number;
    /**
     * Starts a Stopwatch and returns it.
     * @return {Stopwatch}
     */
    static startNew(): Stopwatch;
    /**
     * Measures the amount of time the closure takes before completion.
     * @param {() => void} closure
     * @return {}
     */
    static measure(closure: () => void): TimeSpan;
    /**
     * Starts this Stopwatch.
     * If previously stopped but not reset, acts like resume.
     */
    start(): void;
    /**
     * Stops this Stopwatch.  Can then be restarted.
     * Elapsed time is cumulative.
     */
    stop(): void;
    /**
     * Resets this Stopwatch for reuse.
     */
    reset(): void;
    /**
     * Marks the new lap time and returns the the elapsed time since the last lap (or start).
     * Has no effect if the Stopwatch is stopped.
     * @return {}
     */
    lap(): TimeSpan;
}
