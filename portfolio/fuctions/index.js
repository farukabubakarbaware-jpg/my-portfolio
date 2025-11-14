const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const gmailEmail = functions.config().gmail.email;
const gmailPass = functions.config().gmail.pass;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailEmail, pass: gmailPass }
});

exports.sendEmailNotification = functions.firestore
    .document("messages/{msgId}")
    .onCreate(async (snap, ctx) => {
        const data = snap.data();
        const mailOptions = {
            from: gmailEmail,
            to: gmailEmail,
            subject: `📩 New Message from ${data.name}`,
            text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
        };
        try { await transporter.sendMail(mailOptions); console.log("Email sent!"); }
        catch(err){ console.error("Email error:",err); }
    });