/**
 * Chart Generator
 * Handles the generation of various chart types using HTML Canvas
 */
class ChartGenerator {
    /**
     * Creates a new chart generator instance
     * @param {HTMLCanvasElement} canvas - The canvas element to render charts on
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    /**
     * Generates a chart based on the provided data and type
     * @param {Object} data - The chart data
     * @param {string} type - The type of chart to generate
     * @param {Object} options - Additional chart options
     */
    generateChart(data, type, options = {}) {
        switch (type.toLowerCase()) {
            case 'bar':
                this.generateBarChart(data, options);
                break;
            case 'line':
                this.generateLineChart(data, options);
                break;
            case 'pie':
                this.generatePieChart(data, options);
                break;
            default:
                throw new Error(`Unsupported chart type: ${type}`);
        }
    }

    /**
     * Generates a bar chart
     * @param {Object} data - The chart data
     * @param {Object} options - Chart options
     */
    generateBarChart(data, options) {
        const { width, height } = this.canvas;
        const padding = options.padding || 40;
        const barSpacing = options.barSpacing || 20;
        const barWidth = (width - (2 * padding) - ((data.labels.length - 1) * barSpacing)) / data.labels.length;

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Draw axes
        this.ctx.beginPath();
        this.ctx.moveTo(padding, height - padding);
        this.ctx.lineTo(width - padding, height - padding);
        this.ctx.moveTo(padding, padding);
        this.ctx.lineTo(padding, height - padding);
        this.ctx.stroke();

        // Draw bars
        data.datasets.forEach((dataset, datasetIndex) => {
            this.ctx.fillStyle = dataset.backgroundColor || this.getRandomColor();
            
            dataset.data.forEach((value, index) => {
                const x = padding + (index * (barWidth + barSpacing)) + (datasetIndex * (barWidth / data.datasets.length));
                const y = height - padding - (value * (height - (2 * padding)) / this.getMaxValue(data.datasets));
                const barHeight = (value * (height - (2 * padding)) / this.getMaxValue(data.datasets));

                this.ctx.fillRect(x, y, barWidth / data.datasets.length, barHeight);
            });
        });

        // Draw labels
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        data.labels.forEach((label, index) => {
            const x = padding + (index * (barWidth + barSpacing)) + (barWidth / 2);
            this.ctx.fillText(label, x, height - padding + 20);
        });
    }

    /**
     * Generates a line chart
     * @param {Object} data - The chart data
     * @param {Object} options - Chart options
     */
    generateLineChart(data, options) {
        const { width, height } = this.canvas;
        const padding = options.padding || 40;

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Draw axes
        this.ctx.beginPath();
        this.ctx.moveTo(padding, height - padding);
        this.ctx.lineTo(width - padding, height - padding);
        this.ctx.moveTo(padding, padding);
        this.ctx.lineTo(padding, height - padding);
        this.ctx.stroke();

        // Draw lines
        data.datasets.forEach(dataset => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = dataset.borderColor || this.getRandomColor();
            this.ctx.lineWidth = dataset.borderWidth || 2;

            dataset.data.forEach((value, index) => {
                const x = padding + (index * (width - (2 * padding)) / (data.labels.length - 1));
                const y = height - padding - (value * (height - (2 * padding)) / this.getMaxValue(data.datasets));

                if (index === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            });

            this.ctx.stroke();
        });

        // Draw labels
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        data.labels.forEach((label, index) => {
            const x = padding + (index * (width - (2 * padding)) / (data.labels.length - 1));
            this.ctx.fillText(label, x, height - padding + 20);
        });
    }

    /**
     * Generates a pie chart
     * @param {Object} data - The chart data
     * @param {Object} options - Chart options
     */
    generatePieChart(data, options) {
        const { width, height } = this.canvas;
        const radius = Math.min(width, height) / 2 - (options.padding || 40);
        const centerX = width / 2;
        const centerY = height / 2;

        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);

        // Draw pie segments
        let startAngle = 0;
        data.datasets[0].data.forEach((value, index) => {
            const sliceAngle = (value / this.getTotalValue(data.datasets[0].data)) * 2 * Math.PI;
            
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
            this.ctx.closePath();

            this.ctx.fillStyle = data.datasets[0].backgroundColor?.[index] || this.getRandomColor();
            this.ctx.fill();

            startAngle += sliceAngle;
        });

        // Draw labels
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        data.labels.forEach((label, index) => {
            const angle = (data.datasets[0].data[index] / this.getTotalValue(data.datasets[0].data)) * Math.PI;
            const x = centerX + (radius * 0.7 * Math.cos(angle));
            const y = centerY + (radius * 0.7 * Math.sin(angle));
            this.ctx.fillText(label, x, y);
        });
    }

    /**
     * Gets the maximum value from all datasets
     * @param {Array} datasets - The chart datasets
     * @returns {number} The maximum value
     */
    getMaxValue(datasets) {
        return Math.max(...datasets.flatMap(dataset => dataset.data));
    }

    /**
     * Gets the total value of an array
     * @param {Array} values - The array of values
     * @returns {number} The total value
     */
    getTotalValue(values) {
        return values.reduce((sum, value) => sum + value, 0);
    }

    /**
     * Generates a random color
     * @returns {string} A random color in hex format
     */
    getRandomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    }
}

// Export the ChartGenerator class
export default ChartGenerator; 