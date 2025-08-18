import { describe, it, expect, beforeEach } from 'vitest';
import Stopwatch from '../src/Stopwatch.js';
import { TimeSpan, howMany, Gregorian } from '@tsdotnet/date-time';

describe('Stopwatch', () => {
	let stopwatch: Stopwatch;

	beforeEach(() => {
		stopwatch = new Stopwatch();
	});

	describe('Basic functionality', () => {
		it('should start not running', () => {
			expect(stopwatch.isRunning).toBe(false);
			expect(stopwatch.elapsedMilliseconds).toBe(0);
		});

		it('should start and stop correctly', () => {
			stopwatch.start();
			expect(stopwatch.isRunning).toBe(true);
			
			stopwatch.stop();
			expect(stopwatch.isRunning).toBe(false);
		});

		it('should reset correctly', async () => {
			stopwatch.start();
			await new Promise(resolve => setTimeout(resolve, 1));
			stopwatch.stop();
			expect(stopwatch.elapsedMilliseconds).toBeGreaterThan(0);
			
			stopwatch.reset();
			expect(stopwatch.elapsedMilliseconds).toBe(0);
			expect(stopwatch.isRunning).toBe(false);
		});
	});

	describe('Timing functionality', () => {
		it('should measure elapsed time', async () => {
			stopwatch.start();
			await new Promise(resolve => setTimeout(resolve, 10));
			stopwatch.stop();
			
			expect(stopwatch.elapsedMilliseconds).toBeGreaterThan(5);
			expect(stopwatch.elapsed).toBeInstanceOf(TimeSpan);
		});

		it('should accumulate elapsed time across multiple start/stop cycles', async () => {
			stopwatch.start();
			await new Promise(resolve => setTimeout(resolve, 5));
			stopwatch.stop();
			const firstElapsed = stopwatch.elapsedMilliseconds;
			
			stopwatch.start();
			await new Promise(resolve => setTimeout(resolve, 5));
			stopwatch.stop();
			
			expect(stopwatch.elapsedMilliseconds).toBeGreaterThan(firstElapsed);
		});

		it('should track current lap time when running', async () => {
			stopwatch.start();
			await new Promise(resolve => setTimeout(resolve, 5));
			
			expect(stopwatch.currentLapMilliseconds).toBeGreaterThan(0);
			expect(stopwatch.currentLap).toBeInstanceOf(TimeSpan);
		});

		it('should return zero lap time when stopped', () => {
			expect(stopwatch.currentLapMilliseconds).toBe(0);
			expect(stopwatch.currentLap.getTotalMilliseconds()).toBe(0);
		});
	});

	describe('Lap functionality', () => {
		it('should record lap times when running', async () => {
			stopwatch.start();
			await new Promise(resolve => setTimeout(resolve, 100));
			
			const lapTime = stopwatch.lap();
			expect(lapTime).toBeInstanceOf(TimeSpan);
			expect(lapTime.getTotalMilliseconds()).toBeGreaterThan(0);
		});

		it('should return zero lap time when stopped', () => {
			const lapTime = stopwatch.lap();
			expect(lapTime.getTotalMilliseconds()).toBe(0);
		});

		it('should continue running after lap', async () => {
			stopwatch.start();
			await new Promise(resolve => setTimeout(resolve, 5));
			stopwatch.lap();
			
			expect(stopwatch.isRunning).toBe(true);
		});
	});

	describe('Static methods', () => {
		it('should create and start new stopwatch with startNew', () => {
			const newStopwatch = Stopwatch.startNew();
			expect(newStopwatch.isRunning).toBe(true);
			newStopwatch.stop();
		});

		it('should return current timestamp', () => {
			const timestamp = Stopwatch.getTimestampMilliseconds();
			expect(typeof timestamp).toBe('number');
			expect(timestamp).toBeCloseTo(Date.now(), -2); // Within 100ms
		});

		it('should measure closure execution time', () => {
			let executed = false;
			const measureTime = Stopwatch.measure(() => {
				executed = true;
			});
			
			expect(executed).toBe(true);
			expect(measureTime).toBeInstanceOf(TimeSpan);
			expect(measureTime.getTotalMilliseconds()).toBeGreaterThanOrEqual(0);
		});
	});

	describe('Edge cases', () => {
		it('should handle multiple starts without error', () => {
			stopwatch.start();
			const firstStart = stopwatch.isRunning;
			
			stopwatch.start(); // Should have no effect
			expect(stopwatch.isRunning).toBe(firstStart);
			stopwatch.stop();
		});

		it('should handle multiple stops without error', () => {
			stopwatch.start();
			stopwatch.stop();
			const elapsedAfterStop = stopwatch.elapsedMilliseconds;
			
			stopwatch.stop(); // Should have no effect
			expect(stopwatch.elapsedMilliseconds).toBe(elapsedAfterStop);
		});

		it('should handle reset while running', () => {
			stopwatch.start();
			stopwatch.reset();
			
			expect(stopwatch.isRunning).toBe(false);
			expect(stopwatch.elapsedMilliseconds).toBe(0);
		});
	});

	describe('howMany const enum verification', () => {
		it('should be able to access milliseconds per time unit values', () => {
		  // Verify const enum values are properly accessible and usable
			expect(typeof howMany.milliseconds.per.second).toBe('number');
			expect(typeof howMany.milliseconds.per.minute).toBe('number');
			expect(typeof howMany.milliseconds.per.hour).toBe('number');
			expect(typeof howMany.milliseconds.per.day).toBe('number');
			
      expect(Gregorian.DayOfWeek.Sunday).toBe(0);

			// Verify the actual values are correct
			expect(howMany.milliseconds.per.second).toBe(1000);
			expect(howMany.milliseconds.per.minute).toBe(60000);
			expect(howMany.milliseconds.per.hour).toBe(3600000);
			expect(howMany.milliseconds.per.day).toBe(86400000);
		});

		it('should be able to access other time unit values', () => {
			// Verify other common time unit const enum values
			expect(typeof howMany.seconds.per.minute).toBe('number');
			expect(typeof howMany.seconds.per.hour).toBe('number');
			expect(typeof howMany.minutes.per.hour).toBe('number');
			
			expect(howMany.seconds.per.minute).toBe(60);
			expect(howMany.seconds.per.hour).toBe(3600);
			expect(howMany.minutes.per.hour).toBe(60);
		});

		it('should be able to use howMany values in calculations', () => {
			// Test that const enum values can be used in actual calculations
			const oneHourInMs = 1 * howMany.milliseconds.per.hour;
			const twoMinutesInMs = 2 * howMany.milliseconds.per.minute;
			const thirtySecondsInMs = 30 * howMany.milliseconds.per.second;
			
			expect(oneHourInMs).toBe(3600000);
			expect(twoMinutesInMs).toBe(120000);
			expect(thirtySecondsInMs).toBe(30000);
			
			// Test combined calculation
			const totalMs = oneHourInMs + twoMinutesInMs + thirtySecondsInMs;
			expect(totalMs).toBe(3750000); // 1h 2m 30s in milliseconds
		});

		it('should work with Stopwatch timing calculations', () => {
			// Verify that howMany values can be used with Stopwatch functionality
			const expectedOneSecondMs = howMany.milliseconds.per.second;
			
			// Use in a realistic timing scenario
			const timespan = TimeSpan.fromMilliseconds(expectedOneSecondMs);
			expect(timespan.getTotalMilliseconds()).toBe(1000);
			expect(timespan.seconds).toBe(1);
		});
	});
});