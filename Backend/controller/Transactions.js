import User from "../model/Usermodel.js";
import bcrypt from "bcryptjs";
export async function Sender(req, res) {
  try {
    const { senderid, receiverid,amount,pin,description } = req.body;
    const amt = Number(amount);
   
    
    if (amt <= 0) {
      return res.status(400).json({ error: "Amount must be greater than zero" });
    }

    // Update balances in parallel
    const currentUser = await User.findById(senderid);
    const otherusername = await User.findById(receiverid);
    const matchPin = await bcrypt.compare(pin,currentUser.pin);
   
    
    if(matchPin){
  await Promise.all([
      User.findByIdAndUpdate(receiverid, { $inc: { balance: amt }, $push: {
        transactions: {
          amount: amt,
          description,
          type: "received",
          otherUserId: senderid,
          otherUserName: currentUser?.firstName
        }
      }}),
      User.findByIdAndUpdate(senderid, { $inc: { balance: -amt },  $push: {
        transactions: {
          amount: amt,
          description,
          type: "sent",
          otherUserId: receiverid,
          otherUserName: otherusername?.firstName
        }
      } })
    ]);
    }
    else{
      return res.status(401).json({failed: "Failed in Sending,Incorrect Pin"})
    }
  

    // Fetch updated documents
    const [receiver, sender] = await Promise.all([
      User.findById(receiverid),
      User.findById(senderid)
    ]);

    res.status(200).json({
      success: true,
      message: "Transaction completed",
      receiver,
      sender
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
