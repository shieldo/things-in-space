# Things in space

This respository contains some scripts that show examples of accessing [NASA's Near Earth Object API](https://api.nasa.gov/index.html#NeoWS) using the Fetch API in JavaScript.

The scripts 'one-thing-using-then.js' and 'one-thing-using-async.js' contain code used for demonstrating the `.then()` and `async`/`await` styles of using promises during a class for [Code Your Future Glasgow](https://codeyourfuture.io/scotland/) on 2023-05-06.

The scripts 'things-using-then.js' and 'things-using-async.js' are fuller examples made after the fact that use examples of `Promise.all()` to make multiple concurrent fetches against the API to get to and display some more specific information about asteroids near Earth.

Each pair of scripts is roughly equivalent in terms of what they do.

Example of running e.g. 'things-using-async.js':

```sh
$ node things-using-async.js
(node:1730) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)

There were 7 things in space near the Earth yesterday (Sunday, 7 May 2023):

2022 VU - on 2023-Dec-09 11:08 this will be 36,679,865km from Earth
2023 FS2 - on 2024-Jan-25 04:51 this will be 61,461,542km from Earth
2018 RF2 - on 2024-Mar-26 11:35 this will be 19,063,734km from Earth
2021 HR - on 2025-Feb-03 23:45 this will be 64,672,959km from Earth
2017 CO32 - on 2025-Mar-07 15:10 this will be 61,738,477km from Earth
2009 UU1 - on 2026-Oct-08 08:47 this will be 44,809,139km from Earth
```
