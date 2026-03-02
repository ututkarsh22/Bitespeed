import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    phoneNumber : String,
    email : String,
    LinkedId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Finding"
    },
    LinkedPercedence : {
        type : String,
        default : "primary",
    }
},{timestamps : true}
)

const contact = mongoose.model("Contact",contactSchema);
export default contact;