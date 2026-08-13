import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles using StyleSheet API for React-PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#2563EB', // primary-600
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
  },
  subtitle: {
    fontSize: 9,
    color: '#666',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerRight: {
    textAlign: 'right',
  },
  docTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  confidential: {
    fontSize: 8,
    color: '#999',
    marginTop: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    backgroundColor: '#111827', // gray-900
    color: 'white',
    padding: 6,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  fieldLabel: {
    width: '40%',
    fontWeight: 'bold',
    fontSize: 9,
  },
  fieldValue: {
    width: '60%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 2,
    height: 14,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#999',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  checkboxGroup: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 4,
    marginLeft: 10,
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#666',
    marginRight: 4,
  },
  checkboxLabel: {
    fontSize: 9,
  }
});

export interface QuestionnairePDFProps {
  companyName?: string;
  contactName?: string;
  email?: string;
  pdfRequested?: string;
  sqft?: string;
  productType?: string;
  dailyVolume?: string;
  estimatedSavings?: string;
  landedCostIndex?: string;
  generatedDate?: string;
  data?: Record<string, string>;
}

const PdfField = ({ label, value, lines = 1 }: { label: string; value?: string; lines?: number }) => (
  <View style={[styles.row, { alignItems: 'flex-start' }]}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={{ width: '60%' }}>
      {value ? (
        <Text style={{ fontSize: 9, color: '#111827', fontWeight: 'bold', paddingBottom: 2 }}>{value}</Text>
      ) : (
        Array.from({ length: lines }).map((_, i) => (
          <View key={i} style={[
              styles.fieldValue, 
              { width: '100%', marginTop: i > 0 ? 8 : 0 } 
          ]} />
        ))
      )}
    </View>
  </View>
);

export const QuestionnairePDF: React.FC<QuestionnairePDFProps> = ({
  companyName,
  contactName,
  email,
  pdfRequested,
  sqft,
  productType,
  dailyVolume,
  estimatedSavings,
  landedCostIndex,
  generatedDate,
  data = {},
}) => {
  const compName = companyName || data.company || 'Client Organization';
  const name = contactName || data.name || 'Valued Partner';
  const mail = email || data.email || 'N/A';
  const dateStr = generatedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Nearshore Navigator</Text>
            <Text style={styles.subtitle}>Industrial Logistics • Baja California</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.docTitle}>{pdfRequested || 'Landed Cost & 3PL Report'}</Text>
            <Text style={styles.confidential}>CONFIDENTIAL • {dateStr}</Text>
          </View>
        </View>

        {/* Client Metadata Summary Block */}
        <View style={{ backgroundColor: '#F3F4F6', padding: 8, borderRadius: 4, marginBottom: 14 }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1F2937' }}>
            Prepared For: {compName} ({name} - {mail})
          </Text>
          <Text style={{ fontSize: 8, color: '#4B5563', marginTop: 2 }}>
            Custom Nearshore Feasibility Analysis • Baja California Manufacturing Corridor
          </Text>
        </View>

        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Operational Blueprint</Text>
          <PdfField label="1. Total square footage required?" value={sqft || data.q1} />
          <PdfField label="2. Type of products?" value={productType || data.q2} lines={2} />
          <PdfField label="3. Product presentation?" value={data.q3} />
          <PdfField label="4. Dimensions (L x W x H)?" value={data.q4} />
          <PdfField label="5. Avg. Weight per pallet?" value={data.q5} />
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Inventory, Handling & Cost Benchmarks</Text>
          <PdfField label="6. Tariff fractions/HS Codes?" value={data.q6} />
          <PdfField label="7. Hazmat / Dangerous Goods?" value={data.q7} />
          <PdfField label="8. Max stackability (levels)?" value={data.q8} />
          <PdfField label="9. Daily order volume?" value={dailyVolume || data.q9} />
          <PdfField label="10. Est. Labor / Landed Savings:" value={estimatedSavings || landedCostIndex || data.q32 || '35% - 52% vs US Base'} />
          <PdfField label="11. Processing requirements?" value={data.q11} lines={2} />
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Systems & Connectivity</Text>
          <PdfField label="13. Order Transmission Method:" value={data.q13 || 'EDI / API Integrated'} />
          <PdfField label="14. Current ERP / WMS System?" value={data.q14} />
        </View>

         {/* Section 4 */}
         <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Volume & Logistics Strategy</Text>
          <PdfField label="15. Est. personnel required?" value={data.q15 || data.q6} />
          <PdfField label="16. Total pallet positions?" value={data.q16 || data.q20} />
          <PdfField label="17. Shelter / Direct Operation:" value={data.q35 || 'Baja California IMMEX Shelter Model'} />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          www.nearshorenavigator.com • Tijuana, Baja California, Mexico
        </Text>
      </Page>
    </Document>
  );
};

