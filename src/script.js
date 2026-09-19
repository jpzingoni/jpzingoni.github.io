// ─── LANGUAGE SWITCH ───
let liLang = document.getElementById('changelang')
let htmlElement = document.getElementById('espanol');

liLang.addEventListener('click', function(){
  if (htmlElement){
    window.location.href = 'index.html';
  } else {
    window.location.href = 'index_esp.html'
  }
})

// ─── RANDOM DATA FACTS WIDGET ───
;(function () {
  const lang = document.documentElement.lang === 'es' ? 'es' : 'en';

  // ── SVG generators ──

  function hBar(items, maxVal, unit) {
    const vw = 400, vh = 190;
    const labelW = 90, padR = 40;
    const barX = labelW + 4, barMaxW = vw - labelW - padR - 4;
    const slotH = vh / items.length;
    const barH = Math.min(slotH * 0.46, 22);
    let s = `<svg viewBox="0 0 ${vw} ${vh}" fill="none" xmlns="http://www.w3.org/2000/svg">`;
    items.forEach(function(d, i) {
      const cy = slotH * i + slotH / 2;
      const bw = (d.value / maxVal) * barMaxW;
      s += `<rect x="${barX}" y="${(cy - barH / 2).toFixed(1)}" width="${barMaxW}" height="${barH}" rx="4" fill="#f3f4f6"/>`;
      s += `<rect x="${barX}" y="${(cy - barH / 2).toFixed(1)}" width="${bw.toFixed(1)}" height="${barH}" rx="4" fill="#0f1b4c" opacity="0.82"/>`;
      s += `<text x="${labelW}" y="${(cy + 4).toFixed(1)}" text-anchor="end" font-family="Inter,sans-serif" font-size="10" fill="#6b7280">${d.label}</text>`;
      const valText = unit ? d.value + unit : d.value;
      s += `<text x="${(barX + bw + 5).toFixed(1)}" y="${(cy + 4).toFixed(1)}" font-family="Inter,sans-serif" font-size="9.5" fill="#6b7280">${valText}</text>`;
    });
    s += `</svg>`;
    return s;
  }

  function vBar(items, maxVal) {
    const vw = 400, vh = 190;
    const padT = 24, padB = 32, padL = 15, padR = 15;
    const chartH = vh - padT - padB;
    const slotW = (vw - padL - padR) / items.length;
    const barW = slotW * 0.52;
    let s = `<svg viewBox="0 0 ${vw} ${vh}" fill="none" xmlns="http://www.w3.org/2000/svg">`;
    s += `<line x1="${padL}" y1="${vh - padB}" x2="${vw - padR}" y2="${vh - padB}" stroke="#d1d5db" stroke-width="1.5"/>`;
    items.forEach(function(d, i) {
      const cx = padL + slotW * i + slotW / 2;
      const bh = (d.value / maxVal) * chartH;
      const by = padT + chartH - bh;
      s += `<rect x="${(cx - barW / 2).toFixed(1)}" y="${by.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="4" fill="#0f1b4c" opacity="0.82"/>`;
      s += `<text x="${cx.toFixed(1)}" y="${(vh - padB + 14).toFixed(1)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" fill="#9ca3af">${d.label}</text>`;
      s += `<text x="${cx.toFixed(1)}" y="${(by - 5).toFixed(1)}" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" fill="#6b7280">${d.value}</text>`;
    });
    s += `</svg>`;
    return s;
  }

  function lineChart(points, xLabels) {
    const vw = 400, vh = 190;
    const padL = 15, padR = 15, padT = 15, padB = 32;
    const chartW = vw - padL - padR;
    const chartH = vh - padT - padB;
    const xMin = points[0].x, xMax = points[points.length - 1].x;
    const yMax = points[points.length - 1].y;
    const tx = function(x) { return padL + ((x - xMin) / (xMax - xMin)) * chartW; };
    const ty = function(y) { return vh - padB - (y / yMax) * chartH; };
    const ptStr = points.map(function(p) { return tx(p.x).toFixed(1) + ',' + ty(p.y).toFixed(1); }).join(' ');
    const first = points[0], last = points[points.length - 1];
    const area = 'M ' + tx(first.x).toFixed(1) + ',' + ty(first.y).toFixed(1) + ' ' +
      points.slice(1).map(function(p) { return 'L ' + tx(p.x).toFixed(1) + ',' + ty(p.y).toFixed(1); }).join(' ') +
      ' L ' + tx(last.x).toFixed(1) + ',' + (vh - padB) + ' L ' + tx(first.x).toFixed(1) + ',' + (vh - padB) + ' Z';
    let s = `<svg viewBox="0 0 ${vw} ${vh}" fill="none" xmlns="http://www.w3.org/2000/svg">`;
    s += `<defs><linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f1b4c" stop-opacity="0.18"/><stop offset="100%" stop-color="#0f1b4c" stop-opacity="0"/></linearGradient></defs>`;
    s += `<line x1="${padL}" y1="${vh - padB}" x2="${vw - padR}" y2="${vh - padB}" stroke="#d1d5db" stroke-width="1.5"/>`;
    s += `<path d="${area}" fill="url(#lg2)"/>`;
    s += `<polyline points="${ptStr}" stroke="#0f1b4c" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    points.forEach(function(p) {
      s += `<circle cx="${tx(p.x).toFixed(1)}" cy="${ty(p.y).toFixed(1)}" r="3.5" fill="#0f1b4c"/>`;
    });
    xLabels.forEach(function(xl) {
      s += `<text x="${tx(xl.x).toFixed(1)}" y="${vh - padB + 14}" text-anchor="middle" font-family="Inter,sans-serif" font-size="9" fill="#9ca3af">${xl.label}</text>`;
    });
    s += `</svg>`;
    return s;
  }

  // ── Data ──

  var popPoints = [
    { x: 1800, y: 1 }, { x: 1930, y: 2 }, { x: 1960, y: 3 },
    { x: 1975, y: 4 }, { x: 1987, y: 5 }, { x: 1999, y: 6 },
    { x: 2011, y: 7 }, { x: 2022, y: 8 }
  ];
  var popXLabels = [
    { x: 1800, label: '1800' }, { x: 1930, label: '1930' },
    { x: 1960, label: '1960' }, { x: 1999, label: '2000' }, { x: 2022, label: '2022' }
  ];

  var facts = {
    en: [
      {
        title: "Coffee Consumption Per Capita",
        text: "Finland drinks more coffee than any other country — about 12 kg per person per year. That's roughly 4 cups a day per adult. Italians, famous for espresso culture, don't even make the top 10.",
        svg: hBar([
          { label: "Finland", value: 12.0 },
          { label: "Norway", value: 9.9 },
          { label: "Iceland", value: 9.0 },
          { label: "Denmark", value: 8.7 },
          { label: "Netherlands", value: 8.4 }
        ], 13, " kg")
      },
      {
        title: "Average Sleep Hours by Country",
        text: "Japan and South Korea are the world's most sleep-deprived nations, averaging just over 7 hours a night. Finland — the happiest country on Earth — is ironically also one of the best-rested.",
        svg: vBar([
          { label: "Japan", value: 7.0 },
          { label: "Korea", value: 7.3 },
          { label: "Brazil", value: 8.0 },
          { label: "Germany", value: 8.1 },
          { label: "Finland", value: 8.2 }
        ], 9.5)
      },
      {
        title: "UNESCO World Heritage Sites",
        text: "Italy leads with 58 UNESCO World Heritage Sites, just ahead of China's 57. Between the top 5 countries alone, there are over 260 sites of outstanding universal value.",
        svg: hBar([
          { label: "Italy", value: 58 },
          { label: "China", value: 57 },
          { label: "Germany", value: 52 },
          { label: "France", value: 52 },
          { label: "Spain", value: 50 }
        ], 65)
      },
      {
        title: "World Population Growth",
        text: "It took all of human history to reach 1 billion people in 1800. We hit 2 billion by 1930 — and 8 billion in just 92 more years. No headline captures it like the curve.",
        svg: lineChart(popPoints, popXLabels)
      },
      {
        title: "World Happiness Index 2024",
        text: "For the 7th year in a row, Finland ranked as the happiest country on Earth. The Nordic countries dominate the top 5 every year, scoring high on social support, freedom and life satisfaction.",
        svg: hBar([
          { label: "Finland", value: 7.74 },
          { label: "Denmark", value: 7.58 },
          { label: "Iceland", value: 7.53 },
          { label: "Sweden", value: 7.34 },
          { label: "Netherlands", value: 7.32 }
        ], 8.5, "/10")
      },
      {
        title: "Nobel Prizes by Country",
        text: "The United States has won more Nobel Prizes than the next five countries combined. With over 400 laureates, the US leads across every category — from Physics to Peace.",
        svg: vBar([
          { label: "USA", value: 403 },
          { label: "UK", value: 132 },
          { label: "Germany", value: 111 },
          { label: "France", value: 70 },
          { label: "Sweden", value: 34 }
        ], 450)
      }
    ],
    es: [
      {
        title: "Consumo de Café Per Cápita",
        text: "Finlandia consume más café que cualquier otro país: unos 12 kg por persona al año. Eso equivale a cerca de 4 tazas diarias por adulto. Italia, famosa por su espresso, ni siquiera entra en el top 10.",
        svg: hBar([
          { label: "Finlandia", value: 12.0 },
          { label: "Noruega", value: 9.9 },
          { label: "Islandia", value: 9.0 },
          { label: "Dinamarca", value: 8.7 },
          { label: "P. Bajos", value: 8.4 }
        ], 13, " kg")
      },
      {
        title: "Horas de Sueño Promedio por País",
        text: "Japón y Corea del Sur son los países con menos horas de sueño del mundo: apenas algo más de 7 horas por noche. Finlandia, irónicamente el país más feliz del mundo, también es uno de los que más duerme.",
        svg: vBar([
          { label: "Japón", value: 7.0 },
          { label: "Corea", value: 7.3 },
          { label: "Brasil", value: 8.0 },
          { label: "Alemania", value: 8.1 },
          { label: "Finlandia", value: 8.2 }
        ], 9.5)
      },
      {
        title: "Sitios UNESCO por País",
        text: "Italia lidera con 58 sitios Patrimonio de la Humanidad de la UNESCO, apenas por encima de los 57 de China. Entre los 5 primeros países hay más de 260 sitios de valor universal protegidos.",
        svg: hBar([
          { label: "Italia", value: 58 },
          { label: "China", value: 57 },
          { label: "Alemania", value: 52 },
          { label: "Francia", value: 52 },
          { label: "España", value: 50 }
        ], 65)
      },
      {
        title: "Crecimiento de la Población Mundial",
        text: "Toda la historia humana fue necesaria para llegar a 1.000 millones en 1800. En 1930 ya éramos 2.000 millones — y en solo 92 años más llegamos a 8.000 millones. La curva lo dice todo.",
        svg: lineChart(popPoints, popXLabels)
      },
      {
        title: "Índice Mundial de la Felicidad 2024",
        text: "Por séptimo año consecutivo, Finlandia se coronó como el país más feliz del mundo. Los países nórdicos dominan el top 5 cada año, destacándose en apoyo social, libertad y satisfacción vital.",
        svg: hBar([
          { label: "Finlandia", value: 7.74 },
          { label: "Dinamarca", value: 7.58 },
          { label: "Islandia", value: 7.53 },
          { label: "Suecia", value: 7.34 },
          { label: "P. Bajos", value: 7.32 }
        ], 8.5, "/10")
      },
      {
        title: "Premios Nobel por País",
        text: "Estados Unidos ha ganado más Premios Nobel que los cinco países siguientes combinados. Con más de 400 laureados, EE.UU. lidera en todas las categorías, desde Física hasta la Paz.",
        svg: vBar([
          { label: "EE.UU.", value: 403 },
          { label: "R. Unido", value: 132 },
          { label: "Alemania", value: 111 },
          { label: "Francia", value: 70 },
          { label: "Suecia", value: 34 }
        ], 450)
      }
    ]
  };

  // ── Widget logic ──
  var pool = facts[lang] || facts.en;
  var nextLabel   = lang === 'es' ? 'Otro dato →' : 'Next fact →';
  var captionText = lang === 'es' ? '* Datos aproximados' : '* Approximate data';
  var lastIdx = -1;

  var btnRandom   = document.getElementById('btnRandom');
  var dataTrigger = document.getElementById('dataTrigger');
  var dataPanel   = document.getElementById('dataPanel');
  var dataText    = document.getElementById('dataText');
  var dataChart   = document.getElementById('dataChart');

  function showFact() {
    var idx;
    do { idx = Math.floor(Math.random() * pool.length); } while (idx === lastIdx && pool.length > 1);
    lastIdx = idx;
    var fact = pool[idx];

    dataText.innerHTML =
      '<h4>' + fact.title + '</h4>' +
      '<p>' + fact.text + '</p>' +
      '<button class="btn-data-next" id="btnNext">' + nextLabel + '</button>';

    dataChart.innerHTML = fact.svg + '<p class="chart-caption">' + captionText + '</p>';

    dataTrigger.style.display = 'none';
    dataPanel.classList.remove('visible');
    void dataPanel.offsetWidth; // force reflow for animation
    dataPanel.style.display = 'flex';
    dataPanel.classList.add('visible');

    document.getElementById('btnNext').addEventListener('click', showFact);
  }

  if (btnRandom) btnRandom.addEventListener('click', showFact);
})();
