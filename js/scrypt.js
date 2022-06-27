"use strict"

const saveNoteButton = document.querySelector('.notebook__button');
const textArea = document.querySelector('.notebook__textarea');
const notesList = document.querySelector('.note__items');
const newBoteButton = document.querySelector('.notebook__newitem');

const noteSaves = [];

saveNoteButton.addEventListener('click', saveNote);

// function saveNote() {
//     saverNote(notesList.children.length + 1, textArea.value);
//     notesList.innerHTML += `<li class="notebook__item" id="${notesList.children.length + 1}">Запись ${notesList.children.length + 1}</li>`
//     console.log(noteSaves)
// }

function saveNote() {
    for (let active of notesList.children) {
        if (active.classList.contains('_active')) {
            const numberOfNote = active.id;
            for (let edit of noteSaves) {
                if (edit.key == numberOfNote) {
                    edit.value = textArea.value;
                    console.log(noteSaves);
                }
            }
        }
    }
}



notesList.addEventListener('click', function (e) {
    switchNote(e);
    openNote(e, e.target.id);
    // console.log(e.target)
    // console.log(e.target.id)
    // for (let i of notesList.children) {
    //     if (e.target == i) {
    //         i.classList.toggle('_active');
    //     } else {
    //         i.classList.remove('_active')
    //     }
    // }
    // e.target.classList.toggle('_active');

    // textArea.value = noteSaves[e.target.id - 1]
})

// notesList.children.addEventListener('click', function(){
//     console.log('YES')
// })


newBoteButton.addEventListener('click', newEmptyNote);
function newEmptyNote() {
    textArea.value = '';
    notesList.innerHTML += `<li class="notebook__item" id="${notesList.children.length + 1}">Запись ${notesList.children.length + 1}</li>`
    saverNote(notesList.children.length, textArea.value);
    newNoteActiveAdder()
    console.log(noteSaves)
}

/*-----------Отображает нужную запись выбранной ячейки-----------*/
function openNote(target, id) {
    const numberNote = id;
    for (let k of noteSaves) {
        if (k.key == numberNote) {
            textArea.value = k.value;
        }
    }
}
/*-----------Создает в объекте отдельный массив для note-----------*/
function saverNote(key, value) {
    noteSaves.push({ key, value });
}
/*--------------------Switcher for notes. Active note class = _active---------------------*/
function switchNote(e) {
    for (let i of notesList.children) {
        if (e.target == i) {
            i.classList.toggle('_active');
        } else {
            i.classList.remove('_active')
        }
    }
}
/*-----------Создает новой записи класс активный-------------*/
function newNoteActiveAdder() {
    for (let i of notesList.children) {
        i.classList.remove('_active');
    }
    notesList.lastChild.classList.add('_active');
}