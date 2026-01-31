
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logoPath = path.join(__dirname, '../public/logo.png');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .page-break { page-break-before: always; }
    </style>
</head>
<body class="bg-white text-gray-800 p-12 max-w-4xl mx-auto">
    <!-- Header -->
    <header class="flex justify-between items-center border-b-2 border-blue-600 pb-6 mb-8">
        <div class="flex items-center gap-4">
            <img src="file://${logoPath}" alt="Nearshore Navigator" class="h-16 w-auto" />
            <div>
                <h1 class="text-2xl font-bold text-gray-900">Nearshore Navigator</h1>
                <p class="text-sm text-gray-500">Industrial Manufacturing in Baja California</p>
            </div>
        </div>
        <div class="text-right">
            <h2 class="text-xl font-bold text-blue-600">3PL Operation Questionnaire</h2>
            <p class="text-sm text-gray-500">Confidential Assessment</p>
        </div>
    </header>

    <main class="space-y-8">
        <p class="text-gray-600 italic mb-8">Please provide the following information to help us understand your operation requirements.</p>

        <!-- Operational Basics -->
        <section>
            <h3 class="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded mb-4">Operational Basics</h3>
            <div class="space-y-4 px-4">
                <div><span class="font-semibold text-blue-800">1.</span> How many square feet do you need for your operation?</div>
                <div><span class="font-semibold text-blue-800">2.</span> What kind of products would you be moving with us?</div>
                <div><span class="font-semibold text-blue-800">3.</span> What is the presentation of the product we will be receiving? <span class="text-sm text-gray-500 block ml-6">(standard pallets, bulk, bags, packages, etc.)</span></div>
                <div><span class="font-semibold text-blue-800">4.</span> Please provide the dimensions in inches of the packages or pallets we will be receiving (length, width, height).</div>
                <div><span class="font-semibold text-blue-800">5.</span> What is the average weight in pounds of the pallets?</div>
            </div>
        </section>

        <!-- Inventory & Handling -->
        <section>
            <h3 class="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded mb-4">Inventory & Handling</h3>
            <div class="space-y-4 px-4">
                <div><span class="font-semibold text-blue-800">6.</span> What are the tariff fractions of the products we would be storing?</div>
                <div><span class="font-semibold text-blue-800">7.</span> Are any of the products Hazmat?</div>
                <div><span class="font-semibold text-blue-800">8.</span> How many levels can the pallets be stacked one on top of the other?</div>
                <div><span class="font-semibold text-blue-800">9.</span> How many orders are we going to process per day?</div>
                <div><span class="font-semibold text-blue-800">10.</span> How many pieces does a typical order consist of?</div>
                <div><span class="font-semibold text-blue-800">11.</span> Are we going to do virtual transfers or are we going to do home extension?</div>
                <div><span class="font-semibold text-blue-800">12.</span> Explain the process you need to be carried out within the Distribution Center. <span class="text-sm text-gray-500 block ml-6">(Attach diagram/doc if needed)</span></div>
            </div>
        </section>

        <!-- Systems & Communication -->
        <section class="page-break pt-8">
            <h3 class="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded mb-4">Systems & Communication</h3>
            <div class="space-y-4 px-4">
                <div>
                    <span class="font-semibold text-blue-800">13.</span> How will you transmit the orders to us?
                    <div class="ml-6 mt-1 space-y-1">
                        <label class="flex items-center gap-2"><div class="w-4 h-4 border border-gray-400 rounded"></div> Mail</label>
                        <label class="flex items-center gap-2"><div class="w-4 h-4 border border-gray-400 rounded"></div> EDI</label>
                        <label class="flex items-center gap-2"><div class="w-4 h-4 border border-gray-400 rounded"></div> Other system interface</label>
                    </div>
                </div>
                <div><span class="font-semibold text-blue-800">14.</span> What is the order management system you use?</div>
                <div><span class="font-semibold text-blue-800">15.</span> How often would you be transmitting the orders to us?</div>
                <div><span class="font-semibold text-blue-800">16.</span> What would be the order transmission protocol? <span class="text-sm text-gray-500">(AS2, FTP, SFTP, Mail, OTHER)</span></div>
                <div>
                    <span class="font-semibold text-blue-800">17.</span> What will be the content of the transmission?
                    <div class="ml-6 mt-1 space-y-1">
                        <label class="flex items-center gap-2"><div class="w-4 h-4 border border-gray-400 rounded"></div> EDI (ANSI X12)</label>
                        <label class="flex items-center gap-2"><div class="w-4 h-4 border border-gray-400 rounded"></div> PLAIN TEXT (CSV, TAB, PIPE)</label>
                    </div>
                </div>
                <div><span class="font-semibold text-blue-800">18.</span> Please provide an example of the commands you would transmit to us for testing.</div>
            </div>
        </section>

        <!-- Volume & Capacity -->
        <section>
            <h3 class="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded mb-4">Volume & Capacity</h3>
            <div class="space-y-4 px-4">
                <div><span class="font-semibold text-blue-800">19.</span> Do you have an estimate of the number of personnel required?</div>
                <div><span class="font-semibold text-blue-800">20.</span> Do you have an estimate of the number of pallets positions to store?</div>
                <div><span class="font-semibold text-blue-800">21.</span> How many trailer loads will we receive per week?</div>
                <div><span class="font-semibold text-blue-800">22.</span> How many pallets will fit in each trailer load?</div>
                <div><span class="font-semibold text-blue-800">23.</span> How many orders or units will we be shipping per day?</div>
            </div>
        </section>

        <!-- Logistics & Additional Info -->
        <section>
            <h3 class="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded mb-4">Logistics & Additional Info</h3>
            <div class="space-y-4 px-4">
                <div><span class="font-semibold text-blue-800">24.</span> Are there any current operations we can visit?</div>
                <div><span class="font-semibold text-blue-800">25.</span> How many part numbers go on an average order?</div>
                <div><span class="font-semibold text-blue-800">26.</span> How many SKU's do you handle in total? <span class="text-sm text-gray-500">(Attach catalog if possible)</span></div>
                <div><span class="font-semibold text-blue-800">27.</span> How many units/cartons fit on a standard 40"x48"x60" pallet?</div>
                <div><span class="font-semibold text-blue-800">28.</span> Do you need special equipment? <span class="text-sm text-gray-500">(sewing machines, cutting machines, etc.)</span></div>
                <div><span class="font-semibold text-blue-800">29.</span> What are the destinations we would be shipping to?</div>
                <div><span class="font-semibold text-blue-800">30.</span> What is the company that owns the merchandise?</div>
                <div><span class="font-semibold text-blue-800">31.</span> Which company would we bill for our services?</div>
            </div>
        </section>

        <!-- Value, Insurance, Transport -->
        <section class="page-break pt-8">
            <h3 class="text-lg font-bold text-white bg-blue-600 px-4 py-2 rounded mb-4">Value, Insurance & Transport</h3>
            <div class="space-y-4 px-4">
                <div><span class="font-semibold text-blue-800">32.</span> What would be the total value of the merchandise to be held?</div>
                <div><span class="font-semibold text-blue-800">33.</span> Do you agree to extend your policy to insure the merchandise?</div>
                <div><span class="font-semibold text-blue-800">34.</span> What is the period for which you require our services?</div>
                <div><span class="font-semibold text-blue-800">35.</span> Can we offer you quotes for transportation? What are the addresses?</div>
                <div><span class="font-semibold text-blue-800">36.</span> What Annex 24 system do you use?</div>
            </div>
        </section>
    </main>

    <footer class="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        <p>&copy; ${new Date().getFullYear()} Nearshore Navigator. All rights reserved.</p>
        <p class="mt-1">www.nearshorenavigator.com | Tijuana, Baja California, Mexico</p>
    </footer>
</body>
</html>
`;

(async () => {
  try {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set content
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate PDF
    const pdfPath = path.join(__dirname, '../public/documents/Mexico-3PL-Operation-Questionnaire.pdf');
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '20mm',
            bottom: '20mm',
            left: '20mm',
            right: '20mm'
        }
    });

    console.log(`PDF generated successfully at: ${pdfPath}`);
    await browser.close();
  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  }
})();
