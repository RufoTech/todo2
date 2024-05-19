const todoInputu = document.querySelector("input");
const ulTeqi = document.querySelector("ul");
const elaveEtmeButtonu = document.getElementsByTagName("button")[0];

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

elaveEtmeButtonu.addEventListener("click", tapsirigiElaveEt);
ulTeqi.addEventListener('click', tamamlaVeYaSil);

function tapsirigiElaveEt(e) {
    e.preventDefault();

    const taskDivi = document.createElement("div");
    taskDivi.classList.add("d-flex", "justify-content-between", "align-items-center", "task", "my-2");

    const taskLi = document.createElement("li");
    taskLi.innerText = todoInputu.value;
    taskDivi.appendChild(taskLi);

    const buttonlarDivi = document.createElement("div");
    buttonlarDivi.classList.add("buttonlar");
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("tamamlandi");
    doneBtn.innerHTML = "<i class=\"fa-solid fa-clipboard-check\"></i>";

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("sil");
    removeBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

    buttonlarDivi.appendChild(doneBtn);
    buttonlarDivi.appendChild(removeBtn);
    taskDivi.appendChild(buttonlarDivi);

    ulTeqi.appendChild(taskDivi);

    saveTaskToLocalStorage(todoInputu.value);

    todoInputu.value = "";
}

function tamamlaVeYaSil(e) {
    const kliklediyimizYer = e.target;
    if (kliklediyimizYer.classList.contains("fa-clipboard-check")) {
        kliklediyimizYer.parentElement.parentElement.parentElement.classList.toggle("done");
    }

    if (kliklediyimizYer.classList.contains("fa-trash-can")) {
        const taskItem = kliklediyimizYer.parentElement.parentElement.parentElement;
        taskItem.classList.add("delete");
        removeTaskFromLocalStorage(taskItem);
        taskItem.addEventListener('transitionend', () => taskItem.remove());
    }
}

function saveTaskToLocalStorage(task) {
    let tasks = localStorage.getItem("tasks");
    tasks = tasks ? JSON.parse(tasks) : [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(taskItem) {
    let tasks = localStorage.getItem("tasks");
    tasks = tasks ? JSON.parse(tasks) : [];
    const taskIndex = taskItem.children[0].innerText;
    tasks.splice(tasks.indexOf(taskIndex), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    let tasks = localStorage.getItem("tasks");
    tasks = tasks ? JSON.parse(tasks) : [];

    tasks.forEach(task => {
        const taskDivi = document.createElement("div");
        taskDivi.classList.add("d-flex", "justify-content-between", "align-items-center", "task", "my-2");

        const taskLi = document.createElement("li");
        taskLi.innerText = task;
        taskDivi.appendChild(taskLi);

        const buttonlarDivi = document.createElement("div");
        buttonlarDivi.classList.add("buttonlar");
        const doneBtn = document.createElement("button");
        doneBtn.classList.add("tamamlandi");
        doneBtn.innerHTML = "<i class=\"fa-solid fa-clipboard-check\"></i>";

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("sil");
        removeBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

        buttonlarDivi.appendChild(doneBtn);
        buttonlarDivi.appendChild(removeBtn);
        taskDivi.appendChild(buttonlarDivi);

        ulTeqi.appendChild(taskDivi);
    });
}
