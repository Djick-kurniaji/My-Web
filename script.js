document.addEventListener("DOMContentLoaded", function () {
    // Pastikan elemen tombol download ada sebelum menambahkan event listener
    const downloadCVBtn = document.getElementById("downloadCV");

    if (downloadCVBtn) {
        downloadCVBtn.addEventListener("click", function (event) {
            event.preventDefault();
            alert("Maaf, saya belum berniat melampirkan CV di laman ini. Mohon bisa meminta CV via email, terima kasih.");
        });
    }

function updateDateTime() {
    const dateElement = document.getElementById("current-date");
    const timeElement = document.getElementById("current-time");
    const now = new Date();

    // Format tanggal dalam bahasa Indonesia
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    const formattedDate = now.toLocaleDateString("id-ID", options);

    // Format waktu
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Update elemen HTML
    dateElement.textContent = formattedDate;
    timeElement.textContent = formattedTime;
}

// Jalankan fungsi pertama kali saat halaman dimuat
updateDateTime();

// Perbarui waktu setiap detik
setInterval(updateDateTime, 1000);

    // Mengatur carousel dengan auto-slide lebih lambat (8 detik)
    const carousel = document.querySelector("#carouselTestimoni");

    // Cek apakah teks "Geser untuk melihat testimoni" sudah ada, jika belum tambahkan
    let geserText = document.querySelector(".geser-text");
    if (!geserText) {
        geserText = document.createElement("p");
        geserText.textContent = "Geser untuk melihat testimoni";
        geserText.classList.add("text-muted", "geser-text");
        carousel.parentElement.insertBefore(geserText, carousel);
    }

    if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: false, // Matikan auto-slide bawaan Bootstrap
            ride: false
        });

        let touchStartX = 0;
        let touchEndX = 0;
        let autoSlideInterval;
        let isInteracted = false; // Untuk mendeteksi apakah user sudah melakukan swipe atau klik

        function hideGeserText() {
            if (!isInteracted) {
                isInteracted = true;
                geserText.remove(); // Hapus elemen agar tidak tersisa
            }
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                bsCarousel.next();
            }, 4000); // Auto-slide setiap 3.8 detik
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Hentikan auto-slide saat mouse berada di atas carousel
        carousel.addEventListener("mouseover", stopAutoSlide);
        carousel.addEventListener("mouseout", startAutoSlide);

        // Deteksi swipe kiri/kanan di layar sentuh
        carousel.addEventListener("touchstart", function (event) {
            touchStartX = event.touches[0].clientX;
            stopAutoSlide();
        });

        carousel.addEventListener("touchmove", function (event) {
            touchEndX = event.touches[0].clientX;
        });

        carousel.addEventListener("touchend", function () {
            let diff = touchStartX - touchEndX;
            if (diff > 50) {
                bsCarousel.next();
                hideGeserText();
            } else if (diff < -50) {
                bsCarousel.prev();
                hideGeserText();
            }
            startAutoSlide();
        });


        // Mulai auto-slide saat halaman dimuat
        startAutoSlide();
    }

    // Menampilkan tahun secara otomatis di footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});