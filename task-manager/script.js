const themeButton = document.querySelector('.theme-btn');
const icon = themeButton.querySelector("i");
const newTaskBtn = document.querySelector(".new-task-btn");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector("#close");
const form = document.querySelector("form");

const taskCardContainer = document.querySelector(".task-card-container");

const allCount = document.querySelector("#all-count");
const pendingCount = document.querySelector("#pending-count");
const completedCount = document.querySelector("#completed-count");
const categoriesCount = document.querySelector("#categories-count");

const taskStatus = document.querySelector("#taskStatus");
const taskCategory = document.querySelector("#taskCategory");

const searchTask = document.querySelector("#searchTask");

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark-theme") {
    document.body.classList.add("dark-theme");
    icon.classList.replace("ri-sun-line", "ri-moon-line")
}

themeButton.addEventListener("click" , () => {
    document.body.classList.toggle("dark-theme");
    
    const isDark = document.body.classList.contains("dark-theme");

    localStorage.setItem("theme", isDark ? "dark-theme" : "light-theme");

        icon.classList.toggle("ri-sun-line", !isDark);
        icon.classList.toggle("ri-moon-line", isDark);
});


function getFormattedTime() {
    return  new Date().toLocaleTimeString('en-IN', {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

const tasksArr = JSON.parse(localStorage.getItem("tasksList")) || [];

let updateIndex = null;

let currentFilter = "All tasks";
let currentCategory = "All";

let searchValue = "";

const renderTasks = () => {
    taskCardContainer.innerHTML = "";

    const filteredTasks = tasksArr.filter((task) => {
        const statusMatch = currentFilter === "All tasks" || task.status === currentFilter;
        const categoryMatch = currentCategory === "All" || task.category === currentCategory;

        const searchMatch = task.title.toLowerCase().includes(searchValue) || (task.description || "").toLowerCase().includes(searchValue);

        return statusMatch && categoryMatch && searchMatch;
    })

    console.log(filteredTasks);

    filteredTasks.forEach((elem, idx) => {
        taskCardContainer.innerHTML += `
        <div class="task-card ${elem.status === "Completed" ? "task-completed" : ""}">
                <div class="left">

                    <div class="task-main-box">
                        <h1 class="task-title">${elem.title}</h1>
                        <p class="task-description">${elem.description}</p>

                        <div class="task-bottom">
                            <p class="task-category">${elem.category}</p>
                            <p class="task-time">
                                <i class="ri-calendar-2-line"></i>
                                <span id="time">${elem.time}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="actions">
                    <button class="status-btn ${elem.status === "Completed" ? "completed" : ""}">${elem.status}</button>
                    <i onclick="completeTask(${idx})" class="${elem.status === "Completed" ? "ri-arrow-go-back-line" : "ri-check-line"}"></i>
                    <i onclick="editTask('${elem.id}')" class="ri-pencil-fill"></i>
                    <i onclick="deleteTask(${idx})" class="ri-delete-bin-fill"></i>
                </div>
            </div>
        `
    })
}

taskStatus.addEventListener("change", () => {
    currentFilter = taskStatus.value;
    console.log("Currentfilter" + currentFilter);
    renderTasks();
})

taskCategory.addEventListener("change", () => {
    currentCategory = taskCategory.value;
    renderTasks();
})

searchTask.addEventListener("input", (events) => {
    searchValue = searchTask.value.toLowerCase();
    renderTasks();
})

renderTasks();

newTaskBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
})

closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
})

form.addEventListener("submit", (events) => {
    events.preventDefault();

    let title = events.target[0].value.trim();
    let description = events.target[1].value.trim();
    let category = events.target[2].value;

    // console.log(title, descriptioin, category);
    if(!title) {
        alert("Enter Task Title");
        return;
    };

    let task = {
        id : crypto.randomUUID(),
        title,
        description,
        category: category || "Uncategorized",
        status: "Pending",
        time: getFormattedTime(),
    }

    if(updateIndex) {
        tasksArr[updateIndex] = task;
        updateIndex = null; 
        events.target[4].textContent = "Add Task";
    } else {
        tasksArr.push(task);
    }

    localStorage.setItem("tasksList", JSON.stringify(tasksArr));

    renderTasks();
    calculateTotalTasks();

    overlay.style.display = "none";
    form.reset();
})

const deleteTask = (idx) => {
    tasksArr.splice(idx, 1);
    localStorage.setItem("tasksList", JSON.stringify(tasksArr));
    renderTasks();
    calculateTotalTasks();
}

const editTask = (id) => {
    let currentTask = tasksArr.find((elem) => elem.id === id);
    updateIndex = tasksArr.findIndex((elem) => elem.id === id);

    overlay.style.display = "flex";

    form[0].value = currentTask.title;
    form[1].value = currentTask.description;
    form[2].value = currentTask.category;

    form[4].textContent = "Save";

}

// console.log(tasksArr)
const calculateTotalTasks = () => {
    let total = tasksArr.length;
    let pending = 0, completed = 0, categories = 0;

    tasksArr.forEach((elem) => {
        if(elem.status === "Pending") pending++;
        if(elem.status === "Completed") completed++;
        if(elem.category !== "Uncategorized"){
            categories++;
        };
    })

    // console.log(total, pending, completed, categories);
    allCount.textContent = total;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
    categoriesCount.textContent = categories;
}

calculateTotalTasks();



const completeTask = (idx) => {
    tasksArr[idx].status = tasksArr[idx].status === "Pending"
            ? "Completed"
            : "Pending";

            localStorage.setItem(
        "tasksList",
        JSON.stringify(tasksArr)
    );

    calculateTotalTasks();

    renderTasks();
}
