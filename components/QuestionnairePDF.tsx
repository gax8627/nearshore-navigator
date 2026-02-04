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

const PdfField = ({ label, lines = 1 }: { label: string, lines?: number }) => (
  <View style={[styles.row, { alignItems: 'flex-start' }]}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={{ width: '60%' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <View key={i} style={[
            styles.fieldValue, 
            { width: '100%', marginTop: i > 0 ? 8 : 0 } 
        ]} />
      ))}
    </View>
  </View>
);

export const QuestionnairePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Nearshore Navigator</Text>
          <Text style={styles.subtitle}>Industrial Logistics • Baja California</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.docTitle}>3PL Operation Questionnaire</Text>
          <Text style={styles.confidential}>CONFIDENTIAL • {new Date().getFullYear()}</Text>
        </View>
      </View>

      <Text style={{ fontStyle: 'italic', marginBottom: 20, fontSize: 9, color: '#666' }}>
        Please complete this assessment to help us engineer your optimal supply chain solution.
      </Text>

      {/* Section 1 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Operational Basics</Text>
        <PdfField label="1. Total square footage required?" />
        <PdfField label="2. Type of products?" lines={2} />
        <PdfField label="3. Product presentation?" />
        <PdfField label="4. Dimensions (L x W x H)?" />
        <PdfField label="5. Avg. Weight per pallet?" />
      </View>

      {/* Section 2 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Inventory & Handling</Text>
        <PdfField label="6. Tariff fractions/HS Codes?" />
        <PdfField label="7. Hazmat / Dangerous Goods?" />
        <PdfField label="8. Max stackability (levels)?" />
        <PdfField label="9. Daily order volume?" />
        <PdfField label="10. Avg. pieces per order?" />
        <PdfField label="11. Processing requirements?" lines={2} />
      </View>

      {/* Section 3 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Systems & Connectivity</Text>
        <View style={styles.row}>
            <Text style={styles.fieldLabel}>13. Order Transmission Method:</Text>
        </View>
        <View style={styles.checkboxGroup}>
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxLabel}>EDI</Text>
             </View>
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxLabel}>Email</Text>
             </View>
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.checkbox} />
                <Text style={styles.checkboxLabel}>API</Text>
             </View>
        </View>
        <View style={{ marginTop: 10 }}>
            <PdfField label="14. Current ERP / WMS System?" />
        </View>
      </View>

       {/* Section 4 */}
       <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Volume & Logistics</Text>
        <PdfField label="15. Est. personnel required?" />
        <PdfField label="16. Total pallet positions?" />
        <PdfField label="17. Inbound trailers per week?" />
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        www.nearshorenavigator.com • Tijuana, Baja California, Mexico
      </Text>
    </Page>
  </Document>
);
