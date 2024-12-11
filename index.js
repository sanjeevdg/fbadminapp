const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors")
const route = process.env.PORT || 3000;
require('dotenv').config();

// import firebase-admin package
const admin = require('firebase-admin');

// import service account file (helps to know the firebase project details)
//// process.env.GOOGLE_APPLICATION_CREDENTIALS;
const serviceAccount =  
{
  "type": "service_account",
  "project_id": "yetanotherapp-c08f3",
  "private_key_id": "aeeddba2dded5d0b241bc3a623dbafafdb19d9d0",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCy/PjGbm4aqIDu\n1sMirr1Qz0kAZ9TIuvr57ioeMItI9vyZb2wqfW68P0/RsQaMZpgHfF5kxfrINUs3\ntlFg6pImuVUvEhEOkaQ+yWaZXnaZwmn7zB16wQ3XJ4RQfD/eFVCZru31SxWqByyh\n9L3KmkBm6Q6BHyL1n2EsJHipQSuAxe1ZEdaQYNBbd/kWiM8ffXOf8YhQ0HGxdoE1\nHtQbtT0mEoGHIW6083RrFhsCi6Y3LgaocGNWZOc6YA6z5iFHKc27x7u91FgO1zrO\n3lsYx//ch+dfQX/zZEst80vjNGyDptiHy4odbyKCGI7OEzeDysNqx2Fb5ncCNAnd\ns4dkKlL9AgMBAAECggEAI0AVEqdvAcsL0X30YmE9oauhOfY4/utsQEq6esWeuNkD\nuIgsKlYXt/VUF/0gSAhwipDg2kHvePyd+rPqZQbtj7jSYPnS6CagzUjG7w+elfum\n+dMiPynEOwpqUZuWzHswK4Q7EyMdeiX9kUvtEPi+FEZz99QVA4DHF3V7WgIeujZr\nn/cuL2xQkAEwCjfYDwaXinwpbf63/72Ss5WVixqQTPtP7BkmIibhmK/tL+io9fdZ\nwLpmwpMgV/FjR6hjRtArJRkPr5PV0PZFQc7SfaVxYBAA43spr11sTSC6yjyDNCSK\nvwFDpDrxhCSNFAm8BTzThGujGlau75yuOkjnj+jBFQKBgQD4U/4eCNae+ElDocVI\nkSMqwhOWAcit/l67/Z3QGH+C5ok+frFmJoavXaNtZ8DESRCmdvMj672jC/lnyJc0\nwfgNeizwMucxguX15pMs/C7b/3TifCgS7NDLlJjuyS6nx5XpfKbO15RQzcH3yXa4\nRu41TfINs8WqtEQu5e0S082YEwKBgQC4hJM7XRrDwephDbUj7FWDYENNDAwbtvL9\nL5CLFvFZ3O2f8rKr9t8ZWz9FOHUkUpav8e/6l6jQpUrhNgKuu5c5PVYS6c2G7M+b\nL0JExd1UY0jo2g3MvC0KpUrlBq2d2LtKuecDt6bbzGA+qjDgINvTfN4QM3zInAMO\n2tWhq6rqrwKBgG69tjNaqatW+gUpHTuRTeeBiQ56WS4Oo9yd60SjyClt+YJfKWlu\ngN2vmnPtsu9VzhEONrusI3OUoXKA571lSuNnuqabbLKNt1ODsdp708HUGCHwUEaw\nSSSgbdr+6Ml1ngrzxce0J7YpK/j+ZO0k5JHs4qbtppbLsSRg8OpWffb1AoGAV7mA\nHjsXnHY3LklME3Yq+bjshlbx8sM6JzFT8SzJNkYZG3BRjfxi+TUukYRT/R7e0Wuf\nAm7ULc5IGWaKQ/Sf4vDMWVWbB0jTMx52zSedIJ/LbBkvcmUMrQEE6HoSVPdTpCVa\nNaQ8ykcSgvh7IDO/D39QPDeeXen+cjOMWb66FbUCgYB+4C4sOnzTmqlIzJUbKDC+\nLSAvGImSM0cQpdj7I1fWvLW2vXeoI+ISgkpDcN25qVSOajLuVSpq3OPGT5KKnirr\nKF8pnPrRHJNq/5Ao/MMpPF0496YgXysnpV3H5WHjzNnbIDNFKjbvHorzYfqDTm63\nGtnzU6J0Txm4IbeVI9dYvA==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-40s0n@yetanotherapp-c08f3.iam.gserviceaccount.com",
  "client_id": "109439515790696392614",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-40s0n%40yetanotherapp-c08f3.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  //require("./serviceAccountKey.json");
  //process.env.GOOGLE_APPLICATION_CREDENTIALS;
  

// Intialize the firebase-admin project/account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors());
var jsonParser = bodyParser.json()

app.get("/status", (req, res) => {
    res.send("ckeck Status");
});


const delete_user = (uid) => {



admin.auth()
  .deleteUser(uid)
  .then(() => {
    console.log('Successfully deleted user');
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });


};


app.get("/deleteuserbyemail", (req,res) => {

let em = req.query.email;

admin.auth()
  .getUserByEmail(em)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data:` + JSON.stringify(userRecord));

    delete_user(userRecord.uid)
    //res.send('ok'//,e{})
    res.status(200).json({ message: JSON.stringify(userRecord) });
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
  });

});

// Custom Verification Link
app.post('/VerificationLink', jsonParser, async (req, res) => {
  const userData = req.body;
  console.log(userData);
  const actionCodeSettings = {
    url: `http://localhost:6000/`,
    handleCodeInApp: true,
    android: {
      packageName: 'com.yetnotherapp'
    }
  };
  admin
  .auth()
  .generateSignInWithEmailLink(userData.email, actionCodeSettings)
  .then(async (link) => {
      // We got the Embedded Link (Now we can use this link and send the mail to the user
    console.log('email message sent');
      // for verifing the Email/account). To send custom mail you can use nodemailer or mail gun.
  })
  .catch((error) => {
    res.json({
      error: false,
      message: error
  })
 });
})
app.set('port', (process.env.PORT || 6001));
app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
module.exports = app;
