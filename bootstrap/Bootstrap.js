import connectToDB from "./connectToDb"
import registerGlobalMiddlewares from "./registerGlobalMiddlewares";

const bootstrap = async (app) => {
    registerGlobalMiddlewares(app)
    await connectToDB();
}

export default bootstrap;