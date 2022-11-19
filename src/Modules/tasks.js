// LOCAL STORAGE (????? Just copy and paste) ________________________________________________________________________________________________
//
//
//
//
const toDo = JSON.parse(localStorage.getItem('toDo')) || [
  {
    project: 'Project',
    title: 'Any Task',
    description: 'Task synopsis',
    dueDate: '2022-10-18',
    priority: 'low',
    done: true,
  },
];
let taskProjects = JSON.parse(localStorage.getItem('taskProjects')) || [
  ...new Set(toDo.map((task) => task.project)),
];
//
//
//  ________________________________________________________________________________________________________________________________________
// TASK FORM  _______________________________________________________________________________________________________________________________________________________________________________________________
//  ________________________________________________________________________________________________________________________________________
//
//
const Task = (project, title, description, dueDate, priority, done) => {
  return { project, title, description, dueDate, priority, done };
};
//
//
// ________________________________________________________________________________________________________________________________________
// ADD LISTENER FOR THE TASK _______________________________________________________________________________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
const addListenersTasks = () => {
  document.querySelector('.new-task').addEventListener('click', taskHandler);
  document.querySelectorAll('.add-proj-task').forEach((taskProj) => {
    taskProj.addEventListener('click', taskHandler);
  });
  document.querySelectorAll('.edit-task').forEach((editBtn) => {
    editBtn.removeAttribute('disabled');
  });
};
//
//
// ________________________________________________________________________________________________________________________________________
// REMOVE LISTENER FOR THE TASK _______________________________________________________________________________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
const removeListenersTasks = () => {
  document.querySelector('.new-task').removeEventListener('click', taskHandler);
  document.querySelectorAll('.add-proj-task').forEach((taskProj) => {
    taskProj.removeEventListener('click', taskHandler);
  });
  document.querySelectorAll('.edit-task').forEach((editBtn) => {
    editBtn.setAttribute('disabled', 'true');
  });
};
//
//
// ________________________________________________________________________________________________________________________________________
// SAVE TASK  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
const saveTask = () => {
  document.getElementById('theForm').addEventListener('submit', (e) => {
    //prevent refresh
    e.preventDefault();
    //get project name
    let projectName = document.querySelector('.message').innerHTML;
    //get every value
    let taskTitle = document.getElementById('task-title').value;
    let taskDesc = document.getElementById('task-description').value;
    let taskDate = document.getElementById('dueDate').value;
    let taskPriority = document.getElementById('priority').value;
    let taskDone = false;
    //add task to toDo list (line 26)
    toDo.push(
      Task(projectName, taskTitle, taskDesc, taskDate, taskPriority, taskDone)
    );

    //save on local storage
    localStorage.setItem('toDo', JSON.stringify(toDo));
    //remove form
    const theForm = document.getElementById('theForm');
    document.querySelector('.task-form').removeChild(theForm);
    //add event listeners
    addListenersTasks();
    //display all tasks of selected project
    displayTask(projectName);
  });
};
//
//
// ________________________________________________________________________________________________________________________________________
// HANDLES THE INPUT OF NEW  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
const taskHandler = () => {
  //remove event listeners while form active
  removeListenersTasks();
  //display form
  displayTaskForm();
  //watch for click
  cancelTask();
  saveTask();
};
//
//
// ________________________________________________________________________________________________________________________________________
// HANDLES THE INPUT OF THE NEW PROJECT  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
const projectHandler = () => {
  //remove event listeners while form active
  document
    .querySelector('.add-project')
    .removeEventListener('click', projectHandler);
  displayProjectForm();
  cancelProject();
  saveProject();
};
//
//
// ________________________________________________________________________________________________________________________________________
// DISPLAY THE PROJECT FORM TO ADD A NEW PROJECT  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
const displayProjectForm = () => {
  const projects = document.querySelector('.project-form');
  //project form
  const projectForm = document.createElement('form');
  projectForm.setAttribute('action', '');
  projectForm.setAttribute('id', 'projectForm');
  //input project title
  const inputProject = document.createElement('input');
  inputProject.setAttribute('type', 'text');
  inputProject.setAttribute('id', 'project-title');
  inputProject.setAttribute('placeholder', 'Section Title');
  inputProject.setAttribute('maxlength', '15');
  inputProject.setAttribute('required', 'true');
  //save button
  const saveProject = document.createElement('button');
  saveProject.setAttribute('type', 'submit');
  saveProject.setAttribute('id', 'save-project');
  saveProject.innerHTML = 'Save';
  //cancel project
  const projectCancel = document.createElement('div');
  projectCancel.classList.add('proj-cancel');
  projectCancel.setAttribute('id', 'proj-cancel');
  //append
  projectForm.appendChild(inputProject);
  projectForm.appendChild(saveProject);
  projectForm.appendChild(projectCancel);
  projects.appendChild(projectForm);
};
//
//
// ________________________________________________________________________________________________________________________________________
// HANDLES THE NEW PROJECT  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
const saveProject = () => {
  document.getElementById('projectForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const projectName = document.getElementById('project-title').value;
    if (taskProjects[0] == 'No section created, create using the left panel!') {
      taskProjects.splice(0, 1, projectName);
    } else {
      taskProjects.push(projectName);
    }
    //save projects
    localStorage.setItem('taskProjects', JSON.stringify(taskProjects));
    //remove project form
    const projectForm = document.getElementById('projectForm');
    document.querySelector('.project-form').removeChild(projectForm);
    //add event listener back to +Project
    document
      .querySelector('.add-project')
      .addEventListener('click', projectHandler);
    //display project created
    displayTask(projectName);
  });
};
//
//
// ________________________________________________________________________________________________________________________________________
// DISPLAY THE FORM TO ADD A NEW TASK  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
const displayTaskForm = () => {
  const formContainer = document.querySelector('.task-form');

  //the form
  const theForm = document.createElement('form');
  theForm.setAttribute('action', '');
  theForm.setAttribute('id', 'theForm');
  theForm.setAttribute('class', 'bg-quinary');
  //task title
  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task-title');
  //title input
  const inputTitle = document.createElement('input');
  inputTitle.setAttribute('id', 'task-title');
  inputTitle.setAttribute('type', 'text');
  inputTitle.setAttribute('class', 'bg-quinary');
  inputTitle.setAttribute('placeholder', 'Title');
  inputTitle.setAttribute('maxlength', '30');
  inputTitle.setAttribute('required', 'true');
  //task description
  const taskDesc = document.createElement('div');
  taskDesc.classList.add('task-desc');
  //description input // Number of episode
  const inputDesc = document.createElement('input');
  inputDesc.setAttribute('id', 'task-description');
  inputDesc.setAttribute('type', 'number');
  inputDesc.setAttribute('label', 'Number of episode');
  inputDesc.setAttribute('id', 'task-description');
  inputDesc.setAttribute('placeholder', 'Number of episodes');
  //task due date
  const taskDate = document.createElement('div');
  taskDate.classList.add('dueDate');
  //due date input
  const inputDate = document.createElement('input');
  inputDate.setAttribute('id', 'dueDate');
  inputDate.setAttribute('type', 'date');
  inputDate.setAttribute('name', 'dueDate');
  inputDate.setAttribute('required', 'true');
  //task priority
  const taskPrior = document.createElement('div');
  taskPrior.classList.add('priority', 'justify-center', 'flex');
  //select priority
  const selectPrior = document.createElement('select');
  selectPrior.setAttribute('id', 'priority');
  selectPrior.setAttribute('name', 'priority');
  selectPrior.setAttribute('required', 'true');
  //options priority
  //default
  const optPrior = document.createElement('option');
  optPrior.setAttribute('value', '');
  optPrior.setAttribute('selected', 'true');
  optPrior.setAttribute('disabled', 'true');
  optPrior.setAttribute('hidden', 'true');
  optPrior.innerHTML = 'Priority';
  //Masterclass
  const optHigh = document.createElement('option');
  optHigh.setAttribute('value', 'high');
  optHigh.innerHTML = 'Masterclass (10) ';
  //Super anime
  const optMedium = document.createElement('option');
  optMedium.setAttribute('value', 'medium');
  optMedium.innerHTML = 'Super (8-9)';
  //Good anime
  const optLow = document.createElement('option');
  optLow.setAttribute('value', 'low');
  optLow.innerHTML = 'Good (6-7)';
  //Suck anime
  const optBad = document.createElement('option');
  optBad.setAttribute('value', 'suck');
  optBad.innerHTML = 'Suck (<5)';
  //task cancel/save
  const cancelSave = document.createElement('div');
  cancelSave.classList.add('cancel-save');
  //submit button
  const saveBtn = document.createElement('button');
  saveBtn.setAttribute('type', 'submit');
  saveBtn.setAttribute('id', 'save');
  saveBtn.innerHTML = 'Save';
  //cancel
  const taskCancel = document.createElement('div');
  taskCancel.classList.add('cancel-task');
  taskCancel.setAttribute('id', 'cancel-task');
  taskCancel.setAttribute('title', 'Cancel');
  //append
  cancelSave.appendChild(saveBtn);
  cancelSave.appendChild(taskCancel);
  selectPrior.appendChild(optPrior);
  selectPrior.appendChild(optHigh);
  selectPrior.appendChild(optMedium);
  selectPrior.appendChild(optLow);
  selectPrior.appendChild(optBad);
  taskPrior.appendChild(selectPrior);
  taskDate.appendChild(inputDate);
  taskDesc.appendChild(inputDesc);
  taskTitle.appendChild(inputTitle);
  theForm.appendChild(taskTitle);
  theForm.appendChild(taskDesc);
  theForm.appendChild(taskDate);
  theForm.appendChild(taskPrior);
  theForm.appendChild(cancelSave);
  formContainer.appendChild(theForm);
};
//
//
// ________________________________________________________________________________________________________________________________________
// DISPLAY THE FORM TO EDIT A TASK  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
//
const displayEditForm = (task) => {
  const formContainer = document.querySelector('.task-form');
  //the form
  const theForm = document.createElement('form');
  theForm.setAttribute('action', '');
  theForm.setAttribute('id', 'editForm');
  //task title
  const taskTitle = document.createElement('div');
  taskTitle.classList.add('task-title');
  //title input
  const inputTitle = document.createElement('input');
  inputTitle.setAttribute('id', 'task-title');
  inputTitle.setAttribute('type', 'text');
  inputTitle.setAttribute('value', task.title);
  inputTitle.setAttribute('maxlength', '30');
  inputTitle.setAttribute('required', 'true');
  //task description
  const taskDesc = document.createElement('div');
  taskDesc.classList.add('task-desc');
  //description input
  const inputDesc = document.createElement('input');
  inputDesc.setAttribute('id', 'task-description');
  inputDesc.setAttribute('type', 'text');
  inputDesc.setAttribute('value', task.description);
  inputDesc.setAttribute('id', 'task-description');
  inputDesc.setAttribute('placeholder', 'Task Description');
  inputDesc.setAttribute('maxlength', '120');
  //task due date
  const taskDate = document.createElement('div');
  taskDate.classList.add('dueDate');
  //due date input
  const inputDate = document.createElement('input');
  inputDate.setAttribute('id', 'dueDate');
  inputDate.setAttribute('type', 'date');
  inputDate.setAttribute('value', task.dueDate);
  inputDate.setAttribute('name', 'dueDate');
  inputDate.setAttribute('required', 'true');
  //task priority
  const taskPrior = document.createElement('div');
  taskPrior.classList.add('priority');
  //select priority
  const selectPrior = document.createElement('select');
  selectPrior.setAttribute('id', 'priority');
  selectPrior.setAttribute('name', 'priority');
  selectPrior.setAttribute('required', 'true');
  //options priority
  //Masterclass
  const optHigh = document.createElement('option');
  optHigh.setAttribute('value', 'high');
  optHigh.innerHTML = 'Masterclass (10)';
  //Super anime
  const optMedium = document.createElement('option');
  optMedium.setAttribute('value', 'medium');
  optMedium.innerHTML = 'Super (8-9)';
  //Good anime
  const optLow = document.createElement('option');
  optLow.setAttribute('value', 'low');
  optLow.innerHTML = 'Good (6-7)';
  //Suck anime
  const optBad = document.createElement('option');
  optBad.setAttribute('value', 'suck');
  optBad.innerHTML = 'Suck (<5)';
  //test for original priority
  if (task.priority == 'high') {
    optHigh.setAttribute('selected', 'true');
  } else if (task.priority == 'medium') {
    optMedium.setAttribute('selected', 'true');
  } else optLow.setAttribute('selected', 'true');
  //task cancel/save
  const cancelSave = document.createElement('div');
  cancelSave.classList.add('cancel-save');
  //submit button
  const saveBtn = document.createElement('button');
  saveBtn.setAttribute('type', 'submit');
  saveBtn.setAttribute('id', 'save');
  saveBtn.innerHTML = 'Save';
  //cancel
  const taskCancel = document.createElement('div');
  taskCancel.classList.add('cancel-task');
  taskCancel.setAttribute('id', 'cancel-task');
  taskCancel.setAttribute('title', 'Cancel');
  //append
  cancelSave.appendChild(saveBtn);
  cancelSave.appendChild(taskCancel);
  selectPrior.appendChild(optHigh);
  selectPrior.appendChild(optMedium);
  selectPrior.appendChild(optLow);
  selectPrior.appendChild(optBad);
  taskPrior.appendChild(selectPrior);
  taskDate.appendChild(inputDate);
  taskDesc.appendChild(inputDesc);
  taskTitle.appendChild(inputTitle);
  theForm.appendChild(taskTitle);
  theForm.appendChild(taskDesc);
  theForm.appendChild(taskDate);
  theForm.appendChild(taskPrior);
  theForm.appendChild(cancelSave);
  formContainer.appendChild(theForm);
};
//
//
// ________________________________________________________________________________________________________________________________________
// ADD THE NEW PROJECT TO THE MANAGER AREA  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
const displayHandler = (projectN, mode = 'default') => {
  //Display Project Name
  taskProjects[0] == 'No section created, create using the left panel!'
    ? (document.querySelector('.message').innerHTML = taskProjects[0])
    : (document.querySelector('.message').innerHTML = projectN);
  //clear projects
  const myProj = document.querySelector('.projects');
 
  const clearProjects = document.querySelectorAll('.newProject');
  clearProjects.forEach((project) => {
    myProj.removeChild(project);
  });
  //display each on manager area
  for (let projectName of taskProjects) {
    if (projectName == 'No section created, create using the left panel!') {
      continue;
    } else {
      //projects
      const projects = document.querySelector('.projects');
      //new project manager
      const newProject = document.createElement('div');
      newProject.classList.add('newProject');
      newProject.setAttribute('name', projectName);
      projectN == projectName
        ? newProject.classList.add('select')
        : newProject.classList.remove('select');
      if (mode == 'open' && projectN == projectName) {
        newProject.classList.add('opened');
      } else {
        newProject.classList.remove('opened');
      }
      //proj container
      const proj = document.createElement('div');
      proj.classList.add('proj');
      //proj title
      const projTitle = document.createElement('div');
      projTitle.classList.add('proj-title');
      projTitle.setAttribute('title', 'Project');
      projTitle.innerHTML = projectName;
      projTitle.addEventListener('click', () => displayTask(projectName));
      //proj open
      const projOpen = document.createElement('div');
      projOpen.classList.add('proj-open');
      projOpen.setAttribute('name', projectName);
      projOpen.setAttribute('title', 'Expand');
      if (projectN == projectName) {
        projOpen.classList.remove('hidden');
      } else {
        projOpen.classList.add('hidden');
      }
      if (mode == 'open' && projectN == projectName) {
        projOpen.classList.add('opened');
        projOpen.setAttribute('title', 'Collapse');
      } else if (mode == 'close' && projectN == projectName) {
        projOpen.classList.remove('opened');
      }
      projOpen.className == 'proj-open opened'
        ? projOpen.addEventListener('click', () =>
            displayHandler(projectName, 'close')
          )
        : projOpen.addEventListener('click', () =>
            displayHandler(projectName, 'open')
          );
      //proj delete
      const delProj = document.createElement('div');
      delProj.classList.add('proj-del');
      delProj.setAttribute('title', "Delete Project and all it's tasks!");
      delProj.setAttribute('name', projectName);
      delProj.addEventListener('click', () => delProject(projectName));
      if (mode == 'open' && projectN == projectName) {
        delProj.classList.remove('hidden');
      } else {
        delProj.classList.add('hidden');
      }
      //add proj task
      const projTask = document.createElement('div');
      projTask.classList.add('add-proj-task');
      projTask.setAttribute('name', projectName);
      projTask.innerHTML = '+task';
      projTask.addEventListener('click', taskHandler);
      if (mode == 'open' && projectN == projectName) {
        projTask.classList.remove('hidden');
      } else {
        projTask.classList.add('hidden');
      }
      //append
      proj.appendChild(projTitle);
      proj.appendChild(projOpen);
      newProject.appendChild(proj);
      newProject.appendChild(projTask);
      newProject.appendChild(delProj);
      //append before
      const beforeThis = document.querySelector('.projects').firstChild;
      projects.insertBefore(newProject, beforeThis);
    }
  }
};
//
//
// ________________________________________________________________________________________________________________________________________
// CLICK TO CANCEL ADD PROJECT  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
//
const cancelProject = () => {
  //click on cancel
  document.getElementById('proj-cancel').addEventListener('click', () => {
    //remove form
    const projectForm = document.getElementById('projectForm');
    document.querySelector('.project-form').removeChild(projectForm);
    //add event listeners back
    document
      .querySelector('.add-project')
      .addEventListener('click', projectHandler);
  });
};
//
//
// ________________________________________________________________________________________________________________________________________
// CLICK TO CANCEL NEW ADD ANIME  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
//
const cancelTask = () => {
  //click on cancel
  document.getElementById('cancel-task').addEventListener('click', () => {
    //remove form
    const theForm = document.getElementById('theForm');
    document.querySelector('.task-form').removeChild(theForm);
    //add event listeners back
    addListenersTasks();
  });
};
//
//
// ________________________________________________________________________________________________________________________________________
// CLICK TO CANCEL EDIT ANIME  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
//
const cancelEdit = () => {
  //click on cancel
  document.getElementById('cancel-task').addEventListener('click', () => {
    //remove form
    const editForm = document.getElementById('editForm');
    document.querySelector('.task-form').removeChild(editForm);
    //add event listeners back
    addListenersTasks();
  });
};
//
//
// ________________________________________________________________________________________________________________________________________
// DELETE THE PROJECT FROM MANAGER AND ALL TASKS  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
const delProject = (projectName) => {
  //delete all tasks of that project
  for (let i = 0; i <= toDo.length; i++) {
    toDo.forEach((task) => {
      if (task.project == projectName) {
        toDo.splice(toDo.indexOf(task), 1);
      }
    });
  }
  //message if no projects
  const message = 'No section created, create using the left panel!';
  //save toDos on local storage
  localStorage.setItem('toDo', JSON.stringify(toDo));
  //delete project/update taskProjects
  taskProjects.splice(taskProjects.indexOf(projectName), 1);
  taskProjects.length == 0
    ? taskProjects.push(message)
    : (taskProjects = taskProjects);
  //save projects
  localStorage.setItem('taskProjects', JSON.stringify(taskProjects));
  displayTask('');
};
//
//
// ________________________________________________________________________________________________________________________________________
// DELETE SELECTED TASK  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
//
const delTask = (value) => {
  document.querySelectorAll('.task').forEach((task) => {
    if (task.getAttribute('value') == value) {
      toDo.splice(Number(task.getAttribute('value')), 1);
      //save on local storage
      localStorage.setItem('toDo', JSON.stringify(toDo));
      displayTask('');
    }
  });
};
//
//
// ________________________________________________________________________________________________________________________________________
// CLEAR THE MAIN DISPLAY OF ALL TASKS BEFORE DISPLAY AGAIN  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
const clearTask = () => {
  //clear display of tasks
  const myTasks = document.querySelector('.my-tasks');
  const clearTasks = document.querySelectorAll('.task');
  clearTasks.forEach((task) => {
    myTasks.removeChild(task);
  });
};
//
//
// ________________________________________________________________________________________________________________________________________
//display all tasks of selected project  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
//
const displayTask = (projectName, mode) => {
  clearTask();
  switch (mode) {
    case 'Day':
      document.querySelector('.new-task').style.display = 'none';
      document.querySelector('.day').classList.add('selected');
      document.querySelector('.week').classList.remove('selected');
      document.querySelector('.month').classList.remove('selected');
      document.querySelector('.proj-header').classList.remove('selected');
      displayHandler('Today');
      toDo.forEach((task) => {
        const today = new Date();
        const date = task.dueDate;
        const dateArray = new Date(date.split('-'));
        if (dateArray.getDate() == today.getDate()) {
          showTasks(task, 'filter');
        }
      });
      break;
    case 'Week':
      document.querySelector('.new-task').style.display = 'none';
      document.querySelector('.week').classList.add('selected');
      document.querySelector('.day').classList.remove('selected');
      document.querySelector('.month').classList.remove('selected');
      document.querySelector('.proj-header').classList.remove('selected');
      displayHandler('Week');
      const today = new Date();
      const sunday = new Date(today.setDate(today.getDate() - today.getDay()));
      const week = [sunday.getDate()];
      for (let i = 1; i < 7; i++) {
        week.push(sunday.getDate() + i);
      }
      toDo.forEach((task) => {
        const date = task.dueDate;
        const dateArray = new Date(date.split('-'));
        week.forEach((day) => {
          if (day == dateArray.getDate()) {
            showTasks(task, 'filter');
          }
        });
      });
      break;
    case 'Month':
      document.querySelector('.new-task').style.display = 'none';
      document.querySelector('.month').classList.add('selected');
      document.querySelector('.day').classList.remove('selected');
      document.querySelector('.week').classList.remove('selected');
      document.querySelector('.proj-header').classList.remove('selected');
      document.getElementById('month').style.display = 'block';
      displayHandler('Month');
      toDo.forEach((task) => {
        const date = task.dueDate;
        const dateArray = new Date(date.split('-'));
        const month = document.getElementById('month').value;
        if (dateArray.getMonth() == month) {
          showTasks(task, 'filter');
        }
      });
      break;
    default:
      document.getElementById('month').style.display = 'none';
      document.querySelector('.proj-header').classList.add('selected');
      document.querySelector('.day').classList.remove('selected');
      document.querySelector('.month').classList.remove('selected');
      document.querySelector('.week').classList.remove('selected');
      //if no project name (display default)
      if (projectName == null || projectName == '') {
        projectName = taskProjects[0];
        //if no project
        if (projectName == 'No section created, create using the left panel!') {
          document.querySelector('.new-task').style.display = 'none';
          displayHandler(projectName);
        } else {
          //if project exist but no tasks
          if (toDo.length == 0) {
            document.querySelector('.new-task').style.display = 'block';
            displayHandler(projectName);
          } else {
            //project and task exist
            toDo.forEach((task) => {
              if (task.project == projectName) {
                showTasks(task);
              }
              document.querySelector('.new-task').style.display = 'block';
              displayHandler(projectName);
            });
          }
        }
        //if project name (display project)
      } else {
        //if project name but no tasks
        if (toDo.length == 0) {
          document.querySelector('.new-task').style.display = 'block';
          displayHandler(projectName);
        } else {
          //project name and tasks
          toDo.forEach((task) => {
            if (task.project == projectName) {
              showTasks(task);
            }
            document.querySelector('.new-task').style.display = 'block';
            displayHandler(projectName);
          });
        }
      }
      break;
  }
  openTask();
  taskDone();
};
//
//
// ________________________________________________________________________________________________________________________________________
// SHOW THE CHOOSEN TASK  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//

const showTasks = (task, mode = 'default') => {
  const myTasks = document.querySelector('.my-tasks');
  //Task
  const theTask = document.createElement('div');
  //task done?
  if (task.done == true) {
    theTask.classList.add('task');
    theTask.classList.add('taskDone');
  } else {
    theTask.classList.add('task');
  }
  //filter show all tasks open
  if (mode == 'filter') {
    theTask.classList.add('opened');
  } else {
    theTask.classList.remove('opened');
  }
  //task priority
  //
  //
  // ________________________________________________________________________________________________________________________________________
  // SET THE COLOR OF THE PRIORITY  ___________________________________________________________________________________________________________________________
  // ________________________________________________________________________________________________________________________________________
  //
  //
  //
  if (task.priority == 'low') {
    theTask.style.borderLeft = '36px solid #f4d58d';
    theTask.setAttribute('title', 'Priority: Low');
  } else if (task.priority == 'medium') {
    theTask.style.borderLeft = '36px solid #3e7f24';
    theTask.setAttribute('title', 'Priority: Medium');
  } else if (task.priority == 'suck') {
    theTask.style.borderLeft = '36px solid #df0c01';
    theTask.setAttribute('title', 'Priority: Suck');
  } else {
    theTask.style.borderLeft = '36px solid #1b4332	';
    theTask.setAttribute('title', 'Priority: High');
  }
  theTask.setAttribute('value', toDo.indexOf(task));
  //
  //
  //
  //
  //
  //
  //
  //task project
  const taskProject = document.createElement('div');
  taskProject.classList.add('task-project');
  taskProject.innerHTML = task.project;
  //conclude option
  const optConclude = document.createElement('div');
  optConclude.classList.add('conclude');
  //conclude input
  const inputConclude = document.createElement('input');
  inputConclude.setAttribute('type', 'checkbox');
  inputConclude.setAttribute('name', 'conclude');
  inputConclude.setAttribute('title', 'Incomplete');
  inputConclude.setAttribute('id', 'conclude');
  if (task.done == true) {
    inputConclude.setAttribute('checked', true);
    inputConclude.setAttribute('title', 'Complete');
  }
  //task title
  const taskTitle = document.createElement('div');
  taskTitle.classList.add('tasks-title');
  taskTitle.setAttribute('title', 'Task Title');
  taskTitle.innerHTML = task.title;
  //task description
  const taskDesc = document.createElement('div');
  taskDesc.classList.add('task-description');
  taskDesc.setAttribute('title', 'Task Description');
  taskDesc.innerHTML = task.description;
  //due date text
  const dueDateT = document.createElement('div');
  dueDateT.classList.add('due-text');
  dueDateT.innerHTML = 'due Date: ';
  //task date
  const taskDate = document.createElement('div');
  taskDate.classList.add('task-date');
  taskDate.setAttribute('title', 'Due Date');
  const date = task.dueDate;
  const dateArray = new Date(date.split('-'));
  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const today = new Date();
  dateArray.getFullYear() == today.getFullYear()
    ? (taskDate.innerHTML =
        month[dateArray.getMonth()] + '/' + dateArray.getDate())
    : (taskDate.innerHTML =
        month[dateArray.getMonth()] +
        '/' +
        dateArray.getDate() +
        '/' +
        dateArray.getFullYear().toString().slice(-2));
  //open task
  const taskOpen = document.createElement('div');
  taskOpen.classList.add('open-task');
  //edit task
  const editTask = document.createElement('button');
  editTask.classList.add('edit-task');
  editTask.setAttribute('value', toDo.indexOf(task));
  editTask.setAttribute('title', 'Edit');
  editTask.addEventListener('click', () => taskEdit(task));
  if (mode == 'filter') {
    editTask.classList.add('hidden');
  } else {
    editTask.classList.remove('hidden');
  }
  //del task
  const deleteTask = document.createElement('button');
  deleteTask.classList.add('del-task');
  deleteTask.setAttribute('value', toDo.indexOf(task));
  deleteTask.setAttribute('title', 'Delete');
  deleteTask.addEventListener('click', () => delTask(deleteTask.value));
  //append
  optConclude.appendChild(inputConclude);
  theTask.appendChild(optConclude);
  theTask.appendChild(taskTitle);
  theTask.appendChild(taskDesc);
  theTask.appendChild(taskDate);
  theTask.appendChild(taskProject);
  theTask.appendChild(dueDateT);
  theTask.appendChild(taskOpen);
  theTask.appendChild(editTask);
  theTask.appendChild(deleteTask);
  //append before
  const beforeThis = document.querySelector('.my-tasks').firstChild;
  myTasks.insertBefore(theTask, beforeThis);
};
//
//
// ________________________________________________________________________________________________________________________________________
// OPEN TASK  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
//
const openTask = () => {
  document.querySelectorAll('.task').forEach((task) => {
    task.querySelector('.open-task').addEventListener('click', () => {
      task.className.includes('opened')
        ? task.classList.remove('opened')
        : task.classList.add('opened');
    });
  });
};
//
//
// ________________________________________________________________________________________________________________________________________
// EDIT TASK  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
//
const taskEdit = (task) => {
  removeListenersTasks();
  let taskIndex = toDo.indexOf(task);
  //display edit form
  displayEditForm(task);
  //watch for cancel
  cancelEdit();
  //submit edit
  document.getElementById('editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    //get project name
    let projectName = document.querySelector('.message').innerHTML;
    //push to array
    let taskTitle = document.getElementById('task-title').value;
    let taskDesc = document.getElementById('task-description').value;
    let taskDate = document.getElementById('dueDate').value;
    let taskPriority = document.getElementById('priority').value;
    let taskDone = false;
    let editedTask = {
      project: projectName,
      title: taskTitle,
      description: taskDesc,
      dueDate: taskDate,
      priority: taskPriority,
      done: taskDone,
    };
    //add edited task to toDo list
    toDo.splice(taskIndex, 1, editedTask);
    //save on local storage
    localStorage.setItem('toDo', JSON.stringify(toDo));
    //remove form
    const editForm = document.getElementById('editForm');
    document.querySelector('.task-form').removeChild(editForm);
    //add event listeners back
    addListenersTasks();
    //display all tasks of selected project
    displayTask(projectName);
  });
};

//watch for checkbox of task complete
const taskDone = () => {
  document.querySelectorAll('.task').forEach((task) => {
    task
      .querySelector('input[name=conclude]')
      .addEventListener('change', function () {
        if (this.checked) {
          task.classList.add('taskDone');
          toDo[task.getAttribute('value')].done = true;
          //save on local storage
          localStorage.setItem('toDo', JSON.stringify(toDo));
        } else {
          task.classList.remove('taskDone');
          toDo[task.getAttribute('value')].done = false;
          //save on local storage
          localStorage.setItem('toDo', JSON.stringify(toDo));
        }
      });
  });
};
//
// ________________________________________________________________________________________________________________________________________
// SORTED  ___________________________________________________________________________________________________________________________
// ________________________________________________________________________________________________________________________________________
//
//
//
const sortedOptions = (sortedFor) => {
  let title = document.querySelector('.message').innerHTML;
  if (sortedFor == 'priority') {
    toDo.sort((task1, task2) => {
      if (task1.priority == 'high' && task2.priority == 'low') return 1;
      else if (task1.priority == 'low' && task2.priority == 'high') return -1;
      else if (task1.priority == 'high' && task2.priority == 'medium') return 1;
      else if (task1.priority == 'medium' && task2.priority == 'high')
        return -1;
      else if (task1.priority == 'medium' && task2.priority == 'low') return 1;
      else if (task1.priority == 'low' && task2.priority == 'medium') return -1;
      else if (task1.priority == 'suck' && task2.priority == 'low') return -1;
      else if (task1.priority == 'suck' && task2.priority == 'medium') return 1;
      else if (task1.priority == 'suck' && task2.priority == 'high') return 1;
      else return 0;
    });
    if (title == 'Today' || title == 'Month' || title == 'Week') {
      displayTask('', title);
    } else displayTask('');
  } else {
    toDo.sort((task1, task2) => {
      let date1 = task1.dueDate;
      const dateArray1 = new Date(date1.split('-'));
      let date2 = task2.dueDate;
      const dateArray2 = new Date(date2.split('-'));
      if (dateArray1.getMonth() == dateArray2.getMonth()) {
        return dateArray1.getDate() < dateArray2.getDate() ? -1 : 1;
      } else return dateArray1.getMonth() < dateArray2.getMonth() ? -1 : 1;
    });
    if (title == 'Today' || title == 'Month' || title == 'Week') {
      displayTask('', title);
    } else displayTask('');
  }
};

export {
  taskHandler,
  displayTask,
  projectHandler,
  sortedOptions,
  displayHandler,
};
