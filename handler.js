'use strict';
const app =require("./app")
const awsServerless=require('aws-serverless-express')
const server=awsServerless.createServer(app)
module.exports.handlerfunc=(event,context)=>{
    return awsServerless.proxy(server,event,context)
}