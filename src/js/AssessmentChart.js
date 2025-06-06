class AssessmentChart {
    constructor(canvas, userConfig = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // FIXED ABSOLUTE CONFIGURATION - no relative calculations
        this.config = {
            // Chart dimensions - FIXED PIXELS ONLY
            canvasWidth: 366,           // Fixed canvas width
            canvasHeight: 400,          // Fixed canvas height (will be adjusted per chart)
            
            // Layout areas - ABSOLUTE POSITIONS
            titleX: 20,                 // Title X position
            titleY: 25,                 // Title Y position from top
            
            labelAreaX: 20,             // Label area start X
            labelAreaY: 60,             // Label area start Y
            labelAreaWidth: 240,        // Fixed label area width
            
            chartAreaX: 270,            // Chart bars start X (labelAreaX + labelAreaWidth + gap)
            chartAreaY: 60,             // Chart area start Y
            chartAreaWidth: 80,         // Fixed chart area width
            
            // Grid - FIXED DIMENSIONS
            columnWidth: 20,            // Fixed column width in pixels
            rowHeight: 25,              // Fixed row height in pixels
            
            // Score numbers position
            scoreNumbersY: 75,          // Y position for score numbers (1,2,3,4)
            barsStartY: 90,             // Y position where bars start
            
            // Typography - FIXED SIZES
            titleFontSize: 16,
            labelFontSize: 10,
            scoreFontSize: 12,
            lineHeight: 12,
            
            // Colors
            colors: {
                brick1: '#cee7da',
                brick2: '#6cc6cd', 
                brick3: '#166e99',
                brick4: '#182d57',
                text: '#595959',
                title: '#076c97',
                grid: '#D0D0D0',
                numbers: '#9cc2e4'
            },
            
            // Apply user overrides
            ...userConfig
        };

        // Set canvas to exact fixed dimensions
        this.setFixedCanvasSize();
    }

    setFixedCanvasSize() {
        const dpr = window.devicePixelRatio || 1;
        
        // Set exact canvas dimensions
        this.canvas.width = this.config.canvasWidth * dpr;
        this.canvas.height = this.config.canvasHeight * dpr;
        
        // Reset any existing transforms
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(dpr, dpr);
        
        // Set exact CSS size
        this.canvas.style.width = this.config.canvasWidth + 'px';
        this.canvas.style.height = this.config.canvasHeight + 'px';
    }

    // Calculate height needed for specific number of items
    calculateHeightForItems(itemCount) {
        return this.config.barsStartY + (itemCount * this.config.rowHeight) + 30;
    }

    // Update parameters and re-size canvas
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        this.setFixedCanvasSize();
    }

    render(data) {
        if (!data || !data.items || data.items.length === 0) return;
        
        // Auto-adjust canvas height for this chart's item count
        const requiredHeight = this.calculateHeightForItems(data.items.length);
        if (this.config.canvasHeight !== requiredHeight) {
            this.config.canvasHeight = requiredHeight;
            this.setFixedCanvasSize();
        }
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render in fixed order, all top-anchored
        this.renderTitle(data.title);
        this.renderGrid(data.items.length);
        this.renderScoreNumbers();
        this.renderItems(data.items);
    }

    renderTitle(title) {
        if (!title) return;
        
        const { ctx, config } = this;
        ctx.save();
        
        // Fixed font - never changes with parameters
        ctx.font = `500 ${config.titleFontSize}px Montserrat, sans-serif`;
        ctx.fillStyle = config.colors.title;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        // Fixed position - anchored to top-left
        ctx.fillText(title, config.titleX, config.titleY);
        
        ctx.restore();
    }

    renderGrid(itemCount) {
        const { ctx, config } = this;
        
        ctx.save();
        ctx.strokeStyle = config.colors.grid;
        ctx.lineWidth = 1;
        
        // Fixed grid dimensions
        const gridHeight = itemCount * config.rowHeight;
        
        // Draw exactly 5 vertical lines (for 4 score columns)
        for (let i = 0; i <= 4; i++) {
            const x = config.chartAreaX + (i * config.columnWidth);
            
            ctx.beginPath();
            ctx.moveTo(x, config.barsStartY);
            ctx.lineTo(x, config.barsStartY + gridHeight);
            ctx.stroke();
        }
        
        ctx.restore();
    }

    renderScoreNumbers() {
        const { ctx, config } = this;
        
        ctx.save();
        
        // Fixed font
        ctx.font = `bold ${config.scoreFontSize}px Montserrat, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = config.colors.numbers;
        
        // Draw numbers 1-4 at fixed positions
        for (let i = 1; i <= 4; i++) {
            const x = config.chartAreaX + ((i - 1) * config.columnWidth) + (config.columnWidth / 2);
            ctx.fillText(i.toString(), x, config.scoreNumbersY);
        }
        
        ctx.restore();
    }

    renderItems(items) {
        items.forEach((item, index) => {
            // Fixed Y position for this item - top-anchored
            const itemY = this.config.barsStartY + (index * this.config.rowHeight);
            
            this.renderItemLabel(item.label, itemY);
            this.renderItemBars(item.score, itemY);
        });
    }

    renderItemLabel(text, itemY) {
        const { ctx, config } = this;
        
        ctx.save();
        
        // Fixed font - never changes
        ctx.font = `400 ${config.labelFontSize}px Montserrat, sans-serif`;
        ctx.fillStyle = config.colors.text;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        
        // Wrap text to fixed width
        const lines = this.wrapTextToFixedWidth(text, config.labelAreaWidth - 10);
        
        // Calculate starting Y for vertical centering within row
        const totalTextHeight = lines.length * config.lineHeight;
        const textStartY = itemY + ((config.rowHeight - totalTextHeight) / 2);
        
        // Draw each line at fixed positions - top-anchored
        lines.forEach((line, lineIndex) => {
            const lineY = textStartY + (lineIndex * config.lineHeight);
            ctx.fillText(line, config.labelAreaX, lineY);
        });
        
        ctx.restore();
    }

    renderItemBars(score, itemY) {
        const { ctx, config } = this;
        
        // Fixed bar dimensions
        const barHeight = Math.floor(config.rowHeight * 0.6);
        const barY = itemY + ((config.rowHeight - barHeight) / 2);
        
        // Draw score bars at fixed positions
        for (let segment = 1; segment <= score; segment++) {
            const barX = config.chartAreaX + ((segment - 1) * config.columnWidth);
            
            ctx.fillStyle = config.colors[`brick${segment}`];
            ctx.fillRect(barX, barY, config.columnWidth, barHeight);
        }
    }

    wrapTextToFixedWidth(text, maxWidth) {
        const { ctx } = this;
        
        // Quick check - if text fits, return as single line
        if (ctx.measureText(text).width <= maxWidth) {
            return [text];
        }
        
        // Split and wrap to fixed width
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
        
        // Hard limit to 3 lines to prevent overflow
        return lines.slice(0, 3);
    }
}

export { AssessmentChart }; 