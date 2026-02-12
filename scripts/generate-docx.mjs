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

                // 1. Operational Basics
                createSectionHeader("1. Operational Basics"),
                createField("1. How many square feet do you need for your operation?"),
                createField("2. What kind of products would you be moving with us?"),
                createField("3. What is the presentation of the product we will be receiving? (standard pallets, bulk, bags, packages, etc.)"),
                createField("4. Please provide the dimensions in inches of the packages or pallets we will be receiving (length, width, height)."),
                createField("5. What is the average weight in pounds of the pallets?"),

                // 2. Inventory & Handling
                createSectionHeader("2. Inventory & Handling"),
                createField("6. What are the tariff fractions of the products we would be storing?"),
                createField("7. Are any of the products Hazmat?"),
                createField("8. How many levels can the pallets be stacked one on top of the other?"),
                createField("9. How many orders are we going to process per day?"),
                createField("10. How many pieces does a typical order consist of?"),
                createField("11. Are we going to do virtual transfers or are we going to do home extension?"),
                createField("12. Explain the process you need to be carried out within the Distribution Center. (Attach diagram/doc if needed)", 3),

                // 3. Systems & Communication
                createSectionHeader("3. Systems & Communication"),
                createField("13. How will you transmit the orders to us? (Mail, EDI, Other system interface)"),
                createField("14. What is the order management system you use?"),
                createField("15. How often would you be transmitting the orders to us?"),
                createField("16. What would be the order transmission protocol? (AS2, FTP, SFTP, Mail, OTHER)"),
                createField("17. What will be the content of the transmission? (EDI ANSI X12, PLAIN TEXT CSV/TAB/PIPE)"),
                createField("18. Please provide an example of the commands you would transmit to us for testing.", 2),

                // 4. Volume & Capacity
                createSectionHeader("4. Volume & Capacity"),
                createField("19. Do you have an estimate of the number of personnel required?"),
                createField("20. Do you have an estimate of the number of pallets positions to store?"),
                createField("21. How many trailer loads will we receive per week?"),
                createField("22. How many pallets will fit in each trailer load?"),
                createField("23. How many orders or units will we be shipping per day?"),

                // 5. Logistics & Additional Info
                createSectionHeader("5. Logistics & Additional Info"),
                createField("24. Are there any current operations we can visit?"),
                createField("25. How many part numbers go on an average order?"),
                createField("26. How many SKU's do you handle in total? (Attach catalog if possible)"),
                createField("27. How many units/cartons fit on a standard 40\"x48\"x60\" pallet?"),
                createField("28. Do you need special equipment? (sewing machines, cutting machines, etc.)"),
                createField("29. What are the destinations we would be shipping to?"),
                createField("30. What is the company that owns the merchandise?"),
                createField("31. Which company would we bill for our services?"),

                // 6. Value, Insurance & Transport
                createSectionHeader("6. Value, Insurance & Transport"),
                createField("32. What would be the total value of the merchandise to be held?"),
                createField("33. Do you agree to extend your policy to insure the merchandise?"),
                createField("34. What is the period for which you require our services?"),
                createField("35. Can we offer you quotes for transportation? What are the addresses?"),
                createField("36. What Annex 24 system do you use?"),

                new Paragraph({
                    text: "\n\n© 2026 Nearshore Navigator • www.nearshorenavigator.com",
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 600 },
                }),
            ],
        },
    ],
});

function createSectionHeader(text) {
    return new Paragraph({
        text: text,
        heading: HeadingLevel.HEADING_2,
        shading: { fill: "2563EB", color: "FFFFFF" }, // Blue background, white text
        spacing: { before: 400, after: 200 },
        indent: { left: 100 },
    });
}

function createField(question, lines = 1) {
    const tableRows = [
        new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({ 
                        children: [
                            new TextRun({
                                text: question,
                                bold: true,
                                size: 20,
                            })
                        ]
                    })],
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
