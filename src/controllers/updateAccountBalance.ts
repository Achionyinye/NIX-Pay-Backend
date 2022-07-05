import express from "express";
import UserModel from "../model/userModel";

const updateAcBalanceController = async (
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) => {
  const data = await UserModel.findById("62a656c74d6bcbd8fe3df014");
  data.update(
    { "accountDetails._id": "62a656c74d6bcbd8fe3df015" },
    { $set: { "accountDetails.$.balance": 8000 } }
  );
  await data.save();
  console.log(data);
  // // const data = await fetchServices.fetchTransactions();
  //  res.json({ transactions: data });
  res.send("hello");
};
export default updateAcBalanceController;

// app.put("/api/stuff/:id", (req, res, next) => {
//   const thing = new Thing({
//     _id: req.params.id,
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId,
//   });
//   Thing.updateOne({ _id: req.params.id }, thing)
//     .then(() => {
//       res.status(201).json({
//         message: "Thing updated successfully!",
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         error: error,
//       });
//     });
// });
