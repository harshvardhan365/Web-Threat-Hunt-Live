const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Connection Failed:", error.message);
        process.exit(1);
    }
};

connectDB();



// mongoose.connect(`mongodb+srv://admin:BB2uZ0YXk0559tUV@cluster0.dmdls8s.mongodb.net/?retryWrites=true&w=majority`,
// {
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     // useCreateIndex:true
// }).then(()=>{
//     console.log(`Cloud Database is connected successfully !!!`);
// }).catch((error)=>{
//     console.log(`Error occur due to this `,error);
// })