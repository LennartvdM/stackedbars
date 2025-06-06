import { AssessmentChart } from './assessment-chart.js';
import { FixedChartControlSystem } from './chart-controls.js';
import { chartData, resolveTextReferences } from './chart-data.js';

// Global chart instances and resolved data
let charts = {};
let controlSystem;
let resolvedChartData;

/**
 * Initialize charts with fixed dimensions
 */
function initializeChartsWithFixedDimensions() {
  console.log('Initializing charts with fixed dimensions...');
  
  // Resolve text references to get full labels
  resolvedChartData = resolveTextReferences(chartData);
  
  // Clear any existing charts
  charts = {};
  
  // Chart-specific configurations
  const chartConfigs = {
    leadership: { canvasHeight: AssessmentChart.calculateHeightForItems(resolvedChartData.leadership.items.length) },
    hr: { canvasHeight: AssessmentChart.calculateHeightForItems(resolvedChartData.hr.items.length) },
    strategy: { canvasHeight: 280 },
    communication: { canvasHeight: 280 },
    knowledge: { canvasHeight: 280 },
    climate: { canvasHeight: 280 }
  };

  // Create each chart
  Object.keys(resolvedChartData).forEach(chartKey => {
    const canvas = document.getElementById(`${chartKey}-chart`);
    if (canvas && resolvedChartData[chartKey]) {
      const config = chartConfigs[chartKey] || {};
      charts[chartKey] = AssessmentChart.createWithFixedDimensions(canvas, config);
      charts[chartKey].render(resolvedChartData[chartKey]);
    }
  });

  // Initialize control system
  if (Object.keys(charts).length > 0) {
    controlSystem = new FixedChartControlSystem(charts);
    controlSystem.setChartData(resolvedChartData);
  }
}

/**
 * Setup canvas containers
 */
function setupCanvasContainers() {
  document.querySelectorAll('.chart-section').forEach(section => {
    section.style.display = 'flex';
    section.style.flexDirection = 'column';
    section.style.alignItems = 'center';
    section.style.justifyContent = 'flex-start';
    section.style.padding = '10px';
    section.style.overflow = 'visible';
  });
  
  document.querySelectorAll('.chart-section canvas').forEach(canvas => {
    canvas.style.display = 'block';
    canvas.style.margin = '0';
    canvas.style.padding = '0';
    canvas.style.border = '1px solid #e0e0e0';
    canvas.style.borderRadius = '4px';
  });
}

/**
 * Generate new random data
 */
function generateNewRandomData() {
  Object.keys(chartData).forEach(key => {
    chartData[key].items.forEach(item => {
      item.score = Math.floor(Math.random() * 4) + 1;
    });
  });
  
  // Re-resolve and re-render
  resolvedChartData = resolveTextReferences(chartData);
  rerenderAllCharts();
}

/**
 * Re-render all charts
 */
function rerenderAllCharts() {
  Object.keys(charts).forEach(chartKey => {
    if (charts[chartKey] && resolvedChartData[chartKey]) {
      charts[chartKey].render(resolvedChartData[chartKey]);
    }
  });
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
    if (guidesToggle.checked) {
      document.body.classList.add('show-guides');
    }
  }
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  const generateBtn = document.getElementById('generateBtn');
  if (generateBtn) {
    generateBtn.addEventListener('click', generateNewRandomData);
  }

  const toggleRandomData = document.getElementById('toggleRandomData');
  if (toggleRandomData) {
    toggleRandomData.addEventListener('change', (e) => {
      if (e.target.checked) {
        generateNewRandomData();
      }
    });
  }

  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      console.log('PDF generation requested');
    });
  }

  initializePageGuides();
}

/**
 * Main initialization
 */
function initializeApplication() {
  setupCanvasContainers();
  initializeChartsWithFixedDimensions();
  setupEventListeners();
}

/**
 * DOM ready handler
 */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initializeApplication, 100);
});

/**
 * Expose for debugging
 */
window.ChartSystem = {
  charts,
  chartData,
  resolvedChartData,
  controlSystem,
  rerenderAllCharts,
  generateNewRandomData
}; 