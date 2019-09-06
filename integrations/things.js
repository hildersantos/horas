'use strict';

const open = require('open');

const addEvent = (text, day, time) => {
  const escapedText = encodeURI(text);
  const url = `things:///add?title=${escapedText}&when=${day}@${time}`;

  (async () => {
    await open(url);
  })();

}

module.exports = {
  addEvent
}
