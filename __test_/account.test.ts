import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../src/app';



afterAll(()=>{
    // remove test database after running all the tests
    fs.unlinkSync(path.join(__dirname,path.sep,"..","/src/model/database.json")) 
    })

const request = supertest(app);
describe("create accounts", ()=>{
    describe("given a valid route", ()=>{
        it("should return status code 200", async()=>{
            await request.post("/api/create-account").send({
                "account" : 1234567896,
                "balance" : 4000
            }).expect(200);
        })
        it("should return status code 200", async()=>{
            await request.post("/api/create-account").send({
                "account" : 1234567891,
                "balance" : 2000
            }).expect(200);
        })
    })
})

describe("transfer funds", ()=>{
    describe("given a valid route", ()=>{
        it("should return status code 200", async()=>{
            await request.post("/api/transfer").send({
                "from": 1234567896,
                "to": 1234567891,
                "amount": 800,
                "transferDescription":"Refunds"
            }).expect(200);
        })
    })
})

describe("get transactions", ()=>{
    describe("given a valid route", ()=>{
        it("should return status code 200", async()=>{
            await request.get("/api/balance").expect(200);
        })
    })
})

describe("get balances", ()=>{
    describe("given a valid route", ()=>{
        it("should return status code 200", async()=>{
            await request.get("/api/balance").expect(200);
        })
    })
})

describe("get individual balance", ()=>{
    describe("given a valid route", ()=>{
        it("should return status code 200", async()=>{
            await request.get("/api/balance/1234567896").expect(200);
        })
    })
})

describe("get individual bank statement", ()=>{
    describe("given a valid route", ()=>{
        it("should return status code 200", async()=>{
            await request.get("/api/bank-statement/1234567896").expect(200);
        })
    })
})