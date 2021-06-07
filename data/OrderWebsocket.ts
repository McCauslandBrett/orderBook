import ASSETS from '../constants/Assets';
import BidData from '../data/BidData';
import AskData from '../data/AskData';
export default class OrderWebsocket{

    private static instance:OrderWebsocket;
    ws: WebSocket;
    emit: any;
    connected: boolean;
    bidData: BidData;
    askData: AskData;
    asset: string | undefined;
 
    constructor(){
        this.connected = false;
        this.bidData = BidData.getInstance();
        this.askData = AskData.getInstance();
        this.ws = new WebSocket("wss://www.cryptofacilities.com/ws/v1");
        this.ws.onmessage = this.listner;
        
        
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new OrderWebsocket();
        }
        return this.instance;
    }
    
    public async connect(){
        return new Promise((resolve,reject)=>{
            if(!this.connected){
                try{
                    this.ws.onopen = () => {
                        this.connected =true;
                        resolve();
                    }
                }
                catch(e){
                    reject();
                }
             
            }

        })
       
    }

    public async subscribe(asset:string){
      
        return new Promise((resolve,reject)=>{
        try {
            if(this.connected){
              
                // need to be promises
                this.askData.clear();
                this.bidData.clear();
                this.asset = asset;
                this.ws.send(JSON.stringify({"event":"subscribe","feed":"book_ui_1","product_ids":[`${asset}`]}));
                resolve();
            }
            else{
                this.reconnect()
                .then(() => {
                    this.askData.clear();
                    this.bidData.clear();
                    this.asset = asset;
                    // need to be promises
                    this.ws.send(JSON.stringify({"event":"subscribe","feed":"book_ui_1","product_ids":[`${asset}`]}));
                    resolve();
                })
                .catch(()=>{
                    // handle unable to connect
                    reject()
                })
            }    
        }
        catch {
            // handle unable to subscribe
            reject()
        }
        })
    }

    public async unsubscribe(asset:string){
        try{
            if(this.connected){
                this.ws.send(JSON.stringify({"event":"unsubscribe","feed":"book_ui_1","product_ids":[`${asset}`]}));
            }
        }
        catch{
            console.log('failed to unsubscribe')
        }

    }
    private listner = (message:any) =>{
     
            let messageParse = JSON.parse(message.data)
            console.warn('Server: ' + messageParse.asks)
          
            if(messageParse.bids != undefined){
                this.bidData.insert(messageParse.bids,0)
            }
            if(messageParse.asks != undefined){
                this.askData.insert(messageParse.asks,0)
            }
     };
    
    public async reconnect(){
        this.ws = new WebSocket("wss://www.cryptofacilities.com/ws/v1");
        this.ws.onmessage = this.listner;
        return this.connect()

    }
 

    public disconnect(){
      this.ws.close();
      this.connected = false;  
    }

}
