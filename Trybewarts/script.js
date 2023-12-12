const loginButton = document.body.querySelector('.login-button');
const inputEmail = document.body.querySelector('#e-mail');
const inputPassword = document.body.querySelector('#password');
const checkboxAgree = document.body.querySelector('#agreement');
const btnEnviar = document.body.querySelector('#submit-btn');
const wordCounter = document.querySelector('#counter');
const textArea = document.querySelector('#textarea');

loginButton.addEventListener('click', () => {
  if (
    inputEmail.value === 'tryber@teste.com' && inputPassword.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
});

checkboxAgree.addEventListener('change', () => {
  console.log(checkboxAgree.checked);
  if (checkboxAgree.checked === true) {
    btnEnviar.disabled = false;
  } else {
    btnEnviar.disabled = true;
  }
});

textArea.addEventListener('input', () => {
  console.log(textArea.value.length);
  wordCounter.innerText = `${500 - textArea.value.length}`;
});

// =======================================================================
// questão 21

const formulario = document.querySelector('#evaluation-form');
const nome = document.querySelector('#input-name');
const sobrenome = document.querySelector('#input-lastname');
const email = document.querySelector('#input-email');
const casa = document.querySelector('#house');

function checkBox() {
  const checkboxes = document.querySelectorAll('input[name=materia]:checked');
  const values = [];
  checkboxes.forEach((checkbox) => {
    values.push(` ${checkbox.value}`);
  });
  return values;
}
function criaFormulario() {
  const novoForm = {
    Nome: `${nome.value} ${sobrenome.value}`,
    Email: email.value,
    Casa: casa.value,
    Família: `${document.querySelector('input[name=family]:checked').value}`,
    Matérias: `${checkBox()}`,
    Avaliação: `${document.querySelector('input[name=rate]:checked').value}`,
    Observações: `${textArea.value}`,
  };
  console.log(novoForm);
  return novoForm;
}

btnEnviar.addEventListener('click', (event) => {
  event.preventDefault();
  formulario.style.display = 'none';
  const imprimeInfo = document.querySelector('.imprime-info');
  const armazenaObj = criaFormulario();

  for (let i = 0; i < Object.entries(armazenaObj).length; i += 1) {
    const tagP = `<p>${Object.keys(armazenaObj)[i]}: ${Object.values(armazenaObj)[i]}<p>`;
    imprimeInfo.insertAdjacentHTML('beforeend', tagP);
  }
});
  