const serverUrl = 'https://limitless-waters-43735.herokuapp.com';

self.addEventListener('install', event => {
    console.log(event)
});

self.addEventListener('activate', event => {
    console.log(event)
});

self.addEventListener('fetch', event => {
    console.log(event)
});

self.addEventListener('push', event => {
    console.log(event)
    // Keep the service worker alive until the notification is created.
    event.waitUntil(
        fetch(serverUrl + '/getPayload').then(async response => {
            const res = await response.text()
            self.registration.showNotification('איסוף מתחיל היום בלילה!', {
                lang: 'en',
                body: 'האם ה TF שלך מעודכן?',
                icon: './img/logo-white.png',
                dir: 'rtl',
                vibrate: [500, 100, 500],
                actions: [
                    {
                        action: 'yes',
                        title: 'מעודכן',
                        icon:'./img/baseline_check_black_18dp.png'
                    },
                    {
                        action: 'not',
                        title: 'פתח טיימפלייז',
                        icon:''
                    }
                ]

            })
        })
    )
});

self.addEventListener('notificationclick', function(event) {
    if (!event.action) {
        // Was a normal notification click
        console.log('Notification Click.');
        return;
    }

    switch (event.action) {
        case 'yes':
            console.log('User ❤️️\'s coffee.');
            break;
        case 'no':
            console.log('User ❤️️\'s doughnuts.');
            break;
        default:
            console.log(`Unknown action clicked: '${event.action}'`);
            break;
    }
});
