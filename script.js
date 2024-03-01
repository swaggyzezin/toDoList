const taskName = document.querySelector('#taskName');
const addTask = document.querySelector('#addTask');
const taskArea = document.querySelector('.tasksArea');
const menuArea = document.querySelector('.menu');
const closeMenuArea = document.querySelector('#closeMenuButton');


let tasks = [];

function updateTask() {
    let newLi = '';
    tasks.forEach((item, id) => {
        newLi = newLi + `
        <li class="task" id="task${id}">
            <input type="checkbox" name="check" id="check${id}" onclick="check(${id})" ${item.checked ? 'checked' : 'unchecked'}">
            <p>${item.name}</p>
            <img src="img/menu.png" alt="menu" onclick="showMenu(${id})">
        </li>`;
    });

    taskArea.innerHTML = newLi;

    tasks.forEach((item, id) => {
        document.querySelector('#check' + id).addEventListener('change', () => check(id));
        if (item.checked) {
            document.querySelector('#task' + id).style = 'background-color: #15ff00; box-shadow: 0px 0px 20px #15ff00';        }
    });
    
    localStorage.setItem('listOfTasks', JSON.stringify(tasks))
}



function showMenu(id) {
    menuArea.innerHTML = `
    <div class="menuHeader">
        <h1 id="menuHeaderText">${tasks[id].name}</h1>
        <p onclick='closeMenu()'>X</p>
    </div>
    <hr>
    <div class="menuBody">
        <button id="deleteTask" onclick="deleteTaskById(${id})">Deletar</button>
    </div>`;

    menuArea.style = 'display: block;'
}

function deleteTaskById(id) {
    tasks.splice(id, 1);
    updateTask();
    menuArea.style = 'display: none;';
}

function closeMenu() {
    menuArea.style = 'display: none;';
}

function check(id) {
    tasks[id].checked = !tasks[id].checked;
    updateTask();
}

function loadListOfTasks() {
    const list = localStorage.getItem('listOfTasks');
    tasks = JSON.parse(list);

    updateTask();
}

addTask.addEventListener('click', () => {
    if (taskName.value != '') {
        tasks.push({name: taskName.value, checked: false});
        taskName.value = '';
    }

    updateTask();
})

loadListOfTasks();