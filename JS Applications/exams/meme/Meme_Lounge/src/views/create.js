import { createProduct } from '../api/data.js';
import { html } from '../lib.js';
import { createSubmitHandler, notify } from '../util.js';

const createProductTemplate = (onCreate) => html`
<section id="create-meme">
            <form @submit=${onCreate} id="create-form">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>
`;

export function createView(ctx) {
    ctx.render(createProductTemplate(createSubmitHandler(onCreate)));

    async function onCreate({ title, description, imageUrl}) {
        if (title == '' || description == '' || imageUrl == '') {
            return notify('All fields are required!');
        }

        await createProduct({title, description, imageUrl});
        ctx.page.redirect('/catalog');
    }
}