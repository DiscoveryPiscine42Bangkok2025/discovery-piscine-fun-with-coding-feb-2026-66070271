
$(document).ready(function() {
    
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todos='));
    if (todoCookie) {
        let data = JSON.parse(decodeURIComponent(todoCookie.split('=')[1]));
        data.reverse().forEach(text => addTodo(text, false)); 
    }

    $('#new_btn').on('click', function() {
        const task = prompt("เพิ่มรายการใหม่:");
        if (task && task.trim() !== "") {
            addTodo(task, true);
        }
    });

    function addTodo(text, shouldSave) {
        const $div = $('<div></div>', {
            class: 'todo-item',
            text: text
        });

        $div.on('click', function() {
            if (confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
                $(this).remove();
                saveToCookie();
            }
        });

  
        $('#ft_list').prepend($div);

        if (shouldSave) saveToCookie();
    }

    function saveToCookie() {
        const items = [];
        $('.todo-item').each(function() {
            items.push($(this).text());
        });
        
        const d = new Date();
        d.setTime(d.getTime() + (7*24*60*60*1000));
        document.cookie = "todos=" + encodeURIComponent(JSON.stringify(items)) + ";expires=" + d.toUTCString() + ";path=/";
    }
});