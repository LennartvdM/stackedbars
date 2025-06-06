class AssessmentChart {
    constructor(canvas, userConfig = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        
        // Default configuration
        this.config = {
            itemHeight: 25,
            itemGap: 5,
            colSpacing: 82,
            padding: { top: 60, right: 40, bottom: 20, left: 380 },
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
            labelWidth: 340,
            ...userConfig
        };

        // Calculate derived values
        this.rowHeight = this.config.itemHeight + this.config.itemGap;
        this.rectWidth = this.config.colSpacing;
        this.rectHeight = this.config.itemHeight;
    }

    autoSizeCanvas(itemCount) {
        const requiredHeight = this.config.padding.top + 
                             30 +  // Space for title
                             (itemCount * this.rowHeight) - this.config.itemGap + // Subtract last gap
                             this.config.padding.bottom;
        this.canvas.height = requiredHeight;
        this.canvas.style.height = requiredHeight + 'px';
    }

    calculateMeasurements(itemCount) {
        const canvasWidth = this.canvas.width / (window.devicePixelRatio || 1);
        const leftPadding = this.config.padding.left;
        const availableChartWidth = canvasWidth - leftPadding;
        this.rectWidth = Math.floor(availableChartWidth / this.config.maxScore);
        this.colSpacing = this.rectWidth;
    }

    render(data) {
        if (!data || !data.items || data.items.length === 0) return;
        this.autoSizeCanvas(data.items.length);
        this.calculateMeasurements(data.items.length);
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
        ctx.fillText(title, 20, 22);
        ctx.restore();
    }

    drawGrid(itemCount) {
        const { ctx, config } = this;
        ctx.save();
        ctx.strokeStyle = config.colors.grid;
        ctx.lineWidth = 1;
        const gridStartX = config.padding.left;
        const gridStartY = config.padding.top + 30;  // Account for title
        const gridHeight = (itemCount * this.rowHeight) - this.config.itemGap;  // Total grid height
        for (let i = 0; i <= config.maxScore; i++) {
            const x = gridStartX + (i * this.colSpacing);
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
        const headerY = config.padding.top + 15;
        for (let i = 1; i <= config.maxScore; i++) {
            const x = config.padding.left + ((i - 1) * this.colSpacing) + (this.colSpacing / 2);
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
            const x = config.padding.left + ((segment - 1) * this.colSpacing);
            const colorKey = `brick${segment}`;
            ctx.fillStyle = config.colors[colorKey];
            ctx.fillRect(x, y, this.colSpacing, this.config.itemHeight);
        }
    }

    drawQuestionLabel(text, y) {
        const { ctx, config } = this;
        ctx.save();
        ctx.font = config.font.labels;
        ctx.fillStyle = config.colors.text;
        ctx.textAlign = 'center';
        const maxWidth = config.labelWidth - 40;
        const lines = this.wrapText(text, maxWidth);
        const totalHeight = lines.length * config.lineHeight;
        const startY = y + (this.config.itemHeight / 2) - (totalHeight / 2) + config.lineHeight;
        lines.forEach((line, lineIndex) => {
            const lineY = startY + (lineIndex * config.lineHeight);
            ctx.fillText(line, config.padding.left / 2, lineY);
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