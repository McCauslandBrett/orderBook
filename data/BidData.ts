export default class BidData{

    private static instance:BidData;
    buffer: Map<number, number>;
    static buffer: any;
    static data: any[];
  
 
    constructor(){
        this.buffer = new Map();
        };

        

    static getInstance(){
        if(!this.instance){
            this.instance = new BidData();
        }
        return this.instance;
    }
    public insert(data:[],groupBy:number){
        data.forEach(bid=>{
            let s = `${bid}`.split(',')
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
    public getBids(){
      this.data =  [...this.buffer].sort()
      this.data.reverse();
      this.data = this.data.slice(0,13);
      return this.data;
    }
    public static removeAccepted(bid:[]){

    }
    public clear(){
        this.data = [];
        this.buffer = new Map();
    }
}