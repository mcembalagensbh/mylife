// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyA_HVXemcOOATH31HPh340C-676UPtVtbk",
    authDomain: "mylife-app-99a2a.firebaseapp.com",
    projectId: "mylife-app-99a2a",
    storageBucket: "mylife-app-99a2a.firebasestorage.app",
    messagingSenderId: "666460169027",
    appId: "1:666460169027:web:735c9e183f3d97dc00c5f6"
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
