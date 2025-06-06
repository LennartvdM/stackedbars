class ChartControlSystem {
    constructor(charts) {
        this.charts = charts; // Map of chart instances
        this.initializeControls();
        this.setupEventListeners();
    }

    initializeControls() {
        // Create control panel if it doesn't exist
        if (!document.getElementById('absoluteControls')) {
            this.createControlPanel();
        }
        this.updateControlValues();
    }

    createControlPanel() {
        const existingPanel = document.querySelector('.control-panel');
        if (existingPanel) {
            existingPanel.innerHTML = this.getControlPanelHTML();
        }
    }

    getControlPanelHTML() {
        return `
            <h3>Chart Parameters (Absolute)</h3>
            
            <div class="control-group">
                <h4>Canvas Dimensions</h4>
                <label>
                    <span>Canvas Width:</span>
                    <input type="range" id="canvasWidth" min="300" max="500" value="366" step="1">
                    <span id="canvasWidthValue">366px</span>
                </label>
                <label>
                    <span>Canvas Height:</span>
                    <input type="range" id="canvasHeight" min="300" max="600" value="400" step="1">
                    <span id="canvasHeightValue">400px</span>
                </label>
            </div>

            <div class="control-group">
                <h4>Layout Dimensions</h4>
                <label>
                    <span>Label Width:</span>
                    <input type="range" id="labelWidth" min="180" max="280" value="240" step="1">
                    <span id="labelWidthValue">240px</span>
                </label>
                <label>
                    <span>Chart Width:</span>
                    <input type="range" id="chartWidth" min="80" max="160" value="120" step="1">
                    <span id="chartWidthValue">120px</span>
                </label>
                <label>
                    <span>Column Width:</span>
                    <input type="range" id="columnWidth" min="20" max="40" value="30" step="1">
                    <span id="columnWidthValue">30px</span>
                </label>
                <label>
                    <span>Row Height:</span>
                    <input type="range" id="rowHeight" min="18" max="30" value="22" step="1">
                    <span id="rowHeightValue">22px</span>
                </label>
            </div>

            <div class="control-group">
                <h4>Padding</h4>
                <label>
                    <span>Top:</span>
                    <input type="range" id="paddingTop" min="30" max="80" value="50" step="1">
                    <span id="paddingTopValue">50px</span>
                </label>
                <label>
                    <span>Left:</span>
                    <input type="range" id="paddingLeft" min="5" max="20" value="10" step="1">
                    <span id="paddingLeftValue">10px</span>
                </label>
                <label>
                    <span>Right:</span>
                    <input type="range" id="paddingRight" min="2" max="15" value="6" step="1">
                    <span id="paddingRightValue">6px</span>
                </label>
                <label>
                    <span>Bottom:</span>
                    <input type="range" id="paddingBottom" min="10" max="40" value="20" step="1">
                    <span id="paddingBottomValue">20px</span>
                </label>
            </div>

            <div class="control-group">
                <h4>Typography</h4>
                <label>
                    <span>Title Size:</span>
                    <input type="range" id="titleSize" min="12" max="20" value="16" step="1">
                    <span id="titleSizeValue">16px</span>
                </label>
                <label>
                    <span>Label Size:</span>
                    <input type="range" id="labelSize" min="8" max="14" value="10" step="1">
                    <span id="labelSizeValue">10px</span>
                </label>
                <label>
                    <span>Score Size:</span>
                    <input type="range" id="scoreSize" min="10" max="16" value="12" step="1">
                    <span id="scoreSizeValue">12px</span>
                </label>
                <label>
                    <span>Line Height:</span>
                    <input type="range" id="lineHeight" min="9" max="15" value="11" step="1">
                    <span id="lineHeightValue">11px</span>
                </label>
            </div>

            <div class="control-group">
                <h4>Spacing</h4>
                <label>
                    <span>Header Spacing:</span>
                    <input type="range" id="headerSpacing" min="15" max="35" value="25" step="1">
                    <span id="headerSpacingValue">25px</span>
                </label>
                <label>
                    <span>Score Header:</span>
                    <input type="range" id="scoreHeaderSpacing" min="10" max="25" value="15" step="1">
                    <span id="scoreHeaderSpacingValue">15px</span>
                </label>
            </div>

            <div class="control-group">
                <h4>Presets</h4>
                <button id="resetToDefaults" class="preset-btn">Reset to Defaults</button>
                <button id="optimizeForHR" class="preset-btn">Optimize for HR (14 items)</button>
                <button id="optimizeForStrategy" class="preset-btn">Optimize for Strategy (8 items)</button>
                <button id="savePreset" class="preset-btn">Save Current as Preset</button>
            </div>

            <div class="control-group">
                <h4>Quick Actions</h4>
                <button id="autoFitContent" class="action-btn">Auto-fit Content</button>
                <button id="maximizeLabels" class="action-btn">Maximize Label Area</button>
                <button id="balanceLayout" class="action-btn">Balance Layout</button>
            </div>
        `;
    }

    setupEventListeners() {
        // Dimension controls
        const dimensionControls = [
            'canvasWidth', 'canvasHeight', 'labelWidth', 'chartWidth', 'columnWidth', 'rowHeight',
            'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom',
            'titleSize', 'labelSize', 'scoreSize', 'lineHeight',
            'headerSpacing', 'scoreHeaderSpacing'
        ];

        dimensionControls.forEach(controlId => {
            const control = document.getElementById(controlId);
            if (control) {
                control.addEventListener('input', (e) => {
                    this.updateParameter(controlId, parseInt(e.target.value));
                });
            }
        });

        // Preset buttons
        const resetBtn = document.getElementById('resetToDefaults');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetToDefaults());
        }

        const optimizeHRBtn = document.getElementById('optimizeForHR');
        if (optimizeHRBtn) {
            optimizeHRBtn.addEventListener('click', () => this.optimizeForHR());
        }

        const optimizeStrategyBtn = document.getElementById('optimizeForStrategy');
        if (optimizeStrategyBtn) {
            optimizeStrategyBtn.addEventListener('click', () => this.optimizeForStrategy());
        }

        // Action buttons
        const autoFitBtn = document.getElementById('autoFitContent');
        if (autoFitBtn) {
            autoFitBtn.addEventListener('click', () => this.autoFitContent());
        }

        const maximizeLabelsBtn = document.getElementById('maximizeLabels');
        if (maximizeLabelsBtn) {
            maximizeLabelsBtn.addEventListener('click', () => this.maximizeLabels());
        }

        const balanceLayoutBtn = document.getElementById('balanceLayout');
        if (balanceLayoutBtn) {
            balanceLayoutBtn.addEventListener('click', () => this.balanceLayout());
        }
    }

    updateParameter(parameterName, value) {
        const updates = { [parameterName]: value };
        
        // Update all charts with new parameter
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.updateDimensions) {
                chart.updateDimensions(updates);
            }
        });

        // Update display value
        const valueSpan = document.getElementById(parameterName + 'Value');
        if (valueSpan) {
            valueSpan.textContent = value + 'px';
        }

        // Re-render all charts
        this.rerenderAllCharts();
    }

    updateControlValues() {
        // Get current dimensions from first chart
        const firstChart = Object.values(this.charts)[0];
        if (!firstChart || !firstChart.getDimensions) return;

        const currentDims = firstChart.getDimensions();
        
        Object.keys(currentDims).forEach(key => {
            const control = document.getElementById(key);
            const valueSpan = document.getElementById(key + 'Value');
            
            if (control) {
                control.value = currentDims[key];
            }
            if (valueSpan) {
                valueSpan.textContent = currentDims[key] + 'px';
            }
        });
    }

    resetToDefaults() {
        const defaults = {
            canvasWidth: 366,
            canvasHeight: 400,
            labelWidth: 240,
            chartWidth: 120,
            columnWidth: 30,
            rowHeight: 22,
            paddingTop: 50,
            paddingLeft: 10,
            paddingRight: 6,
            paddingBottom: 20,
            titleSize: 16,
            labelSize: 10,
            scoreSize: 12,
            lineHeight: 11,
            headerSpacing: 25,
            scoreHeaderSpacing: 15
        };

        this.applyPreset(defaults);
    }

    optimizeForHR() {
        // Optimized for 14 items (HR Management chart)
        const hrOptimized = {
            canvasHeight: 450,
            rowHeight: 24,
            labelSize: 9,
            lineHeight: 10,
            labelWidth: 250,
            paddingTop: 45
        };

        this.applyPreset(hrOptimized);
    }

    optimizeForStrategy() {
        // Optimized for 8 items (Strategy chart)
        const strategyOptimized = {
            canvasHeight: 320,
            rowHeight: 26,
            labelSize: 11,
            lineHeight: 12,
            paddingTop: 55
        };

        this.applyPreset(strategyOptimized);
    }

    autoFitContent() {
        // Auto-calculate dimensions based on content
        const hrChart = this.charts.hr;
        if (hrChart && hrChart.data && hrChart.data.items) {
            const itemCount = hrChart.data.items.length;
            const optimalHeight = AssessmentChart.calculateOptimalHeight(itemCount);
            
            this.updateParameter('canvasHeight', optimalHeight);
        }
    }

    maximizeLabels() {
        const maximize = {
            labelWidth: 270,
            chartWidth: 90,
            columnWidth: 22,
            paddingLeft: 8
        };

        this.applyPreset(maximize);
    }

    balanceLayout() {
        const balanced = {
            labelWidth: 240,
            chartWidth: 120,
            columnWidth: 30,
            paddingLeft: 10,
            paddingRight: 6
        };

        this.applyPreset(balanced);
    }

    applyPreset(preset) {
        Object.values(this.charts).forEach(chart => {
            if (chart && chart.updateDimensions) {
                chart.updateDimensions(preset);
            }
        });

        this.updateControlValues();
        this.rerenderAllCharts();
    }

    rerenderAllCharts() {
        Object.entries(this.charts).forEach(([key, chart]) => {
            if (chart && chart.render && this.chartData && this.chartData[key]) {
                chart.render(this.chartData[key]);
            }
        });
    }

    // Set chart data reference for re-rendering
    setChartData(chartData) {
        this.chartData = chartData;
    }
}

export { ChartControlSystem }; 