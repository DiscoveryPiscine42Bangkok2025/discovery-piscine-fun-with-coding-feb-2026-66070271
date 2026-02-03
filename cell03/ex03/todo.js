const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

window.onload = function() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));
    if (todoCookie) {
        let data = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        data.reverse().forEach(text => addTodo(text, false)); 
    }
};

newBtn.onclick = function() {
    const task = prompt("เพิ่มรายการใหม่:");
    if (task && task.trim() !== "") {
        addTodo(task, true);
    }
};

function addTodo(text, shouldSave) {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.textContent = text;

    div.onclick = function() {
        if (confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
            this.remove();
            saveToCookie();
        }
    };
    ftList.insertBefore(div, ftList.firstChild);

    if (shouldSave) saveToCookie();
}

function saveToCookie() {
    const items = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        items.push(item.textContent);
    });
    const d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(items)) + ";expires=" + d.toUTCString() + ";path=/";
}