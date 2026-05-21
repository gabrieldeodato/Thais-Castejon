module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDzax1yxIq1xWZEEOT7SPxb652JirB9Q3s",
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || "thais-castejon.firebaseapp.com",
    projectId: process.env.FIREBASE_PROJECT_ID || "thais-castejon",
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "thais-castejon.firebasestorage.app",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "364219423720",
    appId: process.env.FIREBASE_APP_ID || "1:364219423720:web:4d08621d0b64e7548a625d",
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-FDQCRHEP1S"
  });
};
