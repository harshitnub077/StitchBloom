import PDFDocument from "pdfkit";

interface InvoiceData {
    orderId: string;
    date: Date;
    customerName: string;
    customerEmail: string;
    items: {
        description: string;
        quantity: number;
        amount: number;
    }[];
    total: number;
}

export async function generateInvoice(data: InvoiceData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const chunks: Buffer[] = [];

        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", (err) => reject(err));

        // Validations or Fallbacks
        const safeData = {
            ...data,
            customerName: data.customerName || "Guest Customer",
            customerEmail: data.customerEmail || "",
        };

        // Header
        doc
            .fontSize(20)
            .text("CrochetVerse", { align: "center" })
            .fontSize(10)
            .text("123 Yarn Street, Craft City", { align: "center" })
            .moveDown();

        // Invoice Info
        doc.fontSize(12).text(`Invoice for Order: ${safeData.orderId}`);
        doc.text(`Date: ${safeData.date.toLocaleDateString()}`);
        doc.text(`Customer: ${safeData.customerName} (${safeData.customerEmail})`);
        doc.moveDown();

        // Table Header
        const tableTop = 200;
        doc.font("Helvetica-Bold");
        doc.text("Item", 50, tableTop);
        doc.text("Quantity", 300, tableTop);
        doc.text("Price", 400, tableTop, { align: "right" });
        doc.moveDown();
        doc.font("Helvetica");

        // Items
        let y = tableTop + 25;
        safeData.items.forEach((item) => {
            doc.text(item.description, 50, y);
            doc.text(item.quantity.toString(), 300, y);
            doc.text(`$${item.amount.toFixed(2)}`, 400, y, { align: "right" });
            y += 25;
        });

        // Total
        doc.moveDown().font("Helvetica-Bold");
        doc.text(`Total: $${safeData.total.toFixed(2)}`, 400, y + 20, { align: "right" });

        doc.end();
    });
}
