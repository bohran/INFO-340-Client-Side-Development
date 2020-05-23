'use strict';

// This variable represents the current state of the program---the data model
// that should be displayed.
// It starts with two sample tasks.
let state = {
    taskList: [
        {
            id: 1,
            description: 'Complete problemA',
            complete: true
        },
        {
            id: 2,
            description: 'Fill in the js/index.js file and complete the exercise',
            complete: false
        }
    ],
    inputtedText: ''
}

/* Your code goes here! */

// Define a function renderTaskList() that will fill in the provided <ol> with 
// list items (<li>) representing each task in the state.taskList. 
// Each list item should have content that is the description of the task, and 
// be given the font-strike class to cross it out if the task is completed.
// Make sure your function first removes (empties) any previous <li>s so that 
// only the current task list is shown after this render call!

// Finally, modify the renderTaskList() function above so that each list item that 
// is registered with a 'click' event listener. This listener should have an
// anonymous callback function that "toggles" the task's completed property in the state
// (swaps it from true to false and vice-versa), and then calls renderTaskList()
// again. This should allow you to cross items off your task list!
// 

function renderTaskList(input) {
    let list = document.querySelector('ol');
    list.textContent = '';
    for(let i=0; i < input.length; i++) {
        let li = document.createElement('li');
        li.id = input[i].id;
        li.textContent = input[i].description;
        if(input[i].complete) {
            li.classList.add('font-strike');
        }        
        li.addEventListener('click', function() {
            input[i].complete = !input[i].complete;
            renderTaskList(input);
        })

        list.appendChild(li);
    }
    renderInput();
}

// Call your renderTaskList() function to render the initial list of tasks.
renderTaskList(state.taskList);



// Define a function addNewTask() that will add a new task to the taskList
// stored in the state. This new task should
// - have an id that is 1 greater than the id of the previous task 
// - have a description that is the value of the state's inputtedText
// - not be complete
// Note: we'll later modify the state (using the input box) in a function below
// After adding the task to the state.taskList, the method (re)set state.inputtedText to
// an empty string. 
// Finally, the function should call the renderTaskList() function to show the updated list.
// IMPORTANT: this method should only modify the state and call the render 
// function; it should not interact directly with the DOM!
function addNewTask() {
    let task = {
        id: state.taskList.length + 1,
        description: state.inputtedText,
        complete: false
    };
    state.taskList.push(task);

    state.inputtedText = '';

    renderTaskList(state.taskList);
}



// Add an event listener to the "add task" button so that when the button is 
// clicked, a new task is added to the list (using your addNewTask() function).
// 
// Note that initially, this will cause "empty" (text-less) tasks to be added!
let button = document.querySelector('#add-task');
button.addEventListener('click', function() {
    addNewTask();
});



// To handle user input, add another event listener to the <input> element that
// listens for 'input'events (from when the user types something into the box).
// This listener should use an ANONYMOUS callback to update the state's 
// inputtedText property to have the value of the <input> element.
// (i.e., set state.inputtedText to the value typed into the input element)
// You should now be able to add new items to your task list!
let input = document.querySelector('input');
input.addEventListener('input', function() {
    state.inputtedText = input.value;
    renderInput();
})



// Let's fix some of the user experience. Define a new function renderInput()
// that does two things:
//  1. It should set the <input>'s value to be the state.inputtedText (so the
//     web page matches the state on render).
//  2. It should "disable" the <button> if the state.inputtedText is empty. You
//     can disable a button but setting it's disabled property to true.
// Add calls to your renderInput() function to BOTH the end of renderTaskList()
// and to the end of your 'input' event callback (so the input renders on each
// user interaction).
function renderInput() {
    let input = document.querySelector('input');
    input.value = state.inputtedText;
    let button = document.querySelector('button');
    if(state.inputtedText == '') {
        button.disabled = true;
    } else {
        button.disabled = false;
    }
}



// Finally, modify the renderTaskList() function above so that each list item that 
// is registered with a 'click' event listener. This listener should have an
// anonymous callback function that "toggles" the task's completed property in the state
// (swaps it from true to false and vice-versa), and then calls renderTaskList()
// again. This should allow you to cross items off your task list!
// 
// Fun fact: this anonymous callback will utilize a *closure*, as the function
// will be able to access the task variable even after it is called on a click!





// OPTIONAL EXTRA PRACTICE:
// Add a 'click' event listener to the #check-done button so that when the
// button is clicked, the page shows the .alert if there is still work to do:
//  - if the task list has an incomplete tasks, the .alert element should also
//    be given the alert-danger class and content of "You're not done yet!"
//  - if the task list has all compleyted tasks, the .alert element should also
//    be given the alert-success class and content of "You're all done!"
// EVEN MORE BONUS: can you hide the alert again after a few sections?