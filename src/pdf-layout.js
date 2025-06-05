export class CanvasPDFLayout {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // A4 dimensions in points (1 point = 1/72 inch) - landscape
        this.A4_WIDTH = 842;
        this.A4_HEIGHT = 595;
        
        // Scale factor for screen display (adjust as needed)
        this.scale = 0.5;
        
        // Set canvas dimensions - double height for two pages
        this.canvas.width = this.A4_WIDTH * this.scale;
        this.canvas.height = this.A4_HEIGHT * this.scale * 2;
        
        // Margins
        this.margins = {
            left: 40,
            right: 40,
            top: 50,
            bottom: 50
        };

        // Page management
        this.totalPages = 2;
        
        // Initialize the layout
        this.drawLayout();
    }
    
    drawLayout() {
        const ctx = this.ctx;
        const scale = this.scale;
        const pageHeight = this.A4_HEIGHT * scale;
        
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw both pages
        for (let page = 1; page <= this.totalPages; page++) {
            const yOffset = (page - 1) * pageHeight;
            
            // Set default styles
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2 * scale;
            
            // Draw border
            ctx.strokeRect(0, yOffset, this.canvas.width, pageHeight);
            
            // Draw center line
            ctx.beginPath();
            ctx.moveTo(this.canvas.width / 2, yOffset);
            ctx.lineTo(this.canvas.width / 2, yOffset + pageHeight);
            ctx.stroke();
            
            // Draw margin guides
            ctx.strokeStyle = 'gray';
            ctx.setLineDash([5 * scale, 5 * scale]);
            
            // Left margin
            ctx.beginPath();
            ctx.moveTo(this.margins.left * scale, yOffset);
            ctx.lineTo(this.margins.left * scale, yOffset + pageHeight);
            ctx.stroke();
            
            // Right margin
            ctx.beginPath();
            ctx.moveTo(this.canvas.width - (this.margins.right * scale), yOffset);
            ctx.lineTo(this.canvas.width - (this.margins.right * scale), yOffset + pageHeight);
            ctx.stroke();
            
            // Top margin
            ctx.beginPath();
            ctx.moveTo(0, yOffset + (this.margins.top * scale));
            ctx.lineTo(this.canvas.width, yOffset + (this.margins.top * scale));
            ctx.stroke();
            
            // Bottom margin
            ctx.beginPath();
            ctx.moveTo(0, yOffset + pageHeight - (this.margins.bottom * scale));
            ctx.lineTo(this.canvas.width, yOffset + pageHeight - (this.margins.bottom * scale));
            ctx.stroke();
            
            // Draw bleed marks
            ctx.strokeStyle = 'black';
            ctx.setLineDash([]);
            const bleedLength = 10 * scale;
            
            // Top-left
            this.drawBleedMark(0, yOffset, bleedLength, 'horizontal');
            this.drawBleedMark(0, yOffset, bleedLength, 'vertical');
            
            // Top-right
            this.drawBleedMark(this.canvas.width, yOffset, bleedLength, 'horizontal');
            this.drawBleedMark(this.canvas.width, yOffset, bleedLength, 'vertical');
            
            // Bottom-left
            this.drawBleedMark(0, yOffset + pageHeight, bleedLength, 'horizontal');
            this.drawBleedMark(0, yOffset + pageHeight, bleedLength, 'vertical');
            
            // Bottom-right
            this.drawBleedMark(this.canvas.width, yOffset + pageHeight, bleedLength, 'horizontal');
            this.drawBleedMark(this.canvas.width, yOffset + pageHeight, bleedLength, 'vertical');

            // Draw page number
            ctx.font = `${12 * scale}px Arial`;
            ctx.fillStyle = 'black';
            ctx.fillText(`Page ${page} of ${this.totalPages}`, 10 * scale, yOffset + (20 * scale));
        }
    }
    
    drawBleedMark(x, y, length, direction) {
        this.ctx.beginPath();
        if (direction === 'horizontal') {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x - length, y);
        } else {
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x, y - length);
        }
        this.ctx.stroke();
    }
    
    async generatePDF() {
        const { jsPDF } = await import('jspdf');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: 'a4'
        });
        
        // Create a temporary canvas for each page
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.A4_WIDTH * this.scale;
        tempCanvas.height = this.A4_HEIGHT * this.scale;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Generate each page
        for (let page = 1; page <= this.totalPages; page++) {
            if (page > 1) {
                pdf.addPage();
            }
            
            // Clear temporary canvas
            tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            
            // Copy the relevant portion of the main canvas
            tempCtx.drawImage(
                this.canvas,
                0, (page - 1) * tempCanvas.height, // Source position
                tempCanvas.width, tempCanvas.height, // Source dimensions
                0, 0, // Destination position
                tempCanvas.width, tempCanvas.height // Destination dimensions
            );
            
            // Add to PDF
            const imgData = tempCanvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 0, 0, this.A4_WIDTH, this.A4_HEIGHT);
        }
        
        return pdf;
    }
} 