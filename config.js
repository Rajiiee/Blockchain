const MINE_RATE=1000; //1s=1000ms =>times taken in ms
const INITIAL_DIFFICULTY=2;

// genesis block:first block creation
const GENESIS_DATA={
    timestamp:1,
    prevHash:'0x000',
    nonce:0,
    difficulty:INITIAL_DIFFICULTY,
    hash:'0x123',
    data:[],
}

module.exports= {GENESIS_DATA,MINE_RATE};