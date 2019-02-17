import { createConfigIfMissing, setConfig, getConfig } from './logic/configurations'
import { knit } from './logic/knit'; 


export const run = async (program: any) => {

    await createConfigIfMissing();

    if (program.user) {

        await setConfig(program.user);
        console.log("user: ", program.user, " registered.");
    } else {

        const config = await getConfig();
        
        if (!config.user) {
            console.error("ERROR: You need to register a user.");
        } else {
            knit();
        }
    }

}