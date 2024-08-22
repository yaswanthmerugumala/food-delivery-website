import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://yashu:9059406878@cluster0.2j1ets9.mongodb.net/food-delivery').then(()=>console.log("DB Connected"));
}