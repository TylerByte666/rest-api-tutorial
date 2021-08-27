const { time } = require('console');
const mongoose = require('mongoose');
const options =require('../config/env.config')['mongoDBSettings']['options'];
const db_conx =require('../config/env.config')['mongoDBSettings']['db_conx'];
const timeout = require('../config/env.config')['mongoDBSettings']['timeout'];
let count = 0;

const connectWithRetry = () => {
    console.log('MongoDB: connecting...')
    mongoose.connect(db_conx, options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
        setTimeout(connectWithRetry, timeout)
    })
};

connectWithRetry();
exports.mongoose = mongoose;
