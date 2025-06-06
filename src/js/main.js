import { AssessmentChart } from './assessment-chart.js';
import { chartData, resolveTextReferences } from './chart-data.js';

// Resolved chart data (populated on init)
let resolvedChartData;

// ABSOLUTE parameter defaults (no more relative calculations)
const absoluteDefaults = {
    itemHeight: 25,      // Direct row height
    colSpacing: 20,      // Direct column width in pixels
    labelWidth: 240,     // Direct label area width
    chartStartX: 270,    // Direct X position where chart starts
    titleSize: 20,
    labelSize: 11,
    lineHeight: 13
};

let currentParams = { ...absoluteDefaults };

// Get absolute chart configuration
function getAbsoluteChartConfig() {
    return {
        itemHeight: currentParams.itemHeight,
        colSpacing: currentParams.colSpacing,
        labelWidth: currentParams.labelWidth,
        chartStartX: currentParams.chartStartX,
        font: {
            title: `500 ${currentParams.titleSize}px Montserrat`,
            labels: `400 ${currentParams.labelSize}px Montserrat`,
            scores: 'bold 20px Montserrat'
        },
        lineHeight: currentParams.lineHeight
    };
}

// Map HTML controls to absolute parameters
const controlMap = {
    'itemHeight': 'itemHeight',       // Direct mapping now
    'colSpacing': 'colSpacing',       // This will ACTUALLY work now
    'labelWidth': 'labelWidth',       
    'paddingLeft': 'chartStartX',     // Where chart bars start
    'titleSize': 'titleSize',
    'labelSize': 'labelSize',
    'lineHeight': 'lineHeight'
};

// Setup parameter controls
function setupParameterControls() {
    Object.keys(controlMap).forEach(htmlId => {
        const paramName = controlMap[htmlId];
        const slider = document.getElementById(htmlId);
        const valueSpan = document.getElementById(htmlId + 'Value');
        
        if (slider && valueSpan) {
            // Set initial value
            slider.value = currentParams[paramName];
            valueSpan.textContent = currentParams[paramName];
            
            // Add event listener
            slider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                valueSpan.textContent = value + 'px';
                currentParams[paramName] = value;
                
                console.log(`${paramName} = ${value}px`);
                updateAllCharts();
            });
        }
    });
    
    // Reset button
    const resetBtn = document.getElementById('resetParams');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            currentParams = { ...absoluteDefaults };
            
            // Update UI
            Object.keys(controlMap).forEach(htmlId => {
                const paramName = controlMap[htmlId];
                const slider = document.getElementById(htmlId);
                const valueSpan = document.getElementById(htmlId + 'Value');
                
                if (slider && valueSpan) {
                    slider.value = currentParams[paramName];
                    valueSpan.textContent = currentParams[paramName] + 'px';
                }
            });
            
            updateAllCharts();
        });
    }
}

// Update all charts with absolute parameters
function updateAllCharts() {
    const config = getAbsoluteChartConfig();
    
    const charts = [
        { id: 'leadership-chart', data: resolvedChartData.leadership },
        { id: 'hr-chart', data: resolvedChartData.hr },
        { id: 'strategy-chart', data: resolvedChartData.strategy },
        { id: 'communication-chart', data: resolvedChartData.communication },
        { id: 'knowledge-chart', data: resolvedChartData.knowledge },
        { id: 'climate-chart', data: resolvedChartData.climate }
    ];

    charts.forEach(({ id, data }) => {
        const canvas = document.getElementById(id);
        if (canvas && data) {
            const chart = new AssessmentChart(canvas, config);
            chart.render(data);
        }
    });
}

// Generate random data
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

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Starting FIXED absolute chart system...');
    
    // Resolve text references first
    resolvedChartData = resolveTextReferences(chartData);
    
    setupParameterControls();
    updateAllCharts();

    // Existing event listeners
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
    
    console.log('FIXED system ready - column width should work now!');
});

// Expose for debugging
window.ChartSystem = {
    params: currentParams,
    updateAllCharts,
    generateRandomData
}; 