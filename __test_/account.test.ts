import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

beforeAll(async () => {
  await mongoose.connect(
    process.env.NODE_ENV === "test" ? process.env.TEST_DB! : process.env.DB_URL!
  );
});

afterAll(async () => {
  const collections = await mongoose.connection.db.collections();
  collections.map(async (collection) => {
    await collection.deleteMany({});
  });
});

// afterAll(() => {
//   // remove test database after running all the tests
//   fs.unlinkSync(
//     path.join(__dirname, path.sep, "..", "/src/model/database.json")
//   );
// });

// const request = supertest(app);
// describe("create accounts", ()=>{
//     describe("given a valid route", ()=>{
//         it("should return status code 200", async()=>{
//             await request.post("/api/create-account").send({
//                 "account" : 1234567896,
//                 "balance" : 4000
//             }).expect(200);
//         })
//         it("should return status code 200", async()=>{
//             await request.post("/api/create-account").send({
//                 "account" : 1234567891,
//                 "balance" : 2000
//             }).expect(200);
//         })
//     })
// })
let token: string;
describe("Sign up", () => {
  //   describe("given a valid route", () => {
  it("should return status code 200", (done) => {
    request(app)
      .post("/api/user")
      .send({
        fullName: "Samuel",
        gender: "male",
        userName: "Sammy",
        email: "achigiftbarbie@gmail.com",
        dateOfBirth: "04/03/11",
        bvn: "223457632",
        religion: "Christain",
        occupation: "Programmer",
        address: "5, Okhoromi",
        phoneNumber: "9575556721",
        password: "123456",
        confirmPassword: "123456",
      })
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        console.log(res.body, res.status);
        token = res.body.token;
        return done();
      });
  });

  it("should return status code 200", (done) => {
    request(app)
      .get("/api/auth/verify-email/?verifyToken=" + token)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        console.log(res.body, res.status);
        return done();
      });
  });

  it("should return status code 200", async () => {
    const response = await request(app)
      .post("/api/login")
      .send({
        email: "achigiftbarbie@gmail.com",
        password: "123456",
      })
      .expect(200);

    console.log(response.body);
  });
});

// describe("login", () => {
// //   describe("given a valid route", () => {
//     it("should return status code 200", async () => {
//       const response = await request(app)
//         .post("/api/login")
//         .send({
//           email: "achigift@gmail.com",
//           password: "123456",
//         })
//         .expect(200);

//         console.log(response.body)
//     });
// //   });
// });
// describe("transfer funds", () => {
//   describe("given a valid route", () => {
//     it("should return status code 200", async () => {
//       await request(app)
//         .post("/api/transfer")
//         .send({
//           beneficiaryName: "Esther",
//           beneficiaryBank: "Access Bank",
//           from: 676342525,
//           to: 134552496,
//           amount: 2000,
//           transferDescription: "Refunds",
//           email: "example@gmail.com",
//         })
//         .expect(200);
//     });
//   });
// });

// describe("get transactions", () => {
//   describe("given a valid route", () => {
//     it("should return status code 200", async () => {
//       await request(app).get("/api/balance").expect(200);
//     });
//   });
// });

// describe("get balances", () => {
//   describe("given a valid route", () => {
//     it("should return status code 200", async () => {
//       await request(app).get("/api/balance").expect(200);
//     });
//   });
// });

// describe("get individual balance", () => {
//   describe("given a valid route", () => {
//     it("should return status code 200", async () => {
//       await request(app).get("/api/balance/1234567896").expect(200);
//     });
//   });
// });

// describe("get individual bank statement", () => {
//   describe("given a valid route", () => {
//     it("should return status code 200", async () => {
//       await request(app).get("/api/bank-statement/1234567896").expect(200);
//     });
//   });
// });
