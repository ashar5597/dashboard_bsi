document.addEventListener("DOMContentLoaded", function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll(".slide");

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 5000);

    // ID Google Sheet
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const sheetID = "1tLIvExUGa_c_ZZpa15PlhcQzamsmf3nSa56RkCZdDsY";
    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json`;

    async function fetchGoogleSheetsData() {
        try {
            const response = await fetch(proxyUrl + sheetURL);
            const text = await response.text();
            
            // Menghapus bagian awal dan akhir yang bukan JSON
            const jsonText = text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1);
            const json = JSON.parse(jsonText);
            const rows = json.table.rows;
    
            let table = document.getElementById("marketing-table");
            table.innerHTML = ""; // Bersihkan tabel sebelum update
    
            rows.forEach(row => {
                let nama = row.c[1]?.v || "-";
                let nominal = row.c[2]?.v || 0;
                let cilem = row.c[3]?.v || 0;
                let total = row.c[4]?.v || 0;
    
                let newRow = table.insertRow();
                newRow.innerHTML = `
                    <td>${nama}</td>
                    <td>Rp ${Number(nominal).toLocaleString()}</td>
                    <td>Rp ${Number(cilem).toLocaleString()}</td>
                    <td>Rp ${Number(total).toLocaleString()}</td>
                `;
            });
        } catch (error) {
            console.error("Gagal mengambil data dari Google Sheets", error);
        }
    }
    
    // Ambil data pertama kali
    fetchGoogleSheetsData();

    // Update setiap 10 detik
    setInterval(fetchGoogleSheetsData, 10000);
});
