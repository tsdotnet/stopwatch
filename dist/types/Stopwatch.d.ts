import { TimeSpan } from '@tsdotnet/date-time';
import type Timer from './Timer';
export { Timer };
export default class Stopwatch implements Timer {
    private _startTimeStamp;
    private _elapsed;
    get elapsed(): TimeSpan;
    private _isRunning;
    get isRunning(): boolean;
    get currentLapMilliseconds(): number;
    get currentLap(): TimeSpan;
    get elapsedMilliseconds(): number;
    static getTimestampMilliseconds(): number;
    static startNew(): Stopwatch;
    static measure(closure: () => void): TimeSpan;
    start(): void;
    stop(): void;
    reset(): void;
    lap(): TimeSpan;
}
