'use strict';
const program = require('commander');
const moment = require('moment');
const momentDurationFormat = require('moment-duration-format');

momentDurationFormat(moment);

program
  .option('-t, --time <hours>', 'Time in hours', '8')

program.parse(process.argv)

const timerange = program.args;

// Check timerange format
const processTimeRange = (totalObject, currentValue, idx) => {
  const {total, previous} = totalObject;
  try {
    if(!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(currentValue)) throw `${currentValue} isn't a valid time`;

    if(idx !== 0 && idx % 2 === 1) {
      const today = moment().format("YYYY-MM-DD");
      const start = moment(`${today} ${previous}`)
      const end = moment(`${today} ${currentValue}`)
      const diff = end.diff(start)

      return Object.assign({}, totalObject, {
        total: total + diff,
        previous: currentValue,
        isClosed: true
      })
    }
      return Object.assign({}, totalObject, {
        previous: currentValue,
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
  const duration = moment.duration(result.total, 'milliseconds').format("HH[h]mm");
  const timeInMiliseconds = program.time * 60 * 60 * 1000
  const timeWorkedMessage = `You have worked for ${duration}.`
  if(!result.total) return "Invalid time range."; 
  if(result.isClosed || result.total > timeInMiliseconds) return `${timeWorkedMessage}${!result.isClosed ? " Go home!" : ""}`; 

  const timeLeft = timeInMiliseconds - result.total
  const departureTime = moment(`${result.today} ${result.previous}`).add(timeLeft, 'ms').format("HH[:]mm")

  return `${timeWorkedMessage} End the day at ${departureTime}.`
}

console.log(processResult(result));