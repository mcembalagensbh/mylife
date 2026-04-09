// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "VOCÊ_PEGA_NO_FIREBASE",
    authDomain: "mylife-app.firebaseapp.com",
    projectId: "mylife-app",
    storageBucket: "mylife-app.firebasestorage.app",
    messagingSenderId: "VOCÊ_PEGA_NO_FIREBASE",
    appId: "VOCÊ_PEGA_NO_FIREBASE"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Mensagem em segundo plano:', payload);
    
    const notificationTitle = payload.notification?.title || 'My Life';
    const notificationOptions = {
        body: payload.notification?.body || 'Seus dados foram atualizados',
        icon: 'https://mylife.app.br/icon.png',
        badge: 'https://mylife.app.br/badge.png',
        data: {
            url: 'https://mylife.app.br'
        }
    };
    
    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://mylife.app.br')
    );
});
