class AssessmentChart {
    constructor(canvas, userConfig = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // FIXED ABSOLUTE CONFIGURATION - replaces your relative system
        this.config = {
            // Remove all relative calculations - use absolute pixels only
            itemHeight: 25,           // Direct control - no derived rowHeight
            colSpacing: 20,           // Direct pixel width per column (NOT divided by maxScore)
            labelWidth: 240,          // Direct pixel width for labels
            
            // Absolute positioning - anchored to top-left
            titleX: 20,
            titleY: 25,
            labelsStartX: 20,
            chartStartX: 270,         // Fixed X where chart bars start
            barsStartY: 90,           // Fixed Y where bars start
            
            padding: { 
                top: 60, 
                right: 40, 
                bottom: 20, 
                left: 270  // This becomes chartStartX
            },
            
            maxScore: 4,
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
            font: {
                title: '500 20px Montserrat',
                labels: '400 11px Montserrat',
                scores: 'bold 20px Montserrat'
            },
            lineHeight: 13,
            
            // Apply user overrides
            ...userConfig
        };

        // REMOVE derived calculations - everything is absolute now
        // No more: this.rowHeight = this.config.itemHeight + this.config.itemGap;
        // No more: this.rectWidth = this.config.colSpacing;
    }

    autoSizeCanvas(itemCount) {
        // Simplified - just calculate height needed
        const requiredHeight = this.config.barsStartY + (itemCount * this.config.itemHeight) + 40;
        this.canvas.height = requiredHeight;
        this.canvas.style.height = requiredHeight + 'px';
    }

    // REMOVE calculateMeasurements() - was causing the column width problem
    // calculateMeasurements(itemCount) {
    //     // This was the problem - dividing available width destroyed column control
    //     // const availableChartWidth = canvasWidth - leftPadding;
    //     // this.rectWidth = Math.floor(availableChartWidth / this.config.maxScore);
    // }

    render(data) {
        if (!data || !data.items || data.items.length === 0) return;
        
        this.autoSizeCanvas(data.items.length);
        // REMOVED: this.calculateMeasurements(data.items.length);  // This was the problem!
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid(data.items.length);
        this.drawTitle(data.title);
        this.drawScaleNumbers();
        this.drawBars(data.items);
    }

    drawTitle(title) {
        if (!title) return;
        const { ctx, config } = this;
        ctx.save();
        ctx.font = config.font.title;
        ctx.fillStyle = config.colors.title;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';  // TOP-ANCHORED instead of baseline
        ctx.fillText(title, config.titleX, config.titleY);
        ctx.restore();
    }

    drawGrid(itemCount) {
        const { ctx, config } = this;
        ctx.save();
        ctx.strokeStyle = config.colors.grid;
        ctx.lineWidth = 1;
        
        // Fixed grid using absolute colSpacing
        const gridStartX = config.chartStartX;
        const gridStartY = config.barsStartY;
        const gridHeight = itemCount * config.itemHeight;
        
        for (let i = 0; i <= config.maxScore; i++) {
            const x = gridStartX + (i * config.colSpacing);  // Use direct colSpacing
            ctx.beginPath();
            ctx.moveTo(x, gridStartY);
            ctx.lineTo(x, gridStartY + gridHeight);
            ctx.stroke();
        }
        ctx.restore();
    }

    drawScaleNumbers() {
        const { ctx, config } = this;
        ctx.save();
        ctx.font = config.font.scores;
        ctx.textAlign = 'center';
        ctx.fillStyle = config.colors.numbers;
        
        const headerY = config.barsStartY - 15;  // Fixed position above bars
        
        for (let i = 1; i <= config.maxScore; i++) {
            const x = config.chartStartX + ((i - 1) * config.colSpacing) + (config.colSpacing / 2);
            ctx.fillText(i.toString(), x, headerY);
        }
        ctx.restore();
    }

    drawBars(items) {
        items.forEach((item, index) => {
            const y = this.config.barsStartY + (index * this.config.itemHeight);  // TOP-ANCHORED
            this.drawBrickSegments(item.score, y);
            this.drawQuestionLabel(item.label, y);
        });
    }

    drawBrickSegments(score, y) {
        const { ctx, config } = this;
        for (let segment = 1; segment <= score; segment++) {
            const x = config.chartStartX + ((segment - 1) * config.colSpacing);  // Use direct colSpacing
            const colorKey = `brick${segment}`;
            ctx.fillStyle = config.colors[colorKey];
            ctx.fillRect(x, y, config.colSpacing, config.itemHeight);  // Use exact dimensions
        }
    }

    drawQuestionLabel(text, y) {
        const { ctx, config } = this;
        ctx.save();
        ctx.font = config.font.labels;
        ctx.fillStyle = config.colors.text;
        ctx.textAlign = 'left';  // LEFT-ANCHORED instead of center
        ctx.textBaseline = 'top';  // TOP-ANCHORED
        
        const maxWidth = config.labelWidth - 40;
        const lines = this.wrapText(text, maxWidth);
        
        // TOP-ANCHORED positioning
        lines.forEach((line, lineIndex) => {
            const lineY = y + (lineIndex * config.lineHeight);
            ctx.fillText(line, config.labelsStartX, lineY);
        });
        
        ctx.restore();
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
        return lines.slice(0, 3);
    }
}

export { AssessmentChart }; 