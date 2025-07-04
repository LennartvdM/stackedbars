export class AssessmentChart {
    constructor(canvas, userConfig = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Configuration that respects user parameters
        this.config = {
            itemHeight: 25,
            itemGap: 5,
            colSpacing: 82,
            padding: { 
                top: 60,
                right: 40, 
                bottom: 20,
                left: 380
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
                scores: '600 20px Montserrat'
            },
            lineHeight: 13,
            labelWidth: 340,
            showGridLines: true,
            gridLineWidth: 1,
            gridLineProtrusion: 0,
            dividerWidth: 200,
            dividerStroke: 1,
            scoreSize: 20,
            ...userConfig
        };

        // Use config values directly - no calculations that override user settings
        this.rowHeight = this.config.itemHeight + this.config.itemGap;
    }

    render(data) {
        if (!data || !data.items || data.items.length === 0) return;
        
        this.autoSizeCanvas(data.items.length);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawGrid(data.items.length);
        this.drawTitle(data.title);
        this.drawScaleNumbers();
        this.drawBars(data.items);
    }

    autoSizeCanvas(itemCount) {
        const requiredHeight = this.config.padding.top + 
                             30 +  // Space for title
                             (itemCount * this.rowHeight) - this.config.itemGap + 
                             this.config.padding.bottom;
        this.canvas.height = requiredHeight;
        this.canvas.style.height = requiredHeight + 'px';
    }

    drawTitle(title) {
        if (!title) return;
        const { ctx, config } = this;
        ctx.save();
        ctx.font = config.font.title;
        ctx.fillStyle = config.colors.title;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(title, 20, 22);
        ctx.restore();
    }

    drawGrid(itemCount) {
        const { ctx, config } = this;
        
        if (!config.showGridLines) return;
        
        ctx.save();
        ctx.strokeStyle = config.colors.grid;
        ctx.lineWidth = config.gridLineWidth;
        const gridStartX = config.padding.left;
        const gridStartY = config.padding.top + 30;
        const gridHeight = (itemCount * this.rowHeight) - config.itemGap;
        
        // Draw vertical grid lines with protrusion
        for (let i = 0; i <= config.maxScore; i++) {
            const x = gridStartX + (i * config.colSpacing);
            ctx.beginPath();
            ctx.moveTo(x, gridStartY - config.gridLineProtrusion);  // Extend upward
            ctx.lineTo(x, gridStartY + gridHeight + config.gridLineProtrusion);  // Extend downward
            ctx.stroke();
        }
        
        // Draw horizontal dividers between items
        ctx.lineWidth = config.dividerStroke;
        const labelCenterX = config.padding.left / 2;
        const dividerStartX = labelCenterX - (config.dividerWidth / 2);
        
        for (let i = 1; i < itemCount; i++) {
            const y = gridStartY + (i * this.rowHeight) - (config.itemGap / 2);
            ctx.beginPath();
            ctx.moveTo(dividerStartX, y);
            ctx.lineTo(dividerStartX + config.dividerWidth, y);
            ctx.stroke();
        }
        
        ctx.restore();
    }

    drawScaleNumbers() {
        const { ctx, config } = this;
        ctx.save();
        ctx.font = `600 ${config.scoreSize}px Montserrat`;
        ctx.textAlign = 'center';
        ctx.fillStyle = config.colors.numbers;
        const headerY = config.padding.top + 15;
        
        for (let i = 1; i <= config.maxScore; i++) {
            const x = config.padding.left + ((i - 1) * config.colSpacing) + (config.colSpacing / 2);
            ctx.fillText(i.toString(), x, headerY);
        }
        ctx.restore();
    }

    drawBars(items) {
        items.forEach((item, index) => {
            const y = this.config.padding.top + 30 + (index * this.rowHeight);
            this.drawBrickSegments(item.score, y);
            this.drawQuestionLabel(item.label, y);
        });
    }

    drawBrickSegments(score, y) {
        const { ctx, config } = this;
        for (let segment = 1; segment <= score; segment++) {
            const x = config.padding.left + ((segment - 1) * config.colSpacing);
            const colorKey = `brick${segment}`;
            ctx.fillStyle = config.colors[colorKey];
            ctx.fillRect(x, y, config.colSpacing, config.itemHeight);
        }
    }

    drawQuestionLabel(text, y) {
        const { ctx, config } = this;
        ctx.save();
        ctx.font = config.font.labels;
        ctx.fillStyle = config.colors.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const maxWidth = config.labelWidth - 40;
        const lines = this.wrapText(text, maxWidth);
        
        // Always assume space for 3 lines
        const maxLines = 3;
        const totalAvailableHeight = maxLines * config.lineHeight;
        const actualTextHeight = lines.length * config.lineHeight;
        
        // Center the actual text within the space for 3 lines
        const centerY = y + (config.itemHeight / 2);
        const startY = centerY - (actualTextHeight / 2) + (config.lineHeight / 2);
        
        const labelX = config.padding.left / 2;
        lines.forEach((line, lineIndex) => {
            const lineY = startY + (lineIndex * config.lineHeight);
            ctx.fillText(line, labelX, lineY);
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