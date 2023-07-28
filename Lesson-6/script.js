function changeText() {
    var headingElement = document.getElementById("mainHeading");
    headingElement.textContent = "DOM Manipulasi Berhasil!";
}


function changeTextColor() {
    var paragraphElement = document.getElementById("paragraph");
    paragraphElement.style.color = "blue";
}

function hideElement() {
    var headingElement = document.getElementById("mainHeading");
    headingElement.style.display = "none";
}

function showElement() {
    var headingElement = document.getElementById("mainHeading");
    headingElement.style.display = "block";
}

function changeDynamicText() {
    var textInput = document.getElementById("textInput");
    var headingElement = document.getElementById("mainHeading");
    headingElement.textContent = textInput.value;
    textInput.value = ""; 
}

function changeTextColorWithAnimation() {
    var paragraphElement = document.getElementById("paragraph");
    paragraphElement.style.animation = "changeTextColorAnimation 6s";
    paragraphElement.addEventListener("animationend", function() {
        paragraphElement.style.animation = "none";
    });
}

var changeTextButton = document.getElementById("changeTextBtn");
changeTextButton.addEventListener("click", changeText);

var changeColorButton = document.getElementById("changeColorBtn");
changeColorButton.addEventListener("click", changeTextColor);

var hideElementButton = document.getElementById("hideElementBtn");
hideElementButton.addEventListener("click", hideElement);

var showElementButton = document.getElementById("showElementBtn");
showElementButton.addEventListener("click", showElement);

var changeDynamicTextButton = document.getElementById("changeTextDynamicBtn");
changeDynamicTextButton.addEventListener("click", changeDynamicText);

var changeColorButton = document.getElementById("changeColorBtn");
changeColorButton.addEventListener("click", changeTextColorWithAnimation);

const colorInput = document.getElementById('color-input');
const rgbValue = document.getElementById('rgb-value');
const lighterValue = document.getElementById('lighter-value');
const darkerValue = document.getElementById('darker-value');
const hueValue = document.getElementById('hue-value');
const saturationValue = document.getElementById('saturation-value');

function getRGBFromHex(hex) {
  const bigint = parseInt(hex.substring(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function getHexFromRGB(rgb) {
  return '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

function getLighterColor(rgb, factor) {
  const hsl = rgbToHSL(rgb[0], rgb[1], rgb[2]);
  const lightness = Math.min(100, hsl[2] + factor * 100);
  return hslToRGB(hsl[0], hsl[1], lightness);
}

function getDarkerColor(rgb, factor) {
  const hsl = rgbToHSL(rgb[0], rgb[1], rgb[2]);
  const lightness = Math.max(0, hsl[2] - factor * 100);
  return hslToRGB(hsl[0], hsl[1], lightness);
}

function rgbToHSL(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRGB(h, s, l) {
  let r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

colorInput.addEventListener('input', function() {
  const selectedColor = this.value;
  const rgb = getRGBFromHex(selectedColor);

  rgbValue.textContent = `(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

  const lighterRGB = getLighterColor(rgb, 0.2);
  const lighterHex = getHexFromRGB(lighterRGB);
  lighterValue.textContent = lighterHex;

  const darkerRGB = getDarkerColor(rgb, 0.2);
  const darkerHex = getHexFromRGB(darkerRGB);
  darkerValue.textContent = darkerHex;

  const hsl = rgbToHSL(rgb[0], rgb[1], rgb[2]);
  const hueValueInDegrees = Math.round(hsl[0] * 360);
  hueValue.textContent = `${hueValueInDegrees}°`;
  const saturationPercentage = Math.round(hsl[1] * 100);
  saturationValue.textContent = `${saturationPercentage}%`;
});

