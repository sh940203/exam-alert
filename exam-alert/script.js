// 顯示現在時間
document.getElementById("current-date").textContent = 
  "📅 目前時間：" + new Date().toLocaleDateString('zh-TW');

// script.js

// 取得表單與任務列表
const form = document.querySelector("form");
const taskList = document.getElementById("task-list");

// 讀取 LocalStorage 中的任務
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTaskToDOM(task));
};

// 表單提交事件
form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const title = document.getElementById("title").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const deadline = document.getElementById("deadline").value;
  const type = document.getElementById("type").value;

  if (!title || !subject || !deadline) {
    alert("請完整填寫所有欄位！");
    return;
  }

  const task = { title, subject, deadline, type };
  addTaskToDOM(task);
  saveTask(task);
  form.reset();
});

// 加入任務到畫面
function addTaskToDOM(task) {
  const card = document.createElement("div");
  card.className = "task-card " + getColor(task.deadline);

  const daysLeft = calculateDays(task.deadline);

  card.innerHTML = `
    <h3>${task.title}</h3>
    <p>科目：${task.subject}</p>
    <p>類型：${task.type}</p>
    <p>截止日期：${task.deadline}（剩餘 ${daysLeft} 天）</p>
    <button class="complete-btn">✅ 完成</button>
    <button class="delete-btn">🗑️ 刪除</button>
  `;

  // 完成任務
  card.querySelector(".complete-btn").addEventListener("click", () => {
    card.classList.add("completed");
  });

  // 刪除任務
  card.querySelector(".delete-btn").addEventListener("click", () => {
    card.remove();
    removeTask(task);
  });

  taskList.appendChild(card);
}

// 計算剩餘天數
function calculateDays(deadline) {
  const today = new Date();
  const dueDate = new Date(deadline);
  const diff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  return diff;
}

// 根據剩餘天數給顏色
function getColor(deadline) {
  const days = calculateDays(deadline);
  if (days < 0) return "red";
  if (days < 3) return "red";
  if (days <= 7) return "orange";
  return "green";
}

// 儲存到 LocalStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 從 LocalStorage 移除任務
function removeTask(taskToDelete) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task =>
    !(task.title === taskToDelete.title &&
      task.subject === taskToDelete.subject &&
      task.deadline === taskToDelete.deadline)
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
