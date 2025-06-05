import { AssessmentChart } from './assessment-chart.js';

const sampleData = {
  leadership: {
    title: "Leiderschap",
    items: [
      { label: "Top gecommitteerd aan doelstellingen/beleid culturele diversiteit", score: 3 },
      { label: "Top draagt belang van culturele diversiteit actief uit", score: 2 },
      { label: "Top stuurt aanwijsbaar op bereiken resultaten", score: 4 },
      { label: "Top stelt voldoende middelen ter beschikking", score: 1 },
      { label: "Top neemt eindverantwoordelijkheid voor beleid", score: 3 }
    ]
  },
  hr: {
    title: "HR Management", 
    items: [
      { label: "Inzet maatwerk-instrumenten en regelingen voor doorstroom", score: 2 },
      { label: "Bij werving wordt doelbewust geselecteerd naar culturele diversiteit", score: 3 },
      { label: "Transparante en objectieve selectieprocedures", score: 4 },
      { label: "Arbeidsmarktcommunicatie reflecteert streven culturele diversiteit", score: 1 },
      { label: "Carrièreontwikkeling door opleiding en management-development", score: 3 },
      { label: "Carrièreontwikkeling door coaching en mentoring", score: 2 },
      { label: "Effectiviteit HR-maatregelen culturele diversiteit wordt gemeten", score: 4 },
      { label: "Meten aan deel mensen met niet-Westerse migratieachtergrond", score: 2 },
      { label: "Personeels- en organisatieplanning doelbewust gericht naar cultuur diversiteit", score: 3 },
      { label: "Ondersteuning carrièreontwikkeling door netwerken", score: 1 },
      { label: "Ondersteuning carrièreontwikkeling door rolmodellen", score: 3 },
      { label: "Diversiteitsstreven geïntegreerd in HR-beleid", score: 4 },
      { label: "Stimulering carrièreontwikkeling via empowerment", score: 2 },
      { label: "Voorkomen ongewenste uitstroom talent", score: 3 }
    ]
  },
  strategy: {
    title: "Strategie en Management",
    items: [
      { label: "Culturele diversiteit is business case", score: 3 },
      { label: "Expliciete doelstellingen mensen met niet-Westerse migratieachtergrond in top", score: 2 },
      { label: "Vastgelegd is hoe deze doelstellingen bereikt gaan worden", score: 1 },
      { label: "Bedrijfsonderdelen rapporteren over realiseren culturele diversiteit", score: 4 },
      { label: "Leidinggevenden beoordeeld op realiseren culturele diversiteit", score: 2 },
      { label: "Evalueren resultaten van culturele diversiteitsbeleid", score: 3 },
      { label: "Uitkomsten van evaluaties gebruikt voor verbetering", score: 2 },
      { label: "Vergelijken culturele diversiteitsbeleid met andere organisaties", score: 1 }
    ]
  },
  communication: {
    title: "Communicatie",
    items: [
      { label: "Interne communicatie streven aantal mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 4 },
      { label: "Externe communicatie streven mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 2 },
      { label: "Interne communicatie aantal mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 3 },
      { label: "Externe communicatie aantal mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 1 },
      { label: "Mensen met een niet-Westerse migratieachtergrond in hogere functies zichtbaar in woord en beeld", score: 4 }
    ]
  },
  knowledge: {
    title: "Kennis en vaardigheden",
    items: [
      { label: "Inzicht in bevorderende maatregelen culturele diversiteit", score: 3 },
      { label: "Inzicht in belemmerende maatregelen culturele diversiteit", score: 2 },
      { label: "Leidinggevenden bewust van meerwaarde culturele diversiteit", score: 4 },
      { label: "Leidinggevenden bewust van mechanisme belemmeringen", score: 1 },
      { label: "Leidinggevenden zetten maatregelen doorstroom in", score: 3 },
      { label: "Gebruik beschikbare kennis en ervaring voor verbetering", score: 2 },
      { label: "MTO gebruiken voor sturen op culturele diversiteit", score: 4 },
      { label: "Organisatie kent vertrekredenen en gebruikt deze voor behoud", score: 2 }
    ]
  },
  climate: {
    title: "Klimaat",
    items: [
      { label: "Stereotypen/discriminatie actief bestreden", score: 4 },
      { label: "Inzet van maatregelen investeren culturele diversiteit geaccepteerd", score: 3 },
      { label: "Culturele verschillen in gehele organisatie erkend en gewaardeerd", score: 2 },
      { label: "Aandacht culturele diversiteit leeft", score: 4 },
      { label: "Leidinggevenden verantwoordelijk voor culturele diversiteit", score: 1 },
      { label: "Organisatie gezien als culturele diversiteitsminded", score: 3 }
    ]
  }
};

function drawPrintingGuides(canvas) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  // Border
  ctx.save();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, w, h);
  // Center line
  ctx.beginPath();
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2, h);
  ctx.stroke();
  // Margin guides (dotted)
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 1;
  // 40pt left/right, 50pt top/bottom (scaled to 300px width)
  const scaleX = w / 300;
  const scaleY = h / 120;
  const marginLeft = 40 * scaleX;
  const marginRight = w - 40 * scaleX;
  const marginTop = 50 * scaleY;
  const marginBottom = h - 50 * scaleY;
  // Left
  ctx.beginPath();
  ctx.moveTo(marginLeft, 0);
  ctx.lineTo(marginLeft, h);
  ctx.stroke();
  // Right
  ctx.beginPath();
  ctx.moveTo(marginRight, 0);
  ctx.lineTo(marginRight, h);
  ctx.stroke();
  // Top
  ctx.beginPath();
  ctx.moveTo(0, marginTop);
  ctx.lineTo(w, marginTop);
  ctx.stroke();
  // Bottom
  ctx.beginPath();
  ctx.moveTo(0, marginBottom);
  ctx.lineTo(w, marginBottom);
  ctx.stroke();
  ctx.setLineDash([]);
  // Bleed marks (10pt)
  const bleed = 10 * scaleX;
  // Top-left
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(bleed, 0);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, bleed);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(w, 0);
  ctx.lineTo(w - bleed, 0);
  ctx.moveTo(w, 0);
  ctx.lineTo(w, bleed);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(0, h);
  ctx.lineTo(bleed, h);
  ctx.moveTo(0, h);
  ctx.lineTo(0, h - bleed);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(w, h);
  ctx.lineTo(w - bleed, h);
  ctx.moveTo(w, h);
  ctx.lineTo(w, h - bleed);
  ctx.stroke();
  ctx.restore();
}

function renderAllCharts(showGuides = true) {
  Object.entries(sampleData).forEach(([key, data]) => {
    const canvasId = `${key}-chart`;
    const canvas = document.getElementById(canvasId);
    if (canvas) {
      const chart = new AssessmentChart(canvas);
      chart.render(data);
      if (showGuides) drawPrintingGuides(canvas);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('toggleGuides');
  renderAllCharts(toggle.checked);
  toggle.addEventListener('change', () => {
    renderAllCharts(toggle.checked);
  });
}); 