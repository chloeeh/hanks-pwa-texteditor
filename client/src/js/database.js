import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');
export const putDb = async (content) => {
  // Connect to the db and version we wish to use
  const jateDB = await openDB('jate', 1);
  // Create a transaction and specify the db and data privileges
  const txt = jateDB.transaction('jate', 'readwrite');
  // Open the specified object store
  const store = txt.objectStore('jate');
  // Use put() method on the store to update db with the content
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the PUT request
  const result = await request;
  console.log('Data saved to the database. Nice.', result);
};

// TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');
export const getDb = async () => {
  console.log('Getting all data!');
  // Connect to the db and version we wish to use
  const jateDb = await openDB('jate', 1);
  // Create a transaction and specify the db and data privileges
  const txt = jateDb.transaction('jate', 'readonly');
  // Open the specified object store
  const store = txt.objectStore('jate');
  // Use get() method to retrieve all the data from the database
  const request = store.get(1);
  // Get confirmation of the GET request
  const result = await request;
  console.log('result:', result);
  return result?.value;
};

initdb();
