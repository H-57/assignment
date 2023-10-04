require("dotenv").config();
const { S3Client, PutObjectCommand,GetObjectCommand } =require("@aws-sdk/client-s3");
const {getSignedUrl}=require("@aws-sdk/s3-request-presigner")



const s3Client=new S3Client({
    region:"ap-south-1",
    credentials:{
        accessKeyId:process.env.accessKeyId,
        secretAccessKey:process.env.secretAccessKey
    }
})

async function getObjectUrl(id){
const command=new GetObjectCommand({
    Bucket:"mydev57", 
    Key:`images/uploads/assignment/${id}.png`,
})

const url=await getSignedUrl(s3Client,command)
return url

}

async function putObject(file,id){
    const command =new PutObjectCommand({
        Bucket:"mydev57", 
        Key:`images/uploads/assignment/${id}.png`,
        ContentType:file.mimetype,
        Body:file.buffer
    })
    const response = await s3Client.send(command);
return response
}

module.exports={
    putObject,getObjectUrl
}
