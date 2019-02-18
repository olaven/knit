const path = require('path') ;
const os = require('os');
const root = require('app-root-path');
import { writeFile, statSync } from 'fs'; 
import writeJsonFile from 'write-json-file'; 
import loadJsonFile from 'load-json-file'


// const toFile: string = path.resolve("config.json"); 
const toFile: string = path.resolve(os.homedir(), "knit_config.json")

export const createConfigIfMissing = async () => {
    if (configMissing()) {
        createConfig(); 
    }
}


export const setConfig = async (user: string) => {
    
    const config = await getConfig()
    
    const splittedRoot = root.path.split("/")
    
    const name = splittedRoot[splittedRoot.length - 1]; 
    config.user = user;
    config.remote = 'https://github.com/' + user + "/" + name + ".git";

    await writeJsonFile(toFile, config)
}

export const getConfig = async (): Promise<Config> =>  {
    
    const config = await loadJsonFile(toFile) as Config
    
    const user = config.user
    const remote = config.remote

    return new Config(user, remote)

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

const createConfig = async () => {
    const json = "{}";
    
    writeFile(toFile, json, error => {
        if (error) throw error
        return
    });
}

class Config {

    user: string; 
    remote: string 

    // https://github.com/user/repo.git
    constructor(user: string, remote: string) {
        this.user = user; 
        this.remote = remote
    }   
}