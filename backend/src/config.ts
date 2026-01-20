import mongo from "mongoose";

const mondaiSchema = new mongo.Schema({
  id: Number,
  problem: String,
  answer: String
})

//const userSchema = new mongo.Schema({
//  id: Number,
//  username: String,
//  password: String
//})
export const Mondai = mongo.model("Mondai", mondaiSchema, "Mondai")