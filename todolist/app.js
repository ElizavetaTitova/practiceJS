$ (function() {
    let userInput = $('#userInput');
    let buttonEnter = $('#enter');
    let ul = $('ul');
    let total = $('#total');
    let goals = 0;
    let localStorage = window.localStorage;
    let todoMap = [];

    //функция проверки поля ввода на пустоту
    function inputIsNotEmpty() {
        return !!userInput.val();
    }

    //создание и удаление заметок
    function createTodo() {

        let li = $("<li>");//создание новой заметки
        goals++;
        total.text(goals);
        li.append(document.createTextNode(userInput.val()));
        ul.append(li);
        todoMap.push({//сохранение данных в переменные
            tasksNumber: todoMap.length + 1,
            tasks: userInput.val()
        });
        localStorage.setItem('todolist', JSON.stringify(todoMap));//сохранение данных в локальное хранилище браузера
        userInput.val('');

        let deleteButton = $('<button>');//удаление заметки
        deleteButton.append(document.createTextNode('X'));
        li.append(deleteButton);
        deleteButton.click(deleteTodoItem);

        li.click(Completed);//проверка выполнения заметки
        
        //функция проверки выполнения заметки
        function Completed(){
            $('.js-overlay-campaign').slideDown();//всплывающее окно при выполнении заметки
            $('.js-overlay-campaign').fadeIn();//всплывающее окно при выполнении заметки
            $('.js-overlay-campaign').addClass('disabled');
            li.toggleClass('done');
        }

        //удаление заметок
        function deleteTodoItem() {
            li.fadeOut().remove();
            goals--;
            total.text(goals);
        } 
    }
    //добавление заметки по нажатию на клавишу 'Enter'
    function changeListAfterKeyPress(event) {
        if (inputIsNotEmpty() && event.which == 13) {
            createTodo();
        }
    }
    //добавление заметки по нажатию на кнопку
    function changeListAfterButtonPress(event) {
        if (inputIsNotEmpty()) {
            createTodo();
        }
    }
    //функция закрытия всплывающего окна
    $('.js-close-campaign').click(function() { 
        $('.js-overlay-campaign').slideUp(500);
         
    });

    userInput.keypress(changeListAfterKeyPress);
    buttonEnter.click(changeListAfterButtonPress);
    total.text(goals); //количество всех заметок
})
