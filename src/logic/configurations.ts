const path = require('path') ;
const os = require('os');
import { writeFile, statSync } from 'fs'; 
import writeJsonFile from 'write-json-file'; 
import loadJsonFile from 'load-json-file'


const toFile: string = path.resolve(os.homedir(), ".knit_config.json")

export const createConfigIfMissing = async () => {
    if (configMissing()) {
        createConfigFile(); 
    }
}


export const setConfig = async (user: string) => {
    
    
    await writeJsonFile(toFile, {user: user})
}

export const getRemote = async (): Promise<string> =>  {

    const config = await getConfig(); 
    const user = config.user; 

    const splittedRoot = process.cwd().split('/');
    const name = splittedRoot[splittedRoot.length - 1];

    return 'https://github.com/' + user + "/" + name + ".git"
}

export const getConfig = async (): Promise<Config> => {

    const config = await loadJsonFile(toFile) as Config; 
    return config; 
}

const configMissing = (): boolean => {

    try {
        
        statSync(toFile); 
    }
    catch (e) {
        return true; 
    }
    return false; 
}



const createConfigFile = async () => {
    const json = "{}";
    
    writeFile(toFile, json, error => {
        if (error) throw error
        return
    });
}

class Config {

    user: string; 

    constructor(user: string) {
        this.user = user; 
    }   
}