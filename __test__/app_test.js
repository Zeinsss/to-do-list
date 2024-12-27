const fs = require('fs').promises; // Use fs.promises
const db = require('../persistence'); // Your database persistence module
const location = process.env.SQLITE_DB_LOCATION || 'D:/etc/todos/todo.db';
    

describe('SQLite Persistence Tests', () => {

    beforeEach(async () => {
        // Cleanup before each test
        if (await fs.exists(location)) {
            try {
                await db.teardown(); // Ensure the database connection is closed
                await fs.unlink(location); // Remove the SQLite file
            } catch (err) {
                console.error('Error during cleanup:', err);
            }
        }
    });

    afterEach(async () => {
        // Cleanup after each test
        if (await fs.exists(location)) {
            try {
                await db.teardown(); // Ensure the database connection is closed
                await fs.unlink(location); // Remove the SQLite file
            } catch (err) {
                console.error('Error during cleanup after test:', err);
            }
        }
    });

    it('can store and retrieve items', async () => {
        // Your test logic here
        const item = { id: '1', name: 'Test Item', completed: false };
        await db.storeItem(item);

        const items = await db.getItems();
        expect(items).toContainEqual(item); // Assuming db.getItems() returns an array of items
    });

    it('can update an existing item', async () => {
        // Your test logic here
        const item = { id: '1', name: 'Updated Item', completed: true };
        await db.storeItem(item);
        item.name = 'Updated Item Name';

        await db.updateItem(item.id, item);
        const updatedItem = await db.getItem(item.id);
        expect(updatedItem.name).toBe('Updated Item Name');
    });

    it('can remove an existing item', async () => {
        // Your test logic here
        const item = { id: '1', name: 'Test Item', completed: false };
        await db.storeItem(item);

        await db.removeItem(item.id);
        const items = await db.getItems();
        expect(items).not.toContainEqual(item);
    });

    it('can get a single item', async () => {
        // Your test logic here
        const item = { id: '1', name: 'Test Item', completed: false };
        await db.storeItem(item);

        const fetchedItem = await db.getItem(item.id);
        expect(fetchedItem.id).toBe(item.id);
    });
});
