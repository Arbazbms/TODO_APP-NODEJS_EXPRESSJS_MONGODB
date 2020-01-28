const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/TodoDB', {
    keepAlive: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err)=>{
    if(!err){
        console.log('mongoDb Connected')
    }
    else{
        console.log('Error Connecting to DB!: ' +err)
    }
})

require('./todo')
