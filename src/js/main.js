/**
 * Main application entry point
 * Handles the initialization and coordination of the PDF layout and chart generation
 */
import { AssessmentChart } from '../assessment-chart.js';

// Example data for each chart (replace with your real data)
const sampleData = {
  leadership: {
    title: 'Leiderschap',
    items: [
      { label: 'Visie', score: 3 },
      { label: 'Inspiratie', score: 4 },
      { label: 'Besluitvorming', score: 2 },
      { label: 'Verantwoordelijkheid', score: 3 },
      { label: 'Voorbeeldgedrag', score: 4 }
    ]
  },
  hr: {
    title: 'HR Management',
    items: Array.from({ length: 14 }, (_, i) => ({ label: `HR Item ${i+1}`, score: Math.ceil(Math.random()*4) }))
  },
  strategy: {
    title: 'Strategie en Management',
    items: Array.from({ length: 8 }, (_, i) => ({ label: `Strategie ${i+1}`, score: Math.ceil(Math.random()*4) }))
  },
  communication: {
    title: 'Communicatie',
    items: Array.from({ length: 5 }, (_, i) => ({ label: `Communicatie ${i+1}`, score: Math.ceil(Math.random()*4) }))
  },
  knowledge: {
    title: 'Kennis en vaardigheden',
    items: Array.from({ length: 8 }, (_, i) => ({ label: `Kennis ${i+1}`, score: Math.ceil(Math.random()*4) }))
  },
  climate: {
    title: 'Klimaat',
    items: Array.from({ length: 6 }, (_, i) => ({ label: `Klimaat ${i+1}`, score: Math.ceil(Math.random()*4) }))
  }
};

function setDynamicCanvasSizes() {
  const chartMap = [
    { id: 'leadership-chart', data: sampleData.leadership },
    { id: 'hr-chart', data: sampleData.hr },
    { id: 'strategy-chart', data: sampleData.strategy },
    { id: 'communication-chart', data: sampleData.communication },
    { id: 'knowledge-chart', data: sampleData.knowledge },
    { id: 'climate-chart', data: sampleData.climate }
  ];
  chartMap.forEach(({ id, data }) => {
    const canvas = document.getElementById(id);
    if (canvas && data && data.items) {
      const height = AssessmentChart.calculateHeight(data.items.length);
      setCanvasSize(id, 366, height);
    }
  });
}

function setCanvasSize(id, width, height) {
  const canvas = document.getElementById(id);
  if (canvas) {
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }
}

function renderAllCharts() {
  const chartMap = [
    { id: 'leadership-chart', data: sampleData.leadership },
    { id: 'hr-chart', data: sampleData.hr },
    { id: 'strategy-chart', data: sampleData.strategy },
    { id: 'communication-chart', data: sampleData.communication },
    { id: 'knowledge-chart', data: sampleData.knowledge },
    { id: 'climate-chart', data: sampleData.climate }
  ];
  chartMap.forEach(({ id, data }) => {
    const canvas = document.getElementById(id);
    if (canvas) {
      const chart = new AssessmentChart(canvas);
      chart.render(data);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setDynamicCanvasSizes();
  renderAllCharts();
  const pageToggle = document.getElementById('togglePageGuides');
  const contentToggle = document.getElementById('toggleContentGuides');
  pageToggle.addEventListener('change', () => {
    document.body.classList.toggle('show-page-guides', pageToggle.checked);
  });
  contentToggle.addEventListener('change', () => {
    document.body.classList.toggle('show-content-guides', contentToggle.checked);
  });
  // Initialize
  if (pageToggle.checked) document.body.classList.add('show-page-guides');
  if (contentToggle.checked) document.body.classList.add('show-content-guides');
}); 