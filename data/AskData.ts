export default class AskData{

    private static instance:AskData;
    buffer: Map<number, number>;
    static buffer: any;
    static data: any[];
  
 
    constructor(){
        this.buffer = new Map();
        };

        

    static getInstance(){
        if(!this.instance){
            this.instance = new AskData();
        }
        return this.instance;
    }
    public insert(data:[],groupBy:number){
        console.log(`AskData:insert:data, ${JSON.stringify(data)}`)
        data.forEach(ask=>{
            let s = `${ask}`.split(',')
            // need groupBy here
            let price = Number(s[0])
            let qty = Number(s[1])
         
            console.log(`s: ${JSON.stringify(s)}`)
            if(this.buffer.has(price)){
               let currentQty =  this.buffer.get(price);
               currentQty = currentQty == undefined ? 0: currentQty
               let newQty = currentQty + qty;
               this.buffer.set(price,newQty)
            }
            else{
                this.buffer.set(price,qty)
            }
        })
    }
    public static regroup(groupBy:number){

    }
    public getAsk(){
      this.data =  [...this.buffer].sort()
      this.data = this.data.slice(0,13);
      let currentTotal = 0;
      for(let i = 0;i<this.data.length;i+=1){
        currentTotal += this.data[i][1];
        this.data[i].push(currentTotal);
      }
      console.log(`getAsk:${JSON.stringify(this.data)}`)
      return this.data;
    }
    public removeAccepted(bid:[]){

    }
    public clear(){
        this.data = [];
        this.buffer = new Map();
    }
}