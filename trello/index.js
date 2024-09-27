const columns = document.querySelectorAll('.column');

columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
});

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    setTimeout(() => {
        event.target.classList.add('hide');
    }, 0);
}

function dragEnd(event) {
    event.target.classList.remove('hide');
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text/plain');
    const card = document.getElementById(cardId);
    if (event.target.classList.contains('task-list')) {
        event.target.appendChild(card);
    } else if (event.target.classList.contains('column')) {
        event.target.querySelector('.task-list').appendChild(card);
    }
}

function addTask(columnId) {
    const column = document.getElementById(columnId);
    const input = document.querySelector(`#new-task-${columnId}`);
    const taskText = input.value.trim();

    if (taskText === '') {
        return;
    }

    const newCard = document.createElement('div');
    newCard.className = 'card';
    newCard.draggable = true;
    newCard.id = `card-${Date.now()}`;
    newCard.innerHTML = `
        ${taskText}
        <button onclick="deleteTask('${newCard.id}')"><span class="material-symbols-outlined">
delete
</span></button>
    `;

    newCard.addEventListener('dragstart', dragStart);
    newCard.addEventListener('dragend', dragEnd);

    column.querySelector('.task-list').appendChild(newCard);
    input.value = '';
}

function deleteTask(cardId) {
    const card = document.getElementById(cardId);
    card.remove();
}

function handleKeyPress(event, columnId) {
    if (event.key === 'Enter') {
        addTask(columnId);
    }
}
