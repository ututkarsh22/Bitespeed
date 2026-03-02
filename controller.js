import express from "express";
import Finding from "./Model/Finding.model.js"
import Contact from "./Model/Contact.model.js"

export const identify = async(req , res) => {
    try {
         const {email, phone} = req.body;

        // const user = await Contact.findOne({$or : [
        //     {email},
        //     {phoneNumber : phone}
        // ]});
        // console.log(user)
        const existing = await Finding.findOne({$or : [{"Contact.emails" : email} , {"Contact.phoneNumbers" : phone}]})
        console.log(existing)
         if(existing)
         {
                
                await Finding.updateOne({ _id : existing._id},
                    {
                        $addToSet : {
                            "Contact.emails" : email,
                            "Contact.phoneNumbers" : phone,
                        }
                    }
                )

                    const user = await Contact.findOne({$and : [{email},{phoneNumber : phone}]})
                    if(!user)
                    {    
                    const newUser = new Contact({
                    phoneNumber : phone,
                    email : email,
                    LinkedId : existing._id,
                    LinkedPercedence : "secondary",
                })

                await newUser.save();
            }
         }
         else{
            const newUser = new Contact({
                phoneNumber : phone,
                email : email,
                LinkedPercedence : "primary"
            })

            newUser.LinkedId = newUser._id
            await newUser.save();

            const make = new Finding({
              Contact : {
                primaryId : Date.now(),
                emails : [email],
                phoneNumbers : [phone]
            }})
          await make.save();
        }

        const send = await Finding.findOne({$or : [{"Contact.emails" : email}, {"Contact.phoneNumbers" : phone}]})
         res.json({
            success : true,
            message : "Successful",
            send,
         })

    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Internal Server Error",
            error : error
        })
    }
}