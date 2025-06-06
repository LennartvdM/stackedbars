import { AssessmentChart } from './assessment-chart.js';
import { chartData, resolveTextReferences } from './chart-data.js';

// Resolved chart data (populated on init)
let resolvedChartData;

// Store chart instances
let chartInstances = {};

// Current absolute parameters - mapped to your existing HTML controls
let currentParams = {
    // Map your existing controls to absolute parameters
    rowHeight: 25,              // itemHeight -> rowHeight
    columnWidth: 20,            // colSpacing -> columnWidth (NOW WORKS!)
    labelAreaWidth: 240,        // labelWidth -> labelAreaWidth
    chartAreaX: 270,            // paddingLeft -> chartAreaX
    titleY: 25,                 // paddingTop -> titleY
    titleFontSize: 16,          // titleSize -> titleFontSize
    labelFontSize: 10,          // labelSize -> labelFontSize
    lineHeight: 12              // lineHeight stays same
};

// Map your existing HTML control IDs to new absolute parameter names
const controlMapping = {
    'itemHeight': 'rowHeight',
    'colSpacing': 'columnWidth', 
    'labelWidth': 'labelAreaWidth',
    'paddingLeft': 'chartAreaX',
    'paddingTop': 'titleY',
    'titleSize': 'titleFontSize',
    'labelSize': 'labelFontSize',
    'lineHeight': 'lineHeight'
};

// Get chart configuration with current absolute parameters
function getAbsoluteChartConfig() {
    return {
        rowHeight: currentParams.rowHeight,
        columnWidth: currentParams.columnWidth,
        labelAreaWidth: currentParams.labelAreaWidth,
        chartAreaX: currentParams.chartAreaX,
        titleY: currentParams.titleY,
        titleFontSize: currentParams.titleFontSize,
        labelFontSize: currentParams.labelFontSize,
        lineHeight: currentParams.lineHeight
    };
}

// Set up parameter controls (using your existing HTML)
function setupParameterControls() {
    // Connect your existing HTML controls to absolute parameters
    Object.keys(controlMapping).forEach(htmlControlId => {
        const absoluteParam = controlMapping[htmlControlId];
        const slider = document.getElementById(htmlControlId);
        const valueSpan = document.getElementById(htmlControlId + 'Value');
        
        if (slider && valueSpan) {
            // Set initial value
            if (currentParams[absoluteParam] !== undefined) {
                slider.value = currentParams[absoluteParam];
                valueSpan.textContent = currentParams[absoluteParam];
            }
            
            // Add event listener
            slider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                valueSpan.textContent = value + 'px';
                currentParams[absoluteParam] = value;
                
                console.log(`Updated ${absoluteParam} to ${value}`);
                updateAllCharts();
            });
        }
    });
    
    // Reset button (using your existing button)
    const resetBtn = document.getElementById('resetParams');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset to defaults
            currentParams = {
                rowHeight: 25,
                columnWidth: 20,
                labelAreaWidth: 240,
                chartAreaX: 270,
                titleY: 25,
                titleFontSize: 16,
                labelFontSize: 10,
                lineHeight: 12
            };
            
            // Update UI controls
            Object.keys(controlMapping).forEach(htmlControlId => {
                const absoluteParam = controlMapping[htmlControlId];
                const slider = document.getElementById(htmlControlId);
                const valueSpan = document.getElementById(htmlControlId + 'Value');
                
                if (slider && valueSpan && currentParams[absoluteParam] !== undefined) {
                    slider.value = currentParams[absoluteParam];
                    valueSpan.textContent = currentParams[absoluteParam] + 'px';
                }
            });
            
            updateAllCharts();
        });
    }
}

// Update all charts with current absolute parameters
function updateAllCharts() {
    const config = getAbsoluteChartConfig();
    
    // Update each chart instance
    Object.keys(chartInstances).forEach(chartKey => {
        if (chartInstances[chartKey] && resolvedChartData[chartKey]) {
            chartInstances[chartKey].updateConfig(config);
            chartInstances[chartKey].render(resolvedChartData[chartKey]);
        }
    });
}

// Initialize all charts with absolute dimensions
function initializeCharts() {
    console.log('Initializing charts with absolute dimensions...');
    
    // Resolve text references first
    resolvedChartData = resolveTextReferences(chartData);
    
    const chartIds = [
        'leadership-chart',
        'hr-chart', 
        'strategy-chart',
        'communication-chart',
        'knowledge-chart',
        'climate-chart'
    ];
    
    const chartKeys = [
        'leadership',
        'hr',
        'strategy', 
        'communication',
        'knowledge',
        'climate'
    ];
    
    chartIds.forEach((canvasId, index) => {
        const canvas = document.getElementById(canvasId);
        const chartKey = chartKeys[index];
        
        if (canvas && resolvedChartData[chartKey]) {
            console.log(`Creating chart: ${chartKey}`);
            
            // Create chart with absolute configuration
            chartInstances[chartKey] = new AssessmentChart(canvas, getAbsoluteChartConfig());
            
            // Render with resolved data
            chartInstances[chartKey].render(resolvedChartData[chartKey]);
        }
    });
    
    console.log('Charts initialized:', Object.keys(chartInstances));
}

// Generate random data (keep your existing functionality)
function generateRandomData() {
    Object.keys(chartData).forEach(key => {
        chartData[key].items.forEach(item => {
            item.score = Math.floor(Math.random() * 4) + 1;
        });
    });
    
    // Re-resolve text and update charts
    resolvedChartData = resolveTextReferences(chartData);
    updateAllCharts();
}

// Handle DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready - initializing absolute chart system...');
    
    // Initialize charts first
    initializeCharts();
    
    // Set up parameter controls (connects to your existing HTML)
    setupParameterControls();

    // Set up your existing event listeners
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateRandomData);
    }

    const toggleRandomData = document.getElementById('toggleRandomData');
    if (toggleRandomData) {
        toggleRandomData.addEventListener('change', (e) => {
            if (e.target.checked) {
                generateRandomData();
            }
        });
    }
    
    console.log('Absolute chart system ready!');
});

// Expose for debugging
window.ChartSystem = {
    charts: chartInstances,
    params: currentParams,
    updateAllCharts,
    generateRandomData
}; 