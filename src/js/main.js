import { AssessmentChart } from './AssessmentChart.js';
import { ChartControlSystem } from './ChartControlSystem.js';

// Define all chart data (same as before)
const chartData = {
  leadership: {
    title: "Leiderschap",
    items: [
      { label: "De top heeft zich verbonden (is gecommitteerd) aan de doelstellingen en het beleid voor meer mensen met herkomst Buiten-Europa", score: 4 },
      { label: "De top draagt het belang van culturele-diversiteit actief uit", score: 2 },
      { label: "De top stuurt aanwijsbaar op het bereiken van de gewenste resultaten", score: 1 },
      { label: "De top stelt voldoende middelen (financiën, personeel, technologie) ter beschikking om de doelstellingen te kunnen realiseren", score: 4 },
      { label: "De top neemt eindverantwoordelijkheid voor het culturele diversiteitsbeleid", score: 2 }
    ]
  },
  hr: {
    title: "HR Management",
    items: [
      { label: "De organisatie zet bewust maatwerkinstrumenten en regelingen in om de doorstroom van mensen met...", score: 4 },
      { label: "Bij de werving van kandidaten voor top- en subtopfuncties wordt doelbewust gestuurd naar culturele diversiteit", score: 4 },
      { label: "Subjectiviteit en stereotypering worden tegengegaan door transparante en objectieve selectieprocedures", score: 3 },
      { label: "Onze arbeidsmarktcommunicatie reflecteert ons streven naar culturele diversiteit", score: 2 },
      { label: "Begeleding van de carrière-ontwikkeling van mensen met herkomst Buiten-Europa door opleiding en management-development", score: 4 },
      { label: "Begeliding van de carrière-ontwikkeling van mensen met herkomst Buiten-Europa door middel van coaching en mentoring", score: 3 },
      { label: "Effectiviteit van onze HR-maatregelen ten behoeve het realiseren van culturele diversiteit wordt gemeten om beleid te kunnen verbeteren", score: 4 },
      { label: "Het aandeel met herkomst Buiten-Europa naar functieniveau en naar afdeling (business unit, team) wordt gemeten (is bekend)", score: 4 },
      { label: "Bij de personeels-/successieplanning wordt doelbewust gestuurd naar het realiseren van culturele diversiteit", score: 3 },
      { label: "Ondersteuning van de carrièreontwikkeling van mensen met herkomst Buiten-Europa door netwerken", score: 3 },
      { label: "Ondersteuning van de carrièreontwikkeling van mensen met herkomst Buiten-Europa door rolmodellen", score: 3 },
      { label: "Ons streven naar meer mensen met herkomst Buiten-Europa in de top is geïntegreerd in al onze diversiteitsbeleid", score: 3 },
      { label: "Door empowerment worden mensen met herkomst Buiten-Europa gestimuleerd tot carrièreontwikkeling vanuit eigen kracht", score: 2 },
      { label: "Ongewenste uitstroom van talentvolle mensen met herkomst Buiten-Europa wordt voorkomen", score: 1 }
    ]
  },
  strategy: {
    title: "Strategie en Management",
    items: [
      { label: "Culturele diversiteit is een business case voor onze organisatie", score: 4 },
      { label: "De organisatie streeft expliciete doelstellingen voor het aandeel mensen met herkomst Buiten-Europa in de top na", score: 4 },
      { label: "Vastgelegd is hoe deze doelstellingen bereikt gaan worden en op welke termijn", score: 3 },
      { label: "Bedrijfsonderdelen (business units, afdelingen, teams) rapporteren over het realiseren van culturele diversiteitsdoelstellingen", score: 4 },
      { label: "Leidinggevenden worden beoordeeld op het realiseren van culturele diversiteits-doelstellingen b.b.v. de periodieke beoordeling", score: 4 },
      { label: "Wij evalueren met vastgestelde regelmaat (bijvoorbeeld elk kwartaal) de resultaten van ons culturele diversiteitsbeleid", score: 3 },
      { label: "De uitkomsten van evaluaties worden gebruikt om ons culturele diversiteitsbeleid te verbeteren", score: 3 },
      { label: "Wij vergelijken ons culturele diversiteitsbeleid met dat van andere organisaties", score: 4 }
    ]
  },
  knowledge: {
    title: "Kennis en Vaardigheden",
    items: [
      { label: "Inzicht in bevorderende maatregelen culturele diversiteit", score: 3 },
      { label: "Inzicht in belemmerende maatregelen culturele diversiteit", score: 3 },
      { label: "Leidinggevenden bewust van meerwaarde culturele diversiteit", score: 3 },
      { label: "Leidinggevenden bewust van mechanismen belemmering", score: 3 },
      { label: "Leidinggevenden zetten maatregelen doorstroom in", score: 3 },
      { label: "Gebruik beschikbare kennis en ervaring voor verbetering", score: 4 },
      { label: "MTO gebruiken voor sturen op culturele diversiteit", score: 4 },
      { label: "Organisatie kent vertrekredenen en gebruikt deze voor behoud", score: 2 }
    ]
  },
  communication: {
    title: "Communicatie",
    items: [
      { label: "Interne communicatie streven aantal mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 4 },
      { label: "Externe communicatie streven mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 4 },
      { label: "Interne communicatie aantal mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 4 },
      { label: "Externe communicatie aantal mensen met een niet-Westerse migratieachtergrond in hogere functies", score: 3 },
      { label: "Mensen met een niet-Westerse migratieachtergrond in hogere functies zichtbaar in woord en beeld", score: 3 }
    ]
  },
  climate: {
    title: "Klimaat",
    items: [
      { label: "Stereotypen/discriminatie actief bestreden", score: 4 },
      { label: "Inzet van maatregelen investeren culturele diversiteit geaccepteerd", score: 4 },
      { label: "Culturele verschillen in gehele organisatie erkend en gewaardeerd", score: 3 },
      { label: "Aandacht culturele diversiteit leeft", score: 3 },
      { label: "Leidinggevenden verantwoordelijk voor culturele diversiteit", score: 3 },
      { label: "Organisatie gezien als culturele diversiteitsminded", score: 3 }
    ]
  }
};

// Chart instances storage
let charts = {};
let controlSystem;

/**
 * Initialize all charts with absolute dimensions
 */
function initializeCharts() {
  // Define specific configurations for different chart layouts
  const chartConfigs = {
    // Full column charts (page 1)
    leadership: { 
      canvasHeight: AssessmentChart.calculateOptimalHeight(chartData.leadership.items.length) 
    },
    hr: { 
      canvasHeight: AssessmentChart.calculateOptimalHeight(chartData.hr.items.length) 
    },
    
    // Half column charts (page 2) - should all have same height for consistency
    strategy: { 
      canvasHeight: 250  // Fixed height for half-column layout
    },
    communication: { 
      canvasHeight: 250  // Fixed height for half-column layout
    },
    knowledge: { 
      canvasHeight: 250  // Fixed height for half-column layout
    },
    climate: { 
      canvasHeight: 250  // Fixed height for half-column layout
    }
  };

  // Create chart instances
  Object.keys(chartData).forEach(chartKey => {
    const canvas = document.getElementById(`${chartKey}-chart`);
    if (canvas && chartData[chartKey]) {
      // Create chart with specific configuration
      const config = chartConfigs[chartKey] || {};
      charts[chartKey] = AssessmentChart.createWithStandardDimensions(canvas, config);
      
      // Render the chart
      charts[chartKey].render(chartData[chartKey]);
    }
  });

  // Initialize control system
  controlSystem = new ChartControlSystem(charts);
  controlSystem.setChartData(chartData);
}

/**
 * Generate new random data for all charts
 */
function generateRandomData() {
  Object.keys(chartData).forEach(key => {
    chartData[key].items.forEach(item => {
      item.score = Math.floor(Math.random() * 4) + 1;
    });
  });
  
  // Re-render all charts
  rerenderAllCharts();
}

/**
 * Re-render all charts with current data
 */
function rerenderAllCharts() {
  Object.keys(charts).forEach(chartKey => {
    if (charts[chartKey] && chartData[chartKey]) {
      charts[chartKey].render(chartData[chartKey]);
    }
  });
}

/**
 * Set up canvas container sizing for print layout
 */
function setupCanvasContainers() {
  // Ensure canvas containers don't interfere with absolute sizing
  document.querySelectorAll('.chart-section canvas').forEach(canvas => {
    const section = canvas.closest('.chart-section');
    if (section) {
      // Remove any conflicting styles that might interfere with absolute dimensions
      section.style.display = 'flex';
      section.style.flexDirection = 'column';
      section.style.alignItems = 'center';
      section.style.justifyContent = 'center';
    }
  });
}

/**
 * Toggle between original and random data
 */
function toggleDataMode(useRandom) {
  if (useRandom) {
    generateRandomData();
  } else {
    // Reset to original data - you might want to store original data separately
    // For now, this will just keep the current random data
    console.log('Reset to original data - implement if needed');
  }
}

/**
 * Initialize page guides
 */
function initializePageGuides() {
  const guidesToggle = document.getElementById('toggleGuides');
  
  if (guidesToggle) {
    guidesToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('show-guides', e.target.checked);
    });
    
    // Set initial state
    if (guidesToggle.checked) {
      document.body.classList.add('show-guides');
    }
  }
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
  // Random data generation
  const generateBtn = document.getElementById('generateBtn');
  if (generateBtn) {
    generateBtn.addEventListener('click', generateRandomData);
  }

  // Random data toggle
  const toggleRandomData = document.getElementById('toggleRandomData');
  if (toggleRandomData) {
    toggleRandomData.addEventListener('change', (e) => {
      toggleDataMode(e.target.checked);
    });
  }

  // PDF generation (placeholder - implement with jsPDF if needed)
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      console.log('PDF generation - implement if needed');
      // You can add jsPDF integration here
    });
  }

  // Page guides
  initializePageGuides();
}

/**
 * Main initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing Assessment Chart System...');
  
  // Set up canvas containers
  setupCanvasContainers();
  
  // Initialize charts with absolute dimensions
  initializeCharts();
  
  // Set up event listeners
  setupEventListeners();
  
  console.log('Charts initialized:', Object.keys(charts));
});

/**
 * Expose functions for debugging/external use
 */
window.ChartSystem = {
  charts,
  chartData,
  controlSystem,
  rerenderAllCharts,
  generateRandomData,
  toggleDataMode
}; 