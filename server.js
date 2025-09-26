// server.js
// 1. Import library Express
const express = require('express');

// 2. Import semua router
const AboutUsRouter = require('./routes/AboutUsRouter');
const greetingRoutes = require('./routes/greetingRoutes');
const userManagementRouter = require('./routes/UserManagementRoutes'); 

// 3. Buat instance dari Express
const app = express();

// 4. DAFTARKAN MIDDLEWARE UNTUK PARSING BODY
// Penting: Middleware ini harus didaftarkan SEBELUM rute
app.use(express.json()); // Untuk memproses JSON (seperti dari POST/PATCH)
app.use(express.urlencoded({ extended: true })); // Untuk memproses data dari form HTML

// 5. Daftarkan semua route
app.use('/aboutus', AboutUsRouter);
app.use('/greeting', greetingRoutes);
app.use('/users', userManagementRouter); 

// 6. Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// 7. Tentukan port dan jalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
