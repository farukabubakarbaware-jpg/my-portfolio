import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBEBkagcM0Khs6TxCKxkPnzIFvXhlFK4vw",
  authDomain: "myportfolio-8afc0.firebaseapp.com",
  projectId: "myportfolio-8afc0",
  storageBucket: "myportfolio-8afc0.firebasestorage.app",
  messagingSenderId: "1056943213068",
  appId: "1:1056943213068:web:c7a4132dbe1cfa9912bc29",
  measurementId: "G-7BP963WZ88"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form
const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", async e => {
    e.preventDefault();
    statusMsg.textContent = "Sending...";
    try {
        await addDoc(collection(db,"messages"), {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value,
            timestamp: serverTimestamp()
        });
        statusMsg.textContent = "Message sent! ✅";
        statusMsg.style.color = "lime";
        form.reset();
    } catch(err){
        console.log(err);
        statusMsg.textContent = "Failed to send message ❌";
        statusMsg.style.color = "red";
    }
});

// Live badge
const msgBadge = document.getElementById("msgCount");
onSnapshot(collection(db,"messages"), snap => {
    msgBadge.textContent = snap.size;
});