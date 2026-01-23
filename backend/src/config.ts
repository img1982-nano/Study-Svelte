import mongo from "mongoose";

const mondaiSchema = new mongo.Schema({
  id: Number,
  problem: String,
  answer: String
})
const test_collectionSchema = new mongo.Schema({
  id: Number,
  name: String,
})
//const userSchema = new mongo.Schema({
//  id: Number,
//  username: String,
//  password: String
//})
export const Mondai = mongo.model("Mondai", mondaiSchema, "Mondai")
export const test_collection = mongo.model("test_collection", test_collectionSchema, "test_collection")