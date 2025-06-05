/**
 * PDF Layout System
 * Handles the layout and rendering of PDF content using HTML Canvas
 */
class PDFLayout {
    /**
     * Creates a new PDF layout instance
     * @param {Object} options - Configuration options
     * @param {number} options.width - Page width in points
     * @param {number} options.height - Page height in points
     * @param {number} options.margin - Page margin in points
     */
    constructor(options = {}) {
        this.width = options.width || 612; // US Letter width in points
        this.height = options.height || 792; // US Letter height in points
        this.margin = options.margin || 72; // 1 inch margin
        this.currentPage = 1;
        this.pages = [];
        this.currentY = this.margin;
        this.currentX = this.margin;
        this.lineHeight = 12;
        this.fontSize = 12;
        this.fontFamily = 'Arial';
    }

    /**
     * Creates a new page in the PDF
     * @returns {Object} The new page object
     */
    createPage() {
        const page = {
            number: this.currentPage,
            content: [],
            y: this.margin,
            x: this.margin
        };
        this.pages.push(page);
        this.currentPage++;
        return page;
    }

    /**
     * Adds text to the current page
     * @param {string} text - The text to add
     * @param {Object} options - Text formatting options
     * @param {number} [options.fontSize] - Font size in points
     * @param {string} [options.fontFamily] - Font family
     * @param {string} [options.align] - Text alignment ('left', 'center', 'right')
     */
    addText(text, options = {}) {
        const page = this.pages[this.pages.length - 1] || this.createPage();
        const fontSize = options.fontSize || this.fontSize;
        const fontFamily = options.fontFamily || this.fontFamily;
        const align = options.align || 'left';

        // Check if we need a new page
        if (page.y + fontSize > this.height - this.margin) {
            this.createPage();
            return this.addText(text, options);
        }

        page.content.push({
            type: 'text',
            text,
            x: page.x,
            y: page.y,
            fontSize,
            fontFamily,
            align
        });

        page.y += fontSize + this.lineHeight;
    }

    /**
     * Adds a chart to the current page
     * @param {Object} chartData - The chart data and configuration
     * @param {Object} chartData.data - The chart data
     * @param {string} chartData.type - The chart type
     * @param {Object} chartData.options - Chart options
     */
    addChart(chartData) {
        const page = this.pages[this.pages.length - 1] || this.createPage();
        const chartHeight = 300; // Default chart height

        // Check if we need a new page
        if (page.y + chartHeight > this.height - this.margin) {
            this.createPage();
            return this.addChart(chartData);
        }

        page.content.push({
            type: 'chart',
            data: chartData.data,
            chartType: chartData.type,
            options: chartData.options,
            x: page.x,
            y: page.y,
            width: this.width - (2 * this.margin),
            height: chartHeight
        });

        page.y += chartHeight + this.lineHeight;
    }

    /**
     * Renders the PDF content to a canvas
     * @param {HTMLCanvasElement} canvas - The canvas element to render to
     */
    render(canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height * this.pages.length;

        this.pages.forEach((page, index) => {
            const yOffset = index * this.height;
            
            // Draw page background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, yOffset, this.width, this.height);

            // Draw page content
            page.content.forEach(item => {
                if (item.type === 'text') {
                    ctx.font = `${item.fontSize}pt ${item.fontFamily}`;
                    ctx.fillStyle = 'black';
                    
                    let x = item.x;
                    if (item.align === 'center') {
                        const textWidth = ctx.measureText(item.text).width;
                        x = (this.width - textWidth) / 2;
                    } else if (item.align === 'right') {
                        const textWidth = ctx.measureText(item.text).width;
                        x = this.width - this.margin - textWidth;
                    }

                    ctx.fillText(item.text, x, item.y + yOffset);
                } else if (item.type === 'chart') {
                    // Chart rendering will be handled by the chart generator
                    // This is just a placeholder for the chart area
                    ctx.strokeStyle = '#ccc';
                    ctx.strokeRect(item.x, item.y + yOffset, item.width, item.height);
                }
            });
        });
    }
}

// Export the PDFLayout class
export default PDFLayout; 