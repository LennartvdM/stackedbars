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

const CHART_CONFIG = {
  fullColumn: {
    padding: { top: 30, right: 20, bottom: 20, left: 200 },
    barHeight: 18,
    barSpacing: 12,
    brickWidth: 35,
    font: {
      title: 'bold 16px Arial',
      labels: '11px Arial',
      scores: 'bold 14px Arial'
    }
  },
  halfColumn: {
    padding: { top: 20, right: 15, bottom: 15, left: 180 },
    barHeight: 15,
    barSpacing: 8,
    brickWidth: 30,
    font: {
      title: 'bold 14px Arial',
      labels: '9px Arial',
      scores: 'bold 12px Arial'
    }
  }
};

function setFixedCanvasSizes() {
  setCanvasSize('leadership-chart', 366, 505);
  setCanvasSize('hr-chart', 366, 505);
  setCanvasSize('strategy-chart', 366, 237);
  setCanvasSize('communication-chart', 366, 237);
  setCanvasSize('knowledge-chart', 366, 237);
  setCanvasSize('climate-chart', 366, 237);
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
    { id: 'leadership-chart', data: sampleData.leadership, config: CHART_CONFIG.fullColumn },
    { id: 'hr-chart', data: sampleData.hr, config: CHART_CONFIG.fullColumn },
    { id: 'strategy-chart', data: sampleData.strategy, config: CHART_CONFIG.halfColumn },
    { id: 'communication-chart', data: sampleData.communication, config: CHART_CONFIG.halfColumn },
    { id: 'knowledge-chart', data: sampleData.knowledge, config: CHART_CONFIG.halfColumn },
    { id: 'climate-chart', data: sampleData.climate, config: CHART_CONFIG.halfColumn }
  ];
  chartMap.forEach(({ id, data, config }) => {
    const canvas = document.getElementById(id);
    if (canvas) {
      const chart = new AssessmentChart(canvas, config);
      chart.render(data);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setFixedCanvasSizes();
  renderAllCharts();
  const toggle = document.getElementById('toggleGuides');
  if (toggle) {
    toggle.addEventListener('change', function() {
      if (toggle.checked) {
        document.body.classList.add('show-guides');
      } else {
        document.body.classList.remove('show-guides');
      }
    });
    if (toggle.checked) {
      document.body.classList.add('show-guides');
    }
  }
}); 