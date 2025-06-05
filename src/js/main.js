/**
 * Main application entry point
 * Handles the initialization and coordination of the PDF layout and chart generation
 */
import PDFLayout from './pdf-layout.js';
import ChartGenerator from './chart-generator.js';

// Initialize the PDF layout system
const pdfLayout = new PDFLayout({
    width: 612, // US Letter width in points
    height: 792, // US Letter height in points
    margin: 72 // 1 inch margin
});

// Get the canvas element
const canvas = document.getElementById('pdfCanvas');
if (!canvas) {
    throw new Error('Canvas element not found');
}

// Initialize the chart generator
const chartGenerator = new ChartGenerator(canvas);

// Sample data for demonstration
const sampleData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
        label: 'Sales 2023',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
};

// Add content to the PDF
pdfLayout.addText('Monthly Sales Report', { fontSize: 24, align: 'center' });
pdfLayout.addText('Generated on: ' + new Date().toLocaleDateString(), { align: 'right' });
pdfLayout.addText('\n');

// Add a bar chart
pdfLayout.addChart({
    type: 'bar',
    data: sampleData,
    options: {
        padding: 40,
        barSpacing: 20
    }
});

// Add a line chart
pdfLayout.addChart({
    type: 'line',
    data: sampleData,
    options: {
        padding: 40
    }
});

// Add a pie chart
pdfLayout.addChart({
    type: 'pie',
    data: sampleData,
    options: {
        padding: 40
    }
});

// Render the PDF content
pdfLayout.render(canvas);

// Add download button functionality
const downloadButton = document.getElementById('downloadBtn');
if (downloadButton) {
    downloadButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'sales-report.pdf';
        link.href = canvas.toDataURL('application/pdf');
        link.click();
    });
} 