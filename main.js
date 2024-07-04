const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoBox = document.getElementById('todos');
const tabs = document.querySelector('.tabs');
const tabLine = document.getElementById('underline');
const modalArea = document.querySelector('.modal-area');
const modal = document.querySelector('.modal');
const modalInput = document.querySelector('.modal-input');

const initialList = [
  { id: Date.now(), text: '스터디 과제 하기', done: false },
  { id: Date.now() + 1, text: '강아지 산책시키기', done: true },
];
let todoList = initialList;
let filter = 'all';
let selectedTodoId;

render();

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

todoBox.addEventListener('click', (e) => {
  const target = e.target.parentElement;
  const id = target.dataset.id;
  if (target.matches('.done-button')) {
    toggleDone(id);
  } else if (target.matches('.edit-button')) {
    selectedTodoId = id;
    toggleModal();
  } else if (target.matches('.delete-button')) {
    deleteTodo(id);
  }
});

tabs.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    filter = e.target.textContent;
    tabAnimation(e.target.offsetLeft, e.target.clientWidth);
    render();
  }
});

modal.addEventListener('click', (e) => {
  const target = e.target.parentElement;
  if (target.matches('.modal-edit-button')) {
    editTodo();
  } else if (target.matches('.modal-close-button')) {
    toggleModal();
  }
});

function addTodo() {
  const text = todoInput.value;
  if (text.trim() === '') {
    alert('할일을 입력해주세요!');
    todoInput.focus();
    return;
  }
  todoList.push({ id: Date.now(), text, done: false });
  todoInput.value = '';
  render();
}

function deleteTodo(id) {
  todoList = todoList.filter((todo) => todo.id != id);
  render();
}

function editTodo() {
  const text = modalInput.value;
  if (text.trim() === '') return;
  todoList = todoList.map((todo) => {
    if (todo.id == selectedTodoId) {
      return { id: todo.id, text, done: todo.done };
    }
    return todo;
  });
  render();
  toggleModal();
}

function toggleDone(id) {
  todoList = todoList.map((todo) => {
    if (todo.id == id) {
      return { id: todo.id, text: todo.text, done: !todo.done };
    }
    return todo;
  });
  render();
}

function render() {
  let resultHtml = '';
  let renderList = [];
  if (filter === 'all') {
    renderList = todoList;
  } else if (filter === 'active') {
    renderList = todoList.filter((todo) => !todo.done);
  } else if (filter === 'done') {
    renderList = todoList.filter((todo) => todo.done);
  }
  for (let i = 0; i < renderList.length; i++) {
    resultHtml += `
        <li class="todo ${renderList[i].done ? 'done' : ''}">
          <p>${renderList[i].text}</p>
          <div>
            <button class="done-button" data-id="${renderList[i].id}">
              <i class="fa-solid fa-check"></i>
              <i class="fa-solid fa-rotate-right"></i>
            </button>
            <button class="edit-button" data-id="${
              renderList[i].id
            }"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="delete-button" data-id="${renderList[i].id}">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </li>`;
  }
  todoBox.innerHTML = resultHtml;
}

function toggleModal() {
  modalInput.value = '';
  modalArea.classList.toggle('active');
}

function tabAnimation(x, w) {
  tabLine.style.left = `${x}px`;
  tabLine.style.width = `${w}px`;
}
