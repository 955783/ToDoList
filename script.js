let taskList = [];

// render task list
function renderTaskList() {
  const taskListElement = document.getElementById('task-list');
  taskListElement.innerHTML = '';
  taskList.forEach((task) => {
    const taskElement = document.createElement('li');
    taskElement.className = 'task';
    taskElement.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span ${task.completed ? 'class="completed"' : ''}>${task.text}</span>
      <button class="delete-button">Delete</button>
      <button class="update-button">Update</button>
    `;
    taskListElement.appendChild(taskElement);
  });
}

// add new task
document.getElementById('add-task').addEventListener('click', () => {
  const newTaskText = document.getElementById('new-task').value.trim();
  if (newTaskText) {
    taskList.push({ text: newTaskText, completed: false });
    document.getElementById('new-task').value = '';
    renderTaskList();
  }
});

// delete task
document.getElementById('task-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-button')) {
    const taskIndex = taskList.findIndex((task) => task.text === event.target.parentNode.querySelector('span').textContent);
    if (taskIndex !== -1) {
      taskList.splice(taskIndex, 1);
      renderTaskList();
    }
  }
});

// update task
document.getElementById('task-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('update-button')) {
    const taskIndex = taskList.findIndex((task) => task.text === event.target.parentNode.querySelector('span').textContent);
    if (taskIndex !== -1) {
      const updatedTaskText = prompt('Update task:', taskList[taskIndex].text);
      if (updatedTaskText) {
        taskList[taskIndex].text = updatedTaskText;
        renderTaskList();
      }
    }
  }
});

// toggle completed
document.getElementById('task-list').addEventListener('click', (event) => {
  if (event.target.type === 'checkbox') {
    const taskIndex = taskList.findIndex((task) => task.text === event.target.parentNode.querySelector('span').textContent);
    if (taskIndex !== -1) {
      taskList[taskIndex].completed = event.target.checked;
      renderTaskList();
    }
  }
});

renderTaskList();