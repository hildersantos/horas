'use strict';

const program = require('commander');

program.version("1.0.0")

program
  .command('calc <interval>', 'Calculate departure time based in a hour range', {isDefault: true}).alias('c')

program.parse(process.argv)
