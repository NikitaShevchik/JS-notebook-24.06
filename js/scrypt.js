"use strict"

const saveNoteButton = document.querySelector('.notebook__button');
const textArea = document.querySelector('.notebook__textarea');
const notesList = document.querySelector('.note__items');
const newNoteButton = document.querySelector('.notebook__newitem');
const removeNoteButton = document.querySelector('.notebook__remove');

const noteSaves = []; //Тут храняться записи.

/*-----------Нажатие на кнопку сохранить-------------*/
saveNoteButton.addEventListener('click', saveNote);
function saveNote() {
    for (let active of notesList.children) {
        if (active.classList.contains('_active')) {
            const numberOfNote = active.id;
            for (let edit of noteSaves) {
                if (edit.key == numberOfNote) {
                    edit.value = textArea.value;
                }
            }
        }
    }
}
/*---------------------Выбор нужной записи слева-----------------------*/
notesList.addEventListener('click', function (e) {
    switchNote(e);
    openNote(e.target.id);
    allNotesClose()
})
/*--------------------Нажатие по кнопку новой записи----------------------*/
newNoteButton.addEventListener('click', newEmptyNote);
var notesCounter = 1; //счетчик для записей
/*---Функция создания новой записи---*/
function newEmptyNote() {
    textArea.value = '';
    notesList.innerHTML += `<li class="notebook__item" id="${notesCounter}">Запись ${notesCounter}</li>`
    saverNote(notesCounter, textArea.value);
    notesCounter++;
    newNoteActiveAdder()
    allNotesClose()
}
/*-------------------Отображает нужную запись выбранной ячейки в текстарее-------------------*/
function openNote(id) {
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
/*--------------------Переключатель записей и классов для нее. Активная запись = _active---------------------*/
function switchNote(e) {
    for (let i of notesList.children) {
        if (e.target == i) {
            i.classList.toggle('_active');
        } else {
            i.classList.remove('_active')
        }
    }
}
/*-------------------Создает новой записи класс активный---------------------*/
function newNoteActiveAdder() {
    for (let i of notesList.children) {
        i.classList.remove('_active');
    }
    notesList.lastChild.classList.add('_active');
}
/*-------------------Функция смотрящая на активность. Если запись не выбрана - кнопки и тд визуально отключены.--------------------*/
function allNotesClose() {
    var clear = true;
    for (let k of notesList.children) {
        if (k.classList.contains('_active')) {
            clear = false;
        }
    }
    if (!clear) {
        textArea.classList.add('_active');
        textArea.removeAttribute('disabled', 'disabled');
        saveNoteButton.classList.add('_active');
        removeNoteButton.classList.add('_active');
    } else {
        // textArea.value = '';
        textArea.classList.remove('_active');
        textArea.setAttribute('disabled', 'disabled');
        saveNoteButton.classList.remove('_active');
        removeNoteButton.classList.remove('_active');
    }
}
/*-----------ДОРАБОТАТЬ УДАЛЕНИЕ. ПО клику - удалять строку (написана). 
Удалить из массива ключ. Переделать логику, чтоб не повторялись ключи
и айди + Переработать им присвоение
UPD: СДЕЛАНО-------------*/
removeNoteButton.addEventListener('click', remove);
function remove(e) {
    for (let note of notesList.children) {
        if (note.classList.contains('_active')) {
            deleteAnimation()
            var numberNote = note.id;
            for (let k of noteSaves) {
                if (k.key == numberNote) {
                    noteSaves.splice(noteSaves.indexOf(k), 1)
                }
            }
            notesList.removeChild(note)
        }
    }
    allNotesClose()
}
/*---Анимация для удаления----*/
function deleteAnimation() {
    const popup = document.querySelector('.popup__body');
    popup.classList.add('_open');
    setTimeout(() => {
        popup.classList.remove('_open');
    }, 1500);
}

