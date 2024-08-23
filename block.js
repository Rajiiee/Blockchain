const {GENESIS_DATA, MINE_RATE}=require('./config');
const cryptoHash = require('./crypto-hash');

class Block{
    // defines a block
    constructor({timestamp,prevHash,hash,data,nonce,difficulty}){
        this.timestamp=timestamp;
        this.prevHash=prevHash;
        this.hash=hash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    // mining refer to creation of new block which is in link with the prev block
    // data of current block and array of prevBlock is passed 
    // prevHash store hash fn of prev block while the hash fn creates a hash by taking timestamp,prevHash and data as input
    // nonce is the random no that help to reach a hash less than target
    //  increasing vlaue of nonce and calculating hash at every nonce to achieve the target
    static mineBlock({prevBlock,data}){
        let hash,timestamp;
        const prevHash=prevBlock.hash;
        let {difficulty}=prevBlock;

        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty=Block.adjustDifficulty({
                originalBlock:prevBlock,
                timestamp,
            })
            hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty);
        }while(hash.substring(0,difficulty) !== '0'.repeat(difficulty));
        // the first n(difficulty) indices must be equal to 0(repeated difficulty times)
        
        return new this({
            timestamp,
            prevHash,
            hash,
           difficulty,
           nonce,
           data,
        });
    }
    
    static adjustDifficulty({originalBlock,timestamp}){
        const {difficulty}=originalBlock;
        const difference=timestamp-originalBlock.timestamp;

        if(difficulty<1){
            return 1;
        }
        if(difference>MINE_RATE){
            return difficulty-1;
        }
        else{
            return difficulty+1;
        }
    }
} 

// object block declaration
// const genesisBlock = Block.genesis();
// console.log(genesisBlock);

// // const block1=new Block({
// //     hash:"0xabc",
// //     timestamp:"2/09/23",
// //     prevHash:"0xc12",
// //     data:"hello",
// //     nonce:5,
// //     difficulty:3,
// // });

// const result=Block.mineBlock({
//     prevBlock:genesisBlock,
//     data:"This is brand new"
// });
// console.log(result);

module.exports = Block;