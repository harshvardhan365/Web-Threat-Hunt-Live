const mongoose = require(`mongoose`);
mongoose.connect(`mongodb://0.0.0.0:27017/WTH`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log(`Mongodb is connected`);
}).catch((error)=>{
    console.log(`Error occur due to this `,error);
})