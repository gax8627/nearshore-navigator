const getBrevoConfig = () => {
    const key = process.env.BREVO_API_KEY;
    const url = 'https://api.brevo.com/v3';
    return { key, url };
};

interface BrevoContact {
  email: string;
  attributes?: Record<string, string | number | boolean>;
  listIds?: number[];
  updateEnabled?: boolean;
}

export const brevo = {
  /**
   * Get a contact from Brevo.
   */
  async getContact(email: string) {
    const { key: BREVO_API_KEY, url: BREVO_API_URL } = getBrevoConfig();
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(`${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
          'api-key': BREVO_API_KEY,
          'Accept': 'application/json',
        },
        signal: controller.signal,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 404) return null;
        console.warn('Brevo getContact warning:', data);
      }

      return data;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  /**
   * Create or update a contact in Brevo.
   */
  async createContact(contact: BrevoContact) {
    const { key: BREVO_API_KEY, url: BREVO_API_URL } = getBrevoConfig();
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
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
        signal: controller.signal,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.warn('Brevo createContact warning:', data);
      }

      return data;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  /**
   * Send a transactional email.
   */
  async sendEmail({
    to,
    subject,
    htmlContent,
    sender,
    replyTo,
    scheduledAt,
    tags,
  }: {
    to: { email: string; name?: string }[];
    subject: string;
    htmlContent: string;
    sender?: { email: string; name?: string };
    replyTo?: { email: string; name?: string };
    scheduledAt?: string;
    tags?: string[];
  }) {
    const { key: apiKey, url: BREVO_API_URL } = getBrevoConfig();
    if (!apiKey) throw new Error('BREVO_API_KEY not configured');

    const defaultSender = { email: 'nearshore.navigator@gmail.com', name: 'Denisse Martinez' };

    const body: any = {
      sender: sender || defaultSender,
      to,
      replyTo: replyTo || { email: 'denisse@nearshorenavigator.com', name: 'Denisse Martinez' },
      subject,
      htmlContent,
    };

    if (scheduledAt) {
      body.scheduledAt = scheduledAt;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(`Brevo Email Error: ${JSON.stringify(data)}`);
      }

      return data;
    } finally {
      clearTimeout(timeoutId);
    }
  },
  
  /**
   * Add a contact to a specific list
   */
  async addContactToList(email: string, listId: number) {
      if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
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
        signal: controller.signal,
      });
  
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        // It's okay if they are already in the list
        return data; 
      }

      return data;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  /**
   * Create a new List
   */
  async createList(name: string, folderId: number = 1) {
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
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
        signal: controller.signal,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(`Brevo Create List Error: ${JSON.stringify(data)}`);
      }

      return data; // returns { id: number }
    } finally {
      clearTimeout(timeoutId);
    }
  },

  /**
   * Create an Email Campaign
   */
  async createCampaign({
    name,
    subject,
    htmlContent,
    templateId,
    listIds,
    sender,
    scheduledAt,
  }: {
    name: string;
    subject?: string;
    htmlContent?: string;
    templateId?: number;
    listIds: number[];
    sender?: { email: string; name?: string };
    scheduledAt?: string; // Format: YYYY-MM-DD HH:mm:ss
  }) {
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const defaultSender = { email: 'nearshore.navigator@gmail.com', name: 'Denisse Martinez' };

    const body: any = {
      name,
      sender: sender || defaultSender,
      type: 'classic',
      recipients: { listIds },
    };

    if (subject) body.subject = subject;
    if (htmlContent) body.htmlContent = htmlContent;
    if (templateId) body.templateId = templateId;

    if (scheduledAt) {
      body.scheduledAt = scheduledAt;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(`${BREVO_API_URL}/emailCampaigns`, {
        method: 'POST',
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(`Brevo Campaign Error: ${JSON.stringify(data)}`);
      }

      return data;
    } finally {
      clearTimeout(timeoutId);
    }
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
    const { key: BREVO_API_KEY, url: BREVO_API_URL } = getBrevoConfig();
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (offset) params.append('offset', offset.toString());
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (email) params.append('email', email);
    if (event) params.append('event', event);
    if (sort) params.append('sort', sort);

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
  },

  /**
   * Get campaigns
   */
  async getCampaigns({ limit = 5 }: { limit?: number }) {
    const { key: BREVO_API_KEY, url: BREVO_API_URL } = getBrevoConfig();
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());

    const response = await fetch(`${BREVO_API_URL}/emailCampaigns?${params.toString()}`, {
      method: 'GET',
      headers: {
        'api-key': BREVO_API_KEY,
        'Accept': 'application/json',
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
       console.warn('Brevo getCampaigns warning:', data);
    }

    return data;
  },

  /**
   * Create a transactional email template
   */
  async createTemplate({
    name,
    subject,
    htmlContent,
    sender,
  }: {
    name: string;
    subject: string;
    htmlContent: string;
    sender?: { email: string; name?: string };
  }) {
    const { key: BREVO_API_KEY, url: BREVO_API_URL } = getBrevoConfig();
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const response = await fetch(`${BREVO_API_URL}/smtp/templates`, {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        tag: name,
        templateName: name,
        sender: sender || { email: 'nearshore.navigator@gmail.com', name: 'Denisse Martinez' },
        subject,
        htmlContent,
        isActive: true,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(`Brevo Create Template Error: ${JSON.stringify(data)}`);
    }

    return data; // returns { id: number }
  },

  /**
   * Update a transactional email template
   */
  async updateTemplate(templateId: number, {
    name,
    subject,
    htmlContent,
  }: {
    name?: string;
    subject?: string;
    htmlContent?: string;
  }) {
    const { key: BREVO_API_KEY, url: BREVO_API_URL } = getBrevoConfig();
    if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

    const response = await fetch(`${BREVO_API_URL}/smtp/templates/${templateId}`, {
      method: 'PUT',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        templateName: name,
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(`Brevo Update Template Error: ${JSON.stringify(data)}`);
    }

    return true;
  },

  /**
   * Create a Contact Attribute (e.g., HOOK, ORGANIZATION)
   */
  async createAttribute(category: 'normal' | 'transactional' | 'category' | 'calculated' | 'global', name: string, type: 'text' | 'date' | 'float' | 'id') {
      const { key: BREVO_API_KEY, url: BREVO_API_URL } = getBrevoConfig();
      if (!BREVO_API_KEY) throw new Error('BREVO_API_KEY not configured');

      const response = await fetch(`${BREVO_API_URL}/contacts/attributes/${category}/${name}`, {
          method: 'POST',
          headers: {
              'api-key': BREVO_API_KEY,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
              type
          }),
      });

      if (!response.ok && response.status !== 400) { // 400 usually means already exists
          const data = await response.json().catch(() => ({}));
          throw new Error(`Brevo Create Attribute Error: ${JSON.stringify(data)}`);
      }

      return true;
  }
};
