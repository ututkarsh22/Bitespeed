import mongoose from "mongoose";

const identifySchema = new mongoose.Schema({

    Contact : {
        primaryId : Number,
        emails : [String],
        phoneNumbers : [String],
        secondaryId : [String],
    }
})

const identify = mongoose.model("Identify",identifySchema);
export default identify;