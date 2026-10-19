const API_KEY = "bd5e378503939ddaee76f12ad7a97608";

let currentUnit = 'metric';
let currentLang = 'tr';
let currentLat = null;
let currentLon = null;
let currentCityName = 'Istanbul';

// 10 Dil Çeviri ve Sayfa Başlıkları
const i18n = {
  tr: {
    pageTitle: "Hava Durumu",
    placeholder: "İl veya ilçe ara...",
    humidity: "Nem",
    wind: "Rüzgar",
    feelsLike: "Hissedilen",
    rainChance: "Yağış İhtimali",
    forecastTitle: "5 Günlük Tahmin",
    copyright: "© 2026 Hava Durumu. Tüm hakları saklıdır.",
    adviceRain: "Yağışlı hava var, dışarı çıkarken mutlaka şemsiyeni ve montunu al.",
    adviceSnow: "Lapa lapa kar yağıyor! Bere ve eldivenlerini giymeyi unutma.",
    adviceCold: "Hava oldukça soğuk, kalın montunu giyip sıkı giyinmelisin.",
    adviceCool: "Hava serin, üzerine şık bir ceket veya hırka almanı öneririz.",
    adviceMild: "Hava ılık ve harika. Tişört üzerine hafif bir gömlek giyebilirsin.",
    adviceHot: "Sıcak ve güneşli bir gün! Güneş gözlüğünü takmayı unutma.",
    adviceDefault: "Günün temposuna uygun rahat kıyafetler seçebilirsin.",
    adviceWind: " Rüzgar da sert esiyor, rüzgarlık iyi olur."
  },
  en: {
    pageTitle: "Weather App",
    placeholder: "Search city or district...",
    humidity: "Humidity",
    wind: "Wind",
    feelsLike: "Feels Like",
    rainChance: "Rain Chance",
    forecastTitle: "5-Day Forecast",
    copyright: "© 2026 Weather App. All rights reserved.",
    adviceRain: "It's rainy outside, make sure to take your umbrella and jacket.",
    adviceSnow: "Snow is falling! Don't forget your beanie and gloves.",
    adviceCold: "It's quite cold, wear a thick coat and bundle up.",
    adviceCool: "It's cool, wearing a nice jacket or cardigan is recommended.",
    adviceMild: "Pleasant and mild weather. A light shirt over a t-shirt works great.",
    adviceHot: "Hot and sunny day! Don't forget your sunglasses.",
    adviceDefault: "Choose comfortable clothes suitable for your day.",
    adviceWind: " Strong winds ahead, a windbreaker would be good."
  },
  es: {
    pageTitle: "Clima",
    placeholder: "Buscar ciudad o distrito...",
    humidity: "Humedad",
    wind: "Viento",
    feelsLike: "Sensación",
    rainChance: "Lluvia",
    forecastTitle: "Pronóstico de 5 días",
    copyright: "© 2026 Clima. Todos los derechos reservados.",
    adviceRain: "Está lloviendo, asegúrate de llevar paraguas y chaqueta.",
    adviceSnow: "¡Está nevando! No olvides tu gorro y guantes.",
    adviceCold: "Hace bastante frío, ponte un abrigo grueso.",
    adviceCool: "Hace fresco, se recomienda una chaqueta o chaqueta de punto.",
    adviceMild: "Clima agradable y templado. Una camisa ligera quedará bien.",
    adviceHot: "¡Día caluroso y soleado! No olvides tus gafas de sol.",
    adviceDefault: "Elige ropa cómoda adecuada para tu día.",
    adviceWind: " Hay vientos fuertes, un cortavientos sería buena idea."
  },
  zh: {
    pageTitle: "天气预报",
    placeholder: "搜索城市或区...",
    humidity: "湿度",
    wind: "风速",
    feelsLike: "体感",
    rainChance: "降雨概率",
    forecastTitle: "5天预报",
    copyright: "© 2026 天气预报。保留所有权利。",
    adviceRain: "下雨了，出门请带伞并穿上外套。",
    adviceSnow: "下雪了！别忘了带帽子和手套。",
    adviceCold: "天气很冷，请穿上厚外套保暖。",
    adviceCool: "天气微凉，建议穿一件舒适的外套。",
    adviceMild: "气候宜人，T恤外面配件薄衬衫非常合适。",
    adviceHot: "天气炎热晴朗！别忘了戴上太阳镜。",
    adviceDefault: "选择适合您日常活动的舒适衣服。",
    adviceWind: " 风很大，建议穿风衣。"
  },
  hi: {
    pageTitle: "मौसम ऐप",
    placeholder: "शहर या जिला खोजें...",
    humidity: "नमी",
    wind: "हवा",
    feelsLike: "महसूस",
    rainChance: "बारिश की संभावना",
    forecastTitle: "5 दिनों का पूर्वाभ्यास",
    copyright: "© 2026 मौसम ऐप। सर्वाधिकार सुरक्षित।",
    adviceRain: "बारिश हो रही है, छाता और जैकेट साथ रखें।",
    adviceSnow: "बर्फबारी हो रही है! टोपी और दस्ताने पहनना न भूलें।",
    adviceCold: "काफी ठंड है, मोटा कोट पहनें।",
    adviceCool: "मौसम ठंडा है, जैकेट पहनने की सलाह दी जाती है।",
    adviceMild: "सुहावना मौसम। एक हल्की शर्ट बढ़िया रहेगी।",
    adviceHot: "गर्म और धूप वाला दिन! धूप का चश्मा न भूलें।",
    adviceDefault: "दिन के अनुसार आरामदायक कपड़े चुनें।",
    adviceWind: " तेज हवाएं चल रही हैं, विंडब्रेकर अच्छा रहेगा।"
  },
  ar: {
    pageTitle: "حالة الطقس",
    placeholder: "ابحث عن مدينة أو حي...",
    humidity: "الرطوبة",
    wind: "الرياح",
    feelsLike: "المحسوسة",
    rainChance: "فرصة المطر",
    forecastTitle: "توقعات 5 أيام",
    copyright: "© 2026 حالة الطقس. جميع الحقوق محفوظة.",
    adviceRain: "الطقس ممطر، احرص على أخذ مظلتك وسترتك.",
    adviceSnow: "إنها تثلج! لا تنس قبعتك وقفاذاتك.",
    adviceCold: "الطقس بارد جداً، ارتدِ معطفاً ثقيلاً.",
    adviceCool: "الطقس معتدل البرودة، يفضل ارتداء سترة خفيفة.",
    adviceMild: "طقس لطيف ومعتدل. قميص خفيف مناسب جداً.",
    adviceHot: "يوم حار ومشمس! لا تنس نظاراتك الشمسية.",
    adviceDefault: "اختر ملابس مريحة تناسب يومك.",
    adviceWind: " الرياح قوية، يفضل ارتداء سترة واقية من الرياح."
  },
  fr: {
    pageTitle: "Météo",
    placeholder: "Rechercher une ville...",
    humidity: "Humidité",
    wind: "Vent",
    feelsLike: "Ressenti",
    rainChance: "Pluie",
    forecastTitle: "Prévisions 5 jours",
    copyright: "© 2026 Météo. Tous droits réservés.",
    adviceRain: "Il pleut, n'oubliez pas votre parapluie et votre veste.",
    adviceSnow: "Il neige ! N'oubliez pas votre bonnet et vos gants.",
    adviceCold: "Il fait assez froid, mettez un manteau chaud.",
    adviceCool: "Il fait frais, une veste ou un cardigan est recommandé.",
    adviceMild: "Météo douce et agréable. Une chemise légère ira très bien.",
    adviceHot: "Journée chaude et ensoleillée ! N'oubliez pas vos lunettes de soleil.",
    adviceDefault: "Choisissez des vêtements confortables adaptés à votre journée.",
    adviceWind: " Des vents forts sont prévus, un coupe-vent serait idéal."
  },
  ru: {
    pageTitle: "Погода",
    placeholder: "Поиск города или района...",
    humidity: "Влажность",
    wind: "Ветер",
    feelsLike: "Ощущается",
    rainChance: "Вероятность осадков",
    forecastTitle: "Прогноз на 5 дней",
    copyright: "© 2026 Погода. Все права защищены.",
    adviceRain: "Идет дождь, обязательно возьмите зонт и куртку.",
    adviceSnow: "Идет снег! Не забудьте шапку и перчатки.",
    adviceCold: "Довольно холодно, надевайте теплое пальто.",
    adviceCool: "Прохладно, рекомендуется надеть легкую куртку.",
    adviceMild: "Приятная и мягкая погода. Легкая рубашка отлично подойдет.",
    adviceHot: "Жаркий и солнечный день! Не забудьте солнцезащитные очки.",
    adviceDefault: "Выбирайте комфортную одежду по погоде.",
    adviceWind: " Ожидается сильный ветер, ветровка будет кстати."
  },
  pt: {
    pageTitle: "Previsão do Tempo",
    placeholder: "Buscar cidade ou distrito...",
    humidity: "Umidade",
    wind: "Vento",
    feelsLike: "Sensação",
    rainChance: "Chuva",
    forecastTitle: "Previsão de 5 dias",
    copyright: "© 2026 Previsão do Tempo. Todos os direitos reservados.",
    adviceRain: "Está chovendo, leve seu guarda-chuva e casaco.",
    adviceSnow: "Está nevando! Não se esqueça do gorro e luvas.",
    adviceCold: "Está bem frio, vista um casaco pesado.",
    adviceCool: "Clima fresco, recomenda-se uma jaqueta leve.",
    adviceMild: "Clima agradável. Uma camisa leve cai muito bem.",
    adviceHot: "Dia quente e ensolarado! Não se esqueça dos óculos de sol.",
    adviceDefault: "Escolha roupas confortáveis adequadas para o seu dia.",
    adviceWind: " Ventos fortes, um corta-vento seria uma boa opção."
  },
  de: {
    pageTitle: "Wetter",
    placeholder: "Stadt oder Bezirk suchen...",
    humidity: "Feuchtigkeit",
    wind: "Wind",
    feelsLike: "Gefühlt",
    rainChance: "Regen",
    forecastTitle: "5-Tage-Vorhersage",
    copyright: "© 2026 Wetter. Alle Rechte vorbehalten.",
    adviceRain: "Es regnet, denk an deinen Regenschirm und deine Jacke.",
    adviceSnow: "Es schneit! Mütze und Handschuhe nicht vergessen.",
    adviceCold: "Es ist ziemlich kalt, zieh einen dicken Mantel an.",
    adviceCool: "Es ist kühl, eine leichte Jacke wird empfohlen.",
    adviceMild: "Angenehmes Wetter. Ein leichtes Hemd passt perfekt.",
    adviceHot: "Heißer und sonniger Tag! Sonnenbrille nicht vergessen.",
    adviceDefault: "Wähle bequeme Kleidung für deinen Tag.",
    adviceWind: " Es weht starker Wind, eine Windjacke wäre gut."
  }
};

const canvas = document.getElementById('weather-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let currentEffect = 'night';
let particles = [];
let currentMoonPhase = 0.25;

class RainDrop {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.length = Math.random() * 20 + 10;
    this.speed = Math.random() * 10 + 15;
    this.opacity = Math.random() * 0.4 + 0.2;
  }
  update() {
    this.y += this.speed;
    if (this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = 1.5;
    ctx.lineCap = 'round';
    ctx.stroke();
  }
}

class SnowFlake {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.radius = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.wind = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.6 + 0.3;
  }
  update() {
    this.y += this.speed;
    this.x += this.wind;
    if (this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }
}

class TwinkleStar {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 1.5 + 0.6;
    this.alpha = Math.random() * 0.5 + 0.2;
    this.speed = Math.random() * 0.015 + 0.005;
  }
  update() {
    this.alpha += this.speed;
    if (this.alpha > 0.8 || this.alpha < 0.1) this.speed = -this.speed;
  }
  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(this.alpha)})`;
    ctx.shadowBlur = 4;
    ctx.shadowColor = "rgba(255, 255, 255, 0.4)";
    ctx.fill();
    ctx.restore();
  }
}

class ShootingStar {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width + 200;
    this.y = Math.random() * (canvas.height * 0.4);
    this.length = Math.random() * 100 + 60;
    this.speed = Math.random() * 8 + 5;
    this.active = false;
    this.timer = setTimeout(() => { this.active = true; }, Math.random() * 6000 + 3000);
  }
  update() {
    if (!this.active) return;
    this.x -= this.speed;
    this.y += this.speed * 0.5;

    if (this.x < -100 || this.y > canvas.height) {
      clearTimeout(this.timer);
      this.reset();
    }
  }
  draw() {
    if (!this.active) return;
    ctx.save();
    ctx.beginPath();
    const grad = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y - (this.length * 0.4));
    grad.addColorStop(0, `rgba(255, 255, 255, 0.8)`);
    grad.addColorStop(1, `rgba(255, 255, 255, 0)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.8;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.length, this.y - (this.length * 0.4));
    ctx.stroke();
    ctx.restore();
  }
}

let shootingStar = new ShootingStar();

function calculateMoonPhase(date = new Date()) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 3) { year--; month += 12; }
  ++month;
  let c = 365.25 * year;
  let e = 30.6 * month;
  let jd = c + e + day - 694039.09;
  jd /= 29.5305882;
  return jd - Math.floor(jd);
}

function drawMoon() {
  const moonX = canvas.width * 0.83;
  const moonY = canvas.height * 0.20;
  const radius = 32;

  ctx.save();
  const haloGrad = ctx.createRadialGradient(moonX, moonY, radius * 0.3, moonX, moonY, radius * 2.5);
  haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
  haloGrad.addColorStop(0.5, 'rgba(200, 225, 255, 0.08)');
  haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(moonX, moonY, radius * 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.translate(moonX, moonY);
  ctx.rotate(-Math.PI / 12);
  ctx.beginPath();
  ctx.arc(0, 0, radius, -Math.PI / 2, Math.PI / 2, false);

  let curveOffset = Math.cos(currentMoonPhase * 2 * Math.PI) * radius;
  ctx.bezierCurveTo(curveOffset * 0.85, radius * 0.5, curveOffset * 0.85, -radius * 0.5, 0, -radius);

  ctx.fillStyle = '#f6f8f0';
  ctx.shadowBlur = 12;
  ctx.shadowColor = 'rgba(255, 255, 255, 0.7)';
  ctx.fill();
  ctx.restore();
}

let sunAngle = 0;
function drawSun() {
  sunAngle += 0.003;
  const sunX = canvas.width * 0.80;
  const sunY = canvas.height * 0.22;

  ctx.save();
  const gradient = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 280);
  gradient.addColorStop(0, 'rgba(255, 245, 205, 0.9)');
  gradient.addColorStop(0.2, 'rgba(255, 210, 120, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 210, 120, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 280, 0, Math.PI * 2);
  ctx.fill();

  ctx.translate(sunX, sunY);
  ctx.rotate(sunAngle);
  for (let i = 0; i < 8; i++) {
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(0, -10, 320, 20);
  }
  ctx.restore();
}

function setWeatherEffect(effect) {
  currentEffect = effect;
  particles = [];

  if (effect === 'rain') {
    for (let i = 0; i < 150; i++) particles.push(new RainDrop());
    createGlassDroplets();
  } else if (effect === 'night') {
    for (let i = 0; i < 90; i++) particles.push(new TwinkleStar());
    document.querySelectorAll('.glass-droplet').forEach(el => el.remove());
  } else if (effect === 'snow') {
    for (let i = 0; i < 100; i++) particles.push(new SnowFlake());
    document.querySelectorAll('.glass-droplet').forEach(el => el.remove());
  } else {
    document.querySelectorAll('.glass-droplet').forEach(el => el.remove());
  }
}

function createGlassDroplets() {
  const card = document.querySelector('.weather-card');
  document.querySelectorAll('.glass-droplet').forEach(el => el.remove());

  for (let i = 0; i < 15; i++) {
    const droplet = document.createElement('div');
    droplet.className = 'glass-droplet';
    
    const size = Math.random() * 6 + 4;
    droplet.style.width = `${size}px`;
    droplet.style.height = `${size * 1.3}px`;
    droplet.style.left = `${Math.random() * 90 + 5}%`;
    droplet.style.top = `${Math.random() * 80 + 10}%`;
    droplet.style.animationDelay = `${Math.random() * 5}s`;

    card.appendChild(droplet);
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (currentEffect === 'sun') {
    drawSun();
  } else if (currentEffect === 'night') {
    drawMoon();
    particles.forEach(p => { p.update(); p.draw(); });
    shootingStar.update();
    shootingStar.draw();
  } else if (currentEffect === 'rain' || currentEffect === 'snow') {
    particles.forEach(p => { p.update(); p.draw(); });
  }
  requestAnimationFrame(animate);
}
animate();

// DOM Elementleri
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const suggestionsList = document.getElementById('suggestions-list');
const unitToggleBtn = document.getElementById('unit-toggle-btn');
const langSelect = document.getElementById('lang-select');
const unitDisplay = document.getElementById('unit-display');

const cityNameEl = document.getElementById('city-name');
const weatherDescEl = document.getElementById('weather-desc');
const temperatureEl = document.getElementById('temperature');
const humidityEl = document.getElementById('humidity');
const windSpeedEl = document.getElementById('wind-speed');
const feelsLikeEl = document.getElementById('feels-like');
const rainChanceEl = document.getElementById('rain-chance');
const weatherAdviceEl = document.getElementById('weather-advice');

const lblHumidity = document.getElementById('lbl-humidity');
const lblWind = document.getElementById('lbl-wind');
const lblFeelsLike = document.getElementById('lbl-feels-like');
const lblRainChance = document.getElementById('lbl-rain-chance');
const lblForecastTitle = document.getElementById('lbl-forecast-title');
const footerCopyright = document.querySelector('.app-footer p');

function normalizeText(text) {
  return text.toLowerCase()
    .replace(/ç/g, 'c').replace(/ğ/g, 'g')
    .replace(/ı/g, 'i').replace(/ö/g, 'o')
    .replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/İ/g, 'i').replace(/I/g, 'i');
}

function generateWeatherAdvice(tempC, weatherMain, windSpeedKm) {
  const dict = i18n[currentLang] || i18n.tr;
  let advice = "";

  if (weatherMain.includes('rain') || weatherMain.includes('drizzle') || weatherMain.includes('thunderstorm')) {
    advice = dict.adviceRain;
  } else if (weatherMain.includes('snow')) {
    advice = dict.adviceSnow;
  } else if (tempC <= 8) {
    advice = dict.adviceCold;
  } else if (tempC > 8 && tempC <= 18) {
    advice = dict.adviceCool;
  } else if (tempC > 18 && tempC <= 26) {
    advice = dict.adviceMild;
  } else if (tempC > 26) {
    advice = dict.adviceHot;
  } else {
    advice = dict.adviceDefault;
  }

  if (windSpeedKm > 25 && !weatherMain.includes('rain')) {
    advice += dict.adviceWind;
  }

  weatherAdviceEl.textContent = advice;
}

function applyLanguageUI() {
  const dict = i18n[currentLang] || i18n.tr;
  document.title = dict.pageTitle;
  cityInput.placeholder = dict.placeholder;
  lblHumidity.textContent = dict.humidity;
  lblWind.textContent = dict.wind;
  lblFeelsLike.textContent = dict.feelsLike;
  lblRainChance.textContent = dict.rainChance;
  lblForecastTitle.textContent = dict.forecastTitle;
  if (footerCopyright) footerCopyright.textContent = dict.copyright;
}

langSelect.addEventListener('change', (e) => {
  currentLang = e.target.value;
  applyLanguageUI();
  refreshWeatherData();
});

unitToggleBtn.addEventListener('click', () => {
  if (currentUnit === 'metric') {
    currentUnit = 'imperial';
    unitToggleBtn.textContent = '°C';
    unitDisplay.textContent = '°F';
  } else {
    currentUnit = 'metric';
    unitToggleBtn.textContent = '°F';
    unitDisplay.textContent = '°C';
  }
  refreshWeatherData();
});

function refreshWeatherData() {
  if (currentLat !== null && currentLon !== null) {
    fetchWeatherByCoords(currentLat, currentLon, currentCityName);
  } else {
    fetchWeather(currentCityName);
  }
}

let debounceTimer;
cityInput.addEventListener('input', (e) => {
  clearTimeout(debounceTimer);
  const query = e.target.value.trim();

  if (query.length < 2) {
    suggestionsList.style.display = 'none';
    return;
  }

  debounceTimer = setTimeout(async () => {
    const normQuery = normalizeText(query);
    let results = [];

    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(normQuery)}&limit=10&appid=${API_KEY}`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        data.forEach(item => {
          let locationTitle = item.name;
          if (item.state) locationTitle += `, ${item.state}`;
          locationTitle += ` (${item.country})`;

          if (!results.some(r => r.lat === item.lat && r.lon === item.lon)) {
            results.push({
              displayName: locationTitle,
              cityName: item.name,
              state: item.state || "",
              country: item.country,
              lat: item.lat,
              lon: item.lon
            });
          }
        });
      }
    } catch (err) {
      console.error("Arama Hatası:", err);
    }

    showSuggestions(results);
  }, 250);
});

function showSuggestions(locations) {
  suggestionsList.innerHTML = '';
  if (!locations || locations.length === 0) {
    suggestionsList.style.display = 'none';
    return;
  }

  locations.slice(0, 6).forEach(item => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.textContent = item.displayName;

    div.addEventListener('click', () => {
      cityInput.value = item.cityName;
      suggestionsList.style.display = 'none';

      const headerTitle = item.state ? `${item.cityName}, ${item.state}` : item.cityName;
      fetchWeatherByCoords(item.lat, item.lon, headerTitle);
    });

    suggestionsList.appendChild(div);
  });

  suggestionsList.style.display = 'block';
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    suggestionsList.style.display = 'none';
  }
});

async function handleManualSearch() {
  const query = cityInput.value.trim();
  if (!query) return;

  const normQuery = normalizeText(query);
  try {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(normQuery)}&limit=1&appid=${API_KEY}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (data.length > 0) {
        const item = data[0];
        const headerTitle = item.state ? `${item.name}, ${item.state}` : item.name;
        fetchWeatherByCoords(item.lat, item.lon, headerTitle);
        cityInput.value = '';
        suggestionsList.style.display = 'none';
        return;
      }
    }
  } catch (err) {
    console.error(err);
  }

  fetchWeather(normQuery);
  cityInput.value = '';
  suggestionsList.style.display = 'none';
}

searchBtn.addEventListener('click', handleManualSearch);
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleManualSearch();
});

async function fetchWeatherByCoords(lat, lon, customTitle = null) {
  currentLat = lat;
  currentLon = lon;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${currentUnit}&lang=${currentLang}&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) return;
    const data = await response.json();
    if (customTitle) {
      data.name = customTitle;
      currentCityName = customTitle;
    } else {
      currentCityName = data.name;
    }
    updateUI(data);
    fetchForecastByCoords(lat, lon);
  } catch (error) {
    console.error("GPS Hatası:", error);
  }
}

async function fetchForecastByCoords(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${currentUnit}&lang=${currentLang}&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) return;
    const data = await response.json();
    
    if (data.list && data.list.length > 0) {
      const popValue = data.list[0].pop * 100;
      rainChanceEl.textContent = `%${Math.round(popValue)}`;
    }

    updateForecastUI(data);
  } catch (error) {
    console.error(error);
  }
}

async function fetchWeather(city) {
  try {
    const cleanCity = normalizeText(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cleanCity)}&units=${currentUnit}&lang=${currentLang}&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) return;
    const data = await response.json();
    currentLat = data.coord.lat;
    currentLon = data.coord.lon;
    currentCityName = data.name;
    updateUI(data);
    fetchForecastByCoords(currentLat, currentLon);
  } catch (error) {
    console.error(error);
  }
}

function updateUI(data) {
  cityNameEl.textContent = data.name;
  weatherDescEl.textContent = data.weather[0].description.toUpperCase();
  
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const windUnit = currentUnit === 'metric' ? 'km/s' : 'mph';
  const windSpeed = currentUnit === 'metric' ? Math.round(data.wind.speed * 3.6) : Math.round(data.wind.speed);

  temperatureEl.textContent = temp;
  humidityEl.textContent = `%${data.main.humidity}`;
  windSpeedEl.textContent = `${windSpeed} ${windUnit}`;
  feelsLikeEl.textContent = `${feelsLike}°`;

  currentMoonPhase = calculateMoonPhase(new Date(data.dt * 1000));

  const isNight = data.dt < data.sys.sunrise || data.dt > data.sys.sunset;
  const weatherMain = data.weather[0].main.toLowerCase();

  const tempInC = currentUnit === 'imperial' ? (temp - 32) * (5 / 9) : temp;
  const windInKm = currentUnit === 'imperial' ? windSpeed * 1.609 : windSpeed;
  generateWeatherAdvice(tempInC, weatherMain, windInKm);

  if (isNight) {
    document.body.style.background = 'linear-gradient(135deg, #020204, #0b0f17)';
    setWeatherEffect(weatherMain.includes('rain') || weatherMain.includes('drizzle') ? 'rain' : 'night');
  } else {
    if (weatherMain.includes('rain') || weatherMain.includes('drizzle') || weatherMain.includes('thunderstorm')) {
      document.body.style.background = 'linear-gradient(135deg, #1f2937, #374151)';
      setWeatherEffect('rain');
    } else if (weatherMain.includes('clear')) {
      document.body.style.background = 'linear-gradient(135deg, #1a73e8, #4285f4)';
      setWeatherEffect('sun');
    } else if (weatherMain.includes('snow')) {
      document.body.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
      setWeatherEffect('snow');
    } else {
      document.body.style.background = 'linear-gradient(135deg, #2563eb, #60a5fa)';
      setWeatherEffect('sun');
    }
  }
}

function updateForecastUI(data) {
  const forecastList = document.getElementById('forecast-list');
  forecastList.innerHTML = '';

  const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  dailyData.forEach(day => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString(currentLang, { weekday: 'short' });
    const temp = Math.round(day.main.temp);
    const weatherMain = day.weather[0].main.toLowerCase();

    let iconClass = "fa-cloud-sun";
    if (weatherMain.includes('rain')) iconClass = "fa-cloud-showers-heavy";
    else if (weatherMain.includes('clear')) iconClass = "fa-sun";
    else if (weatherMain.includes('snow')) iconClass = "fa-snowflake";

    const forecastItem = document.createElement('div');
    forecastItem.className = 'forecast-item';
    forecastItem.innerHTML = `
      <span>${dayName}</span>
      <i class="fa-solid ${iconClass}"></i>
      <p>${temp}°</p>
    `;
    forecastList.appendChild(forecastItem);
  });
}

locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
    });
  }
});

applyLanguageUI();
fetchWeather('Istanbul');
