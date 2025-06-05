export class AssessmentChart {
  constructor(canvas, config = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.config = {
      padding: { top: 40, right: 20, bottom: 20, left: 150 },
      barHeight: 15,
      barSpacing: 8,
      brickWidth: 30,
      maxScore: 4,
      colors: {
        brick1: '#E8F4F0',
        brick2: '#7ECECA',
        brick3: '#4A9FB5',
        brick4: '#2B5F7A',
        text: '#666666',
        gridLines: '#E0E0E0',
        title: '#1976D2',
        divider: '#E8E8E8'
      },
      font: {
        title: 'bold 12px Arial',
        labels: '9px Arial',
        scores: 'bold 12px Arial'
      },
      ...config
    };
  }

  render(data) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGridLines(data.items.length);
    this.drawScaleNumbers();
    this.drawTitle(data.title);
    this.drawBars(data.items);
  }

  drawGridLines(itemCount) {
    const { ctx, config, canvas } = this;
    const { padding, barHeight, barSpacing, brickWidth, maxScore, colors } = config;
    ctx.save();
    ctx.strokeStyle = colors.gridLines;
    ctx.lineWidth = 1;
    for (let i = 0; i <= maxScore; i++) {
      const x = padding.left + i * brickWidth;
      ctx.beginPath();
      ctx.moveTo(x, padding.top - 10);
      ctx.lineTo(x, padding.top + itemCount * (barHeight + barSpacing) - barSpacing + 10);
      ctx.stroke();
    }
    ctx.restore();
  }

  drawScaleNumbers() {
    const { ctx, config } = this;
    const { padding, brickWidth, maxScore, font } = config;
    ctx.save();
    ctx.font = font.labels;
    ctx.fillStyle = config.colors.text;
    ctx.textAlign = 'center';
    for (let i = 1; i <= maxScore; i++) {
      const x = padding.left + (i - 0.5) * brickWidth;
      ctx.fillText(i, x, padding.top - 16);
    }
    ctx.restore();
  }

  drawTitle(title) {
    const { ctx, config } = this;
    ctx.save();
    ctx.font = config.font.title;
    ctx.fillStyle = config.colors.title;
    ctx.textAlign = 'left';
    ctx.fillText(title, config.padding.left, 24);
    ctx.restore();
  }

  drawBars(items) {
    const { ctx, config } = this;
    const { padding, barHeight, barSpacing, brickWidth, colors, maxScore, font } = config;
    ctx.save();
    ctx.font = font.labels;
    ctx.textAlign = 'right';
    ctx.fillStyle = colors.text;
    items.forEach((item, i) => {
      const y = padding.top + i * (barHeight + barSpacing);
      // Draw label
      this.wrapText(item.label, padding.left - 10, y + barHeight / 2, font.labels, padding.left - 20);
      // Draw bricks
      for (let s = 0; s < maxScore; s++) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(padding.left + s * brickWidth, y, brickWidth - 2, barHeight);
        ctx.fillStyle = colors[`brick${s + 1}`];
        ctx.fill();
        ctx.restore();
      }
      // Draw score overlay
      ctx.save();
      ctx.beginPath();
      ctx.rect(padding.left, y, brickWidth * item.score, barHeight);
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = colors[`brick${item.score}`] || colors.brick4;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
      // Draw score number
      ctx.save();
      ctx.font = font.scores;
      ctx.fillStyle = colors.text;
      ctx.textAlign = 'left';
      ctx.fillText(item.score, padding.left + brickWidth * maxScore + 8, y + barHeight - 2);
      ctx.restore();
    });
    ctx.restore();
  }

  wrapText(text, x, y, font, maxWidth) {
    const { ctx } = this;
    ctx.save();
    ctx.font = font;
    const words = text.split(' ');
    let line = '';
    let lineHeight = 11;
    let yy = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, x, yy);
        line = words[n] + ' ';
        yy += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, yy);
    ctx.restore();
  }
} 