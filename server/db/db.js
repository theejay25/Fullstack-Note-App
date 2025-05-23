import mongoose from "mongoose";

const connectToMongoDB = async () => {

    try {

        await mongoose.connect('mongodb://127.0.0.1:27017/App')
        console.log('connected to mongoDb')

    } 
    catch (error) {
        console.error('Error connecting to mongoDB', error.message)
    }

}

export default connectToMongoDB