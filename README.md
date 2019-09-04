# Horas

Just another daily hours calculator.

## About

*Horas* is a simple script developed in Node.js to calculate your daily hours. It supports various time ranges - including lunchtime. The labor and lunch hours are configurable.

## Installation

To use Horas you'll need to have *Node.js* installed on your system. [Download it](https://nodejs.org/en/download/) or follow alternative steps for installing it, as `brew install node` on Mac.

You can check if your system has *Node.js* installed by typing `node -v` on your terminal and pressing `Enter/Return`.

If you have `Node.js` correctly installed, follow these steps:

- Clone this repository (`git clone https://github.com/hildersantos/horas`)
- `cd horas && npm install`
- Optional yet recommended step for macOS: `ln -s /absolute/path/to/horas/horas /usr/local/bin`

Doing this last step, Horas should be accessible through the `horas` command.

After that you're good to go.

## Usage

The examples below consider that `horas` is available in your `$PATH`.

You can check the exact time you need to clock out by using `horas [ARRIVE_TIME] [LUNCH_START] [LUNCH_END]`. It considers an 8 hour work day.

If for any reason you need to adjust your working day time, you can do that by using the `-t` option, passing along an hour number.

Example:
```
$ horas -t 6 09:00 12:00 13:00
You have worked for 3h00m. Clock out at 16:00.
```

It's possible to know the clock out time even without passing a lunch time.
```
$ horas 09:00
Clock out at 16:00 (considering an hour break time).
```

You can even adjust the lunch time with the `-l` option:
```
$ horas -l 0.5 09:00
Clock out at 16:00 (considering 30 minutes break time).
```

To know how much hours you worked in a day, pass one or more time ranges.
```
$ horas 09:00 12:00 13:00 17:00 17:30 18:30
You have worked for 8h00m.
```

If you have any improvement suggestions, fell free to reach me out or fork this project and open a PR.

## Future improvements

- [ ] Validate time range
- [ ] Calculate day-based ranges (e.g. `horas 21:00 00:00 01:00`)
