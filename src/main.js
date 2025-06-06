import { AssessmentChart } from './assessment-chart.js';

// Define all chart data
const chartData = {
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
      { label: "Carrièreontwikkeling door opleiding en management-development", score: 3 }
    ]
  },
  strategy: {
    title: "Strategie en Management",
    items: [
      { label: "Culturele diversiteit is business case", score: 3 },
      { label: "Expliciete doelstellingen mensen met niet-Westerse migratieachtergrond in top", score: 2 },
      { label: "Vastgelegd is hoe deze doelstellingen bereikt gaan worden", score: 1 },
      { label: "Bedrijfsonderdelen rapporteren over realiseren culturele diversiteit", score: 4 },
      { label: "Leidinggevenden beoordeeld op realiseren culturele diversiteit", score: 2 }
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
  organization: {
    title: "Organisatie",
    items: [
      { label: "Inzicht in bevorderende maatregelen culturele diversiteit", score: 3 },
      { label: "Inzicht in belemmerende maatregelen culturele diversiteit", score: 2 },
      { label: "Leidinggevenden bewust van meerwaarde culturele diversiteit", score: 4 },
      { label: "Leidinggevenden bewust van mechanisme belemmeringen", score: 1 },
      { label: "Leidinggevenden zetten maatregelen doorstroom in", score: 3 }
    ]
  },
  recruitment: {
    title: "Recruitment",
    items: [
      { label: "Stereotypen/discriminatie actief bestreden", score: 4 },
      { label: "Inzet van maatregelen investeren culturele diversiteit geaccepteerd", score: 3 },
      { label: "Culturele verschillen in gehele organisatie erkend en gewaardeerd", score: 2 },
      { label: "Aandacht culturele diversiteit leeft", score: 4 },
      { label: "Leidinggevenden verantwoordelijk voor culturele diversiteit", score: 1 }
    ]
  }
};

// Initialize all charts
function initializeCharts() {
  const charts = {
    leadership: new AssessmentChart(document.getElementById('leadership-chart')),
    hr: new AssessmentChart(document.getElementById('hr-chart')),
    strategy: new AssessmentChart(document.getElementById('strategy-chart')),
    communication: new AssessmentChart(document.getElementById('communication-chart')),
    organization: new AssessmentChart(document.getElementById('organization-chart')),
    recruitment: new AssessmentChart(document.getElementById('recruitment-chart'))
  };

  // Render each chart with its data
  Object.keys(charts).forEach(key => {
    charts[key].render(chartData[key]);
  });
}

// Handle DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initializeCharts();

  // Set up event listeners
  const generateBtn = document.getElementById('generateBtn');
  const toggleRandomData = document.getElementById('toggleRandomData');

  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      // Generate new random data and re-render charts
      Object.keys(chartData).forEach(key => {
        chartData[key].items.forEach(item => {
          item.score = Math.floor(Math.random() * 4) + 1;
        });
      });
      initializeCharts();
    });
  }

  if (toggleRandomData) {
    toggleRandomData.addEventListener('change', (e) => {
      if (e.target.checked) {
        // Generate random data when toggle is checked
        Object.keys(chartData).forEach(key => {
          chartData[key].items.forEach(item => {
            item.score = Math.floor(Math.random() * 4) + 1;
          });
        });
      } else {
        // Reset to original data when toggle is unchecked
        Object.keys(chartData).forEach(key => {
          chartData[key].items.forEach((item, index) => {
            item.score = chartData[key].items[index].score;
          });
        });
      }
      initializeCharts();
    });
  }
}); 