// Service worker ขนาดเล็ก: เก็บหน้าเปิดแอปและไอคอนไว้ในเครื่อง ให้แอปเปิดขึ้นได้แม้สัญญาณไม่ดี
// ไม่ได้เก็บข้อมูลระบบ CPRBOX — ข้อมูลกล่องยาโหลดจาก Google Apps Script ทุกครั้ง
const CACHE = 'ebt-launcher-v2'; // v2: เว้นแถบสถานะ iPhone
const FILES = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // ไฟล์จากเว็บอื่น (Apps Script) ไม่ยุ่ง
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
