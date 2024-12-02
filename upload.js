const { fetchAlbums } = require('./src/api/spotify');
const { uploadToMockAPI } = require('./src/api/mockapi');

const main = async () => {
  try {
    const albums = await fetchAlbums();
    console.log('Fetched albums:', albums);
    await uploadToMockAPI(albums);
    console.log('Data uploaded to MockAPI successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
