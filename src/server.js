// import express from 'express'; --> is not supported anymore!
const express = require("express");
const bodyParser =require('body-parser');
const {MongoClient}=require('mongodb');

//local fake database (if we don't have mongodb):
// const articlesInfo={
//     'learn-react':{
//         upvotes:0,
//         comments:[],
//     },
//     'my-thoughts-on-resumes':{
//         upvotes:0,
//         comments:[],
//     },
//     'learn-node':{
//         upvotes:0,
//         comments:[],
//     }

// }


const app=express();

app.use(bodyParser.json());

// app.get('/hello',(req,res) => res.send('Hello!'));
// //app.post('/hello',(req,res) => res.send('Hello!'));
// app.post('/hello',(req,res) => res.send(`Hello ${req.body.name}!`));
// app.post('/hello/:name',(req,res) => res.send(`Hello ${req.params.name}!`));


app.get('/api/articles/:name', async(req,res) =>{
    //Getting article info:
    try{
        const articleName =req.params.name;

    const client= await MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true});
    const db=client.db('my-blog');

    const articleInfo=await db.collection('articles').findOne({name:articleName});
    res.status(200).json(articleInfo);

    client.close();
    }
    catch(error){
        res.status(500).json({message:'Error connecting to database',error});
    }
    
})
app.post('/api/articles/:name/upvote',async(req,res) =>{
    // const articleName =req.params.name;

    // articlesInfo[articleName].upvotes +=1;
    // res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes} upvotes!`)
//in postman type: http://localhost:8000/api/articles/learn-react/upvote


//using mongodb:
try{
    const articleName =req.params.name;
    const client= await MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true});
const db=client.db('my-blog');

const articleInfo=await db.collection('articles').findOne({name:articleName});
await db.collection('articles').updateOne({name:articleName},
   {'$set':{
    upvotes:articleInfo.upvotes +1,
            }, 
   });
    const updatedArticleInfo = await db.collection('articles').findOne({name:articleName});
    res.status(200).json(updatedArticleInfo);
    client.close();
}
catch(error){
    res.status(500).json({message:'Error connecting to database',error});
}


});



app.post('/api/articles/:name/add-comment',async(req,res) =>{
//in the postman raw--> {"username": "me", "text": "I love this article!"}

try{
    const {username, text}=req.body;
const articleName =req.params.name;

const client= await MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser:true});
const db=client.db('my-blog');

const articleInfo=await db.collection('articles').findOne({name:articleName});
articleInfo[articleName].comments.push({username,text});

res.status(200).send(articlesInfo[articleName]);
client.close();
}
catch(error){
    res.status(500).json({message:'Error connecting to database',error});
}

});


app.listen(8000,() => console.log('Listening on port 8000'));