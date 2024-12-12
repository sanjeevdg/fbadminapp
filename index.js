const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors")
const route = process.env.PORT || 3000;
require('dotenv').config();

// import firebase-admin package
const admin = require('firebase-admin');

// import service account file (helps to know the firebase project details)
//// 
console.log('processenv1111111>>>>>',process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log('typeof>>>',typeof process.env.GOOGLE_APPLICATION_CREDENTIALS);
const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log('processenv222222222222>>>>>',serviceAccount.private_key);

serviceAccount.private_key = serviceAccount.private_key.split(String.raw`\n`).join("\n");
console.log('processenv33333333333>>>>>',serviceAccount.private_key);

//serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
//serviceAccount.private_key = serviceAccount.private_key.replace(/\\+/g, "-");
//serviceAccount.private_key = serviceAccount.private_key.replace(/\\\\//g, "_");
//serviceAccount.private_key = serviceAccount.private_key.replace(/\\=/g, "");  



  //require("./serviceAccountKey.json");
  //process.env.GOOGLE_APPLICATION_CREDENTIALS;
  

// Intialize the firebase-admin project/account
admin.initializeApp({
  credential: admin.credential.cert({
  "type": serviceAccount.type,
  "project_id": serviceAccount.project_id,
  "private_key_id": serviceAccount.private_key_id,
  "private_key": serviceAccount.private_key,
  "client_email": serviceAccount.client_email,
  "client_id": serviceAccount.client_id,
  "auth_uri":serviceAccount.auth_uri,
  "token_uri": serviceAccount.token_uri,
  "auth_provider_x509_cert_url": serviceAccount.auth_provider_x509_cert_url,
  "client_x509_cert_url":serviceAccount.client_x509_cert_url,
  "universe_domain": serviceAccount.universe_domain
})
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
