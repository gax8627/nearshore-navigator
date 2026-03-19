/**
 * HubSpot CRM Service
 * Handles contact synchronization and deal staging for industrial leads.
 */

export interface HubspotContact {
    email: string;
    firstname?: string;
    lastname?: string;
    company?: string;
    phone?: string;
    website?: string;
    lifecyclestage?: 'lead' | 'marketingqualifiedlead' | 'salesqualifiedlead' | 'opportunity' | 'customer';
    industry_intent?: string; // Custom property
    intent_score?: number;   // Custom property
}

const HUBSPOT_API_URL = 'https://api.hubapi.com/crm/v3/objects/contacts';

export const hubspot = {
    /**
     * Create or update a contact in HubSpot
     */
    async upsertContact(contact: HubspotContact) {
        const token = process.env.HUBSPOT_ACCESS_TOKEN;
        if (!token) {
            console.warn('[HubSpot] Access Token not configured. Skipping sync.');
            return null;
        }

        const properties = {
            email: contact.email,
            firstname: contact.firstname,
            lastname: contact.lastname,
            company: contact.company,
            phone: contact.phone,
            website: contact.website,
            lifecyclestage: contact.lifecyclestage || 'lead',
            industry_intent: contact.industry_intent,
            intent_score: contact.intent_score?.toString(),
        };

        try {
            // Check if contact exists
            const searchUrl = `${HUBSPOT_API_URL}/${contact.email}?idProperty=email`;
            const checkRes = await fetch(searchUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (checkRes.ok) {
                // Update
                const existing = await checkRes.json();
                const updateUrl = `${HUBSPOT_API_URL}/${existing.id}`;
                const updateRes = await fetch(updateUrl, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ properties }),
                });
                return updateRes.json();
            } else if (checkRes.status === 404) {
                // Create
                const createRes = await fetch(HUBSPOT_API_URL, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ properties }),
                });
                return createRes.json();
            } else {
                const errorData = await checkRes.json();
                console.error('[HubSpot] Search Error:', errorData);
                throw new Error('HubSpot Search Failed');
            }
        } catch (error) {
            console.error('[HubSpot] Sync Error:', error);
            throw error;
        }
    }
};
