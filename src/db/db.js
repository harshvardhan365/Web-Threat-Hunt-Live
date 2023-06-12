const mongoose = require(`mongoose`);
mongoose.connect(`mongodb+srv://admin:BB2uZ0YXk0559tUV@cluster0.dmdls8s.mongodb.net/?retryWrites=true&w=majority`,
{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log(`Cloud Database is connected successfully !!!`);
}).catch((error)=>{
    console.log(`Error occur due to this `,error);
})