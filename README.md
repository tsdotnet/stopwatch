<a href="https://tsdotnet.github.io/stopwatch/"><img src="https://cdn.jsdelivr.net/gh/tsdotnet/stopwatch@master/assets/banner.svg" alt="@tsdotnet/stopwatch: Time it, lap by lap. A small stopwatch for diagnostics."></a>

[![npm version](https://img.shields.io/npm/v/@tsdotnet/stopwatch.svg?style=flat-square)](https://www.npmjs.com/package/@tsdotnet/stopwatch)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/tsdotnet/stopwatch/blob/master/LICENSE)

`Stopwatch` times code with start, stop, lap and reset, like .NET's `Stopwatch`.

## Install

```sh
npm install @tsdotnet/stopwatch
```

## Usage

```ts
import Stopwatch from '@tsdotnet/stopwatch';

const watch = Stopwatch.startNew();
doWork();
watch.stop();
watch.elapsedMilliseconds; // e.g. 250

const time = Stopwatch.measure(() => doWork()); // a TimeSpan
```

Stop and `start()` again to resume; `lap()` returns the time since the last lap, and `reset()` clears it.

## Use it from

ESM (`import Stopwatch from '@tsdotnet/stopwatch';`) or CommonJS (`const Stopwatch = require('@tsdotnet/stopwatch').default;`).

<details><summary>In a browser, without a bundler</summary>

```html
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/type@1/dist/umd/type.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/compare@1/dist/umd/compare.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/exceptions@1/dist/umd/exceptions.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/disposable@2/dist/umd/disposable.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/lazy@2/dist/umd/lazy.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/date-time@2/dist/umd/date-time.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tsdotnet/stopwatch@2/dist/umd/stopwatch.min.js"></script>
<script>
  const Stopwatch = tsdotnet.stopwatch.default;
</script>
```

</details>

## Docs

[tsdotnet.github.io/stopwatch](https://tsdotnet.github.io/stopwatch/)
