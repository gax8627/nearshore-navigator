const BREVO_API_KEY = process.env.BREVO_API_KEY as string;
const BREVO_API_URL = 'https://api.brevo.com/v3';

if (!BREVO_API_KEY) {
  console.warn('BREVO_API_KEY is not set.');
}

interface BrevoContact {
  email: string;
  attributes?: Record<string, string | number | boolean>;
  listIds?: number[];
  updateEnabled?: boolean;
}

export const brevo = {
  /**
   * Create or update a contact in Brevo.
   */
  async createContact(contact: BrevoContact) {
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const response = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: contact.email,
        attributes: contact.attributes,
        listIds: contact.listIds,
        updateEnabled: contact.updateEnabled ?? true,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.warn('Brevo createContact warning:', data);
    }

    return data;
  },

  /**
   * Send a transactional email.
   */
  async sendEmail({
    to,
    subject,
    htmlContent,
    sender,
    scheduledAt,
  }: {
    to: { email: string; name?: string }[];
    subject: string;
    htmlContent: string;
    sender?: { email: string; name?: string };
    scheduledAt?: string;
  }) {
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const defaultSender = { email: 'denisse@nearshorenavigator.com', name: 'Denisse Gastelum' };

    const body: any = {
      sender: sender || defaultSender,
      to,
      subject,
      htmlContent,
    };

    if (scheduledAt) {
      body.scheduledAt = scheduledAt;
    }

    const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(`Brevo Email Error: ${JSON.stringify(data)}`);
    }

    return data;
  },
  
  /**
   * Add a contact to a specific list
   */
  async addContactToList(email: string, listId: number) {
      if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

      const response = await fetch(`${BREVO_API_URL}/contacts/lists/${listId}/contacts/add`, {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          emails: [email],
        }),
      });
  
      const data = await response.json().catch(() => ({}));

    if (!response.ok) {
       // It's okay if they are already in the list
       return data; 
    }

    return data;
  },

  /**
   * Create a new List
   */
  async createList(name: string, folderId: number = 1) {
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const response = await fetch(`${BREVO_API_URL}/contacts/lists`, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name,
        folderId,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
       throw new Error(`Brevo Create List Error: ${JSON.stringify(data)}`);
    }

    return data; // returns { id: number }
  },

  /**
   * Create an Email Campaign
   */
  async createCampaign({
    name,
    subject,
    htmlContent,
    listIds,
    sender,
    scheduledAt,
  }: {
    name: string;
    subject: string;
    htmlContent: string;
    listIds: number[];
    sender?: { email: string; name?: string };
    scheduledAt?: string; // Format: YYYY-MM-DD HH:mm:ss
  }) {
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const defaultSender = { email: 'denisse@nearshorenavigator.com', name: 'Denisse Gastelum' };

    const body: any = {
      name,
      subject,
      sender: sender || defaultSender,
      type: 'classic',
      htmlContent,
      recipients: { listIds },
    };

    if (scheduledAt) {
      body.scheduledAt = scheduledAt;
    }

    const response = await fetch(`${BREVO_API_URL}/emailCampaigns`, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(`Brevo Campaign Error: ${JSON.stringify(data)}`);
    }

    return data;
  },

  /**
   * Get email events (opens, clicks, etc.)
   * https://developers.brevo.com/reference/getemaileventreport
   */
  async getEmailEvents({
    limit = 100,
    offset = 0,
    startDate,
    endDate,
    email,
    event,
    sort = 'desc'
  }: {
    limit?: number;
    offset?: number;
    startDate?: string; // YYYY-MM-DD
    endDate?: string;   // YYYY-MM-DD
    email?: string;
    event?: 'bounces' | 'hardBounces' | 'softBounces' | 'delivered' | 'spam' | 'requests' | 'opened' | 'clicks' | 'invalid' | 'deferred' | 'blocked' | 'unsubscribed' | 'error' | 'loadedByProxy';
    sort?: 'asc' | 'desc';
  }) {
    // @ts-ignore
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (email) params.append('email', email);
    if (event) params.append('event', event);
    if (sort) params.append('sort', sort);

    // @ts-ignore
    const response = await fetch(`${BREVO_API_URL}/smtp/statistics/events?${params.toString()}`, {
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Accept': 'application/json',
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
       console.warn('Brevo getEmailEvents warning:', data);
    }

    return data;
  }
};
