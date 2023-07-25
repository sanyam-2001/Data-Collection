import mongoose from 'mongoose';
import DB_CONNECTION_STATE from '../enum/DBConnectionState';

const connectToDB = async () => {
    await mongoose.connect(process.env.DB_URI, {});
    if (mongoose.connection.readyState === 1) {
        console.log("DB Connected");
    }
    else {
        console.log(`DB Connection Status: ${DB_CONNECTION_STATE[mongoose.connection.readyState]}`)
    }
}

export default connectToDB;