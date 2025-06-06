class AssessmentChart {
    constructor(canvas, userConfig = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Initialize canvas with proper sizing
        this.initCanvas();
        
        // ABSOLUTE DIMENSIONS - Based on HR chart as reference (14 items)
        // These are fixed values that ensure consistent layout across all charts
        this.ABSOLUTE_DIMENSIONS = {
            // Canvas dimensions
            canvasWidth: 366,
            canvasHeight: 400, // Fixed height that works well for HR chart
            
            // Layout dimensions (absolute values)
            labelWidth: 240,        // Fixed width for label area
            chartWidth: 120,        // Fixed width for chart area (4 columns × 30px)
            columnWidth: 30,        // Fixed width per score column
            rowHeight: 22,          // Fixed height per item row
            
            // Padding (absolute values)
            paddingTop: 50,
            paddingLeft: 10,        // Left edge padding
            paddingRight: 6,        // Right edge padding
            paddingBottom: 20,
            
            // Text sizing
            titleSize: 16,
            labelSize: 10,
            scoreSize: 12,
            lineHeight: 11,
            
            // Spacing
            headerSpacing: 25,      // Space between title and first item
            scoreHeaderSpacing: 15  // Space for score numbers above chart
        };
        
        // Color scheme
        this.colors = {
            brick1: '#cee7da',
            brick2: '#6cc6cd', 
            brick3: '#166e99',
            brick4: '#182d57',
            text: '#595959',
            title: '#076c97',
            grid: '#D0D0D0',
            numbers: '#9cc2e4'
        };
        
        // Apply user configuration overrides
        if (userConfig.dimensions) {
            Object.assign(this.ABSOLUTE_DIMENSIONS, userConfig.dimensions);
        }
        if (userConfig.colors) {
            Object.assign(this.colors, userConfig.colors);
        }
        
        // Set canvas to absolute dimensions
        this.setAbsoluteDimensions();
    }

    initCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // We'll override this with absolute dimensions
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
    }
    
    setAbsoluteDimensions() {
        const dims = this.ABSOLUTE_DIMENSIONS;
        const dpr = window.devicePixelRatio || 1;
        
        // Set canvas to absolute dimensions
        this.canvas.width = dims.canvasWidth * dpr;
        this.canvas.height = dims.canvasHeight * dpr;
        
        // Reset context scaling
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
        
        // Set CSS dimensions
        this.canvas.style.width = dims.canvasWidth + 'px';
        this.canvas.style.height = dims.canvasHeight + 'px';
    }

    /**
     * Update specific dimension parameters while maintaining absolute positioning
     */
    updateDimensions(newDimensions) {
        Object.assign(this.ABSOLUTE_DIMENSIONS, newDimensions);
        this.setAbsoluteDimensions();
    }

    /**
     * Calculate the optimal canvas height for a given number of items
     */
    static calculateOptimalHeight(itemCount) {
        const baseHeight = 50 + 25 + 15 + 20; // padding + header + score spacing + bottom
        const itemsHeight = itemCount * 22; // rowHeight
        return Math.max(200, baseHeight + itemsHeight);
    }

    render(data) {
        if (!data || !data.items || data.items.length === 0) return;
        
        const dims = this.ABSOLUTE_DIMENSIONS;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Calculate positions based on absolute dimensions
        this.labelAreaX = dims.paddingLeft;
        this.labelAreaWidth = dims.labelWidth;
        this.chartAreaX = dims.paddingLeft + dims.labelWidth;
        this.chartAreaWidth = dims.chartWidth;
        
        // Render components
        this.drawTitle(data.title);
        this.drawGrid(data.items.length);
        this.drawScoreNumbers();
        this.drawItems(data.items);
    }

    drawTitle(title) {
        if (!title) return;
        
        const dims = this.ABSOLUTE_DIMENSIONS;
        const { ctx } = this;
        
        ctx.save();
        ctx.font = `500 ${dims.titleSize}px Montserrat, sans-serif`;
        ctx.fillStyle = this.colors.title;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        ctx.fillText(title, dims.paddingLeft, dims.paddingTop);
        ctx.restore();
    }

    drawGrid(itemCount) {
        const dims = this.ABSOLUTE_DIMENSIONS;
        const { ctx } = this;
        
        ctx.save();
        ctx.strokeStyle = this.colors.grid;
        ctx.lineWidth = 1;
        
        const gridStartX = this.chartAreaX;
        const gridStartY = dims.paddingTop + dims.headerSpacing + dims.scoreHeaderSpacing;
        const gridHeight = itemCount * dims.rowHeight;
        
        // Draw vertical grid lines (for each score column + one extra)
        for (let i = 0; i <= 4; i++) {
            const x = gridStartX + (i * dims.columnWidth);
            ctx.beginPath();
            ctx.moveTo(x, gridStartY);
            ctx.lineTo(x, gridStartY + gridHeight);
            ctx.stroke();
        }
        
        ctx.restore();
    }

    drawScoreNumbers() {
        const dims = this.ABSOLUTE_DIMENSIONS;
        const { ctx } = this;
        
        ctx.save();
        ctx.font = `bold ${dims.scoreSize}px Montserrat, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.colors.numbers;
        
        const numberY = dims.paddingTop + dims.headerSpacing + (dims.scoreHeaderSpacing / 2);
        
        for (let i = 1; i <= 4; i++) {
            const x = this.chartAreaX + ((i - 1) * dims.columnWidth) + (dims.columnWidth / 2);
            ctx.fillText(i.toString(), x, numberY);
        }
        
        ctx.restore();
    }

    drawItems(items) {
        const dims = this.ABSOLUTE_DIMENSIONS;
        const startY = dims.paddingTop + dims.headerSpacing + dims.scoreHeaderSpacing;
        
        items.forEach((item, index) => {
            const y = startY + (index * dims.rowHeight);
            this.drawItemLabel(item.label, y);
            this.drawItemScore(item.score, y);
        });
    }

    drawItemLabel(text, y) {
        const dims = this.ABSOLUTE_DIMENSIONS;
        const { ctx } = this;
        
        ctx.save();
        ctx.font = `400 ${dims.labelSize}px Montserrat, sans-serif`;
        ctx.fillStyle = this.colors.text;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        
        // Use fixed label width for text wrapping
        const lines = this.wrapText(text, this.labelAreaWidth - 10); // 10px right margin
        const totalHeight = lines.length * dims.lineHeight;
        const startLineY = y + (dims.rowHeight / 2) - (totalHeight / 2) + (dims.lineHeight / 2);
        
        lines.forEach((line, lineIndex) => {
            const lineY = startLineY + (lineIndex * dims.lineHeight);
            ctx.fillText(line, this.labelAreaX + 5, lineY);
        });
        
        ctx.restore();
    }

    drawItemScore(score, y) {
        const dims = this.ABSOLUTE_DIMENSIONS;
        const { ctx } = this;
        
        // Draw score bars
        for (let segment = 1; segment <= score; segment++) {
            const x = this.chartAreaX + ((segment - 1) * dims.columnWidth);
            const barHeight = Math.floor(dims.rowHeight * 0.6); // 60% of row height
            const barY = y + ((dims.rowHeight - barHeight) / 2);
            
            ctx.fillStyle = this.colors[`brick${segment}`];
            ctx.fillRect(x, barY, dims.columnWidth, barHeight);
        }
    }

    wrapText(text, maxWidth) {
        const { ctx } = this;
        
        if (ctx.measureText(text).width <= maxWidth) {
            return [text];
        }
        
        const words = text.split(' ');
        const lines = [];
        let currentLine = words[0];
        
        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const testLine = currentLine + ' ' + word;
            
            if (ctx.measureText(testLine).width <= maxWidth) {
                currentLine = testLine;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        
        if (currentLine) {
            lines.push(currentLine);
        }
        
        // Limit to 3 lines to prevent overflow
        return lines.slice(0, 3);
    }

    /**
     * Get current dimensions for external use
     */
    getDimensions() {
        return { ...this.ABSOLUTE_DIMENSIONS };
    }

    /**
     * Static method to create charts with consistent dimensions
     */
    static createWithStandardDimensions(canvas, overrides = {}) {
        const standardDims = {
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
        
        return new AssessmentChart(canvas, {
            dimensions: { ...standardDims, ...overrides }
        });
    }
}

export { AssessmentChart }; 