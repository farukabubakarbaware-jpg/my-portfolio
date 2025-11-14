import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, query, orderBy, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

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

const messagesDiv = document.getElementById("messages");

const q = query(collection(db,"messages"), orderBy("timestamp","desc"));
onSnapshot(q, snap => {
    messagesDiv.innerHTML = "";
    snap.forEach(docSnap => {
        const m = docSnap.data();
        const id = docSnap.id;
        const time = m.timestamp ? new Date(m.timestamp.seconds*1000).toLocaleString() : "";
        const card = document.createElement("div");
        card.className = "msg-card";
        card.innerHTML = `
            <p><b>${m.name}</b> — <i>${m.email}</i></p>
            <p>${m.message}</p>
            <p style="font-size:12px;color:#666">${time}</p>
            <button data-id="${id}">Delete</button>
        `;
        card.querySelector("button").addEventListener("click", async e => {
            const id = e.target.dataset.id;
            await deleteDoc(doc(db,"messages",id));
        });
        messagesDiv.appendChild(card);
    });
});