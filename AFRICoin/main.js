const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress , ToAddress,amount) {
        this.fromAddress = fromAddress ;
        this.ToAddress = ToAddress ;
        this.amount = amount ;
    }
}
class Block {
    constructor( timestamp , transactions , previousHash = '') {

       this.timestamp = timestamp;
       this.transactions = transactions;
       this.previousHash = previousHash ;
       this.nonce = 0 ;
       this.hash = this.calculateHash();

    }
    calculateHash() {

        return SHA256( this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

    }
    mineBlock(difficulty) {
        while(this.hash.substring(0,difficulty) !== Array(difficulty +1 ).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block is mined : " + this.hash);


    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 1;
        this.pendingTransaction = [];
        this.miningReward = 4 ;
    }
    createGenesisBlock() {
        return new Block("03/08/25","Genesis Block","0");

    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];

    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValid() {
        for(let i = 1 ; i < this.chain.length ; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false ;
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false ;
            }
        }
        return true ;
    }
}
let africoin = new Blockchain();

