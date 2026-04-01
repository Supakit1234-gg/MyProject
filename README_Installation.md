 - วิธีการติดตั้งระบบ
ความต้องการของระบบ
Node.js
MongoDB
npm
ขั้นตอนการติดตั้ง
1. Clone โปรเจค
<<<<<<< HEAD git clone [https://github.com/6811850001-bot/k-shop.git](https://github.com/Supakit1234-gg/MyProject/new/main)

39707fb467f50c280d6707f1bb698d417c6135e8 cd k-shop

2. ติดตั้ง Dependencies
npm install

3. เชื่อมต่อ MongoDB
ตรวจสอบให้แน่ใจว่าเปิด MongoDB ไว้แล้ว

เปิด MongoDB Compass
สร้าง Collection ชื่อ myShop
สร้าง Database ชื่อ ITMISHOP
ระบบจะสร้าง Collection ให้อัตโนมัติเมื่อมีการใช้งาน ได้แก่
members
products
orders
employees
4. รันโปรเจค
node npm start

5. เปิดเบราว์เซอร์
http://localhost:8080

เทคโนโลยีที่ใช้
Node.js + Express.js
MongoDB + Mongoose
EJS Template Engine
Bootstrap 4
bcrypt
express-session
