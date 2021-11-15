let toDoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodos;
let popup;
let popupInfo;
let toDoEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const prepareDOMElemenets = () => {
    toDoInput = document.querySelector('.todo-input');
    errorInfo = document.querySelector('.error-info');
    addBtn = document.querySelector('.btn-add');
    ulList = document.querySelector('.todolist ul');
    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    popupAddBtn = document.querySelector('.accept');
    popupCloseBtn = document.querySelector('.cancel');
};

const prepareDomEvents = () => {
    addBtn.addEventListener('click', addNewTask);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', cancelTask);
    popupAddBtn.addEventListener('click', changeTask);
    toDoInput.addEventListener('keyup', checKeyUp);
};

const addNewTask = () => {
    if (toDoInput.value !== '') {
        newTodos = document.createElement('li');
        newTodos.textContent = toDoInput.value;
        createToolSArea();
        ulList.appendChild(newTodos);
        toDoInput.value = ``;
        errorInfo.textContent = ``;

    } else {
        errorInfo.textContent = `Wpisz treść zadania`;
    };
};

const createToolSArea = () => {
    const newTools = document.createElement('div');
    newTools.classList.add('tools');
    const newBtnComplete = document.createElement('button');
    newBtnComplete.classList.add('complete');
    newBtnComplete.innerHTML = `<i class="fas fa-check">`;
    newTools.append(newBtnComplete);
    const newBtnEdit = document.createElement('button');
    newBtnEdit.textContent = `EDIT`;
    newBtnEdit.classList.add('edit');
    newTools.append(newBtnEdit);
    const newBtnDelete = document.createElement('button');
    newBtnDelete.classList.add('delete');
    newBtnDelete.innerHTML = `<i class="fas fa-times"></i>`;
    newTools.append(newBtnDelete);
    newTodos.append(newTools);
};

const checkClick = e => {
    if (e.target.matches('.complete')) {
        e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed');
    } else if (e.target.matches('.edit')) {
        editTask(e);
    } else if (e.target.matches('.delete')) {
        deleteTask(e);
    }
};

const editTask = e => {
    toDoEdit = e.target.closest('li');
    popupInput.value = toDoEdit.firstChild.textContent;
    popup.style.display = `flex`;
}

const cancelTask = () => {
    popup.style.display = `none`;
    popupInfo.textContent = ``;
};

const changeTask = () => {
    if (popupInput.value !== ``) {
        toDoEdit.firstChild.textContent = popupInput.value;
        popup.style.display = 'none';
        popupInfo.textContent = ``;
    } else {
        popupInfo.textContent = `Musisz podać jakaś treść!`
    };
};

const deleteTask = e => {
    e.target.closest('li').remove();
    const allTodos = ulList.querySelectorAll('li');

    if (allTodos.length === 0) {
        errorInfo.textContent = `Brak zadań na liście`
    };
};

const main = () => {
    prepareDOMElemenets();
    prepareDomEvents();
};

const checKeyUp = (e) => {
    if (e.key === `Enter`) {
        addNewTask();
    };
};

document.addEventListener('DOMContentLoaded', main);