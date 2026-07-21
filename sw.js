// Αυτός ο service worker δεν κάνει καμία προσωρινή αποθήκευση (caching).
// Μόνο απεγκαθιστά ο ίδιος τον εαυτό του και καθαρίζει τυχόν παλιές cache,
// ώστε να μην εμφανίζονται ποτέ μπαγιάτικες εκδόσεις της εφαρμογής.
// Ίδιο pattern με τα υπόλοιπα PWA projects (CineDanal, MediUse, Todo).

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      const clientsList = await self.clients.matchAll({ type: 'window' });
      clientsList.forEach((client) => client.navigate(client.url));
      await self.registration.unregister();
    })()
  );
});
