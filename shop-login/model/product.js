const fs=require('fs');
const path=require('path');
class Product{
    constructor(t)
    {
        this.title=t;
    }
    
    static fileReader(){
        const p=path.join(path.dirname(require.main.filename),'data','products.json')
        return new Promise((resolve,reject)=>{
            fs.readFile(p,(err,data)=>{
                if(err) reject(err);
                else resolve(JSON.parse(data));
            })
        })
    }
    async save()
    {
        const p=path.join(path.dirname(require.main.filename),'data','products.json')
        Product.fileReader()
        .then(data =>{
            let prod =data;
                    prod.push(this);
                fs.writeFile(p, JSON.stringify(prod),(err)=>{
                    
                    if(err) console.log('write file is not accepted');
                    else console.log('write file is accepted');
                })
        }) .catch(err => {
            console.error('error reading file',err);
        })
     
    }
    
        static async fetchAll() {
            var products=[];
            await Product.fileReader()
            .then(data => {
             products=data;
            })
            .catch(err => {
                console.error('Error reading products:', err);
            });
            return products;
        }
}
module.exports= Product;