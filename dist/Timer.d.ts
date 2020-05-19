/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */
/**
 * @packageDocumentation
 * @module date-time
 */

export default interface Timer
{
	readonly isRunning: boolean;

	start (): void;

	stop (): void;

	reset (): void;
}
