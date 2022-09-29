/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { addListItem } from './fetch-utils.js';

/* Get DOM Elements */
const form = document.getElementById('add-new');

/* State */

/* Events */

/* Display Functions */

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const item = data.get('item');
    const quantity = data.get('quantity');

    await addListItem(item, quantity);
    form.reset();
});
