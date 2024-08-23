const Block = require('./block');
const cryptoHash = require('./crypto-hash');

// class to connect all the blocks made
// the blockchain is made as array
class Blockchain{
    // first block of the chain i.e the genesis block
    constructor(){
        this.chain=[Block.genesis()];
    }

    // addition of new block the new block made is mined and iff all the values are valid then added
    addBlock({data}){
         const newBlock =Block.mineBlock({
            prevBlock:this.chain[this.chain.length-1],
            data,
         });

         this.chain.push(newBlock);
    }

    replaceChain(chain){
        if(chain.length<=this.chain.length){
            console.error("the incoming chain is not longer");
            return;
        }
        if(!Blockchain.isValidChain(chain)){
            console.error("The incoming chain is not valid");
            return;
        }
        this.chain=chain;
    }

    // checking the validity of blockchain
    static isValidChain(chain){
        // JSON.stringify unpack krta hai array ko
        // is condition me genesis block ke data ko match krte hai
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())) {
            return false;
        }
        // this cond checks for correctness of prev hash and hash
        for(let i =1; i<chain.length;i++){
            const{timestamp,prevHash,hash,nonce,difficulty,data} =chain[i];
            const lastDifficulty=chain[i-1].difficulty;
            const realLastHash =chain[i-1].hash;
            if(prevHash!==realLastHash){
                return false;
            }
            const validatedHash=cryptoHash(timestamp,prevHash,nonce,difficulty,data);
            if(validatedHash!==hash){
                return false;
            }
            if(Math.abs(lastDifficulty-difficulty)>1){
                return false;
            }
        }
        return true;
    }
}

const blockchain= new Blockchain();
blockchain.addBlock({data:"block1"});
blockchain.addBlock({data:"new "});

const result=Blockchain.isValidChain(blockchain.chain)
console.log(blockchain.chain);
console.log(result);

module.exports = Blockchain;