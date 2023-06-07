const PDFDocument = require('pdfkit');

const createPDF = (res) => {
    const doc = new PDFDocument();

    doc.text('Hello World');

    doc.pipe(res);
    doc.end();
}

module.exports = createPDF;
