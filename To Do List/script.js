const addTaskButton = document.getElementById('criar-tarefa');
const inputTextArea = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');
const clearListButton = document.getElementById('apaga-tudo');
const clearCompletedButton = document.getElementById('remover-finalizados');

const getInputValue = () => {
  const valor = inputTextArea.value;
  inputTextArea.value = '';
  return valor;
};

const selectItem = (event) => {
  const alvo = event.target;
  const selectedItem = document.getElementsByClassName('selected');
  if (selectedItem.length > 0) {
    selectedItem[0].classList.remove('selected');
  }
  alvo.classList.add('selected');
};

const completeItem = (event) => {
  const alvo = event.target;
  alvo.classList.toggle('completed');
};

const creatChild = (text) => {
  const li = document.createElement('li');
  li.innerText = text;
  li.addEventListener('click', selectItem);
  li.addEventListener('dblclick', completeItem);
  list.appendChild(li);
};

const addItemList = () => {
  const taskText = getInputValue();
  creatChild(taskText);
};

const clearList = () => {
  list.innerHTML = '';
};

const removeCompleted = () => {
  const completedItems = document.getElementsByClassName('completed');
  for (let index = completedItems.length - 1; index >= 0; index -= 1) {
    list.removeChild(completedItems[index]);
  }
};

addTaskButton.addEventListener('click', addItemList);
clearListButton.addEventListener('click', clearList);
clearCompletedButton.addEventListener('click', removeCompleted);
