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

/* Depth & Edge Layers */
const depthLayer = document.createElement("div");
depthLayer.classList.add("depth-layer");
card.querySelector(".card-body").appendChild(depthLayer);

const edgeLayer = document.createElement("div");
edgeLayer.classList.add("edge-layer");
card.querySelector(".card-body").appendChild(edgeLayer);

let selectedTheme = themes[0];
let customBackground = null;

/* ==========================
   🎨 THEME BUTTONS
   ========================== */
themes.forEach(theme => {
  const btn = document.createElement("button");
  btn.classList.add("theme-btn");
  btn.style.background = theme.gradient;
  btn.textContent = theme.name;
  btn.onclick = () => selectTheme(theme, btn);
  themesContainer.appendChild(btn);
});
themesContainer.children[0].classList.add("active");

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
  const nameText = card.querySelector(".member-info h2");
  const subText = card.querySelector(".member-subtext");
  const clubPassText = card.querySelector(".club-pass");
  const rialoText = card.querySelector(".rialo");
  const logoImg = card.querySelector(".logo img");

  if (customBackground) {
    body.style.backgroundImage = `url(${customBackground})`;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
  } else {
    body.style.background = selectedTheme.gradient;
  }

  logoImg.style.opacity = 0;
  setTimeout(() => {
    logoImg.src = selectedTheme.logo;
    logoImg.onload = () => (logoImg.style.opacity = 1);
  }, 150);

  const color = selectedTheme.textColor;
  [nameText, subText, clubPassText, rialoText].forEach(el => {
    el.style.color = color;
  });

  const rgb = color.replace("#", "");
  const r = parseInt(rgb.substring(0, 2), 16);
  const g = parseInt(rgb.substring(2, 4), 16);
  const b = parseInt(rgb.substring(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const textShadow =
    brightness > 128
      ? "0 1.5px 0px rgba(0,0,0,0.45)"
      : "0 1.5px 0px rgba(255,255,255,0.25)";
     [nameText, subText, clubPassText, rialoText].forEach(el => {
    el.style.textShadow = textShadow;
  });

  /* 🎃 FIX FINAL */
  if (selectedTheme.id === "halloween" && !customBackground) {
    body.classList.add("haunted-only");
    body.style.removeProperty("background");
  } else {
    body.classList.remove("haunted-only");
    if (!customBackground) {
      body.style.background = selectedTheme.gradient;
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
   🧭 3D DEPTH — FISIK
   ========================== */
const bodyLayer = card.querySelector(".card-body");

card.addEventListener("mousemove", e => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * -12;
  const rotateY = ((x - centerX) / centerX) * 12;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  // Ketebalan fisik (translateZ)
  const depth = ((y - centerY) / centerY) * 18;
  bodyLayer.style.transform = `translateZ(${Math.abs(depth)}px)`;
  depthLayer.style.transform = `translateZ(${Math.abs(depth) * 1.4}px)`;
  edgeLayer.style.transform = `translateZ(20px) rotateX(${rotateX / 4}deg) rotateY(${rotateY / 4}deg)`;

 // Efek highlight cahaya mengikuti posisi
const lightX = (x / rect.width) * 100;
const lightY = (y / rect.height) * 100;
depthLayer.style.background = `
  radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255, 255, 255, 0.05), transparent)
`;

  // Efek glass glare (pantulan kaca)
  const glare = card.querySelector('.glare');
  glare.style.background = `
    radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.45), rgba(255,255,255,0.05) 60%, transparent 100%)
  `;
  glare.style.mixBlendMode = "screen";
  glare.style.opacity = 0.7;
});

card.addEventListener("mouseenter", () => {
  card.style.transition = "transform 0.15s ease-out";
  bodyLayer.style.transition = "transform 0.2s ease";
  depthLayer.style.opacity = 1;
  edgeLayer.style.opacity = 1;
});

card.addEventListener("mouseleave", () => {
  card.style.transition = "transform 0.5s ease";
  card.style.transform = "rotateX(0deg) rotateY(0deg)";
  bodyLayer.style.transform = "translateZ(0px)";
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
   🪪 UPDATE NAME
   ========================== */
memberNameInput.addEventListener("input", e => {
  const value = e.target.value.toUpperCase() || "YOUR NAME";
  centerName.textContent = value;
});

/* ==========================
   💾 DOWNLOAD PNG
   ========================== */
downloadBtn.addEventListener("click", () => {
  const name = centerName.textContent.toLowerCase().replace(/\s/g, "-");
  // Temporarily reset transforms to avoid cropping
  const originalTransform = card.style.transform;
  const originalBodyTransform = card.querySelector('.card-body').style.transform;
  const originalDepthTransform = depthLayer.style.transform;
  const originalEdgeTransform = edgeLayer.style.transform;
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  card.querySelector('.card-body').style.transform = 'translateZ(0px)';
  depthLayer.style.transform = 'translateZ(0px)';
  edgeLayer.style.transform = 'translateZ(-12px) rotateX(0deg) rotateY(0deg)';
  // Wait for any images to load
  const images = card.querySelectorAll('img');
  const promises = Array.from(images).map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve; // resolve even on error to not block
    });
  });
  Promise.all(promises).then(() => {
    htmlToImage.toPng(card, { quality: 1, pixelRatio: 2, backgroundColor: "transparent", width: card.offsetWidth, height: card.offsetHeight })
      .then(dataUrl => {
        const link = document.createElement("a");
        link.download = `member-card-${name}.png`;
        link.href = dataUrl;
        link.click();
        // Restore transforms
        card.style.transform = originalTransform;
        card.querySelector('.card-body').style.transform = originalBodyTransform;
        depthLayer.style.transform = originalDepthTransform;
        edgeLayer.style.transform = originalEdgeTransform;
      })
      .catch(err => {
        console.error("Error generating PNG:", err);
        // Restore transforms even on error
        card.style.transform = originalTransform;
        card.querySelector('.card-body').style.transform = originalBodyTransform;
        depthLayer.style.transform = originalDepthTransform;
        edgeLayer.style.transform = originalEdgeTransform;
      });
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
  card.querySelector(".card-body").style.background = customGradient;
  document.body.style.background = startColor; // Use start color for body background
}
