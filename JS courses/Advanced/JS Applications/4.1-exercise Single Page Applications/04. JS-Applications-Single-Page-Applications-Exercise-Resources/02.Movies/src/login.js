import { homePage } from './home.js';
import { showView, updateNav } from './util.js';
const loginSection = document.querySelector('#form-login');
const form = loginSection.querySelector('form');
form.addEventListener('submit', onSubmit);

export function loginPage() {
    showView(loginSection);
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);

    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await fetch(`http://localhost:3030/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));
        form.reset();
        updateNav();
        homePage();
    } catch (err) {
        alert(err.message);
    }
}
