export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Mengambil API Key format baru secara aman lewat brankas Vercel
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Variabel GEMINI_API_KEY belum dipasang di dashboard Vercel Anda.' });
    }

    try {
        // Melakukan fetch dari backend server (Google mengizinkan API Key tipe baru lewat jalur ini)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: req.body.prompt }] }]
            })
        });

        const data = await response.json();
        const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (outputText) {
            return res.status(200).json({ text: outputText });
        } else {
            return res.status(400).json({ error: 'Respon dari Google Gemini kosong atau tidak valid.' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
