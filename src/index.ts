import { UserForm } from './views/UserForm';

let doit;
const element = document.getElementById('root');

if (element) {
  doit = new UserForm(element);
}

document.addEventListener('DOMContentLoaded', () => {
  doit.render();
});
