// Script temporarily disabled to fix Next.js build error
// import { analyticsAdmin_v1alpha } from '@googleapis/analytics-admin';
// import { google } from 'googleapis';

// const KEY_FILE = '/Users/gax8627/.config/gcloud/application_default_credentials.json';

// async function listProperties() {
//   try {
//     const auth = new google.auth.GoogleAuth({
//       keyFile: KEY_FILE,
//       scopes: ['https://www.googleapis.com/auth/analytics.readonly', 'https://www.googleapis.com/auth/analytics.edit'],
//     });

//     const analyticsAdmin = new analyticsAdmin_v1alpha.Analyticsadmin({ auth });
//     const response = await analyticsAdmin.properties.list({ filter: 'parent:accounts/*' });
    
//     console.log('Analytics Properties:');
//     response.data.properties?.forEach(prop => {
//       console.log(`- ${prop.displayName} (${prop.name}) - Data Retention: ${prop.dataRetentionSettings}`);
//     });
//   } catch (error: any) {
//     console.error('Error listing properties:', error.message);
//   }
// }

// listProperties();
