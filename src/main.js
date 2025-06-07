import { AssessmentChart } from './AssessmentChart.js';
import { chartData, resolveTextReferences } from './chart-data.js';

// Resolved chart data
let resolvedChartData;

// Current parameters - all manual controls preserved
let currentParams = {
    itemHeight: 25,
    itemGap: 5,
    colSpacing: 82,
    labelWidth: 340,
    paddingTop: 60,
    paddingLeft: 380,
    paddingBottom: 20,
    titleSize: 20,
    labelSize: 11,
    lineHeight: 13,
    showGridLines: true,
    gridLineWidth: 1,
    dividerWidth: 200,
    dividerStroke: 1
};

// Get chart configuration
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
        labelWidth: currentParams.labelWidth,
        showGridLines: currentParams.showGridLines,
        gridLineWidth: currentParams.gridLineWidth,
        dividerWidth: currentParams.dividerWidth,
        dividerStroke: currentParams.dividerStroke
    };
    
    // Adjust for half-column charts
    if (type === 'half') {
        baseConfig.padding.left = currentParams.labelWidth;
    }
    
    return baseConfig;
}

// Auto-fit text function
function autoFitText() {
    // Create a temporary canvas for text measurement
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d');
    
    // Get the longest label across all charts
    let longestLabel = '';
    let maxLabelLength = 0;
    
    Object.values(resolvedChartData).forEach(chart => {
        chart.items.forEach(item => {
            if (item.label.length > maxLabelLength) {
                maxLabelLength = item.label.length;
                longestLabel = item.label;
            }
        });
    });
    
    // Calculate available space
    const availableLabelWidth = currentParams.labelWidth - 40;
    const availableHeight = currentParams.itemHeight - 4; // Leave some padding
    
    // Find optimal font size
    let optimalFontSize = 20;
    let optimalLineHeight = 24;
    
    for (let fontSize = 20; fontSize >= 6; fontSize--) {
        ctx.font = `400 ${fontSize}px Montserrat`;
        const lineHeight = Math.round(fontSize * 1.2);
        
        // Calculate wrapped lines
        const words = longestLabel.split(' ');
        const lines = [];
        let currentLine = '';
        
        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            if (ctx.measureText(testLine).width <= availableLabelWidth) {
                currentLine = testLine;
            } else {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            }
        }
        if (currentLine) lines.push(currentLine);
        
        // Check if it fits vertically
        const totalHeight = lines.length * lineHeight;
        if (totalHeight <= availableHeight) {
            optimalFontSize = fontSize;
            optimalLineHeight = lineHeight;
            break;
        }
    }
    
    // Update parameters
    currentParams.labelSize = optimalFontSize;
    currentParams.lineHeight = optimalLineHeight;
    currentParams.titleSize = Math.min(24, Math.round(optimalFontSize * 1.8));
    
    // Update UI controls
    updateControlValues();
    
    // Re-render charts
    updateAllCharts();
    
    console.log(`Auto-fit: Font size: ${optimalFontSize}px, Line height: ${optimalLineHeight}px`);
}

// Update control values in UI
function updateControlValues() {
    Object.keys(currentParams).forEach(param => {
        if (param === 'showGridLines') {
            const checkbox = document.getElementById(param);
            if (checkbox) checkbox.checked = currentParams[param];
        } else {
            const slider = document.getElementById(param);
            const valueSpan = document.getElementById(param + 'Value');
            if (slider && valueSpan) {
                slider.value = currentParams[param];
                valueSpan.textContent = currentParams[param] + 'px';
            }
        }
    });
}

// Set up parameter controls
function setupParameterControls() {
    const paramNames = [
        'itemHeight', 'itemGap', 'colSpacing', 'labelWidth', 
        'paddingTop', 'paddingLeft', 'paddingBottom', 
        'titleSize', 'labelSize', 'lineHeight',
        'gridLineWidth', 'dividerWidth', 'dividerStroke'
    ];
    
    paramNames.forEach(param => {
        const slider = document.getElementById(param);
        const valueSpan = document.getElementById(param + 'Value');
        
        if (slider && valueSpan) {
            // Set initial value
            slider.value = currentParams[param];
            valueSpan.textContent = currentParams[param] + 'px';
            
            slider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                valueSpan.textContent = value + 'px';
                currentParams[param] = value;
                updateAllCharts();
            });
        }
    });
    
    // Handle checkbox for grid lines
    const showGridCheckbox = document.getElementById('showGridLines');
    if (showGridCheckbox) {
        showGridCheckbox.checked = currentParams.showGridLines;
        showGridCheckbox.addEventListener('change', (e) => {
            currentParams.showGridLines = e.target.checked;
            updateAllCharts();
        });
    }
    
    // Auto-fit button
    const autoFitBtn = document.getElementById('autoFitText');
    if (autoFitBtn) {
        autoFitBtn.addEventListener('click', autoFitText);
    }
    
    // Reset button
    const resetBtn = document.getElementById('resetParams');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset to defaults
            currentParams = {
                itemHeight: 25, itemGap: 5, colSpacing: 82, labelWidth: 340,
                paddingTop: 60, paddingLeft: 380, paddingBottom: 20,
                titleSize: 20, labelSize: 11, lineHeight: 13,
                showGridLines: true, gridLineWidth: 1, dividerWidth: 200, dividerStroke: 1
            };
            
            updateControlValues();
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

// Toggle guides
function setupGuideToggle() {
    const toggleGuides = document.getElementById('toggleGuides');
    if (toggleGuides) {
        toggleGuides.addEventListener('change', (e) => {
            document.body.classList.toggle('show-guides', e.target.checked);
        });
        // Set initial state
        document.body.classList.toggle('show-guides', toggleGuides.checked);
    }
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Starting chart system with auto-fit...');
    
    // Resolve text references
    resolvedChartData = resolveTextReferences(chartData);
    
    // Set up all controls and listeners
    setupParameterControls();
    setupGuideToggle();
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
            } else {
                // Reset to original data
                resolvedChartData = resolveTextReferences(chartData);
                updateAllCharts();
            }
        });
    }
    
    console.log('Chart system ready - use Auto-Fit Text button for optimal sizing!');
});

// Expose for debugging
window.ChartSystem = {
    params: currentParams,
    updateAllCharts,
    generateRandomData,
    autoFitText
}; 