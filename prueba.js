var admin = require('firebase-admin');
 var serviceAccount = require('./tasabs-cop-firebase-adminsdk-5bjif-7cca0be8f6.json');
 admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
 });
 const db = admin.firestore();
  const docRef = db.collection('PRUEBA').doc('prueba');
   docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });
