const express=require("express");
const bodyParser=require("body-parser");
const Blockchain=require("./blockchain");

const app=express();
app.use(bodyParser.json());

const blockchain=new Blockchain();

setTimeout(()=>
          pubsub.broadcastChain(),1000
);

app.get("/api/blocks",function(req,res){
    res.send(JSON.stringify(blockchain.chain));
});

app.post("/api/mine",function(req,res){
    const data=req.body;

    blockchain.addBlock({data});
    res.redirect('/api/blocks');
})

app.listen(3000,function(){
    console.log("port is active at 3000");
})