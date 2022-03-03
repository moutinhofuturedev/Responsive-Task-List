const formTextTop = document.getElementsByClassName('form-text')[0];
const formTextBottom = document.getElementsByClassName('form-text')[1];
const body = document.getElementsByTagName('html')[0];
let i = 0;

// Top appear
formTextTop.addEventListener('focus', function(){
    if(document.getElementById('top-appear').style.display = "none") {
        // document.getElementById('top-appear').style.display = "block";
        // document.getElementById('hr1').style.border = "1px solid #26a69a";
    };
    return i = 1;
});

// Bottom appear
formTextBottom.addEventListener('focus', function(){
    if(document.getElementsByClassName('form-appear')[1].style.display = "none") {
        // document.getElementsByClassName('form-appear')[1].style.display = "block";
        // document.getElementById('hr2').style.border = "1px solid #26a69a";
    };
    return i = 1;
});

// Clearing
body.addEventListener('click', function(){
    if(i = 1){
        document.getElementById('top-appear').style.display = "none";
        document.getElementsByClassName('form-appear')[1].style.display = "none";
        document.getElementById('hr1').style.border = "1px solid #ccc";
        document.getElementById('hr2').style.border = "1px solid #ccc";
    };
});

// Persisting tasks
const submit = document.getElementById('add-task-btn');
const form = document.getElementById('new-task');
const data = document.getElementById('text');
const storage = localStorage.getItem('task');

document.addEventListener('DOMContentLoaded', function(e){
    // Accessing local storage 
    let task;
    if(localStorage.getItem('task') === null){
        task = [];
    }
    else{
        task = JSON.parse(localStorage.getItem('task'));
    }
    localStorage.setItem('task', JSON.stringify(task));

    // Loop through each item in local storage array and create an li for each one
    task.forEach(function(x){
        let li = document.createElement('li');
        li.className = 'li-list-item';
        li.style.display = "flex";
        li.appendChild(document.createTextNode(x));
        let a = document.createElement('a');
        a.setAttribute('href', '#');
        a.className = 'list-item';
        a.innerHTML = '<i class="fa fa-remove i"></i>';
        
        li.appendChild(a);
    
        let ul = document.getElementById('task-add-ul');
        ul.appendChild(li);
    }    
    );
});


// Get data and set task
form.addEventListener('submit', function (e) {
    const value = document.getElementById('text').value;

    let li = document.createElement('li');
    li.className = 'li-list-item';
    li.style.display = "flex";
    li.appendChild(document.createTextNode(value));

    let a = document.createElement('a');
    a.setAttribute('href', '#');
    a.className = 'list-item';
    a.innerHTML = '<i class="fa fa-remove i"></i>';
    
    li.appendChild(a);

    let ul = document.getElementById('task-add-ul');
    ul.appendChild(li);
    form.reset();
    e.preventDefault();


    let tasks;
    if(localStorage.getItem('task') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('task'));
    }
    tasks.push(value);
    localStorage.setItem('task', JSON.stringify(tasks));
});

// Deleting items
document.body.addEventListener('click', deleteItems);

function deleteItems (e){
    if(e.target.parentElement.classList.contains('list-item')) {
        e.target.parentElement.parentElement.remove();

        // Getting local storage
        let tasks;
        if(localStorage.getItem('task') === null){
            tasks = [];
        }
        else {
            tasks = JSON.parse(localStorage.getItem('task'));
        }

        // Comparing and removing local storage and listed item
        const individualTask = e.target.parentElement.parentElement.textContent.toLowerCase();
        tasks.forEach(function(x, index){
            if(x.toLowerCase() === individualTask){
                tasks.splice(index, 1);
            }
        });


        localStorage.setItem('task', JSON.stringify(tasks));
    }

}

// Clearing all tasks
const clearTasks = document.getElementById('clear-tasks');

clearTasks.addEventListener('click', function(){
    let ul = Array.from(document.getElementById('task-add-ul').children);
    ul.forEach(function (e){
        e.style.display = "none";
    });

    // Clearing all local storage
    localStorage.clear();
});

// Filtering tasks
const filtering = document.getElementById('filter');

filtering.addEventListener('keyup', function(e){
    let data = e.target.value.toLowerCase();

    const task = Array.from(document.getElementsByClassName('li-list-item'));

    task.forEach(function(x){
        const item = x.textContent.toLowerCase();
        if(item.indexOf(data) != -1){
            x.style.display = "flex";
        }
        else{
            x.style.display = "none";
        }
    }); 

});

