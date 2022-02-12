/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
import TimeSpan from '@tsdotnet/date-time/dist/TimeSpan';
import Timer from './Timer';

export { Timer };

export default class Stopwatch
implements Timer
{

	private _startTimeStamp: number = NaN;

	private _elapsed: number = 0;

	/**
	 * The number of time elapsed while this Stopwatch is/was running.
	 * @return {}
	 */
	get elapsed (): TimeSpan
	{
		return TimeSpan.fromMilliseconds(this.elapsedMilliseconds);
	}

	private _isRunning: boolean = false;

	/**
	 * Returns true if the Stopwatch is currently active.
	 * @return {boolean}
	 */
	get isRunning (): boolean
	{
		return this._isRunning;
	}

	/**
	 * The number of milliseconds elapsed for current lap.
	 * @return {number}
	 */
	get currentLapMilliseconds (): number
	{
		return this._isRunning
			? (Date.now() - this._startTimeStamp)
			: 0;
	}

	/**
	 * The current lap time.
	 * @return {}
	 */
	get currentLap (): TimeSpan
	{
		return this._isRunning
			? TimeSpan.fromMilliseconds(this.currentLapMilliseconds)
			: TimeSpan.zero;
	}

	/**
	 * The number of milliseconds elapsed while this Stopwatch is/was running.
	 * @return {number}
	 */
	get elapsedMilliseconds (): number
	{
		const _ = this;
		let timeElapsed = _._elapsed;

		if(_._isRunning)
			timeElapsed += _.currentLapMilliseconds;

		return timeElapsed;
	}

	/**
	 * Same as Date.now()
	 * @return {number}
	 */
	static getTimestampMilliseconds (): number
	{
		return Date.now();
	}

	/**
	 * Starts a Stopwatch and returns it.
	 * @return {Stopwatch}
	 */
	static startNew (): Stopwatch
	{
		const s = new Stopwatch();
		s.start();
		return s;
	}

	/**
	 * Measures the amount of time the closure takes before completion.
	 * @param {() => void} closure
	 * @return {}
	 */
	static measure (closure: () => void): TimeSpan
	{
		const start = Date.now();
		closure();
		return TimeSpan.fromMilliseconds(Date.now() - start);
	}

	/**
	 * Starts this Stopwatch.
	 * If previously stopped but not reset, acts like resume.
	 */
	start (): void
	{
		const _ = this;
		if(!_._isRunning)
		{
			_._startTimeStamp = Date.now();
			_._isRunning = true;
		}
	}

	/**
	 * Stops this Stopwatch.  Can then be restarted.
	 * Elapsed time is cumulative.
	 */
	stop (): void
	{
		const _ = this;
		if(_._isRunning)
		{
			_._elapsed += _.currentLapMilliseconds;
			_._isRunning = false;
		}
	}

	/**
	 * Resets this Stopwatch for reuse.
	 */
	reset (): void
	{
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
	lap (): TimeSpan
	{
		const _ = this;
		if(_._isRunning)
		{
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
