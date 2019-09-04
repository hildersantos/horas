'use strict';
const program = require('commander');
const moment = require('moment');
const momentDurationFormat = require('moment-duration-format');

momentDurationFormat(moment);

program
  .option('-t, --time <hours>', 'Time in hours', '8')
  .option('-l, --lunch <hours>', 'Break time (in hours) e.g. 0.5', '1')

program.parse(process.argv)

const timerange = program.args;

// Just an helper...
const zeroise = (hour) => ("0"+hour).slice(-2) 

// Check timerange format
const processTimeRange = (totalObject, currentValue, idx) => {
  const {total, previous} = totalObject;
  try {
    if(!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(currentValue)) throw `${currentValue} isn't a valid time`;

    const brokenTime = currentValue.split(":");
    const currentTime = `${zeroise(brokenTime[0])}:${brokenTime[1]}`;

    if(idx !== 0 && idx % 2 === 1) {
      const today = moment().format("YYYY-MM-DD");
      const start = moment(`${today} ${previous}`)
      const end = moment(`${today} ${currentTime}`)
      const diff = end.diff(start)

      return Object.assign({}, totalObject, {
        total: total + diff,
        previous: currentTime,
        isClosed: true
      })
    }
      return Object.assign({}, totalObject, {
        previous: currentTime,
        isClosed: false
      })
  } catch(err) {
    console.log(err);
  }
}

const result = timerange.reduce(processTimeRange, {
  total: 0,
  previous: null,
  today: moment().format("YYYY-MM-DD"),
  isClosed: false
});


const processResult = (result) => {
  const duration = moment.duration(result.total, 'milliseconds').format("H[h]mm[m]");
  const timeInMiliseconds = program.time * 60 * 60 * 1000
  const lunchInMiliseconds = program.lunch * 60 * 60 * 1000

  const timeLeft = timeInMiliseconds - result.total - (result.total ? 0 : lunchInMiliseconds)

  const departureTime = moment(`${result.today} ${result.previous}`).add(timeLeft, 'ms').format("HH[:]mm")

  const timeWorkedMessage = `You have worked for ${duration}.`
  const departureMessage =  `Clock out at ${departureTime}`
  const lunchAddedMessage =  ` (considering ${moment.duration(lunchInMiliseconds, 'milliseconds').humanize()} of break time)`

  if(result.isClosed || result.total > timeInMiliseconds) return `${timeWorkedMessage}${!result.isClosed ? " Go home!" : ""}`; 
  return `${result.total ? timeWorkedMessage+" " : ""}${departureMessage}${result.total ? "" : lunchAddedMessage}.`
}

console.log(processResult(result));
