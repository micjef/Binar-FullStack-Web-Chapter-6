## Kriteria Challenge
- Terdapat endpoint untuk login sebagai superadmin, admin, maupun member.
- Terdapat endpoint untuk menambahkan admin yang mana hanya boleh dilakukan oleh superadmin.
- Terdapat endpoint untuk registrasi sebagai member.
- Terdapat 4 endpoint untuk melakukan CRUD terhadap data mobil, dan hanya admin dan superadmin saja yang dapat melakukan operasi tersebut.
- Terdapat endpoint untuk melihat daftar mobil yang tersedia.
- Terdapat endpoint untuk melihat current user dari token yang dimiliki.

- Setiap data mobil mempunyai informasi berikut:
  - Siapa yang membuat data tersebut
  - Siapa yang menghapus data tersebut
  - Siapa yang terakhir kali mengupdate data tersebut
- Menggunakan Service Repository Pattern dalam membangun project ini.
- Terdapat halaman yang menampilkan dokumentasi API, baik itu menggunakan Swagger UI, Redoc atau Library lain di dalam HTTP Server tersebut.
- Terdapat endpoint yang merespon dengan Open API document dari REST API yang dibangun dalam bentuk JSON.

# Binar: Express.js

Repository ini ditujukan sebagai boilerplate dalam membuat sebuah HTTP Server menggunakan Express.js
Repository ini menggunakan Service Repository Pattern, yang artinya di dalam repository ini terdapat modul model, controller, service, dan repository.

## Getting Started

Untuk mulai membuat sebuah implementasi dari HTTP Server, mulainya menginspeksi file [`app/index.js`](./app/index.js), dan lihatlah salah satu contoh `controller` yang ada di [`app/controllers/mainController.js`](./app/controllers/mainController.js)

Lalu untuk menjalankan development server, kalian tinggal jalanin salah satu script di package.json, yang namanya `develop`.

```sh
yarn develop
```

## Database Management

Di dalam repository ini sudah terdapat beberapa script yang dapat digunakan dalam memanage database, yaitu:

- `yarn db:create` digunakan untuk membuat database
- `yarn db:drop` digunakan untuk menghapus database
- `yarn db:migrate` digunakan untuk menjalankan database migration
- `yarn db:seed` digunakan untuk melakukan seeding
- `yarn db:rollback` digunakan untuk membatalkan migrasi terakhir




