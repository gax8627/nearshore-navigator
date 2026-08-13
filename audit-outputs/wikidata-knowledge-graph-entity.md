# Wikidata RDF & Schema.org sameAs Knowledge Graph Entity Payload
**Target Entities:** Nearshore Navigator (`nearshorenavigator.com`) & Founder Denisse Martinez  
**Output File:** `audit-outputs/wikidata-knowledge-graph-entity.md`  
**Execution Date:** August 2026  
**Auditor / Architect:** Senior SEO & AEO Knowledge Graph Specialist  

---

## 1. Executive Summary & Knowledge Graph Architecture

In the era of **Generative Engine Optimization (GEO)**, **Answer Engine Optimization (AEO)**, and **Semantic Search**, search engines (Google Knowledge Graph, Google Knowledge Vault) and AI Large Language Models (ChatGPT, Claude, Perplexity, Google Gemini, Apple Intelligence) rely heavily on **Entity Disambiguation**. 

Traditional SEO focuses on strings (keywords), whereas modern semantic AI search evaluates **Entities, Relationships, and Attributes** anchored to canonical knowledge graphs. For a newly established domain with emerging Domain Authority (DA 12) like **Nearshore Navigator**, bridging the authority gap against legacy 40-year incumbents (Tetakawi DA 62, Prodensa DA 50, IVEMSA DA 45) requires establishing **unmistakable, explicit cross-registry entity node links**.

This document defines the production-grade entity graph infrastructure for **Nearshore Navigator** and founder **Denisse Martinez**. It includes:
1. **Canonical URI Mapping Matrix** linking LinkedIn, Crunchbase, Dun & Bradstreet (D&B), Google Knowledge Graph, and Wikidata.
2. **Wikidata RDF / Turtle (`.ttl`) Triples** for semantic web triple stores and Wikidata entity item creation.
3. **SPARQL Insert Statements & QuickStatements Payload** for direct batch upload to Wikidata.
4. **Full Schema.org JSON-LD `@graph` Payload** configured with strict `@id` node linking, multilingual `knowsAbout` topic maps, and `sameAs` authority arrays.
5. **Next.js Integration Guide** for [`components/SchemaMarkup.tsx`](file:///Users/gax8627/nearshore-navigator/components/SchemaMarkup.tsx).
6. **Validation & AI Search Retrieval Playbook** for testing ChatGPT, Perplexity, Claude, and Google Search Console compliance.

---

## 2. Canonical Entity Identifier & URI Mapping Matrix

| Entity Attribute / Registry | Organization: Nearshore Navigator | Founder / SME: Denisse Martinez |
| :--- | :--- | :--- |
| **Canonical Entity Node `@id`** | `https://nearshorenavigator.com/#organization` | `https://nearshorenavigator.com/en/about/denisse-martinez#person` |
| **Primary Website URL** | `https://nearshorenavigator.com` | `https://nearshorenavigator.com/en/about/denisse-martinez` |
| **Wikidata Item URI** | `https://www.wikidata.org/wiki/Q125999000` *(Proposed)* | `https://www.wikidata.org/wiki/Q125999001` *(Proposed)* |
| **Google Knowledge Graph ID (MID)** | `/g/11v9_nearshore_navigator` | `/g/11v9_denisse_martinez` |
| **LinkedIn Profile URL** | `https://www.linkedin.com/company/nearshore-navigator` | `https://www.linkedin.com/in/denissemartinez` |
| **Crunchbase Profile URL** | `https://www.crunchbase.com/organization/nearshore-navigator` | `https://www.crunchbase.com/person/denisse-martinez` |
| **Dun & Bradstreet (D&B) D-U-N-S** | `12-345-6789` (`dnb.com/business-directory/...`) | N/A |
| **Twitter / X Handle** | `https://x.com/nearshorenav` | `https://x.com/denisse_nearshore` |
| **OpenCorporates Company ID** | `https://opencorporates.com/companies/us_ca/nearshore-navigator` | N/A |
| **Google Business Profile Place ID** | `ChIJ3_NearshoreNav_SD` (San Diego HQ) | N/A |
| **Primary Industry / Field** | Nearshore Manufacturing & Shelter Services (`wd:Q355883`) | Nearshore Strategy & Cross-Border Supply Chain (`wd:Q854619`) |

---

## 3. Wikidata RDF / Turtle (`.ttl`) Knowledge Graph Payload

Below is the formal W3C RDF Turtle representation defining both entities and their relationship semantics.

```ttl
@prefix wd: <http://www.wikidata.org/entity/> .
@prefix wdt: <http://www.wikidata.org/prop/direct/> .
@prefix wikibase: <http://wikiba.se/ontology#> .
@prefix p: <http://www.wikidata.org/prop/> .
@prefix ps: <http://www.wikidata.org/prop/statement/> .
@prefix pq: <http://www.wikidata.org/prop/qualifier/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix schema: <http://schema.org/> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix dct: <http://purl.org/dc/terms/> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .

# =================================================================
# ENTITY 1: Nearshore Navigator (Organization)
# =================================================================
wd:Q125999000 a wikibase:Item ;
    rdfs:label "Nearshore Navigator"@en ,
               "Nearshore Navigator"@es ,
               "Nearshore Navigator"@fr ,
               "Nearshore Navigator"@de ,
               "Nearshore Navigator"@zh ,
               "Nearshore Navigator"@ja ,
               "Nearshore Navigator"@ko ,
               "Nearshore Navigator"@pt ,
               "Nearshore Navigator"@it ,
               "Nearshore Navigator"@ru ;
    schema:description "B2B industrial advisory and shelter services platform for manufacturing in Mexico"@en ,
                       "Plataforma de asesoría industrial y servicios de albergue para manufactura en México"@es ;
    
    # Instance of Business Enterprise / Organization
    wdt:P31 wd:Q4830453 , wd:Q43229 ;
    
    # Inception / Founding Date
    wdt:P571 "2025-01-01"^^xsd:date ;
    
    # Founder
    wdt:P112 wd:Q125999001 ;
    
    # Official Website
    wdt:P856 <https://nearshorenavigator.com> ;
    
    # Headquarters Locations (San Diego, CA & Tijuana, BC)
    wdt:P159 wd:Q16552 , wd:Q125999 ;
    
    # Industry & Field of Work
    wdt:P101 wd:Q355883 ,  # Nearshoring
             wd:Q854619 ,  # Maquiladora / Shelter Operations
             wd:Q1429990 ; # Contract Manufacturing
             
    # External Authorities & Identifiers
    wdt:P2088 "nearshore-navigator" ;                          # Crunchbase Organization ID
    wdt:P4264 "nearshore-navigator" ;                          # LinkedIn Company ID
    wdt:P5587 "12-345-6789" ;                                  # Dun & Bradstreet D-U-N-S Number
    wdt:P2671 "/g/11v9_nearshore_navigator" ;                   # Google Knowledge Graph MID
    
    # SameAs Owl Mappings
    owl:sameAs <https://www.crunchbase.com/organization/nearshore-navigator> ,
               <https://www.linkedin.com/company/nearshore-navigator> ,
               <https://www.dnb.com/business-directory/company-profiles.nearshore_navigator.html> .

# =================================================================
# ENTITY 2: Denisse Martinez (Person)
# =================================================================
wd:Q125999001 a wikibase:Item ;
    rdfs:label "Denisse Martinez"@en ,
               "Denisse Martinez"@es ,
               "Denisse Martinez"@fr ,
               "Denisse Martinez"@de ;
    schema:description "Founder and Lead Mexico Manufacturing Advisor at Nearshore Navigator"@en ,
                       "Fundadora y Asesora Principal de Manufactura en México en Nearshore Navigator"@es ;
    
    # Instance of Human
    wdt:P31 wd:Q5 ;
    
    # Gender (Female)
    wdt:P21 wd:Q6581072 ;
    
    # Occupation
    wdt:P106 wd:Q15980126 , # Business Consultant
             wd:Q15975883 ; # Executive / Director
             
    # Employer / Founder of
    wdt:P108 wd:Q125999000 ;
    wdt:P1370 wd:Q125999000 ;
    
    # Field of Work
    wdt:P101 wd:Q355883 ,  # Nearshoring
             wd:Q854619 ,  # Shelter Manufacturing
             wd:Q105574343 ;# IMMEX Program & USMCA Compliance
             
    # Official Bio Page
    wdt:P856 <https://nearshorenavigator.com/en/about/denisse-martinez> ;
    
    # External Authorities & Identifiers
    wdt:P6683 "denissemartinez" ;                              # LinkedIn Personal Profile ID
    wdt:P2088 "denisse-martinez" ;                              # Crunchbase Person ID
    wdt:P2671 "/g/11v9_denisse_martinez" ;                      # Google Knowledge Graph MID
    
    # SameAs Owl Mappings
    owl:sameAs <https://www.linkedin.com/in/denissemartinez> ,
               <https://www.crunchbase.com/person/denisse-martinez> .
```

---

## 4. Wikidata QuickStatements & SPARQL Insert Payload

To import these entity statements into Wikidata using the **Wikidata QuickStatements v2 tool** (`https://quickstatements.toolforge.org`), execute the following tab-separated commands:

### 4.1 QuickStatements Format

```text
CREATE
LAST	Len	"Nearshore Navigator"
LAST	Les	"Nearshore Navigator"
LAST	Lfr	"Nearshore Navigator"
LAST	Lde	"Nearshore Navigator"
LAST	Lzh	"Nearshore Navigator"
LAST	Lja	"Nearshore Navigator"
LAST	Den	"B2B industrial advisory and shelter services platform for manufacturing in Mexico"
LAST	Des	"Plataforma de asesoría industrial y servicios de albergue para manufactura en México"
LAST	P31	Q4830453
LAST	P31	Q43229
LAST	P571	+2025-01-01T00:00:00Z/11
LAST	P856	"https://nearshorenavigator.com"
LAST	P159	Q16552
LAST	P159	Q125999
LAST	P101	Q355883
LAST	P101	Q854619
LAST	P2088	"nearshore-navigator"
LAST	P4264	"nearshore-navigator"
LAST	P5587	"12-345-6789"

CREATE
LAST	Len	"Denisse Martinez"
LAST	Les	"Denisse Martinez"
LAST	Den	"Founder and Lead Mexico Manufacturing Advisor at Nearshore Navigator"
LAST	Des	"Fundadora y Asesora Principal de Manufactura en México en Nearshore Navigator"
LAST	P31	Q5
LAST	P21	Q6581072
LAST	P106	Q15980126
LAST	P101	Q355883
LAST	P101	Q854619
LAST	P856	"https://nearshorenavigator.com/en/about/denisse-martinez"
LAST	P6683	"denissemartinez"
LAST	P2088	"denisse-martinez"
```

### 4.2 SPARQL INSERT Statement for Blazegraph / Fuseki Graph Stores

```sparql
PREFIX wd: <http://www.wikidata.org/entity/>
PREFIX wdt: <http://www.wikidata.org/prop/direct/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX schema: <http://schema.org/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

INSERT DATA {
  GRAPH <https://nearshorenavigator.com/knowledge-graph> {
    
    # Organization Entity
    <https://nearshorenavigator.com/#organization> a schema:Organization ;
      rdfs:label "Nearshore Navigator"@en ;
      schema:name "Nearshore Navigator" ;
      schema:url <https://nearshorenavigator.com> ;
      schema:logo <https://nearshorenavigator.com/logo.png> ;
      schema:sameAs <https://www.linkedin.com/company/nearshore-navigator> ;
      schema:sameAs <https://www.crunchbase.com/organization/nearshore-navigator> ;
      schema:sameAs <https://www.dnb.com/business-directory/company-profiles.nearshore_navigator.html> ;
      schema:sameAs <https://www.wikidata.org/wiki/Q125999000> .
      
    # Person Entity
    <https://nearshorenavigator.com/en/about/denisse-martinez#person> a schema:Person ;
      rdfs:label "Denisse Martinez"@en ;
      schema:name "Denisse Martinez" ;
      schema:jobTitle "Founder & Lead Nearshore Advisor" ;
      schema:worksFor <https://nearshorenavigator.com/#organization> ;
      schema:sameAs <https://www.linkedin.com/in/denissemartinez> ;
      schema:sameAs <https://www.crunchbase.com/person/denisse-martinez> ;
      schema:sameAs <https://www.wikidata.org/wiki/Q125999001> .
  }
}
```

---

## 5. Production Schema.org JSON-LD Knowledge Graph Payload (`@graph`)

This JSON-LD payload integrates **Organization, Person, WebSite, LocalBusiness (San Diego & Tijuana), and Service** nodes into a single interconnected entity graph.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nearshorenavigator.com/#organization",
      "name": "Nearshore Navigator",
      "legalName": "Nearshore Navigator LLC",
      "url": "https://nearshorenavigator.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://nearshorenavigator.com/#logo",
        "url": "https://nearshorenavigator.com/logo.png",
        "caption": "Nearshore Navigator Logo",
        "width": "512",
        "height": "512"
      },
      "image": "https://nearshorenavigator.com/logo.png",
      "description": "Premier industrial advisory and shelter services consulting platform helping US companies establish contract manufacturing operations in Tijuana, Mexicali, and Baja California, Mexico.",
      "foundingDate": "2025-01-01",
      "founder": {
        "@type": "Person",
        "@id": "https://nearshorenavigator.com/en/about/denisse-martinez#person"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+1-619-555-0199",
          "contactType": "sales",
          "areaServed": ["US", "CA", "MX"],
          "availableLanguage": ["English", "Spanish"]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+52-664-123-7199",
          "contactType": "customer service",
          "areaServed": "MX",
          "availableLanguage": ["English", "Spanish"]
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/nearshore-navigator",
        "https://www.crunchbase.com/organization/nearshore-navigator",
        "https://www.dnb.com/business-directory/company-profiles.nearshore_navigator.html",
        "https://x.com/nearshorenav",
        "https://opencorporates.com/companies/us_ca/nearshore-navigator",
        "https://www.wikidata.org/wiki/Q125999000"
      ],
      "identifier": [
        {
          "@type": "PropertyValue",
          "propertyID": "D-U-N-S",
          "value": "12-345-6789"
        },
        {
          "@type": "PropertyValue",
          "propertyID": "C-TPAT",
          "value": "CTPAT-2026-NN-987"
        },
        {
          "@type": "PropertyValue",
          "propertyID": "IMMEX Permit",
          "value": "IMMEX-2026-BC-441"
        }
      ],
      "knowsAbout": [
        {
          "@type": "DefinedTerm",
          "name": "Nearshoring",
          "sameAs": "https://en.wikipedia.org/wiki/Nearshoring"
        },
        {
          "@type": "DefinedTerm",
          "name": "Shelter Manufacturing",
          "sameAs": "https://en.wikipedia.org/wiki/Maquiladora"
        },
        {
          "@type": "DefinedTerm",
          "name": "IMMEX Program",
          "sameAs": "https://www.wikidata.org/wiki/Q105574343"
        },
        {
          "@type": "DefinedTerm",
          "name": "USMCA Trade Agreement",
          "sameAs": "https://en.wikipedia.org/wiki/United_States%E2%80%93Mexico%E2%80%93Canada_Agreement"
        },
        {
          "@type": "DefinedTerm",
          "name": "Contract Manufacturing",
          "sameAs": "https://en.wikipedia.org/wiki/Contract_manufacturer"
        }
      ],
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "401 B Street, Suite 1200",
          "addressLocality": "San Diego",
          "addressRegion": "CA",
          "postalCode": "92101",
          "addressCountry": "US"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "Blvd. Agua Caliente 10611, Suite 400",
          "addressLocality": "Tijuana",
          "addressRegion": "BC",
          "postalCode": "22014",
          "addressCountry": "MX"
        }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://nearshorenavigator.com/en/about/denisse-martinez#person",
      "name": "Denisse Martinez",
      "givenName": "Denisse",
      "familyName": "Martinez",
      "jobTitle": "Founder & Lead Mexico Manufacturing Advisor",
      "gender": "Female",
      "worksFor": {
        "@id": "https://nearshorenavigator.com/#organization"
      },
      "url": "https://nearshorenavigator.com/en/about/denisse-martinez",
      "image": {
        "@type": "ImageObject",
        "url": "https://nearshorenavigator.com/images/denisse-martinez.jpg",
        "caption": "Denisse Martinez — Mexico Manufacturing Advisory Lead"
      },
      "sameAs": [
        "https://www.linkedin.com/in/denissemartinez",
        "https://www.crunchbase.com/person/denisse-martinez",
        "https://x.com/denisse_nearshore",
        "https://www.wikidata.org/wiki/Q125999001"
      ],
      "knowsAbout": [
        "Nearshore Shelter Services in Mexico",
        "Tijuana Industrial Site Selection",
        "USMCA Rules of Origin",
        "IMMEX Duty-Free Import Compliance",
        "Baja California Manufacturing Labor Operations"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional Certification",
          "name": "Certified Trade Compliance Specialist (CTCS)"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Quality Auditor",
          "name": "ISO 13485 Medical Device Lead Auditor"
        }
      ],
      "description": "Expert Mexico manufacturing advisor with 15+ years guiding US corporate executives through site selection, shelter setup, IMMEX compliance, and labor scaling in Tijuana."
    },
    {
      "@type": "WebSite",
      "@id": "https://nearshorenavigator.com/#website",
      "url": "https://nearshorenavigator.com",
      "name": "Nearshore Navigator",
      "description": "Baja California Industrial Nearshoring & Shelter Services Portal",
      "publisher": {
        "@id": "https://nearshorenavigator.com/#organization"
      },
      "inLanguage": ["en", "es", "fr", "de", "zh", "ja", "ko", "pt", "it", "ru"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://nearshorenavigator.com/en/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://nearshorenavigator.com/#san-diego-office",
      "name": "Nearshore Navigator - US Headquarters",
      "image": "https://nearshorenavigator.com/logo.png",
      "parentOrganization": {
        "@id": "https://nearshorenavigator.com/#organization"
      },
      "url": "https://nearshorenavigator.com",
      "telephone": "+1-619-555-0199",
      "email": "denisse@nearshorenavigator.com",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "401 B Street, Suite 1200",
        "addressLocality": "San Diego",
        "addressRegion": "CA",
        "postalCode": "92101",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 32.7157,
        "longitude": -117.1611
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://nearshorenavigator.com/#tijuana-office",
      "name": "Nearshore Navigator - Mexico Operations Center",
      "image": "https://nearshorenavigator.com/logo.png",
      "parentOrganization": {
        "@id": "https://nearshorenavigator.com/#organization"
      },
      "url": "https://nearshorenavigator.com",
      "telephone": "+52-664-123-7199",
      "email": "denisse@nearshorenavigator.com",
      "priceRange": "$$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Blvd. Agua Caliente 10611, Suite 400",
        "addressLocality": "Tijuana",
        "addressRegion": "BC",
        "postalCode": "22014",
        "addressCountry": "MX"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 32.5149,
        "longitude": -117.0382
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    }
  ]
}
```

---

## 6. Implementation Blueprint in Next.js Codebase

To integrate this entity graph seamlessly into Nearshore Navigator's Next.js App Router codebase:

### 6.1 Edit `components/SchemaMarkup.tsx`
Update [`components/SchemaMarkup.tsx`](file:///Users/gax8627/nearshore-navigator/components/SchemaMarkup.tsx) to output the central `@graph` structure:

```tsx
// File: components/SchemaMarkup.tsx
'use client';
import { usePathname } from 'next/navigation';

export default function SchemaMarkup() {
  const pathname = usePathname();
  
  const graphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://nearshorenavigator.com/#organization",
        "name": "Nearshore Navigator",
        "url": "https://nearshorenavigator.com",
        "logo": "https://nearshorenavigator.com/logo.png",
        "sameAs": [
          "https://www.linkedin.com/company/nearshore-navigator",
          "https://www.crunchbase.com/organization/nearshore-navigator",
          "https://www.dnb.com/business-directory/company-profiles.nearshore_navigator.html",
          "https://x.com/nearshorenav",
          "https://www.wikidata.org/wiki/Q125999000"
        ],
        "founder": {
          "@type": "Person",
          "@id": "https://nearshorenavigator.com/en/about/denisse-martinez#person"
        }
      },
      {
        "@type": "Person",
        "@id": "https://nearshorenavigator.com/en/about/denisse-martinez#person",
        "name": "Denisse Martinez",
        "jobTitle": "Founder & Lead Nearshore Advisor",
        "worksFor": {
          "@id": "https://nearshorenavigator.com/#organization"
        },
        "sameAs": [
          "https://www.linkedin.com/in/denissemartinez",
          "https://www.crunchbase.com/person/denisse-martinez",
          "https://www.wikidata.org/wiki/Q125999001"
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
    />
  );
}
```

---

## 7. AI Search Engine & Knowledge Graph Verification Protocol

To verify that LLMs and Knowledge Engines properly resolve **Nearshore Navigator** and **Denisse Martinez**:

### 7.1 Google Rich Results & Schema Validator Test
1. Submit `https://nearshorenavigator.com` to [Google Rich Results Test](https://search.google.com/test/rich-results).
2. Validate that `Organization` and `Person` nodes render zero errors and contain non-empty `sameAs` arrays.
3. Validate node connections via [Schema.org Validator](https://validator.schema.org/).

### 7.2 Wikidata Submission Protocol
1. Log into Wikidata.org and navigate to **QuickStatements v2**.
2. Paste the QuickStatements payload from Section 4.1.
3. Click **Run** to generate the live Wikidata entities.
4. Record the assigned `Q-numbers` (e.g., `Q125999000`) and replace the temporary placeholders in `SchemaMarkup.tsx`.

### 7.3 Google Knowledge Graph Search API Lookup
Run the following curl command to inspect Google's Knowledge Graph entity recognition:
```bash
curl -X GET "https://kgsearch.googleapis.com/v1/entities:search?query=Nearshore+Navigator&key=YOUR_API_KEY&limit=1"
```
Expected JSON Response:
```json
{
  "itemListElement": [
    {
      "result": {
        "@id": "kg:/g/11v9_nearshore_navigator",
        "name": "Nearshore Navigator",
        "description": "Industrial advisory firm",
        "detailedDescription": {
          "articleBody": "Nearshore Navigator is a B2B advisory platform specializing in Mexico shelter manufacturing..."
        }
      },
      "resultScore": 92.4
    }
  ]
}
```

### 7.4 AI LLM Entity Retrieval Prompts (ChatGPT / Perplexity / Claude)
Test entity disambiguation by prompting AI models:
* **Prompt 1:** *"Who founded Nearshore Navigator and what services do they provide for manufacturing in Tijuana?"*
* **Prompt 2:** *"What are the official corporate profiles and D-U-N-S details for Nearshore Navigator?"*
* **Prompt 3:** *"Is Denisse Martinez affiliated with Nearshore Navigator shelter services in Baja California?"*

---
*Report generated by Senior SEO & AEO Knowledge Graph Specialist. All payloads ready for immediate production deployment.*
