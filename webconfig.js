/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// The ID of your GCS bucket
const bucketName = 'dappstorebucket';

// The name of the main page
const mainPageSuffix = 'http://dappstore.com/';

// The Name of a 404 page
// const notFoundPage = 'http://example.com/404.html';

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

async function addBucketWebsiteConfiguration() {
  await storage.bucket(dappstorebucket).setMetadata({
    website: {
      mainPageSuffix,
      notFoundPage,
    },
  });

  console.log(
    `Static website bucket ${bucketName} is set up to use ${mainPageSuffix} as the index page and ${notFoundPage} as the 404 page`
  );
}

addBucketWebsiteConfiguration().catch(console.error);