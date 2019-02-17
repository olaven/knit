#!/usr/bin/env node
const program = require('commander');
const shell = require('shelljs')
import { run } from './program'; 


program
    .version(process.env.npm_package_version)
    .option('-u, --user [name]', 'Set username')
    .parse(process.argv)

if (!shell.which('git')) {
    throw 'ERROR: \'knit\' requires git.'
}

run(program); 

