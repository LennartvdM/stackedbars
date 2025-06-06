import { AssessmentChart } from './assessment-chart.js';
import { chartData, resolveTextReferences } from './chart-data.js';

// Resolved chart data
let resolvedChartData;

// Current parameters that match your HTML controls exactly
let currentParams = {
    itemHeight: 25,
    itemGap: 5,
    colSpacing: 82,      // This now works properly!
    labelWidth: 340,
    paddingTop: 60,
    paddingLeft: 380,
    paddingBottom: 20,
    titleSize: 20,
    labelSize: 11,
    lineHeight: 13
};

// Get chart configuration that respects your parameters
function getChartConfig(type) {
    const baseConfig = {
        itemHeight: currentParams.itemHeight,
        itemGap: currentParams.itemGap,
        colSpacing: currentParams.colSpacing,    // Now properly respected
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

// Set up parameter controls using your exact HTML IDs
function setupParameterControls() {
    const paramNames = [
        'itemHeight', 'itemGap', 'colSpacing', 'labelWidth', 
        'paddingTop', 'paddingLeft', 'paddingBottom', 
        'titleSize', 'labelSize', 'lineHeight'
    ];
    
    paramNames.forEach(param => {
        const slider = document.getElementById(param);
        const valueSpan = document.getElementById(param + 'Value');
        
        if (slider && valueSpan) {
            // Set initial value
            slider.value = currentParams[param];
            valueSpan.textContent = currentParams[param];
            
            slider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                valueSpan.textContent = value + 'px';
                currentParams[param] = value;
                
                console.log(`${param} = ${value}`);
                updateAllCharts();
            });
        }
    });
    
    // Reset button
    const resetBtn = document.getElementById('resetParams');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset to defaults
            currentParams = {
                itemHeight: 25, itemGap: 5, colSpacing: 82, labelWidth: 340,
                paddingTop: 60, paddingLeft: 380, paddingBottom: 20,
                titleSize: 20, labelSize: 11, lineHeight: 13
            };
            
            // Update UI
            paramNames.forEach(param => {
                const slider = document.getElementById(param);
                const valueSpan = document.getElementById(param + 'Value');
                if (slider && valueSpan) {
                    slider.value = currentParams[param];
                    valueSpan.textContent = currentParams[param] + 'px';
                }
            });
            
            updateAllCharts();
        });
    }
}

// Update all charts with current parameters
function updateAllCharts() {
    const charts = [
        { id: 'leadership-chart', data: resolvedChartData.leadership, type: 'full' },
        { id: 'hr-chart', data: resolvedChartData.hr, type: 'full' },
        { id: 'strategy-chart', data: resolvedChartData.strategy, type: 'half' },
        { id: 'communication-chart', data: resolvedChartData.communication, type: 'half' },
        { id: 'knowledge-chart', data: resolvedChartData.knowledge, type: 'half' },
        { id: 'climate-chart', data: resolvedChartData.climate, type: 'half' }
    ];

    charts.forEach(({ id, data, type }) => {
        const canvas = document.getElementById(id);
        if (canvas && data) {
            const chart = new AssessmentChart(canvas, getChartConfig(type));
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
    
    // Re-resolve and update
    resolvedChartData = resolveTextReferences(chartData);
    updateAllCharts();
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Starting FIXED chart system...');
    
    // Resolve text references
    resolvedChartData = resolveTextReferences(chartData);
    
    setupParameterControls();
    updateAllCharts();

    // Set up event listeners
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
    
    console.log('Fixed system ready - colSpacing should work now!');
});

// Expose for debugging
window.ChartSystem = {
    params: currentParams,
    updateAllCharts,
    generateRandomData
}; 