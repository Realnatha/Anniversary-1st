"use strict";

// =====================================
// PENGATURAN ANNIVERSARY
// =====================================

const ANNIVERSARY_DATE = "2025-10-15T00:00:00";
const TOTAL_PHOTOS = 48;

// =====================================
// SUMBER FOTO GALERI
// =====================================

function photoSources(n) {
  return [
    `images/foto (${n}).jpeg`,
    `images/foto (${n}).jpg`,
    `images/foto${n}.jpeg`,
    `images/foto${n}.jpg`,
    `images/foto (${n}).png`,
    `images/foto${n}.png`,
    `images/foto (${n}).webp`,
    `images/foto${n}.webp`,
  ];
}

// =====================================
// HITUNG HARI ANNIVERSARY
// =====================================

function setupCounter() {
  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  // Jalankan hanya jika elemen tersedia
  if (!days || !hours || !minutes || !seconds) return;

  const start = new Date(ANNIVERSARY_DATE);

  if (Number.isNaN(start.getTime())) return;

  function update() {
    const diff = Math.max(0, Date.now() - start.getTime());

    days.textContent = Math.floor(diff / 86400000).toLocaleString("id-ID");

    hours.textContent = String(Math.floor(diff / 3600000) % 24).padStart(
      2,
      "0",
    );

    minutes.textContent = String(Math.floor(diff / 60000) % 60).padStart(
      2,
      "0",
    );

    seconds.textContent = String(Math.floor(diff / 1000) % 60).padStart(2, "0");
  }

  update();
  window.setInterval(update, 1000);
}

// =====================================
// GALERI FOTO
// =====================================

function setupGallery() {
  const grid = document.getElementById("galleryGrid");

  // Berhenti jika halaman tidak memiliki galeri
  if (!grid) return;

  grid.replaceChildren();

  // Jumlah foto sesuai proyek anniversary
  for (let n = 1; n <= TOTAL_PHOTOS; n++) {
    const figure = document.createElement("figure");
    figure.className = "gallery-card";

    const img = document.createElement("img");
    img.alt = `Kenangan kita ${n}`;
    img.loading = "lazy";

    const caption = document.createElement("figcaption");
    caption.textContent = `Kenangan kita #${n}`;

    // Format nama file: foto (1).jpeg, foto (2).jpeg, dst.
    img.src = `images/foto%20(${n}).jpeg`;

    // Jika file tidak ditemukan, tampilkan pesan yang jelas
    img.onerror = function () {
      img.onerror = null;

      const message = document.createElement("p");
      message.className = "photo-missing";
      message.textContent =
        `Foto ${n} tidak ditemukan. Periksa nama dan lokasi file.`;

      img.replaceWith(message);
    };

    figure.append(img, caption);
    grid.appendChild(figure);
  }
}



// =====================================
// TOMBOL KEJUTAN BIASA
// =====================================

function setupSurprise() {
  const button = document.getElementById("surpriseButton");
  const message = document.getElementById("surpriseMessage");

  if (!button || !message) return;

  button.addEventListener("click", () => {
    const isHidden = message.hidden;

    message.hidden = !isHidden;
    button.setAttribute("aria-expanded", String(isHidden));

    if (isHidden) {
      createCelebration();

      message.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "center",
      });
    }
  });
}

// =====================================
// ANIMASI HATI MELAYANG
// =====================================

function setupFloatingHearts() {
  const layer = document.getElementById("floatingLayer");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!layer || reduceMotion) return;

  window.setInterval(() => {
    const heart = document.createElement("span");

    heart.className = "float-heart";
    heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 18}px`;
    heart.style.animationDuration = `${6 + Math.random() * 5}s`;

    layer.appendChild(heart);

    window.setTimeout(() => {
      heart.remove();
    }, 12000);
  }, 1400);
}

// =====================================
// AMPLOP SURAT CINTA
// =====================================

function setupEnvelope() {
  const envelope = document.getElementById("envelope");
  const hint = document.getElementById("envelopeHint");

  if (!envelope || !hint) return;

  let isAnimating = false;

  function toggleLetter() {
    if (isAnimating) return;

    isAnimating = true;

    const shouldOpen = !envelope.classList.contains("opened");

    envelope.classList.toggle("opened", shouldOpen);
    envelope.setAttribute("aria-expanded", String(shouldOpen));

    hint.textContent = shouldOpen
      ? "Klik amplop lagi untuk menutup 💗"
      : "Klik amplop untuk membuka surat 💌";

    window.setTimeout(() => {
      isAnimating = false;
    }, 1100);
  }

  envelope.addEventListener("click", toggleLetter);

  envelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleLetter();
    }
  });
}

// =====================================
// EFEK HATI, BUNGA, BINTANG, CONFETTI
// =====================================

function createCelebration() {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (reduceMotion) return;

  const particles = [
    { symbol: "💖", type: "heart" },
    { symbol: "💕", type: "heart" },
    { symbol: "💗", type: "heart" },
    { symbol: "🌸", type: "heart" },
    { symbol: "🌷", type: "heart" },
    { symbol: "✨", type: "star" },
    { symbol: "⭐", type: "star" },
  ];

  const colors = [
    "#ff5c8a",
    "#ff9ec4",
    "#ffd6e7",
    "#ffffff",
    "#e63966",
    "#ffd166",
  ];

  // Ledakan hati, bunga, dan bintang
  for (let i = 0; i < 38; i++) {
    const item = particles[Math.floor(Math.random() * particles.length)];

    const particle = document.createElement("span");

    particle.className = `celebration-particle celebration-${item.type}`;

    particle.textContent = item.symbol;

    particle.style.setProperty("--move-x", `${(Math.random() - 0.5) * 700}px`);

    particle.style.setProperty("--move-y", `${(Math.random() - 0.65) * 650}px`);

    particle.style.setProperty("--size", `${16 + Math.random() * 22}px`);

    particle.style.setProperty("--duration", `${1.8 + Math.random() * 1.5}s`);

    particle.style.setProperty("--rotation", `${Math.random() * 720 - 360}deg`);

    particle.style.setProperty("--end-scale", `${0.5 + Math.random() * 1.2}`);

    document.body.appendChild(particle);

    window.setTimeout(() => {
      particle.remove();
    }, 3500);
  }

  // Confetti berwarna pink, merah, dan putih
  for (let i = 0; i < 45; i++) {
    const confetti = document.createElement("span");

    confetti.className = "celebration-particle celebration-confetti";

    confetti.style.setProperty(
      "--confetti-color",
      colors[Math.floor(Math.random() * colors.length)],
    );

    confetti.style.setProperty("--move-x", `${(Math.random() - 0.5) * 900}px`);

    confetti.style.setProperty("--move-y", `${(Math.random() - 0.5) * 750}px`);

    confetti.style.setProperty("--duration", `${2 + Math.random() * 1.5}s`);

    confetti.style.setProperty("--rotation", `${Math.random() * 1080}deg`);

    confetti.style.setProperty("--end-scale", `${0.6 + Math.random()}`);

    document.body.appendChild(confetti);

    window.setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

// =====================================
// HALAMAN KEJUTAN VIDEO
// =====================================

function setupVideoSurprise() {
  const button = document.getElementById("openVideoSurprise");
  const content = document.getElementById("surpriseContent");

  if (!button || !content) return;

  button.addEventListener("click", () => {
    content.hidden = false;

    button.setAttribute("aria-expanded", "true");
    button.textContent = "Kejutan untukmu 💝";
    button.disabled = true;

    // Gulir ke bagian video dan pesan
    content.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });

    // Efek perayaan
    createCelebration();

    // Hati dan bunga tambahan
    const layer = document.getElementById("floatingLayer");

    if (layer) {
      const decorations = ["♥", "♡", "🌸", "💗", "🌷"];

      for (let i = 0; i < 18; i++) {
        const decoration = document.createElement("span");

        decoration.className = "float-heart";
        decoration.textContent = decorations[i % decorations.length];

        decoration.style.left = `${10 + Math.random() * 80}%`;
        decoration.style.fontSize = `${16 + Math.random() * 18}px`;
        decoration.style.animationDuration = `${5 + Math.random() * 4}s`;

        layer.appendChild(decoration);

        window.setTimeout(() => {
          decoration.remove();
        }, 10000);
      }
    }
  });
}

// =====================================
// JALANKAN SEMUA FITUR
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  setupCounter();
  setupGallery();
  setupSurprise();
  setupFloatingHearts();
  setupEnvelope();
  setupVideoSurprise();

  // Fitur surat "Buka Saat..."
  setupOpenWhenLetters();

  // Navigasi yang sudah dibuat sebelumnya
  setupNavigation();
});

function setupEnvelope() {
  const envelope = document.getElementById("envelope");
  const hint = document.getElementById("envelopeHint");

  if (!envelope || !hint) return;

  let isAnimating = false;

  function toggleLetter() {
    if (isAnimating) return;

    isAnimating = true;

    const shouldOpen = !envelope.classList.contains("opened");

    envelope.classList.toggle("opened", shouldOpen);
    envelope.setAttribute("aria-expanded", String(shouldOpen));

    hint.textContent = shouldOpen
      ? "Klik amplop lagi untuk menutup 💗"
      : "Klik amplop untuk membuka surat 💌";

    window.setTimeout(() => {
      isAnimating = false;
    }, 1100);
  }

  envelope.addEventListener("click", toggleLetter);

  envelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleLetter();
    }
  });
}

/* ==============================
   NAVIGASI ANTARHALAMAN
============================== */

function setupNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (!mainNav) return;

  // Tandai halaman yang sedang dibuka
  const currentPage = document.body.dataset.page;

  mainNav.querySelectorAll("a[data-page]").forEach((link) => {
    if (link.dataset.page === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  if (!menuToggle) return;

  // Buka atau tutup menu di HP
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  // Tutup menu setelah pengguna memilih halaman
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu navigasi");
      menuToggle.textContent = "☰";
    });
  });
}

// Gunakan DOMContentLoaded yang sudah ada jika tersedia.
// Jangan membuat listener kedua jika sudah ada inisialisasi utama.

/* =================================
   FITUR BUKA SAAT - SURAT CINTA
================================= */

function setupOpenWhenLetters() {
  const overlay = document.getElementById("openWhenOverlay");
  const title = document.getElementById("openWhenTitle");
  const message = document.getElementById("openWhenMessage");
  const closeButton = document.getElementById("closeOpenWhen");
  const doneButton = document.getElementById("doneOpenWhen");

  // Halaman lain tidak memiliki fitur ini.
  // Karena itu, fungsi boleh berhenti dengan aman.
  if (!overlay || !title || !message || !closeButton || !doneButton) {
    return;
  }

  const letters = {
    sedih: {
      title: "Untuk kamu yang sedang sedih 🤍",
      paragraphs: [
        "Hai, sayangku. Kalau kamu sedang membaca surat ini, mungkin hari ini terasa lebih berat dari biasanya. Aku ingin kamu tahu bahwa kamu tidak harus selalu terlihat kuat atau berpura-pura baik-baik saja.",
        "Tidak apa-apa kalau kamu merasa lelah. Tidak apa-apa kalau kamu butuh waktu untuk menenangkan diri. Perasaanmu berharga, dan kamu pantas mendapatkan waktu untuk beristirahat.",
        "Aku mungkin tidak selalu bisa langsung berada di sampingmu, tetapi aku ingin menjadi seseorang yang bisa kamu ajak bercerita. Kamu tidak harus menyelesaikan semuanya sekaligus, ya. Pelan-pelan saja.",
        "Terima kasih sudah bertahan dan menjalani hari ini. Jangan lupa menjaga dirimu sendiri, sayang. Kamu sangat berarti. ❤️",
      ],
    },

    rindu: {
      title: "Untuk rindumu kepadaku 💌",
      paragraphs: [
        "Hai, cintaku. Lagi kangen aku, ya? Kalau aku ada di sampingmu sekarang, mungkin kita bisa mengobrol tentang hal-hal kecil, tertawa bersama, atau sekadar menikmati waktu berdua.",
        "Kalau saat ini kita belum bisa bertemu, coba ingat lagi kenangan-kenangan indah yang sudah kita buat. Semua momen itu adalah bagian dari cerita kita yang selalu bisa kita kenang.",
        "Terima kasih karena sudah menjadi bagian dari hidupku. Semoga kita segera punya kesempatan untuk membuat kenangan baru lagi.",
        "Sampai saat itu tiba, jaga dirimu baik-baik, ya. Ada banyak cerita yang masih ingin kita tulis bersama. Aku sayang kamu. ❤️",
      ],
    },

    semangat: {
      title: "Untuk kamu yang butuh semangat ✨",
      paragraphs: [
        "Hai, orang hebatku! Aku cuma ingin mengingatkanmu bahwa kamu sudah berusaha sejauh ini, dan usaha yang kamu lakukan tetap berarti meskipun hasilnya belum selalu sesuai harapan.",
        "Kamu tidak harus menjadi sempurna untuk bisa merasa bangga pada dirimu sendiri. Belajarlah dari kesalahan, istirahatlah saat lelah, dan beri dirimu kesempatan untuk mencoba lagi.",
        "Aku percaya kamu punya kemampuan untuk terus berkembang dan mengejar hal-hal yang kamu impikan. Jangan terlalu keras pada dirimu sendiri, ya. Satu langkah kecil pun tetap sebuah kemajuan.",
        "Aku akan selalu mendukungmu untuk menjadi versi dirimu yang kamu inginkan. Semangat, sayangku! Jangan lupa bahwa kamu juga layak merayakan pencapaian-pencapaian kecilmu. 💗",
      ],
    },

    kenangan: {
      title: "Tentang cerita kita 📸",
      paragraphs: [
        "Hai, sayang. Hari ini, aku ingin mengajakmu mengingat perjalanan kita sejak pertama kali memulai hubungan ini.",
        "Ada banyak hal yang sudah kita lalui: percakapan sederhana, tawa yang muncul tiba-tiba, foto-foto yang menyimpan cerita, dan momen-momen kecil yang mungkin terlihat biasa bagi orang lain, tetapi begitu berarti bagi kita.",
        "Tentu perjalanan kita tidak harus selalu sempurna. Kita masih belajar memahami satu sama lain, menyampaikan perasaan dengan baik, dan bertumbuh sebagai diri kita masing-masing.",
        "Terima kasih sudah menjadi bagian dari satu tahun perjalanan ini. Aku berharap kita bisa terus menciptakan kenangan baru, saling menghargai, dan mendukung impian satu sama lain. Selamat anniversary pertama kita. ❤️",
      ],
    },
  };

  let previousFocus = null;

  function closeLetter() {
    if (overlay.hidden) return;

    overlay.hidden = true;
    document.body.classList.remove("open-when-active");

    if (previousFocus && previousFocus.isConnected) {
      previousFocus.focus();
    }
  }

  document.querySelectorAll(".open-when-card").forEach((card) => {
    card.addEventListener("click", () => {
      const letter = letters[card.dataset.letter];

      if (!letter) return;

      previousFocus = card;
      title.textContent = letter.title;

      // Buat paragraf sebagai elemen teks, bukan HTML mentah.
      message.replaceChildren();

      letter.paragraphs.forEach((paragraphText) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = paragraphText;
        message.appendChild(paragraph);
      });

      overlay.hidden = false;
      document.body.classList.add("open-when-active");
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", closeLetter);
  doneButton.addEventListener("click", closeLetter);

  // Klik area gelap di luar surat untuk menutup.
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      closeLetter();
    }
  });

  // Tombol Escape juga dapat menutup surat.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) {
      closeLetter();
    }
  });
}
