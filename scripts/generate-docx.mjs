import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } from "docx";
import fs from "fs";
import path from "path";

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: "Nearshore Navigator",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                }),
                new Paragraph({
                    text: "Industrial Manufacturing • Baja California",
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 },
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "3PL Operation Questionnaire",
                            bold: true,
                            size: 28,
                            color: "2563EB",
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 400 },
                }),
                new Paragraph({
                    text: "Please provide the following information to help us understand your operation requirements.",
                    italics: true,
                    spacing: { after: 300 },
                }),

                // Operational Basics
                new Paragraph({
                    text: "1. Operational Basics",
                    heading: HeadingLevel.HEADING_2,
                    shading: { fill: "F3F4F6" },
                    spacing: { before: 200, after: 100 },
                }),
                createField("1. How many square feet do you need for your operation?"),
                createField("2. What kind of products would you be moving with us?"),
                createField("3. Product presentation (pallets, bulk, packages, etc.)?"),
                createField("4. Dimensions of packages/pallets (L x W x H)?"),
                createField("5. Average weight per pallet (lbs)?"),

                // Inventory & Handling
                new Paragraph({
                    text: "2. Inventory & Handling",
                    heading: HeadingLevel.HEADING_2,
                    shading: { fill: "F3F4F6" },
                    spacing: { before: 400, after: 100 },
                }),
                createField("6. Tariff fractions / HS Codes?"),
                createField("7. Are any products Hazmat?"),
                createField("8. Max stacking levels?"),
                createField("9. Estimated daily order volume?"),
                createField("10. Average pieces per order?"),
                createField("11. Virtual transfers or home extension?"),
                createField("12. Process description (attach diagram if needed):", 3),

                // Systems & Communication
                new Paragraph({
                    text: "3. Systems & Communication",
                    heading: HeadingLevel.HEADING_2,
                    shading: { fill: "F3F4F6" },
                    spacing: { before: 400, after: 100 },
                }),
                createField("13. Method of order transmission (Mail, EDI, API)?"),
                createField("14. Order management system (WMS/ERP)?"),
                createField("15. Order transmission frequency?"),
                createField("16. Protocol (SFTP, AS2, etc.)?"),

                // Volume & Capacity
                new Paragraph({
                    text: "4. Volume & Capacity",
                    heading: HeadingLevel.HEADING_2,
                    shading: { fill: "F3F4F6" },
                    spacing: { before: 400, after: 100 },
                }),
                createField("17. Estimated personnel required?"),
                createField("18. Pallet positions to store?"),
                createField("19. Trailer loads per week?"),
                createField("20. Orders/Units shipped per day?"),

                // Value & Insurance
                new Paragraph({
                    text: "5. Value, Insurance & Transport",
                    heading: HeadingLevel.HEADING_2,
                    shading: { fill: "F3F4F6" },
                    spacing: { before: 400, after: 100 },
                }),
                createField("21. Total value of merchandise to be held?"),
                createField("22. Insurance coverage agreement?"),
                createField("23. Required service period?"),
                createField("24. Transport quote required Addressing?"),

                new Paragraph({
                    text: "\n\n© 2026 Nearshore Navigator • www.nearshorenavigator.com",
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 600 },
                }),
            ],
        },
    ],
});

function createField(question, lines = 1) {
    const tableRows = [
        new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({ text: question, bold: true })],
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                    },
                }),
            ],
        }),
    ];

    for (let i = 0; i < lines; i++) {
        tableRows.push(
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("")],
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        borders: {
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE },
                        },
                    }),
                ],
            })
        );
    }

    return new Table({
        rows: tableRows,
        width: { size: 100, type: WidthType.PERCENTAGE },
        spacing: { after: 200 },
    });
}

const outputPath = path.join(process.cwd(), "public/documents/Nearshore_Navigator_Questionnaire_2026.docx");

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync(outputPath, buffer);
    console.log(`Document generated successfully at: ${outputPath}`);
});
