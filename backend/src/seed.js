import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import {
  sample_foods,
  sample_users,
} from './data.js';

import { foodModel } from "./models/food.model.js";
import { userModel } from "./models/user.model.js";

const MONGO_URI = 'mongodb://mongo:27017/foodydost';

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    const foodCount = await foodModel.countDocuments();
    if (foodCount === 0) {
      console.log('🍕 Seeding sample foods...');
      await foodModel.insertMany(sample_foods);
    }

    const userCount = await userModel.countDocuments();
    if (userCount === 0) {
      console.log('👤 Seeding sample users...');
      await userModel.insertMany(sample_users);
    }

    console.log('🌱 Seeding complete!');
    process.exit();
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  }
}

seedDB();