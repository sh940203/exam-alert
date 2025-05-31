import os

# 資料夾名稱
project_name = "考試與作業倒數計時器"

# 建立資料夾
os.makedirs(project_name, exist_ok=True)

# 各檔案的內容
files = {
    "index.html": """<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>考試與作業倒數計時器</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="container">
    <h1>📘 考試與作業倒數計時器</h1>
    <form id="task-form">
      <input type="text" id="task-name" placeholder="任務名稱" required />
      <input type="text" id="subject" placeholder="科目" required />
      <input type="date" id="due-date" required />
      <select id="task-type">
        <option value="作業">作業</option>
        <option value="報告">報告</option>
        <option value="考試">考試</option>
      </select>
      <button type="submit">新增任務</button>
    </form>
    <div id="task-list"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>
""",

    "style.css": """body {
  font-family: "Segoe UI", sans-serif;
  background-color: #f0f4f8;
  margin: 0;
  padding: 20px;
}
.container {
  max-width: 700px;
  margin: auto;
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(0,0,0,0.1);
}
h1 {
  text-align: center;
  color: #333;
}
form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}
form input, form select, form button {
  flex: 1 1 45%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
form button {
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  flex: 1 1 100%;
}
.task-card {
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.green { background-color: #4CAF50; }
.orange { background-color: #FFA500; }
.red { background-color: #f44336; }
.task-info {
  flex: 1 1 80%;
}
.task-type {
  font-weight: bold;
  margin-right: 10px;
}
.delete-btn {
  background: none;
  border: none;
  color: white;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  flex: 1 1 10%;
}
@media (max-width: 768px) {
  form input, form select, form button {
    flex: 1 1 100%;
  }
  .task-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .task-info {
    flex: 1 1 100%;
    margin-bottom: 10px;
  }
  .delete-btn {
    align-self: flex-end;
  }
}
""",

    "script.js": """document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(createTaskCard);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("task-name").value;
    const subject = document.getElementById("subject").value;
    const dueDate = document.getElementById("due-date").value;
    const type = document.getElementById("task-type").value;

    const task = { name, subject, dueDate, type };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTaskCard(task);
    form.reset();
  });

  function createTaskCard(task) {
    const card = document.createElement("div");
    const daysLeft = calcDays(task.dueDate);

    let colorClass = "";
    if (daysLeft > 7) colorClass = "green";
    else if (daysLeft >= 3) colorClass = "orange";
    else colorClass = "red";

    card.className = \`task-card \${colorClass}\`;
    card.innerHTML = \`
      <div class="task-info">
        <span class="task-type">[\${task.type}]</span>
        <strong>\${task.name}</strong> - \${task.subject} <br>
        截止日：\${task.dueDate}（倒數 \${daysLeft} 天）
      </div>
      <button class="delete-btn">&times;</button>
    \`;

    card.querySelector(".delete-btn").addEventListener("click", () => {
      taskList.removeChild(card);
      tasks = tasks.filter(t => t !== task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    taskList.appendChild(card);
  }

  function calcDays(dateString) {
    const today = new Date();
    const due = new Date(dateString);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
});
"""
}

# 建立並寫入每個檔案
for filename, content in files.items():
    path = os.path.join(project_name, filename)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print(f"✅ 專案「{project_name}」已成功建立，內含 HTML / CSS / JS 檔案！")
