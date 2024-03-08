const todoObject = JSON.parse(localStorage.getItem('todoList')) || [{ name: 'fugg', dueDate: '10/20/2030' },
{ name: 'blabla', dueDate: '10/20/20/30' }];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';
  todoObject.forEach((objectElement, index) => {
    const { name, dueDate } = objectElement;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>

    <button class = "delete-todo-button js-delete-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  document.querySelectorAll('.js-delete-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoObject.splice(index, 1);
        renderTodoList();
        saveToLocalStorage();
      });
    })

  console.log(todoListHTML);
};

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => addTodo());

function addTodo() {
  const inputElem = document.querySelector('.js-input-name');
  const name = inputElem.value;
  const inputDueDate = document.querySelector('.js-input-due-date');
  const dueDate = inputDueDate.value;

  todoObject.push({ name, dueDate });
  console.log(todoObject);
  renderTodoList();
  saveToLocalStorage();
  inputElem.value = '';
  inputDueDate.value = '';
  console.log(localStorage.getItem('todoList'));
};

function saveToLocalStorage() {
  localStorage.setItem('todoList', JSON.stringify(todoObject));
}
