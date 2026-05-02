// Koefisien emisi
const KOEF = {
  motor: 0.1,
  mobil: 0.2,
  ac: 0.5,
  laptop: 0.05
};

// Ambil elemen index.html
const btnHitung = document.getElementById('btn-hitung');
const btnReset = document.getElementById('btn-reset');
const hasilSection = document.getElementById('hasil');

// Tombol hitung
btnHitung.addEventListener('click', function() {
    const jarak = parseFloat(document.getElementById('jarak').value);
    const kendaraan = document.getElementById('kendaraan').value;
    const durasi_ac = parseFloat(document.getElementById('durasi_ac').value);
    const durasi_laptop = parseFloat(document.getElementById('durasi_laptop').value);

    // Error - semua field harus diisi
    if (isNaN(jarak) || isNaN(durasi_ac) || isNaN(durasi_laptop)) {
        hasilSection.innerHTML = '<p class="error">&#9888; Mohon isi semua field terlebih dahulu.</p>';
        return;
    }

    // Error - tidak boleh negatif
    if (jarak < 0 || durasi_ac < 0 || durasi_laptop < 0) {
        hasilSection.innerHTML = '<p class="error">&#9888; Nilai tidak boleh negatif. Mohon masukkan angka ≥ 0.</p>';
        return;
    }

    // Memastikan kendaraan valid (kembalikan ke motor jika tidak)
    const jenis = KOEF[kendaraan] ? kendaraan : 'motor';

    // Hitung emisi
    const emisiKendaraan = jarak * KOEF[jenis];
    const emisiAC = durasi_ac * KOEF.ac;
    const emisiLaptop = durasi_laptop * KOEF.laptop;
    const emisiTotal = emisiKendaraan + emisiAC + emisiLaptop;

    // Kategori hasil
    let kategori, warna;
    if (emisiTotal <= 2) {
        kategori = '&#128994; Rendah | Pertahankan!';
        warna = '#2e7d32';
    } else if (emisiTotal <= 5) {
        kategori = '&#128993; Sedang | Mulai perlu perhatian!';
        warna = '#f57f17';
    } else {
        kategori = '&#128308; Tinggi | Coba kurangi emisimu!';
        warna = '#c62828';
    }

    // Emoji kendaraan dinamis
    const kendaraanEmoji = jenis === 'motor' ? '&#128757;' : '&#128663;';

    // Tampil hasil
    hasilSection.innerHTML = `
        <div class="hasil-total" style="color: ${warna}">
            <h3>Total Emisi Hari Ini</h3>
            <p class="angka-besar">${emisiTotal.toFixed(2)} kg CO₂</p>
            <p>${kategori}</p>
        </div>
        <div class="breakdown">
            <h4>Rincian:</h4>
            <ul>
                <li>${kendaraanEmoji} Kendaraan (${jenis}): ${emisiKendaraan.toFixed(2)} kg CO₂</li>
                <li>❄️ AC: ${emisiAC.toFixed(2)} kg CO₂</li>
                <li>&#128187; Laptop: ${emisiLaptop.toFixed(2)} kg CO₂</li>
            </ul>
        </div>
    `;
});

// Tombol reset
btnReset.addEventListener('click', function() {
    document.getElementById('jarak').value = '';
    document.getElementById('durasi_ac').value = '';
    document.getElementById('durasi_laptop').value = '';
    document.getElementById('kendaraan').value = 'motor';
    hasilSection.innerHTML = '<p class="placeholder">Hasil akan muncul di sini setelah kamu klik Hitung.</p>';
    resetBackground();
});

// Tugas A1
// Reset background ke putih saat reset
function resetBackground() {
  document.body.style.backgroundColor = '#ffffffff';
}

// Real time background berubah saat input diketik
document.getElementById('jarak').addEventListener('input', updateBackground);
document.getElementById('durasi_ac').addEventListener('input', updateBackground);
document.getElementById('durasi_laptop').addEventListener('input', updateBackground);
document.getElementById('kendaraan').addEventListener('change', updateBackground);

function updateBackground() {
  const jarak = parseFloat(document.getElementById('jarak').value) || 0;
  const kendaraan = document.getElementById('kendaraan').value;
  const durasi_ac = parseFloat(document.getElementById('durasi_ac').value) || 0;
  const durasi_laptop = parseFloat(document.getElementById('durasi_laptop').value) || 0;

  const emisi = (jarak * KOEF[kendaraan]) + (durasi_ac * KOEF.ac) + (durasi_laptop * KOEF.laptop);

  // Jika semua field kosong, kembalikan ke warna awal
  if (!document.getElementById('jarak').value &&
      !document.getElementById('durasi_ac').value &&
      !document.getElementById('durasi_laptop').value) {
    resetBackground();
    return;
  }

  if (emisi <= 2) {
    document.body.style.backgroundColor = '#28a746c4'; // hijau
  } else if (emisi <= 5) {
    document.body.style.backgroundColor = '#ffc107c8'; // kuning
  } else {
    document.body.style.backgroundColor = '#dc3545'; // merah
  }
}

// Checklist tips
const pesanMotivasi = [
  '',
  'Okay! Kamu sudah mulai peduli lingkungan!',
  'Bagus! Tingkatkan kebiasaan baikmu!',
  'Hebat! Kamu sudah melakukan banyak hal baik!',
  'Keren! Pertahankan kebiasaan baikmu!',
  'Luar biasa! Tetap jaga bumi kita!',
];

document.querySelectorAll('.tips-check').forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    // Toggle class checked pada label
    const label = this.closest('.tips-item');
    label.classList.toggle('checked', this.checked);

    // Hitung berapa yang dicentang
    const totalChecked = document.querySelectorAll('.tips-check:checked').length;

    // Tampilkan pesan motivasi
    const pesan = document.getElementById('pesan-motivasi');
    if (totalChecked === 0) {
      pesan.textContent = '';
      pesan.style.backgroundColor = '';
    } else {
      pesan.textContent = pesanMotivasi[totalChecked] || pesanMotivasi[pesanMotivasi.length - 1];
      pesan.style.backgroundColor = '#e8f5e9';
      pesan.style.color = '#2e7d32';
    }
  });
});
