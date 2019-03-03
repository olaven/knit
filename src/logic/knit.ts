const shell = require('shelljs')
import { getRemote } from './configurations'


export const knit = async () => {

    const remote = await getRemote(); 
    console.log("HELLO HELLO HELLO", remote)
    execute([
        'git init',
        'echo ## 🧶 >> README.md',
        'git add .',
        'git commit -m "first commit"',
        'git remote add origin ' + remote, 
        'git push -u origin master'
    ]);
}


const execute = (commands: string[]) => {

    for (let command of commands) {
        shell.exec(command);
    }
}


