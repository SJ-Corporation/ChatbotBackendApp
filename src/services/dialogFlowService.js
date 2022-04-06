const {SessionsClient} = require('@google-cloud/dialogflow-cx');
/**
 * Example for regional endpoint:
 *   const location = 'us-central1'
 *   const client = new SessionsClient({apiEndpoint: 'us-central1-dialogflow.googleapis.com'})
 */
const projectId = 'named-flag-335620';
const location = 'northamerica-northeast1';
const agentId = '535fd2db-3423-45c4-a1ae-3b84a15e5171';
// const query = 'Hello';
const languageCode = 'en' 
const client = new SessionsClient({apiEndpoint: 'northamerica-northeast1-dialogflow.googleapis.com',
                                    keyFilename: './src/config/named-flag-335620-45db76238eaa.json'});

async function detectIntentText(query, sessionId) {
    let resultMessage = [];
  const sessionPath = client.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );
  console.info(sessionPath);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
      },
      languageCode,
    },
  };
  const [response] = await client.detectIntent(request);
  console.log(`User Query: ${query}`);
  for (const message of response.queryResult.responseMessages) {
    if (message.text) {
        resultMessage.push(message.text.text[0]);
      console.log(`Agent Response: ${message.text.text}`);
    }
  }
  if (response.queryResult.match.intent) {
    console.log(
      `Matched Intent: ${response.queryResult.match.intent.displayName}`
    );
  }
  console.log(
    `Current Page: ${response.queryResult.currentPage.displayName}`
  );
  return resultMessage;
}

module.exports = { detectIntentText };