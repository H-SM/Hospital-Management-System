const crypto = require('crypto'); 
const fs = require('fs'); 
const readline = require('readline'); 
const readlineSync = require('readline-sync');

class Node {
  constructor(data_string, owner) 
  {
    this.hasher = crypto.createHash('sha256'); 
    this.time = new Date().getTime(); 

    this.__error = 0;
    
    this.time_stamper();

    this.block_IDer();

    this.set_Block_Hash(data_string);

    this.set_Prev_Hash();

    this.set_Top_Hash();

    this.set_Owner(owner);

    this.make_header();

    this.make_body(data_string);

    if (this.__error) {
      this.error_handler();
    }
    else{
      this.upload_block();
      console.log(this.BlockID);
    }
  }

  upload_block(){
    const f = fs.createWriteStream('BlockChain.txt', {flags : 'a'});
    f.write('\n' + this.header + this.body);
  }

  error_handler()
  {
    console.log("Error occured");
    return this.__error;
  }

  make_body(data_string){
    this.body = data_string;
  }

  make_header()
  {
    this.header = '';
    this.header += this.timestamp + '|';
    this.header += this.BlockID + '|';
    this.header += this.BlockHash + '|';
    this.header += this.prevHash + '|';
    this.header += this.TopHash + '|';
    this.header += this.owner + '|';
  }

  block_IDer(){
    const blocks = this.get_all_Blocks();
    this.BlockID = String(parseInt(blocks[blocks.length-1][1])+1);
  }

  time_stamper(){
    this.time = new Date(); 
    this.timestamp = String(this.time.getTime()/1000);
  }

  set_Block_Hash(data_string){
    const hashes = this.get_all_BlockHashes();
    this.hasher = crypto.createHash('sha256'); 
    this.BlockHash = this.hasher.update(data_string).digest('hex');
    // const hashes = this.get_all_BlockHashes();
    for(let i =0; i<hashes.length; i++)
    {
        if(this.BlockHash == hashes[i])
        {
            this.__error = 1;
        }else{
          this.__error = 0;
        }
    }
    console.log(data_string);
  }

  get_all_Blocks() {
    let blocks = [];
    const contents = fs.readFileSync('BlockChain.txt', 'utf-8');
    
    contents.split('\n').forEach(block => {
        blocks.push(block.split('|').slice(0,7));
    });
    return blocks;
  }

  get_all_BlockHashes(){
    const blocks = this.get_all_Blocks();
    const hashes = [];
    blocks.forEach(block =>{
        hashes.push(block[2]);
    });
    return hashes;
  }

  set_Prev_Hash(){
    const hashes = this.get_all_BlockHashes();
    this.prevHash = hashes[hashes.length-1];
  }

  set_Top_Hash(){
    const hashes = this.get_all_BlockHashes();
    let topstr= '';
    hashes.forEach(_hash => {
        topstr += _hash;
    });
    this.hasher = crypto.createHash('sha256'); 
    this.TopHash = this.hasher.update(topstr).digest('hex');
  }

  set_Owner(owner)
  {
    this.hasher = crypto.createHash('sha256'); 
    this.owner = this.hasher.update(owner).digest('hex');
  }

  get_details(owner)
  {
      const blocks = this.get_all_Blocks();
      blocks.forEach(block => {
        if(block[5] == owner)
        {
          const f = fs.createWriteStream('Output.txt', {flags : 'a'});
          f.write(block[6] + '\n');
        }
      })
  }
}

const id = readlineSync.question('Enter the data: ');
const node = new Node(id, 'Vinay');
node.get_details('87096f578286aa29afc506f59e53507b04deba7316afc8b3b6e46237061f4a29');
