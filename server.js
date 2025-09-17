// 1. Impor library express
const express = require('express');

// 2. Buat instance dari aplikasi express
const app = express();

// 3. Tentukan port yang akan digunakan
const PORT = 3000;

// 4. Buat rute dasar (root route)
app.get('/', (req, res) => {
  res.send('Hello World');
});

// 5. Jalankan server agar "mendengarkan" permintaan di port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});