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
        alert("Mohon lengkapi seluruh data identitas administrasi dan materi bab terlebih dahulu!");
        return;
    }

    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('outputContainer').classList.add('hidden');

    const systemPrompt = `Anda adalah KBC Modul Generator AI. Buatkan satu dokumen Modul Ajar Kurikulum Merdeka utuh yang mengintegrasikan nilai Kurikulum Berbasis Cinta (KBC) Kemenag.

Struktur Dokumen Wajib:
1. KOP IDENTITAS ADMINISTRASI (Paling Atas):
   - MODUL AJAR KURIKULUM MERDEKA BERBASIS CINTA (KBC)
   - Nama Madrasah/Sekolah: ${namaSekolah}
   - Mata Pelajaran: ${mapel}
   - Kelas / Jenjang: ${kelas}
   - Tahun Ajaran: ${tahunAjaran}
   - Guru Pengampu: ${namaGuru}

2. LOGIKA PEMECAHAN PERTEMUAN:
   Analisis bab ini: "${bab}". Pecah bab tersebut menjadi beberapa pertemuan secara berurutan (Pertemuan 1, Pertemuan 2, dst).

3. DETAIL SETIAP PERTEMUAN:
   - KOTAK MATERI ESENSIAL: Berikan isi ringkasan materi/rumus nyata dari buku SIBI.
   - SINTAKS 3M (Berkesadaran, Bermakna, Menggembirakan): Alokasi menit detail (Pembukaan 15m, Inti 60m, Penutup 15m). Sesuai psikologi usia anak (${kelas}).
   - NASKAH DIALOG HATI: Tuliskan transkrip kalimat verbal nyata berupa kutipan langsung ("...") yang harus diucapkan guru ${namaGuru} di kelas untuk menyentuh emosi siswa berdasarkan pilar ${pilar}.
   - DIARI CINTA SISWA: Draf isian refleksi mandiri siswa.

4. LEMBAR PENGESAHAN (Paling Bawah Dokumen):
   Tuliskan format tanda tangan Mengetahui, Kepala Sekolah: ${namaKepsek} di sebelah kiri, dan Guru Mata Pelajaran: ${namaGuru} di sebelah kanan.`;

    try {
        // MEMANGGIL JALUR BELAKANG VERCEL (ANTI-CORS / ANTI-ERROR)
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: systemPrompt })
        });

        const data = await response.json();
        
        if (data.text) {
            document.getElementById('result').innerText = data.text;
            document.getElementById('outputContainer').classList.remove('hidden');
        } else {
            alert("Gagal memproses: " + (data.error || "Periksa kembali Environment Variable di Vercel."));
        }
    } catch (error) {
        console.error(error);
        alert("Terjadi gangguan koneksi sistem.");
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
}
