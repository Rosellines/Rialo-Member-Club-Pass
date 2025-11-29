/* ==========================
   🎨 THEME SETUP
   ========================== */
const themes = [
  {
    id: "classic",
    name: "Classic Beige",
    gradient: "linear-gradient(135deg, #e8e3d5 0%, #7f7f7f 50%, #e8e3d5 100%)",
    accent: "#cfc7b0",
    textColor: "#ffffff",
    logo: "logo.png"
  },
  {
    id: "mint",
    name: "Mint Gradient",
    gradient: "linear-gradient(135deg, #a9ddd3 0%, #00ffa6 50%, #a9bfdd 100%)",
    accent: "#8dcac0",
    textColor: "#ffffff",
    logo: "logo.png"
  },
  {
    id: "gold",
    name: "Premium Gold",
    gradient: "linear-gradient(135deg, #d4af37 0%, #f4e5a1 50%, #d4af37 100%)",
    accent: "#b8941e",
    textColor: "#ffffff",
    logo: "logo.png"
  },
  {
    id: "forest",
    name: "Forest Green",
    gradient: "linear-gradient(135deg, #10b981 0%, #c1ffb6 50%, #10b981 100%)",
    accent: "#059669",
    textColor: "#ffffff",
    logo: "logo.png"
  },
  {
    id: "carbon",
    name: "Carbon Black",
    gradient: "linear-gradient(135deg, #1f2937 0%, #4b5563 50%, #1f2937 100%)",
    accent: "#111827",
    textColor: "#ecb605ff",
    logo: "logo1.png"
  },
   {
    id: "halloween",
    name: "Haunted Night",
    gradient: "linear-gradient(135deg, #ff6b00 0%, #f5a300ff 40%, #ff6b00 100%)",
    accent: "#ff6b00",
    textColor: "#ffffffff",
    logo: "logo.png"
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    gradient: "linear-gradient(135deg, #0077be 0%, #00a8cc 50%, #0077be 100%)",
    accent: "#005f8a",
    textColor: "#ffffff",
    logo: "logo.png"
  },
  {
    id: "sunset",
    name: "Sunset Orange",
    gradient: "linear-gradient(135deg, #ff4500 0%, #ffa500 50%, #ff4500 100%)",
    accent: "#cc3300",
    textColor: "#ffffff",
    logo: "logo.png"
  },
  {
    id: "lavender",
    name: "Lavender Purple",
    gradient: "linear-gradient(135deg, #b19cd9 0%, #dda0dd 50%, #b19cd9 100%)",
    accent: "#9370db",
    textColor: "#ffffff",
    logo: "logo.png"
  },
  {
    id: "crimson",
    name: "Crimson Red",
    gradient: "linear-gradient(135deg, #dc143c 0%, #ff6347 50%, #dc143c 100%)",
    accent: "#b22222",
    textColor: "#ffffff",
    logo: "logo.png"
  }
];

/* ==========================
   ⚙️ ELEMENT REFERENCE
   ========================== */
const card = document.getElementById("card");
const memberNameInput = document.getElementById("member-name");
const centerName = document.getElementById("center-name");
const memberIdInput = document.getElementById("member-id");
const memberIdDisplay = document.getElementById("member-id-display");
const joinDateInput = document.getElementById("join-date");
const joinDateDisplay = document.getElementById("join-date-display");
const upload = document.getElementById("upload");
const photo = document.getElementById("photo");
const uploadSuccess = document.getElementById("upload-success");
const themesContainer = document.getElementById("themes");
const downloadBtn = document.getElementById("download");
const fontStyleSelect = document.getElementById("font-style");
const gradientStart = document.getElementById("gradient-start");
const gradientEnd = document.getElementById("gradient-end");
const backgroundUpload = document.getElementById("background-upload");
const backgroundUploadSuccess = document.getElementById("background-upload-success");
const backBackgroundUpload = document.getElementById("back-background-upload");
const backBackgroundUploadSuccess = document.getElementById("back-background-upload-success");
const nameColor = document.getElementById("name-color");
const subtextColor = document.getElementById("subtext-color");
const idColor = document.getElementById("id-color");
const dateColor = document.getElementById("date-color");


/* Depth & Edge Layers */
const depthLayer = document.createElement("div");
depthLayer.classList.add("depth-layer");
card.querySelector(".card-body").appendChild(depthLayer);

const edgeLayer = document.createElement("div");
edgeLayer.classList.add("edge-layer");
card.querySelector(".card-body").appendChild(edgeLayer);

let selectedTheme = themes[0];
let customBackground = null;
let customBackBackground = null;

// Helper function to convert hex to rgba
function hexToRgba(hex, alpha) {
  try {
    // normalize hex (support #RRGGBB, #RRGGBBAA, #RGB, #RGBA)
    const normalized = normalizeHex(hex);
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch (e) {
    // fallback to whiteish
    return `rgba(255,255,255,${alpha})`;
  }
}

// Normalize hex color to 6-digit hex string without '#'
function normalizeHex(input) {
  if (!input || typeof input !== "string") throw new Error("Invalid color");
  let hex = input.trim().replace("#", "");
  // If 8-digit (RRGGBBAA), drop alpha for calculations
  if (hex.length === 8) hex = hex.slice(0, 6);
  // If 4-digit (#RGBA) -> expand to 8-digit then drop alpha
  if (hex.length === 4) {
    hex = hex.split("").slice(0, 3).map(ch => ch + ch).join("");
  }
  // If 3-digit -> expand
  if (hex.length === 3) {
    hex = hex.split("").map(ch => ch + ch).join("");
  }
  // if now not 6 -> throw
  if (hex.length !== 6) throw new Error("Unsupported color format");
  return hex.toLowerCase();
}

/* ==========================
   🎨 THEME BUTTONS
   ========================== */
themes.forEach(theme => {
  const btn = document.createElement("button");
  btn.classList.add("theme-btn");
  btn.style.background = theme.gradient;
  btn.onclick = () => selectTheme(theme, btn);
  themesContainer.appendChild(btn);
});
if (themesContainer.children[0]) themesContainer.children[0].classList.add("active");

function selectTheme(theme, btn) {
  selectedTheme = theme;
  document.querySelectorAll(".theme-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  updateCardTheme();
  document.body.style.background = selectedTheme.accent;
}

/* ==========================
   🎨 UPDATE CARD THEME
   ========================== */
function updateCardTheme() {
  const body = card.querySelector(".card-body");
  const backBody = card.querySelector(".card-body.back");
  const nameText = card.querySelector(".member-info h2");
  const subText = card.querySelector(".member-subtext");
  const clubPassText = card.querySelector(".club-pass");
  const rialoText = card.querySelector(".rialo");
  const logoImg = card.querySelector(".logo img");
  const backLogoImg = card.querySelector(".back-logo img");

  if (customBackground) {
    body.style.backgroundImage = `url(${customBackground})`;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
  } else {
    body.style.background = selectedTheme.gradient;
  }

  if (backBody) {
    if (customBackBackground) {
      backBody.style.backgroundImage = `url(${customBackBackground})`;
      backBody.style.backgroundSize = "cover";
      backBody.style.backgroundPosition = "center";
      backBody.style.backgroundRepeat = "no-repeat";
    } else {
      backBody.style.background = selectedTheme.gradient;
    }
  }

  // Hide back logo and text when custom back background is set
  const backLogo = card.querySelector('.back-logo');
  const backText = card.querySelector('.back-text');
  if (customBackBackground) {
    if (backLogo) backLogo.style.display = 'none';
    if (backText) backText.style.display = 'none';
  } else {
    if (backLogo) backLogo.style.display = '';
    if (backText) backText.style.display = '';
  }

  // fade swap logos
  logoImg.style.opacity = 0;
  backLogoImg.style.opacity = 0;
  setTimeout(() => {
    logoImg.src = selectedTheme.logo;
    backLogoImg.src = selectedTheme.logo;
    logoImg.onload = () => (logoImg.style.opacity = 1);
    backLogoImg.onload = () => (backLogoImg.style.opacity = 1);
  }, 150);

  const color = selectedTheme.textColor;
  [nameText, subText, clubPassText, rialoText].forEach(el => {
    if (el) el.style.color = color;
  });

  // Update box shadow to follow theme accent color
  const accentRgba = hexToRgba(selectedTheme.accent, 0.3);
  body.style.boxShadow = `0 0 10px ${accentRgba}`;

  // Calculate brightness safely
  try {
    const hex = normalizeHex(color);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const textShadow =
      brightness > 128
        ? "0 1.5px 0px rgba(0,0,0,0.45)"
        : "0 1.5px 0px rgba(255,255,255,0.25)";
    [nameText, subText, clubPassText, rialoText].forEach(el => {
      if (el) el.style.textShadow = textShadow;
    });
  } catch (e) {
    // ignore if color parse failed
  }

  /* 🎃 FIX FINAL */
  if (selectedTheme.id === "halloween") {
    if (!customBackground) {
      body.classList.add("haunted-only");
      body.style.removeProperty("background");
    } else {
      body.classList.remove("haunted-only");
    }
    if (backBody) {
      if (!customBackBackground) {
        backBody.classList.add("haunted-only");
        backBody.style.removeProperty("background");
      } else {
        backBody.classList.remove("haunted-only");
      }
    }
  } else {
    body.classList.remove("haunted-only");
    if (backBody) backBody.classList.remove("haunted-only");
    if (!customBackground) {
      body.style.background = selectedTheme.gradient;
    }
    if (backBody && !customBackBackground) {
      backBody.style.background = selectedTheme.gradient;
    }
  }
  /* 🎃 Dekorasi Halloween hanya muncul di tema Haunted Night */
  const existingDecor = document.querySelector(".halloween-decor");
  if (selectedTheme.id === "halloween") {
    if (!existingDecor) {
      const decor = document.createElement("div");
      decor.className = "halloween-decor";
      decor.innerHTML = `
        <img src="moon.png" class="moon" alt="Moon">
        <img src="bat.png" class="bat bat1" alt="Bat">
        <img src="bat.png" class="bat bat2" alt="Bat">
        <img src="pumpkin.png" class="pumpkin" alt="Pumpkin">
      `;
      body.appendChild(decor);
    }
  } else {
    if (existingDecor) existingDecor.remove();
  }
}

updateCardTheme();

/* ==========================
   🧭 3D DEPTH — FISIK (FIXED)
   ========================== */
const bodyLayer = card.querySelector(".card-body");

card.addEventListener("mousemove", e => {
  if (card.classList.contains("flipped")) return; // ❗ skip kalau lagi flip

  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -3;
  const rotateY = ((x - centerX) / centerX) * 3;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  const depth = ((y - centerY) / centerY) * 4.5;
  if (bodyLayer) bodyLayer.style.transform = `translateZ(${Math.abs(depth)}px)`;
  depthLayer.style.transform = `translateZ(${Math.abs(depth) * 1.4}px)`;
  edgeLayer.style.transform = `translateZ(5px) rotateX(${rotateX / 4}deg) rotateY(${rotateY / 4}deg)`;

  const lightX = (x / rect.width) * 100;
  const lightY = (y / rect.height) * 100;
  depthLayer.style.background = `
    radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.05), transparent)
  `;

  const glare = card.querySelector('.glare');
  if (glare) {
    glare.style.background = `
      radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.45), rgba(255,255,255,0.05) 60%, transparent 100%)
    `;
    glare.style.mixBlendMode = "screen";
    glare.style.opacity = 0.0;
  }
});

card.addEventListener("mouseenter", () => {
  if (card.classList.contains("flipped")) return; // ❗ skip kalau lagi flip
  card.style.transition = "transform 0.15s ease-out";
  if (bodyLayer) bodyLayer.style.transition = "transform 0.2s ease";
  depthLayer.style.opacity = 1;
  edgeLayer.style.opacity = 1;
});

card.addEventListener("mouseleave", () => {
  if (card.classList.contains("flipped")) return; // ❗ skip kalau lagi flip
  card.style.transition = "transform 0.5s ease";
  card.style.transform = "rotateX(0deg) rotateY(0deg)";
  if (bodyLayer) bodyLayer.style.transform = "translateZ(0px)";
  depthLayer.style.opacity = 0;
  edgeLayer.style.opacity = 0;
});


/* ==========================
   📸 UPLOAD IMAGE
   ========================== */
upload.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    photo.src = reader.result;
    uploadSuccess.textContent = "✓ Photo uploaded successfully";
    uploadSuccess.style.color = "#34d399";
  };
  reader.readAsDataURL(file);
});

/* ==========================
   🖼️ UPLOAD BACKGROUND IMAGE
   ========================== */
backgroundUpload.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    customBackground = reader.result;
    backgroundUploadSuccess.textContent = "✓ Background uploaded successfully";
    backgroundUploadSuccess.style.color = "#34d399";
    updateCardTheme();
  };
  reader.readAsDataURL(file);
});

/* ==========================
   🖼️ UPLOAD BACK BACKGROUND IMAGE
   ========================== */
backBackgroundUpload.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    customBackBackground = reader.result;
    backBackgroundUploadSuccess.textContent = "✓ Back background uploaded successfully";
    backBackgroundUploadSuccess.style.color = "#34d399";
    updateCardTheme();
  };
  reader.readAsDataURL(file);
});

/* ==========================
   🪪 UPDATE NAME
   ========================== */
memberNameInput.addEventListener("input", e => {
  const value = e.target.value.toUpperCase() || "YOUR NAME";
  centerName.textContent = value;
});

/* ==========================
   🆔 UPDATE MEMBER ID
   ========================== */
memberIdInput.addEventListener("input", e => {
  const value = e.target.value || "00123";
  memberIdDisplay.textContent = `Member ID: ${value}`;
});

/* ==========================
   📅 UPDATE JOIN DATE
   ========================== */
joinDateInput.addEventListener("input", e => {
  const value = e.target.value;
  if (value) {
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isExpired = selectedDate < today;

    // Format date to dd/MMM/yy
    const day = selectedDate.getDate().toString().padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[selectedDate.getMonth()];
    const year = selectedDate.getFullYear().toString().slice(-2);
    const formattedDate = `${day}/${month}/${year}`;

    joinDateDisplay.textContent = `Date Join: ${formattedDate}`;
    joinDateDisplay.style.color = isExpired ? "#ff6b6b" : ""; // Red if expired, else default
  } else {
    joinDateDisplay.textContent = "Date Join: --";
    joinDateDisplay.style.color = "";
  }
});



/* ==========================
   💾 DOWNLOAD PNG (FINAL ORIENT FIX)
   ========================== */
downloadBtn.addEventListener("click", () => {
  const name = centerName.textContent.toLowerCase().replace(/\s/g, "-") || "member-card";
  const isFlipped = card.classList.contains("flipped");

  // Tambahkan class no-3d agar htmlToImage menangkap tampilan datar, tidak mirror
  document.documentElement.classList.add("no-3d");

  // Pastikan hanya sisi yang aktif terlihat
  const front = card.querySelector(".card-body.front");
  const back = card.querySelector(".card-body.back");
  front.style.display = isFlipped ? "none" : "block";
  back.style.display = isFlipped ? "block" : "none";

  // Tunggu semua gambar selesai load
  const images = card.querySelectorAll("img");
  const loadPromises = Array.from(images).map(img =>
    img.complete ? Promise.resolve() : new Promise(res => {
      img.onload = res;
      img.onerror = res;
    })
  );

  Promise.all(loadPromises)
    .then(() => htmlToImage.toPng(card, { quality: 1, pixelRatio: 4, backgroundColor: "transparent" }))
    .then(dataUrl => {
      const link = document.createElement("a");
      link.download = `member-card-${name}.png`;
      link.href = dataUrl;
      link.click();
    })
    .finally(() => {
      // Kembalikan semua ke semula
      document.documentElement.classList.remove("no-3d");
      front.style.display = "";
      back.style.display = "";
    });
});




/* ==========================
   🆕 FONT STYLE HANDLER (FIX)
   ========================== */
fontStyleSelect.addEventListener("change", e => {
  const selectedFont = e.target.value;
  centerName.style.fontFamily = selectedFont;
});

/* ==========================
   🎨 CUSTOM GRADIENT HANDLER
   ========================== */
gradientStart.addEventListener("input", updateCustomGradient);
gradientEnd.addEventListener("input", updateCustomGradient);

function updateCustomGradient() {
  const startColor = gradientStart.value;
  const endColor = gradientEnd.value;
  const customGradient = `linear-gradient(135deg, ${startColor} 0%, ${endColor} 50%, ${startColor} 100%)`;
  const firstBody = card.querySelector(".card-body");
  if (firstBody) firstBody.style.background = customGradient;
  document.body.style.background = startColor; // Use start color for body background
}

/* ==========================
   🎨 CUSTOM TEXT COLORS
   ========================== */
nameColor.addEventListener("input", () => {
  centerName.style.color = nameColor.value;
});

subtextColor.addEventListener("input", () => {
  const subText = card.querySelector(".member-subtext");
  if (subText) subText.style.color = subtextColor.value;
});

idColor.addEventListener("input", () => {
  memberIdDisplay.style.color = idColor.value;
});

dateColor.addEventListener("input", () => {
  joinDateDisplay.style.color = dateColor.value;
});

/* ==========================
   🌀 FLIP CARD (STABLE & FAST) — FIX INLINE TRANSFORM
   ========================== */
document.addEventListener("DOMContentLoaded", () => {
  const flipCardBtn = document.getElementById("flip-card");
  const card = document.getElementById("card");
  if (!flipCardBtn || !card) return;

  flipCardBtn.addEventListener("click", () => {
    // clear any hover inline transforms that override .flipped
    card.style.transform = "none";
    if (typeof bodyLayer !== "undefined" && bodyLayer) bodyLayer.style.transform = "translateZ(0px)";
    if (typeof depthLayer !== "undefined" && depthLayer) depthLayer.style.opacity = 0;
    if (typeof edgeLayer !== "undefined" && edgeLayer) edgeLayer.style.opacity = 0;

    // force reflow so the browser applies the inline reset before toggling class
    // (reads layout property to flush changes)
    void card.offsetWidth;

    // toggle flipped class (CSS .card.flipped will now take effect)
    card.classList.toggle("flipped");

    // ensure a smooth transform duration
    card.style.transition = "transform 0.35s cubic-bezier(0.4, 0.1, 0.2, 1)";

    // temporarily disable pointer events to avoid hover racing
    card.style.pointerEvents = "none";
    setTimeout(() => {
      card.style.pointerEvents = "auto";
      // optional: after flip completes, clear inline transform so future CSS takes precedence cleanly
      card.style.transform = "";
    }, 380); // slightly longer than transition
  });
});

