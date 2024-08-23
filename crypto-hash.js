// crpyto module in nodejs used for hash, cypher,decipher
const crypto= require('crypto');

// hashing of input done by sha256 algo
// sha256 algo converts any input int 64 bit key
const cryptoHash = (...inputs) =>{
    const hash = crypto.createHash('sha256');
    // joins the multiple input passed as argument
    // sort() fn sorts the inputs in alphabetical order
    hash.update(inputs.sort().join(""));
    return hash.digest("hex");
}

const result=cryptoHash("raji","hii")
module.exports=cryptoHash;