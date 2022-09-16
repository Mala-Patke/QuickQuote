import { docs, auth } from '@googleapis/docs';

let authClient = new auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.GOOGLE_REDIRECT_URI
});

let docClient = docs({
  version: 'v1',
});

/**
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
export default async function handler({ query }, res) {
  authClient.setCredentials({
    access_token: 'My Nuts',
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });

  docClient.context._options.auth = authClient;

  let result = await docClient.documents.batchUpdate({
    documentId: process.env.QUOTEBOOK_DOCUMENT_ID,
    requestBody: {
      requests: [{
          insertText: {
            text: '\n' + query.quote,
            endOfSegmentLocation: {
              segmentId: ''
            },
          }
        }]
    }
  });

  res.status(200).send(result);
}