import { AssessmentChart } from './AssessmentChart.js';

// Define all chart data
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
      { label: "Begeliding van de carrière-ontwikkeling van mensen met herkomst Buiten-Europa door opleiding en management-development", score: 4 },
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

// Chart display configurations
const defaultParams = {
    itemHeight: 25,
    itemGap: 5,
    colSpacing: 82,
    labelWidth: 340,
    paddingTop: 60,
    paddingLeft: 380,
    paddingBottom: 20,
    titleSize: 20,
    labelSize: 11,
    lineHeight: 13
};

// Current parameters
let currentParams = { ...defaultParams };

// Get chart configuration based on type and current parameters
function getChartConfig(type) {
    const baseConfig = {
        itemHeight: currentParams.itemHeight,
        itemGap: currentParams.itemGap,
        colSpacing: currentParams.colSpacing,
        padding: {
            top: currentParams.paddingTop,
            right: 40,
            bottom: currentParams.paddingBottom,
            left: currentParams.paddingLeft
        },
        font: {
            title: `500 ${currentParams.titleSize}px Montserrat`,
            labels: `400 ${currentParams.labelSize}px Montserrat`,
            scores: 'bold 20px Montserrat'
        },
        lineHeight: currentParams.lineHeight,
        labelWidth: currentParams.labelWidth
    };
    
    // Adjust for half-column charts
    if (type === 'half') {
        baseConfig.padding.left = currentParams.labelWidth;
    }
    
    return baseConfig;
}

// Set up parameter controls
function setupParameterControls() {
    // Add event listeners for all sliders
    Object.keys(defaultParams).forEach(param => {
        const slider = document.getElementById(param);
        const valueSpan = document.getElementById(param + 'Value');
        
        if (slider && valueSpan) {
            slider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                valueSpan.textContent = value;
                currentParams[param] = value;
                updateAllCharts();
            });
        }
    });
    
    // Reset button
    document.getElementById('resetParams').addEventListener('click', () => {
        currentParams = { ...defaultParams };
        Object.keys(defaultParams).forEach(param => {
            const slider = document.getElementById(param);
            const valueSpan = document.getElementById(param + 'Value');
            if (slider && valueSpan) {
                slider.value = defaultParams[param];
                valueSpan.textContent = defaultParams[param];
            }
        });
        updateAllCharts();
    });
}

// Update all charts with current parameters
function updateAllCharts() {
    const charts = [
        { id: 'leadership-chart', data: chartData.leadership, type: 'full' },
        { id: 'hr-chart', data: chartData.hr, type: 'full' },
        { id: 'strategy-chart', data: chartData.strategy, type: 'half' },
        { id: 'communication-chart', data: chartData.communication, type: 'half' },
        { id: 'knowledge-chart', data: chartData.knowledge, type: 'half' },
        { id: 'climate-chart', data: chartData.climate, type: 'half' }
    ];

    charts.forEach(({ id, data, type }) => {
        const canvas = document.getElementById(id);
        if (canvas && data) {
            // Set canvas dimensions to match its display size
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            const chart = new AssessmentChart(canvas, getChartConfig(type));
            chart.render(data);
        }
    });
}

// Initialize all charts
function initializeCharts() {
    updateAllCharts();
}

// Handle DOM ready
document.addEventListener('DOMContentLoaded', () => {
    setupParameterControls();
    initializeCharts();

    // Set up event listeners
    const generateBtn = document.getElementById('generateBtn');
    const toggleRandomData = document.getElementById('toggleRandomData');
    const toggleGuides = document.getElementById('toggleGuides');

    // Toggle guides
    if (toggleGuides) {
        toggleGuides.addEventListener('change', (e) => {
            document.body.classList.toggle('show-guides', e.target.checked);
        });
        // Set initial state
        document.body.classList.toggle('show-guides', toggleGuides.checked);
    }

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