async function generateModul() {
    const namaGuru = document.getElementById('namaGuru').value;
    const namaSekolah = document.getElementById('namaSekolah').value;
    const namaKepsek = document.getElementById('namaKepsek').value;
    const tahunAjaran = document.getElementById('tahunAjaran').value;
    
    const kelas = document.getElementById('kelas').value;
    const mapel = document.getElementById('mapel').value;
    const bab = document.getElementById('bab').value;
    const pilar = document.getElementById('pilar').value;

    if (!namaGuru || !namaSekolah || !namaKepsek || !tahunAjaran || !bab) {
        alert("Mohon isi seluruh data identitas administrasi guru terlebih dahulu!");
        return;
    }

    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('outputContainer').classList.add('hidden');

    const systemPrompt = `Anda adalah KBC Modul Generator AI. Buatkan dokumen Modul Ajar Kurikulum Merdeka resmi yang mengintegrasikan nilai Kurikulum Berbasis Cinta (KBC) Kemenag secara otomatis.

Struktur Dokumen Wajib Tanpa Kode Markdown Mentah:
1. KOP IDENTITAS ADMINISTRASI (Tulis bersih di bagian paling atas):
   # MODUL AJAR KURIKULUM MERDEKA BERBASIS CINTA (KBC)
   * Nama Madrasah/Sekolah: ${namaSekolah}
   * Mata Pelajaran: ${mapel}
   * Kelas / Jenjang: ${kelas}
   * Tahun Ajaran: ${tahunAjaran}
   * Guru Pengampu: ${namaGuru}

2. LOGIKA PEMECAHAN PERTEMUAN:
   Analisis materi ini: "${bab}". Pecah materi tersebut secara logis menjadi seluruh rangkaian pertemuan pembelajaran (Pertemuan 1, Pertemuan 2, dan seterusnya sampai bab selesai). Tuliskan rincian lengkap untuk SETIAP pertemuan secara berturut-turut dalam satu dokumen ini.

3. STRUKTUR DETAIL PER PERTEMUAN:
   - ## PERTEMUAN X
   - ### I. KOTAK MATERI ESENSIAL
     Tuliskan isi rangkuman materi nyata, kosakata kunci, rumus kebahasaan, atau teori ilmiah riil berdasarkan bab SIBI tersebut.
   - ### II. SINTAKS 3M (Berkesadaran, Bermakna, Menggembirakan)
     Jabarkan rincian aktivitas menit (Pembukaan 15 menit, Kegiatan Inti 60 menit, Penutup 15 menit). Gaya penyampaian wajib disesuaikan dengan psikologi usia murid kelas ${kelas}.
   - ### III. NASKAH VERBAL DIALOG HATI
     Tuliskan naskah pidato pendek/kalimat verbal konkret di dalam tanda kutip ("...") yang wajib diucapkan langsung oleh guru ${namaGuru} untuk menyentuh batin siswa berdasarkan pilar panca cinta ${pilar}. Jangan ditulis dalam bentuk kalimat perintah abstrak.
   - ### IV. JURNAL DIARI CINTA
     Sediakan draf kolom refleksi cinta untuk diisi oleh siswa.

4. LEMBAR PENGESAHAN LEGALITAS (Tulis bersih di akhir dokumen setelah seluruh pertemuan selesai):
   Mengetahui,
   Kepala Sekolah: ${namaKepsek} (Sisi Kiri)
   Guru Mata Pelajaran: ${namaGuru} (Sisi Kanan)`;

    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: systemPrompt })
        });

        const data = await response.json();
        
        if (data.text) {
            // PERBAIKAN UTAMA: Menggunakan marked.parse() agar tanda bintang (* *) diubah menjadi HTML cetak tebal tebal yang rapi
            document.getElementById('result').innerHTML = marked.parse(data.text);
            document.getElementById('outputContainer').classList.remove('hidden');
        } else {
            alert("Gagal memproses dokumen AI: " + (data.error || "Periksa konfigurasi brankas Key di Vercel."));
        }
    } catch (error) {
        console.error(error);
        alert("Terjadi gangguan koneksi jaringan sistem.");
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
}
