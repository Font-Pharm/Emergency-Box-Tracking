# Emergency Box Tracking — หน้าเปิดแอป

หน้าเปิดแอปของระบบติดตามกล่องยาฉุกเฉิน (CPRBOX) ใช้สำหรับเพิ่มไอคอนลงหน้าจอหลักของโทรศัพท์และคอมพิวเตอร์

กลุ่มงานเภสัชกรรม รพ.ศีขรภูมิ

> repository นี้มีเฉพาะหน้าเปิดแอปและไอคอน **ไม่มีโค้ดระบบหรือข้อมูลใด ๆ** โค้ดระบบเก็บแยกไว้ใน repository แบบ Private

---

## ไฟล์ในชุดนี้

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | หน้าเปิดแอป: ปุ่มเข้าสู่ระบบ และวิธีเพิ่มไอคอน เมื่อเปิดจากไอคอนจะแสดงระบบเต็มจอ |
| `manifest.webmanifest` | ชื่อแอป ไอคอน และสีของแอป สำหรับ Android และ Chrome |
| `sw.js` | service worker ทำให้ติดตั้งเป็นแอปได้ และหน้าแรกเปิดได้เร็ว |
| `icons/icon-192.png`, `icons/icon-512.png` | ไอคอนแอปทั่วไป |
| `icons/icon-maskable-512.png` | ไอคอน Android ที่ย่อโลโก้ให้อยู่ในพื้นที่ปลอดภัย เพราะ Android จะตัดไอคอนเป็นวงกลมหรือสี่เหลี่ยมมน |
| `icons/apple-touch-icon.png` | ไอคอน iPhone / iPad (180×180) |
| `icons/favicon-32.png` | ไอคอนบนแท็บเบราว์เซอร์ |

---

## ขั้นตอนเผยแพร่ด้วย GitHub Pages

1. ที่ github.com กด **+ > New repository**
2. ตั้งชื่อ `cprbox-app` เลือก **Public** แล้วกด **Create repository**
3. กด **uploading an existing file** แล้วลากไฟล์ทั้งหมดในชุดนี้ลงไป (รวมโฟลเดอร์ `icons`) แล้วกด **Commit changes**
4. ไปที่ **Settings > Pages**
5. ช่อง **Source** เลือก **Deploy from a branch**
6. ช่อง **Branch** เลือก **main** และ **/ (root)** แล้วกด **Save**
7. รอ 1–2 นาที ลิงก์จะขึ้นด้านบนของหน้า เช่น `https://ชื่อผู้ใช้.github.io/cprbox-app/`
8. ส่งลิงก์นี้ให้ผู้ใช้ เปิดแล้วทำตามวิธีบนหน้าจอเพื่อเพิ่มไอคอน

GitHub Pages แบบฟรีใช้ได้เฉพาะ repository แบบ Public จึงต้องแยก repository นี้ออกจากโค้ดระบบ

---

## เมื่อ Deploy ระบบใหม่แล้วลิงก์เปลี่ยน

ลิงก์ `/exec` จะคงเดิมเมื่อ Deploy ด้วย **Manage deployments > แก้ไข > New version** แต่ถ้ากด **New deployment** จะได้ลิงก์ใหม่ ให้แก้ลิงก์ใน `index.html` บรรทัดเดียว:

```javascript
var APP_URL = 'https://script.google.com/macros/s/.../exec';
```

ผู้ใช้ที่เพิ่มไอคอนไว้แล้วไม่ต้องเพิ่มใหม่

---

## คำอธิบายโค้ดสำคัญ

### manifest.webmanifest

| บรรทัด | ความหมาย |
|---|---|
| `"name"` / `"short_name"` | ชื่อเต็ม "Emergency Box Tracking" ใช้ในหน้าติดตั้งและรายการแอป ส่วนชื่อสั้น "Emer Tracking" แสดงใต้ไอคอนบนหน้าจอหลัก |
| `"start_url": "./?source=pwa"` | หน้าที่เปิดเมื่อแตะไอคอน `./` หมายถึงโฟลเดอร์เดียวกับไฟล์นี้ |
| `"display": "standalone"` | เปิดแบบแอปเต็มจอ ไม่มีแถบที่อยู่เว็บ |
| `"theme_color"` | สีแถบสถานะด้านบน ใช้สีน้ำเงินเดียวกับระบบ |
| `"purpose": "maskable"` | บอก Android ว่าไอคอนนี้ตัดขอบได้ |

### index.html

| ส่วน | ความหมาย |
|---|---|
| `<link rel="manifest" ...>` | ผูกไฟล์ manifest ทำให้ Android และ Chrome รู้จักแอป |
| `<link rel="apple-touch-icon" ...>` | ไอคอนสำหรับ iPhone เพราะ iPhone ไม่อ่านไอคอนจาก manifest |
| `<meta name="apple-mobile-web-app-title" ...>` | ชื่อใต้ไอคอนบน iPhone ("Emer Tracking") |
| `var APP_URL = '...'` | ลิงก์เว็บแอป CPRBOX แก้ที่นี่ที่เดียว |
| `var OPEN_MODE = 'frame'` | วิธีเปิดระบบเมื่อแตะไอคอน (ดูหัวข้อถัดไป) |
| `matchMedia('(display-mode: standalone)')` | ตรวจว่าเปิดจากไอคอน (Android) หรือไม่ |
| `navigator.standalone === true` | ตรวจว่าเปิดจากไอคอน (iPhone) หรือไม่ |
| `document.body.classList.add('standalone')` | ถ้าเปิดจากไอคอน จะซ่อนหน้าเปิดแอป แล้วแสดงระบบเต็มจอ |
| `frame.addEventListener('load', ...)` | เมื่อระบบโหลดเสร็จ จะค่อย ๆ ซ่อนหน้าโลโก้ |
| `setTimeout(..., 12000)` | ถ้าโหลดนานเกิน 12 วินาที จะแสดงลิงก์สำรองให้เปิดในเบราว์เซอร์ |
| `isIOS` / `showOS(...)` | เลือกแท็บวิธีติดตั้งให้ตรงกับเครื่องที่เปิดอัตโนมัติ |
| `beforeinstallprompt` | Android และคอมพิวเตอร์ (Chrome/Edge) จะแสดงปุ่ม "ติดตั้งแอปบนอุปกรณ์นี้" |
| `navigator.serviceWorker.register('sw.js')` | ลงทะเบียน service worker |

### OPEN_MODE ควรเลือกแบบไหน

| ค่า | การทำงาน | ใช้เมื่อ |
|---|---|---|
| `'frame'` (ค่าเริ่มต้น) | เปิดระบบเต็มจอภายในแอป ไม่มีแถบที่อยู่เว็บ | Deploy ตั้ง **Who has access: Anyone** |
| `'redirect'` | เปิดหน้าเว็บแอปโดยตรง | Deploy ตั้งให้ต้องล็อกอิน Google ก่อน หรือแบบ frame แสดงหน้าว่าง |

### sw.js

| ส่วน | ความหมาย |
|---|---|
| `const CACHE = 'ebt-launcher-v1'` | ชื่อที่เก็บไฟล์ในเครื่อง ถ้าแก้ไอคอนหรือหน้าเปิด ให้เปลี่ยนเป็น v2 เพื่อให้เครื่องผู้ใช้โหลดไฟล์ใหม่ |
| `install` | เก็บหน้าเปิดแอปและไอคอนไว้ในเครื่อง |
| `activate` | ลบที่เก็บรุ่นเก่า |
| `fetch` | โหลดจากเน็ตก่อน ถ้าไม่มีสัญญาณจึงใช้ไฟล์ที่เก็บไว้ ไฟล์จาก Google Apps Script จะไม่ถูกเก็บ ข้อมูลกล่องยาจึงเป็นข้อมูลล่าสุดเสมอ |
