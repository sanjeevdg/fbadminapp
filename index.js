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
  "private_key_id": "a57808ba10e46dfb69c204bac421fe719b042392",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCrigXd3r9RET7b\njSQB0JoAmWoPY8ow111sC1CQYY6GioNUsXfmnQjRDVrpKzWKMxXu9FIa2qCrBaIl\n0BYDZFzvQaX3dcd4fmlD5rId3uyG6YFbE5N1F5FEJFQN6blemg/TN3y9Cog7Vlag\n9qP/7qcLvI5TWUXkC4ha56LXwQ62grSRyMHBurUJ/1mJyzD0n2IuSm/0/7dcPOjH\nE86yiHf4Ft5SMOVmpTq3wpkKnY7d4rWg4mO2J5X2EfDJ5KZXfvvpgMS7Y4UeH/J3\nx8g+LcJTMZzqYa785bTSGkr9fdSWVG9flwpolnG0BW6ZcdkIR78d6Y6FvZ0ZnH9n\nJrgjl44lAgMBAAECggEAUWSp2PdezwAAU9u6GJRa5mrk7M18PEWMQf5yaTepEYS6\nwR5+FnIvo0YTe2yxuFP6FcpfBPf04YFISWndcBmYkTwUnIEJt04/82SM4miK0Y8N\nfmIhBx+6IVudeIaMmus+FAoRiX9sWb9jVngBJCigoYyD+d9zrrucJQog9f/YU9eT\n0Q7hD/YFYfvH6cV3iIUeHuBTweOga1CY5PNkKJWlDqTO3rxq1uw2V0tWVkkm2y+v\nTP0g1o29RRGiBaGJ6G5CRPvfq4jfcpSHTMdmnTcR/0VUfdrr+If0GTBv6KSlxJXr\nAuaPMdmat5sFVIBuUqCrry07aWFIVC9QPRHrKlFmNwKBgQDrYpGAg57IlQn2yxg+\nm9FUtVlm+xsqxvJi71ChM7jWn8Hr4MHxA/AglO+O8K1sN6fIVTqLlj2hpJ3Ok5iX\njrmp42F/3K9Ze/4zyAWh8h2sT0+39EyZHsGeo3PlycjnyrYLwul4CH8cBZXpJfx7\n4mPqTMXe3xfeiTHfAODPK85+0wKBgQC6kADEeR1Ihjh6ESXaPx1EokkHzivW6x9T\nVAQwOX/qFaEt5snfgE6GFGde1SoR6PZEvTKwmWdIRzztGS2wHqVlwUw7u5FAsTnn\naO7efA9/711OAGPc8NmMkU+z7IuKj1XMfZuz1jt+wFS7xLkKQU7jMjeM30Kj/XZT\nUwMSs0dUJwKBgQDXJWsU6jkx4XgQCaaJY2a8ZF3pEM/OE7Xs1A0AqwPhuHhJn0/l\nedH8FeW44yfAaEaFh9FRUOvYWVycOrAYpy3wqJKvigkEY57/uW3cji6tFnkpDLUO\np9wVohUHDZ8Crngi2+8F9c4o0LorNrtGiLEGsVGS2ps4nnHlASp6cfH2XQKBgHRn\n/dKZr4fdF8gygufWkbCNgfv4zKnhMz6PIb3lYsbwkA1P/44RRO2sNYOahhF+xorF\ncqd2UFds+7sFBtjphlIjdimfM1amPncBpmn0BsfQ1usgmy70qQlocc7WPYtLPEHH\n7isb9St1Xml6qeqYLVzdrIOdmrswH3CGT1iPvGXpAoGBAKxQE7gK2HljBErZaCP9\nvo9nf2JlKE/a6yVJWqTLd+KHL/OcxXqJ338ByoM3ij9zFwUUETA+qgSbABmMpZUS\nqOm06Y91fFbI03ge0dQDW42TNs+RMQk2zymfC8AOcCepAQ78jF898bAvBEOqSucp\n609mHR5rmeGcYdvTnbwmq6bH\n-----END PRIVATE KEY-----\n",
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
    url: `http://localhost:3000/`,
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
app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
