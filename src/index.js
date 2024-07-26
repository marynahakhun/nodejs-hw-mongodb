import { setupServer } from './server.js';
import initMongoDB from "./db/initMongoDB.js"
import { TEMPLATES_DIR, PUBLIC_DIR, PUBLIC_POSTERS_DIR } from "./constant/index.js"

import createDirIfNotExists from "./utils/createDirIfNotExists.js";
const bootstrap = async()=> {
    await initMongoDB();
    await createDirIfNotExists(TEMPLATES_DIR);
    await createDirIfNotExists(PUBLIC_DIR);
    await createDirIfNotExists(PUBLIC_POSTERS_DIR);
    setupServer();
}
bootstrap()