import fs from "fs";
import path from "path";

const fetchData: DataBase = (function(){
    
    let data: DataBase;
    try {
        fs.statSync(path.join(__dirname,"/database.json"));
        data = JSON.parse(fs.readFileSync(path.join(__dirname,"/database.json"), 'utf8'));
    } catch (error) {
        fs.writeFileSync(path.join(__dirname,"/database.json"),JSON.stringify({"transactions":[], "balances":[]}));
        data = JSON.parse(fs.readFileSync(path.join(__dirname,"/database.json"), 'utf8'));
     }
    return data;
    
})();

export default fetchData;