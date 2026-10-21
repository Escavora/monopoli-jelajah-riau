/* =====================================================================
   BANK SOAL — GURU BOLEH MENGEDIT BAGIAN INI
   - "benar" = nomor opsi yang benar (0 = opsi pertama, 1 = kedua, 2 = ketiga)
   - Kartu diacak dan tidak berulang sampai tumpukan habis.
   ===================================================================== */

// KARTU TANTANGAN: pilihan ganda, jawaban benar +2 bintang
export const KARTU_TANTANGAN = [
  { tanya:"Urutan wilayah dari yang terkecil adalah...", opsi:["RT, RW, Desa/Kelurahan, Kecamatan, Kabupaten/Kota, Provinsi, Indonesia","RW, RT, Kecamatan, Desa, Provinsi, Kabupaten, Indonesia","Indonesia, Provinsi, Kabupaten, Kecamatan, Desa, RW, RT"], benar:0 },
  { tanya:"Beberapa RT yang bergabung membentuk...", opsi:["RW","Provinsi","Kecamatan"], benar:0 },
  { tanya:"Ibu kota Provinsi Riau adalah...", opsi:["Dumai","Pekanbaru","Siak"], benar:1 },
  { tanya:"Tempat warga memeriksakan kesehatan adalah...", opsi:["Pasar","Lapangan","Puskesmas"], benar:2 },
  { tanya:"Yang termasuk identitas tempat tinggal adalah...", opsi:["Nama jalan dan nomor rumah","Warna cat rumah","Nama hewan peliharaan"], benar:0 },
  { tanya:"Pasar adalah tempat untuk...", opsi:["Belajar","Jual beli","Berobat"], benar:1 },
  { tanya:"Provinsi Riau adalah bagian dari...", opsi:["NKRI","Malaysia","Singapura"], benar:0 },
  { tanya:"Provinsi Riau terdiri dari 10 kabupaten dan ... kota.", opsi:["2","5","10"], benar:0 },
];

// KARTU KESEMPATAN: soal terbuka, dinilai guru/teman. Benar = maju sesuai "maju"
export const KARTU_KESEMPATAN = [
  { tanya:"Sebutkan nama provinsi tempat tinggalmu.", contoh:"Provinsi Riau.", maju:2 },
  { tanya:"Sebutkan satu tempat di sekitar rumahmu.", contoh:"Sekolah, masjid, pasar, puskesmas, lapangan.", maju:2 },
  { tanya:"Sebutkan satu kabupaten atau kota di Riau.", contoh:"Kota Pekanbaru, Kota Dumai, Kabupaten Siak, Kabupaten Kuantan Singingi.", maju:2 },
  { tanya:"Sebutkan satu makanan khas Riau.", contoh:"Gulai ikan patin, bolu kemojo, mie sagu, roti jala.", maju:1 },
  { tanya:"Sebutkan satu ciri khas Riau.", contoh:"Bumi Lancang Kuning, rumah adat Selaso Jatuh Kembar, Istana Siak Sri Indrapura.", maju:1 },
  { tanya:"Sebutkan nama jalan sekolahmu.", contoh:"Guru memeriksa nama jalan sekolah yang disebutkan.", maju:2 },
];

// KARTU DANA UMUM: situasi sehari-hari, dinilai guru/teman, benar +1 bintang
export const KARTU_DANA_UMUM = [
  { tanya:"Kamu melihat sampah berserakan di sekitar rumah. Apa yang sebaiknya kamu lakukan?", contoh:"Memungut dan membuangnya ke tempat sampah, mengajak teman ikut membersihkan." },
  { tanya:"Warga mengadakan gotong royong. Apa manfaatnya?", contoh:"Lingkungan bersih, pekerjaan cepat selesai, warga makin rukun." },
  { tanya:"Kamu membantu menjaga kebersihan sekolah. Apa manfaatnya?", contoh:"Belajar jadi nyaman, terhindar dari penyakit." },
  { tanya:"Ada keluarga baru pindah ke dekat rumahmu. Sikap apa yang baik?", contoh:"Menyapa dengan ramah, mengenalkan lingkungan sekitar." },
  { tanya:"Lampu jalan di gang rumahmu mati. Kepada siapa sebaiknya hal itu disampaikan?", contoh:"Kepada orang tua atau ketua RT." },
  { tanya:"Teman barumu berasal dari provinsi lain dan bahasanya berbeda. Bagaimana sikapmu?", contoh:"Menghargai dan berteman baik, karena Indonesia terdiri dari banyak daerah." },
];

// KARTU BONUS: langsung berlaku. jenis "maju" (langkah) atau "bintang"
export const KARTU_BONUS = [
  { teks:"Kamu ikut kerja bakti di lingkungan RT. Maju 2 langkah.", jenis:"maju", n:2 },
  { teks:"Kamu menyapa tetangga dengan sopan. Dapat 1 bintang.", jenis:"bintang", n:1 },
  { teks:"Kamu membantu ibu berbelanja di pasar. Maju 2 langkah.", jenis:"maju", n:2 },
  { teks:"Kamu ikut berlatih tari Zapin di sekolah. Maju 3 langkah.", jenis:"maju", n:3 },
  { teks:"Kamu selalu membuang sampah pada tempatnya. Dapat 2 bintang.", jenis:"bintang", n:2 },
  { teks:"Kamu hafal alamat rumahmu. Ucapkan alamatmu, lalu dapat 1 bintang.", jenis:"bintang", n:1 },
];

// KARTU HUKUMAN: jenis "mundur", "posbelajar", "tantangan", "kurang"
export const KARTU_HUKUMAN = [
  { teks:"Kamu lupa fungsi pasar. Mundur 1 langkah, lalu baca kembali info petak Pasar.", jenis:"mundur", n:1, bacaPetak:6 },
  { teks:"Kamu salah mengurutkan wilayah. Pergi ke Pos Belajar dan berhenti satu giliran.", jenis:"posbelajar" },
  { teks:"Kamu belum bisa menyebutkan identitas tempat tinggal. Jawab satu Kartu Tantangan tambahan.", jenis:"tantangan" },
  { teks:"Kamu membuang sampah ke sungai. Mundur 2 langkah. Sungai adalah sumber kehidupan warga.", jenis:"mundur", n:2 },
  { teks:"Kamu lupa ibu kota Provinsi Riau. Mundur 1 langkah.", jenis:"mundur", n:1 },
  { teks:"Kamu tidak ikut kerja bakti di sekolah. Bintangmu berkurang 1.", jenis:"kurang", n:1 },
];

// INFO PETAK LOKASI: info singkat (maks. 2 kalimat) + 1 soal pilihan ganda (+1 bintang & stempel)
export const INFO_PETAK = {
  1:{ info:"Rumah adalah tempat tinggal kita bersama keluarga. Rumah punya alamat, yaitu nama jalan dan nomor rumah.", tanya:"Tempat tinggal kita bersama keluarga disebut...", opsi:["Rumah","Pasar","Kantor"], benar:0 },
  3:{ info:"Sekolah adalah tempat kita belajar. Di sekolah ada guru dan teman-teman.", tanya:"Di sekolah, kita pergi untuk...", opsi:["Berobat","Belajar","Jual beli"], benar:1 },
  4:{ info:"Puskesmas adalah tempat warga memeriksakan kesehatan. Di sana ada dokter dan perawat.", tanya:"Siapa yang bekerja di puskesmas?", opsi:["Pedagang","Petani","Dokter dan perawat"], benar:2 },
  6:{ info:"Pasar adalah tempat penjual dan pembeli bertemu. Di pasar terjadi kegiatan jual beli.", tanya:"Kegiatan utama di pasar adalah...", opsi:["Jual beli","Belajar","Berobat"], benar:0 },
  7:{ info:"Tempat ibadah adalah tempat warga beribadah sesuai agamanya. Contohnya masjid, gereja, pura, vihara, dan klenteng.", tanya:"Sikap yang baik di dekat tempat ibadah adalah...", opsi:["Berteriak-teriak","Menjaga ketenangan","Membuang sampah"], benar:1 },
  9:{ info:"Lapangan adalah tempat warga berolahraga dan bermain. Lapangan juga dipakai untuk upacara dan acara bersama.", tanya:"Lapangan biasa dipakai untuk...", opsi:["Berobat","Menabung","Berolahraga"], benar:2 },
  11:{ info:"Pos ronda adalah tempat warga berjaga malam. Ronda membuat lingkungan tetap aman.", tanya:"Apa manfaat ronda malam?", opsi:["Lingkungan aman","Jalan jadi rusak","Warga jadi bertengkar"], benar:0 },
  12:{ info:"RT (Rukun Tetangga) adalah wilayah terkecil tempat tinggal kita. RT dipimpin oleh ketua RT.", tanya:"RT dipimpin oleh...", opsi:["Gubernur","Ketua RT","Camat"], benar:1 },
  14:{ info:"RW (Rukun Warga) terdiri dari beberapa RT. RW dipimpin oleh ketua RW.", tanya:"RW terdiri dari beberapa...", opsi:["Provinsi","Kecamatan","RT"], benar:2 },
  17:{ info:"Desa atau kelurahan terdiri dari beberapa RW. Desa dipimpin kepala desa, kelurahan dipimpin lurah.", tanya:"Kelurahan dipimpin oleh...", opsi:["Lurah","Bupati","Ketua RT"], benar:0 },
  19:{ info:"Kecamatan terdiri dari beberapa desa atau kelurahan. Kecamatan dipimpin oleh camat.", tanya:"Kecamatan dipimpin oleh...", opsi:["Gubernur","Camat","Ketua RW"], benar:1 },
  20:{ info:"Kabupaten atau kota terdiri dari beberapa kecamatan. Kabupaten dipimpin bupati, kota dipimpin wali kota.", tanya:"Kabupaten dipimpin oleh...", opsi:["Lurah","Camat","Bupati"], benar:2 },
  22:{ info:"Provinsi Riau terdiri dari 10 kabupaten dan 2 kota. Ibu kotanya Pekanbaru dan dipimpin oleh gubernur.", tanya:"Provinsi dipimpin oleh...", opsi:["Gubernur","Ketua RT","Lurah"], benar:0 },
  24:{ info:"Indonesia terdiri dari banyak provinsi, salah satunya Riau. Bendera kita Merah Putih dan lambang negara kita Garuda Pancasila.", tanya:"Lambang negara Indonesia adalah...", opsi:["Harimau","Garuda Pancasila","Gajah"], benar:1 },
  25:{ info:"Riau dijuluki Bumi Lancang Kuning dan dihuni masyarakat Melayu. Riau punya rumah adat Selaso Jatuh Kembar dan Istana Siak Sri Indrapura.", tanya:"Julukan Provinsi Riau adalah...", opsi:["Kota Pahlawan","Pulau Dewata","Bumi Lancang Kuning"], benar:2 },
  27:{ info:"Makanan khas Riau antara lain gulai ikan patin, bolu kemojo, mie sagu, dan roti jala.", tanya:"Mana yang termasuk makanan khas Riau?", opsi:["Gulai ikan patin","Gudeg","Pempek"], benar:0 },
  29:{ info:"Kesenian Riau antara lain tari Zapin dan tari Makan Sirih. Ada juga tradisi Pacu Jalur dari Kuantan Singingi.", tanya:"Tradisi Pacu Jalur berasal dari...", opsi:["Dumai","Kuantan Singingi","Pekanbaru"], benar:1 },
  31:{ info:"Riau punya Sungai Siak dan gelombang Bono di Sungai Kampar. Taman Nasional Tesso Nilo adalah rumah gajah Sumatera.", tanya:"Taman Nasional Tesso Nilo adalah rumah bagi...", opsi:["Komodo","Orangutan","Gajah Sumatera"], benar:2 },
};

/* ===================== AKHIR BANK SOAL ===================== */
