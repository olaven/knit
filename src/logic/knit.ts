const shell = require('shelljs')
import { getConfig } from './configurations'


export const knit = () => {

    
    getConfig().then(config => {
        
        execute([
            'git init',
            'echo ' + config.user + ' >> README.md',
            'git add .',
            'git commit -m "first commit"',
            'git remote add origin ' + config.remote,
            'git push -u origin master'
        ]);
    })
}


const execute = (commands: string[]) => {

    for (let command of commands) {
        shell.exec(command);
    }
}

