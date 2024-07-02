/**
 * 유저가 값을 입력한다
 * + 버튼 클릭하면 할일이 추가
 * delete버튼 클릭하면 할일 삭제
 * check 버튼 누르면 할일이 끝나면서 밑줄이 간다
 * 진행중 끝남 탭을 누르면, 언더바가 이동한다
 * 끝남탭은 끝난 아이템만 진행중탭은 진행중인 아잍ㅁ만
 * 전체탭을 누르면 다시 전체아이템
 */

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoBox = document.getElementById('todos');
let todoList = [];

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const newTodo = todoInput.value;
  if (newTodo.trim() === '') return;
  todoList.push(newTodo);
  todoInput.value = '';
  render();
}

function render() {
  let resultHtml = '';
  for (let i = 0; i < todoList.length; i++) {
    resultHtml += `
        <li class="todo">
          <p>${todoList[i]}</p>
          <div>
            <button>done</button>
            <button>remove</button>
          </div>
        </li>`;
  }
  todoBox.innerHTML = resultHtml;
}
