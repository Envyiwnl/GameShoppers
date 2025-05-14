const express= require('express');
const router= express.Router();
const twilio= require('twilio');
require('dotenv').config({path:'../.env'});

const client= twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

router.post('/send-otp', async(req, res)=> {
    const { phone }= req.body;
    console.log('PHONE RECEIVED:', phone);

    try{
        const verification = await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verifications.create({
            to:`+91${phone}`,
            channel: 'sms',
        });
        console.log('OTP SENT:', verification);

        res.status(200).json({message: 'OTP-sent', sid: verification.sid});
    }catch(error){
     console.error('Error Sending OTP:', error.message);
     res.status(500).json({error:'Failed to send OTP'});
    }
});

router.post('/verify-otp', async (req, res) => {
    const { phone, code } = req.body;
  
    if (!phone || !code) {
      return res.status(400).json({ error: 'Phone number and OTP code are required' });
    }
  
    try {
      const verificationCheck = await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks.create({
          to: `+91${phone}`,
          code,
        });
  
      if (verificationCheck.status === 'approved') {
        return res.status(200).json({ success: true, message: 'OTP verified successfully' });
      } else {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      return res.status(500).json({ error: 'Failed to verify OTP' });
    }
  });

module.exports=router;