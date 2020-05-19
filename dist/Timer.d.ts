/*!
 * @author electricessence / https://github.com/electricessence/
 * @license MIT
 */

export default interface Timer
{
	readonly isRunning: boolean;

	start (): void;

	stop (): void;

	reset (): void;
}
