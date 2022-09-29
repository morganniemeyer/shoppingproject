/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { addListItem, retrieveList, buyTheThing, clearBought } from './fetch-utils.js';

/* Get DOM Elements */
const form = document.getElementById('add-new');
const bigList = document.getElementById('list');
const clearButton = document.getElementById('clear');

/* State */

/* Events */

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const item = data.get('item');
    const quantity = data.get('quantity');

    await addListItem(item, quantity);
    form.reset();
    await showList();
});

clearButton.addEventListener('click', async () => {
    await clearBought();
    showList();
});

/* Display Functions */

async function showList() {
    const response = await retrieveList();
    const list = response.data;
    bigList.textContent = '';

    for (let item of list) {
        const listItemEl = document.createElement('li');
        listItemEl.classList.add('list-item');
        listItemEl.textContent = `${item.quantity} ${item.item}`;

        if (item.bought === true) {
            listItemEl.classList.add('bought');
        }

        listItemEl.addEventListener('click', async () => {
            listItemEl.classList.add('bought');
            await buyTheThing(item.id);
            showList();
        });

        bigList.append(listItemEl);
    }
}

showList();
