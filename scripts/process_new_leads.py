import csv
import glob
import json
import os
import re

def sanitize_header(header):
    if not header: return ""
    # Strip everything except alphanumeric and space
    return re.sub(r'[^a-zA-Z0-9\s]', '', header).strip()

def process_csvs(pattern, output_file, industry_label):
    leads = []
    files = glob.glob(pattern)
    print(f"DEBUG: Processing {len(files)} files for {industry_label}...")
    
    seen_emails = set()

    for file in files:
        # Open as UTF-8 and ignore errors for weird characters
        with open(file, 'r', encoding='utf-8', errors='ignore') as f:
            reader = csv.DictReader(f)
            if reader.fieldnames:
                reader.fieldnames = [sanitize_header(h) for h in reader.fieldnames]
            
            for row in reader:
                email = row.get('Contact Email') or row.get('Email')
                if not email or email in seen_emails:
                    continue
                
                # Column names after sanitization should be clean
                company = row.get('Business') or row.get('Company') or row.get('Business Name')
                
                if not company or company.lower() in ['your company', '', 'none']:
                    continue

                first_name = row.get('Contact First Name') or 'there'
                last_name = row.get('Contact Last Name') or ''
                
                leads.append({
                    'First Name': first_name,
                    'Last Name': last_name,
                    'Company': company,
                    'Industry': industry_label,
                    'Email': email,
                    'Lead Id': email
                })
                seen_emails.add(email)

    if leads:
        keys = leads[0].keys()
        with open(output_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=keys)
            writer.writeheader()
            writer.writerows(leads)
        print(f"SUCCESS: Saved {len(leads)} valid leads to {output_file}")
    else:
        print(f"WARNING: No valid leads found for {industry_label}")

# Segment into Manufacturing
process_csvs('segmented_leads/Machine-shop-*.csv', 'segmented_leads/manufacturing_new_batch.csv', 'Manufacturing')

# Segment into Real Estate / Medical
process_csvs('segmented_leads/Medical-*.csv', 'segmented_leads/medical_new_batch.csv', 'Industrial Real Estate')
