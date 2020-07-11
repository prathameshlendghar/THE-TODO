/*================================================DATA CONTROLLER======================================*/
var dataController = (function () {
  var Tasks = function (id, description, time, priority) {
    this.id = id;
    this.description = description;
    this.time = time;
    this.priority = priority;
    this.subTasks = [];
  };

  var Subtask = function (id, description) {
    this.id = id;
    this.description = description;
  };

  var data = {
    allTasks: {
      taskData: [],
      Completed: [],
      Incompleted: [],
      Deleted: [],
      Edit:[]
    },
  };

  return {
    data,

    addTask: function (des, pri, time) {
      if (data.allTasks.taskData.length > 0) {
        ID = data.allTasks.taskData[data.allTasks.taskData.length - 1].id + 1;
      } else {
        ID = 0;
      }

      newTask = new Tasks(ID, des, time, pri);

      data.allTasks.taskData.push(newTask);

      return newTask;
    },

    EditTasks: function (status, id) {

      var ids = data.allTasks[status].map(function (current) {
        return current.id;
      });

      var index = ids.indexOf(id);

      console.log(index)

      var downTask = data.allTasks[status][index];

      /* downTaskID = downTask.id;
      downTaskDescription = downTask.description;
      downTaskTime =  downTask.time;
      downTaskPriority = downTask.priority; */

      downTask.id = 0;

      data.allTasks.Edit.push(downTask);
      data.allTasks[status].splice(index, 1);

      return downTask;
      /* return {
        downTaskID,
        downTaskDescription,
        downTaskTime,
        downTaskPriority
      } */
    },

    addToDownSection: function (info, id) {
      //fetching the id of selected container from ui
      var ids = data.allTasks.taskData.map(function (current) {
        return current.id;
      });

      var index = ids.indexOf(id);

      if (info === "completed") {

        if (data.allTasks.Completed.length > 0) {
          ID = data.allTasks.Completed[data.allTasks.Completed.length - 1].id + 1;
        } else {
          ID = 0;
        };

        data.allTasks.taskData[index].id = ID;
        data.allTasks.Completed.push(data.allTasks.taskData[index]);
        data.allTasks.taskData.splice(index, 1);
      }

      if (info === "incompleted") {

        if (data.allTasks.Incompleted.length > 0) {
          ID = data.allTasks.Incompleted[data.allTasks.Incompleted.length - 1].id + 1;
        } else {
          ID = 0;
        };

        data.allTasks.taskData[index].id = ID;
        data.allTasks.Incompleted.push(data.allTasks.taskData[index]);
        data.allTasks.taskData.splice(index, 1);
      }

      if (info === "deleted") {

        if (data.allTasks.Deleted.length > 0) {
          ID = data.allTasks.Deleted[data.allTasks.Deleted.length - 1].id + 1;
        } else {
          ID = 0;
        };

        data.allTasks.taskData[index].id = ID;
        data.allTasks.Deleted.push(data.allTasks.taskData[index]);
        data.allTasks.taskData.splice(index, 1);
      }
    },

    /* deleteTask: function(id){
      //fetching the id of selected container from ui
      var ids = data.allTasks.taskData.map(function (current) {
        return current.id;
      }); 
      
      var index = ids.indexOf(id);
      console.log(index);
      if(index !== -1){
        data.allTasks.taskData.splice(index,1);
      }
    },*/

    addSubTask: function (id, des) {

      var ids = data.allTasks.taskData.map(function (current) {
        return current.id;
      });
      var index = ids.indexOf(id);

      if (data.allTasks.taskData[index].subTasks.length > 0) {
        ID =
          data.allTasks.taskData[index].subTasks[
            data.allTasks.taskData[index].subTasks.length - 1
          ].id + 1;
      } else {
        ID = 0;
      }

      var newSubtask = new Subtask(ID, des);

      data.allTasks.taskData[index].subTasks.push(newSubtask);

      return newSubtask;
    },

    deleteSubTasks: function (mainId, subId) {
      var ids = data.allTasks.taskData.map(function (current) {
        return current.id;
      });
      var mainIndex = ids.indexOf(mainId);

      var ids = data.allTasks.taskData[mainIndex].subTasks.map(function (current) {
        return current.id;
      });
      var subIndex = ids.indexOf(subId);

      data.allTasks.taskData[mainIndex].subTasks.splice(subIndex, 1);
    },

    fetchSubtask: function (id) {
      //fetching the id of selected container from ui
      var ids = data.allTasks.taskData.map(function (current) {
        return current.id;
      });
      var index = ids.indexOf(id);

      var fetched = data.allTasks.taskData[index].subTasks;
      var fetchedLength = data.allTasks.taskData[index].subTasks.length;
      return {
        fetched,
        fetchedLength,
      };
    },

    fetchBottomTask: function (status) {
      var statusArr, statusArrLen
      if (status === "Completed") {
        statusArr = data.allTasks.Completed;

      } else if (status === "Incompleted") {
        statusArr = data.allTasks.Incompleted;

      } else if (status === "Deleted") {
        statusArr = data.allTasks.Deleted;
      }
      statusArrLen = statusArr.length;
      return {
        statusArrLen,
        statusArr
      }
    },

    readdEditedTask: function(obj){
      if (data.allTasks.taskData.length > 0) {
        ID = data.allTasks.taskData[data.allTasks.taskData.length - 1].id + 1;
      } else {
        ID = 0;
      }

      obj.id = ID;

      data.allTasks.taskData.push(obj)

      data.allTasks.Edit.splice(0,1);
      
    }
    /* 
    addtaskaddB: function (id, task) {
      //fetching the id of selected container from ui
      var ids = data.allTasks.taskData.map(function (current) {
        return current.id;
      });
      var index = ids.indexOf(id);

      //coppying that id in datacontroller

      console.log(task, data.allTasks.taskData[index].subTasks, index);
      data.allTasks.taskData[index].subTasks = data.allTasks.taskData[
        index
      ].subTasks.concat(task);
    }, */

    /* addSubTask = function(){
      var a
    } */
  };
})();

/*=================================================UI CONTROLLER=======================================*/
var UIcontroller = (function () {
  DomStrings = {
    mainInputField: document.querySelector(".input_task"),
    priorityInputField: Array.from(
      document.querySelectorAll(".selected-container")
    ),
    timeInputField: document.querySelector(".watch"),
    addInputField: document.querySelector(".add-btn_round_icon"),

    /*------------------------------main Tasks--------------------------*/
    
    tasksContainer: document.querySelector(".task-list_container"),

    taskHeading: document.querySelector(".task-name"),

    taskClockAddB: document.querySelector(".task_clock-addB"),
    taskAddBtn: document.querySelector(".add-btn"),

    mainTask: document.querySelector(".task-list"),

    /*-----------------------------subTasks---------------------------- */
    subTasksInpField: document.querySelector(".subtask-list_input"),
    subinput: document.querySelector(".input-box"),
    subinputAddBtn: document.querySelector(".input-add"),

    subtaskContainer: document.querySelector(".subtasks"),

    addSubtaskBtn: document.querySelector(".add-btn"),

    existingSubTasks: document.getElementsByClassName("subtasks-items"),

    /*-----------------------clock------------------------------ */
    hr_up: document.querySelector(".time-picker .hour .hr-up"),
    hr_down: document.querySelector(".time-picker .hour .hr-down"),

    min_up: document.querySelector(".time-picker .minute .min-up"),
    min_down: document.querySelector(".time-picker .minute .min-down"),

    hr_inp: document.querySelector(".time-picker .hour .input"),
    min_inp: document.querySelector(".time-picker .minute .input"),

    /*-------------------------priority section------------------ */

    optionContainer: Array.from(document.querySelectorAll(".option_container")),
    optionContainerActive: document.querySelectorAll(".active"),
    optionsList: document.querySelectorAll(".option"),

    /*---------------------------bottom tasks---------------------------- */

    remainingTasksHeading: document.querySelector(".task_remaining-heading"),
    bottomTaskContainer: document.querySelector(".task-width"),
    bottomTasks: document.getElementsByClassName("task-one"),

  };

  /*--------------------------------priority section-----------------------------*/
  // DomStrings.priorityInputField.forEach((el, i) => {
  //   el.addEventListener("click", function () {
  //     DomStrings.optionContainer[i].classList.toggle("active");
  //     el.classList.toggle("active");
  //   });
  // });

  for (let i = 0; i < DomStrings.priorityInputField.length; i++) {
    DomStrings.priorityInputField[i].addEventListener("click", function () {
      DomStrings.optionContainer[i].classList.toggle("active");
      DomStrings.optionContainer[1].classList.toggle("u_priority-second-height");
      DomStrings.priorityInputField[i].classList.toggle("active");
      /* DomStrings.optionContainerActive.style.height = optionContainerHeight + "px" */
    });


    /*    DomStrings.priorityInputField.addEventListener("click", function () {
       DomStrings.optionContainer.classList.toggle("active");
       DomStrings.priorityInputField.classList.toggle("active");
     }); */

    var child = Array.from(DomStrings.optionContainer[i].children)
    child.forEach((el) => {
      el.addEventListener("click", () => {
        DomStrings.priorityInputField[i].innerHTML = el.querySelector(
          "label"
        ).innerHTML;
        DomStrings.optionContainer[i].classList.remove("active");
        DomStrings.optionContainer[1].classList.remove("u_priority-second-height");
        DomStrings.priorityInputField[i].classList.remove("active");
      });
    });


    /*  var optionHeight = DomStrings.optionsList[0].offsetHeight;
     var optionsLength = DomStrings.optionContainer[i].children.length;
     var optionContainerHeight = optionHeight * optionsLength;
      */

    /* var settingPriorityWidth = function(){
      
    } */

  }



  /*------------------------------------------------------------------------------- */

  /*-----------------------clock----------------------------------------*/
  var timeClock = function () { };
  var liveTime = new Date();

  var hour = liveTime.getHours();
  var minute = liveTime.getMinutes();

  var changeHour = function (e) {
    if (e.target.value > 23) {
      e.target.value = 23;
    } else if (e.target.value < 0) {
      e.target.value = 0;
    } else if (e.target.value === "") {
      e.target.value = formatTime(hour);
    }

    hour = e.target.value;
  };

  var changeMinute = function (e) {
    if (e.target.value > 59) {
      e.target.value = 59;
    } else if (e.target.value < 0) {
      e.target.value = 0;
    } else if (e.target.value === "") {
      e.target.value = formatTime(minute);
    }

    minute = e.target.value;
  };

  var hourUp = function () {
    hour++;
    if (hour > 23) {
      hour = 0;
    }
    domTimeValue();
  };

  var hourDown = function () {
    hour--;
    if (hour < 1) {
      hour = 23;
    }
    domTimeValue();
  };

  var minuteUp = function () {
    minute++;
    if (minute > 59) {
      minute = 0;
      hour++;
      if (hour > 23) {
        hour = 0;
      }
    }
    domTimeValue();
  };

  var minuteDown = function () {
    minute--;
    if (minute < 0) {
      minute = 59;
      hour--;
      if (hour < 0) {
        hour = 23;
      }
    }
    domTimeValue();
  };

  domTimeValue = function () {
    DomStrings.hr_inp.value = formatTime(hour);
    DomStrings.min_inp.value = formatTime(minute);
    DomStrings.timeInputField.dataset.time =
      formatTime(hour) + ":" + formatTime(minute);
  };

  var formatTime = function (time) {
    if (time < 10) {
      time = "0" + time;
    }
    return time;
  };

  domTimeValue();

  DomStrings.hr_up.addEventListener("click", hourUp);
  DomStrings.hr_down.addEventListener("click", hourDown);
  DomStrings.min_up.addEventListener("click", minuteUp);
  DomStrings.min_down.addEventListener("click", minuteDown);

  DomStrings.hr_inp.addEventListener("change", changeHour);
  DomStrings.min_inp.addEventListener("change", changeMinute);

  /*--------------------------------------------------------------------------*/

  /*========================================taking input from input fields=================================== */

  return {

    timeClock,

    getInput: function () {
      return {
        mainInput: DomStrings.mainInputField.value,
        priorityInput: DomStrings.priorityInputField[0].innerHTML,
        timeInput: DomStrings.timeInputField.dataset.time,
        taskstatus: DomStrings.priorityInputField[1].innerHTML,
      };
    },

    getSubinput: function () {
      subinput = DomStrings.subinput.value;
      return subinput;
    },

    getDomStrings: function () {
      return DomStrings;
    },

    addListTask: function (obj, pri) {
      var html, newHtml, element;
      element = DomStrings.tasksContainer;
      html =
        '<div class="task-list" id="%id%"> <div class="task-upper"> <div class="u_task-name_length"> <h1 class="task-name %priorityTextColor% %task-name-color%">%mainInput%</h1> </div> <div class="task_clock-addB"  id="task_clock-addB-%id%"> <img src="resources/icons/alarm-outline.svg" class="clock"> <div class="time">%timeInput%</div> <img src="resources/icons/pencil-outline.svg" alt="" class="pencil" id="pencil" onclick="document.getElementById(\'task\').focus(); return false;"> <img src="resources/icons/add-outline.svg" alt="" class="add-btn" id="add-btn-%id%"> </div> </div> <div class="task-lower %priorityBottomColor%"> <div class="task-lower_commands"> <img src="resources/icons/checkmark-circle-outline.svg" class="task-lower_commands-icon completed-icon"> <span class="task-lower_commands-name completed-text">Completed</span> </div> <div class="task-lower_commands"> <img src="resources/icons/close-circle-outline.svg" class="task-lower_commands-icon incompleted-icon"> <span class="task-lower_commands-name incompleted-text">Incomplete</span></div> <div class="task-lower_commands delete-icon"> <svg xmlns="http://www.w3.org/2000/svg" width="35" height="23.994" viewBox="0 0 43 49.994" class="task-lower_commands-icon delete-icon"> <g id="trash" transform="translate(-658.5 -417.506)"> <g id="trash-top">  <line id="Line_3" data-name="Line 3" x2="40" transform="translate(660 426)" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/>  <path id="Path_5" data-name="Path 5" d="M192,55.23V50.711h0A2.7,2.7,0,0,1,194.711,48h9.037a2.7,2.7,0,0,1,2.711,2.711h0V55.23" transform="translate(480.652 371.006)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/> </g> <g id="trash-bottom"> <path id="Path_4" data-name="Path 4" d="M112,112l2.259,36.149a3.629,3.629,0,0,0,3.615,3.615H138.66a3.637,3.637,0,0,0,3.615-3.615L144.534,112" transform="translate(551.615 314.236)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/> <line id="Line_4" data-name="Line 4" y2="25" transform="translate(680 434)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>  <line id="Line_5" data-name="Line 5" x2="1" y2="25" transform="translate(672 434)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5"/>  <line id="Line_6" data-name="Line 6" x1="1" y2="25" transform="translate(687 434)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.2"/> </g> </g>  </svg> <span class="task-lower_commands-name delete-task">Delete</span></div> </div> </div>';

      newHtml = html.replace("%mainInput%", obj.description);
      newHtml = newHtml.replace("%timeInput%", obj.time);
      newHtml = newHtml.replace("%id%", obj.id);
      newHtml = newHtml.replace("%id%", obj.id);
      newHtml = newHtml.replace("%id%", obj.id);

      if (pri === "Very_High") {
        newHtml = newHtml.replace("%priorityTextColor%", "u__veryhigh-text");
        newHtml = newHtml.replace(
          "%priorityBottomColor%",
          "u__very_high-container"
        );
      } else if (pri === "High") {
        newHtml = newHtml.replace("%priorityTextColor%", "u__high-text");
        newHtml = newHtml.replace("%priorityBottomColor%", "u__high-container");
      } else if (pri === "Medium") {
        newHtml = newHtml.replace("%priorityTextColor%", "u__medium-text");
        newHtml = newHtml.replace("%priorityBottomColor%","u__medium-container");
      } else if (pri === "Low") {
        newHtml = newHtml.replace("%priorityTextColor%", "u__low-text");
        newHtml = newHtml.replace("%priorityBottomColor%", "u__low-container");
      }
      element.insertAdjacentHTML("beforeend", newHtml);
    },

    clearInputFields: function () {
      DomStrings.mainInputField.value = "";
      DomStrings.priorityInputField[0].innerHTML = "Priority";
      DomStrings.subinput.value = "";
    },

    addListSubtask: function (id, inp) {
      var subhtml, subElement, newSubhtml;
      subElement = DomStrings.subtaskContainer;
      subhtml =
        '<div class="subtasks-items" id = "subtasks-items-%id%"> <div class="checkbox-inp"> <input type="checkbox" name="" id="checkbox-%id%"><label for="checkbox-%id%" class="subtasks-label"><svg viewBox="0 0 100 100"><path class="box" d="M82,89H18c-3.87,0-7-3.13-7-7V18c0-3.87,3.13-7,7-7h64c3.87,0,7,3.13,7,7v64C89,85.87,85.87,89,82,89z"/><polyline class="check" points="25.5,53.5 39.5,67.5 72.5,34.5 "/></svg><span class="subtasks_names">%label%</span></label><img src="resources/icons/add-outline.svg" alt="" class="subtasks-cross-icon" ></div></div>';
      newSubhtml = subhtml.replace("%label%", inp);
      newSubhtml = newSubhtml.replace("%id%", id);
      newSubhtml = newSubhtml.replace("%id%", id);
      newSubhtml = newSubhtml.replace("%id%", id);
      subElement.insertAdjacentHTML("beforeend", newSubhtml);
    },

    addBottomTasks: function (id, description, status) {
      var bottomTask, bottomContainer, newBottomTask;
      bottomContainer = DomStrings.bottomTaskContainer;

      bottomTask = '<div class="task-one" id = %status%-%id%> <img src="resources/icons/add-outline.svg" alt="" class="add-btn-btm"  onclick="document.getElementById(\'task\').focus(); return false;"> <h3 class="task-name">%description%</h3> </div>'
      newBottomTask = bottomTask.replace("%status%", status);
      newBottomTask = newBottomTask.replace("%id%", id);
      newBottomTask = newBottomTask.replace("%description%", description);


      bottomContainer.insertAdjacentHTML("beforeend", newBottomTask);
    },

    deletelistTask: function (id) {
      el = document.getElementById(id);
      el.parentNode.removeChild(el)
    },


    deletelistSubTask: function (id) {
      el = document.getElementById(id);
      el.parentNode.removeChild(el)
    },

    clearSubtasksList: function () {
      var subtasksAll = DomStrings.existingSubTasks;
      var subtaskAllLength = subtasksAll.length;
      for (var i = 0; i < subtaskAllLength; i++) {
        subtasksAll[0].parentNode.removeChild(subtasksAll[0]);
      }
    },

    clearBottomList: function () {
      var existingBottomTasks = DomStrings.bottomTasks;
      var existingBottomTasksLength = DomStrings.bottomTasks.length;
      console.log(existingBottomTasksLength)
      for (i = 0; i < existingBottomTasksLength; i++) {
        existingBottomTasks[0].parentNode.removeChild(existingBottomTasks[0]);
        //existingBottomTasks[0].parentNode.removeChild(existingBottomTasks[0])
        /* existingBottomTasks[0].parentNode.removeChild(existingBottomTasks[0]) */
      }
    },

    editTask: function (obj) {
      DomStrings.mainInputField.value = obj.description;
      DomStrings.priorityInputField[0].innerHTML = obj.priority;
      var timeAry = obj.time.split(":");
      var timehr = parseInt(timeAry[0]);
      var timemin = parseInt(timeAry[1])

      if (timehr < 10) {
        DomStrings.hr_inp.value = ("0" + timehr);
      } else {
        DomStrings.hr_inp.value = timehr;
      }

      if (timemin < 10) {
        DomStrings.min_inp.value = ("0" + timemin);
      } else {
        DomStrings.min_inp.value = timemin;
      }

    },

    /* managingLengthOfInput: function(){
      var mainInpLen = DomStrings.mainInputField.value.length;
      if(mainInpLen < 10){
        DomStrings.taskHeading.style.fontSize = "1rem"
      }
    } */

  };
})();

/*=================================================APP CONTROLLER======================================*/

var AppController = (function (UICtrl, dataCtrl) {
  var ctrlAddTask = function () {
    //1. Get input data from input field
    var input = UICtrl.getInput();

    if (input.mainInput !== "" && input.priorityInput !== "Priority") {

      if(dataCtrl.data.allTasks.Edit[0]){

        var editTask = dataCtrl.data.allTasks.Edit[0];
          editTask.description = input.mainInput;
          editTask.time = input.timeInput;
          editTask.priority = input.priorityInput;

          dataCtrl.readdEditedTask(editTask)

          UICtrl.addListTask(editTask, input.priorityInput);
          UICtrl.clearInputFields();
      }
      else{
              //2. add the item to data controller
          var newTask = dataCtrl.addTask(
            input.mainInput,
            input.priorityInput,
            input.timeInput
          );

          //3. add item to UI
          UICtrl.addListTask(newTask, input.priorityInput);

          //4.clear our input fields
          UICtrl.clearInputFields();



      }

      //5.remove background color class
      Dom.priorityInputField[0].classList.remove("u__incomplete-border");
      Dom.mainInputField.classList.remove("u__incomplete-border");
    }
     
 else if (input.mainInput !== "") {
      Dom.priorityInputField[0].classList.add("u__incomplete-border");
    } else if (input.priorityInput !== "Priority") {
      Dom.mainInputField.classList.add("u__incomplete-border");
    } else {
      Dom.priorityInputField[0].classList.add("u__incomplete-border");
      Dom.mainInputField.classList.add("u__incomplete-border");
    }
  };

  var ID;

  var mainTaskOperations = function (event) {
    ID = parseInt(event.target.parentNode.parentNode.parentNode.id);

    console.log(event.target.classList);

    if (!isNaN(ID)) {
      
      if (event.target.classList.contains("add-btn")) {
        /* Dom.subTasksInpField.style.opacity = 1;
        Array.from(document.querySelectorAll(".task_clock-addB")).forEach((el) => {
          if (el.classList.contains("task_clock-addB--active")) {
            Dom.subTasksInpField.style.opacity = 0;
          }
        }); */
            

        Array.from(document.querySelectorAll(".task_clock-addB")).forEach((el) => {
          if (Array.from(document.getElementById("task_clock-addB-" + ID).classList).includes("task_clock-addB--active")) {
            return;
          }
          if (Array.from(el.classList).includes("task_clock-addB--active")) {
            el.classList.remove("task_clock-addB--active");
            
          }
        }
        );

        Array.from(document.querySelectorAll(".add-btn")).forEach((el) => {
          if (Array.from(document.getElementById("add-btn-" + ID).classList).includes("add-btn--active")) {
            return;
          }

          if (Array.from(el.classList).includes("add-btn--active")) {
            el.classList.remove("add-btn--active");
  
          }
        });

        var ctrlFetched = dataCtrl.fetchSubtask(ID);

        //console.log(ID);
        document.getElementById("task_clock-addB-" + ID).classList.toggle("task_clock-addB--active");
        document.getElementById("add-btn-" + ID).classList.toggle("add-btn--active");

        UICtrl.clearSubtasksList()

        if (Array.from(document.getElementById("task_clock-addB-" + ID).classList).includes("task_clock-addB--active")) {
          for (var i = 0; i < ctrlFetched.fetchedLength; i++) {
            var subtaskData = ctrlFetched.fetched[i];

            UICtrl.addListSubtask(subtaskData.id, subtaskData.description);
          }
        }
      }
      else if (event.target.classList.contains("completed-icon") || event.target.classList.contains("completed-text")) {
        dataCtrl.addToDownSection("completed", ID);
        UICtrl.deletelistTask(ID);
        UICtrl.clearSubtasksList()
      }

      else if (event.target.classList.contains("incompleted-icon") || event.target.classList.contains("incompleted-text")) {
        dataCtrl.addToDownSection("incompleted", ID);
        UICtrl.deletelistTask(ID);
        UICtrl.clearSubtasksList()
      } else if (
        event.target.classList.contains("delete-icon") ||
        event.target.classList.contains("delete-text")
      ) {
        dataCtrl.addToDownSection("deleted", ID);
        UICtrl.deletelistTask(ID);
        UICtrl.clearSubtasksList()
      }
      else if (event.target.classList.contains("pencil")) { 
        
        var MainTaskInp = dataCtrl.EditTasks("taskData", ID);
        
        //var MainTaskInp = dataCtrl.EditTasks();
  
        UICtrl.editTask(MainTaskInp);
  
        

        
        //UICtrl.addListTask()
        UICtrl.deletelistTask(ID);
        UICtrl.clearSubtasksList()
      }
    }
    else {
      console.log("hii");
    }
  };

  var subTaskOperation = function(event){
    var SubId = event.target.parentNode.parentNode.id;
    
    if(event.target.classList.contains("subtasks-cross-icon")){
      var SID = SubId.split('-');
      console.log(SID[2]);
      console.log(ID);
      dataCtrl.deleteSubTasks(ID, SID[2]);
      UICtrl.deletelistSubTask(SubId);

    }
  }

  var subinputValue = function () {
    var subinputValueStr = UICtrl.getSubinput();

    if (subinputValueStr !== "") {
      /* dataController.data.allTasks.taskData[ID].subTasks.push(subinputValueStr);   because it is defined in function datactrl*/
      var newSubtask = dataCtrl.addSubTask(ID, subinputValueStr);

      UICtrl.addListSubtask(newSubtask.id, subinputValueStr);

      UICtrl.clearInputFields();

      document.querySelector(".input-box").classList.remove("u__input-box--empty");
    } else {
      document.querySelector(".input-box").classList.add("u__input-box--empty");
    }
  };


  var showStatusData = function () {
    var input = UICtrl.getInput();
    var statusInp = input.taskstatus;

    var fetchedData = dataCtrl.fetchBottomTask(statusInp);
    console.log(fetchedData.statusArrLen);
    UICtrl.clearBottomList();
    for (var i = 0; i < fetchedData.statusArrLen; i++) {
      var task = fetchedData.statusArr;
      console.log(i);
      console.log(fetchedData.statusArr);
      UICtrl.addBottomTasks(task[i].id, task[i].description, statusInp)
    }
    var downTaskInpList = dataCtrl.data.allTasks[statusInp];
    /* Dom.remainingTasksHeading.innerHTML = downTaskInpList.length + " Tasks Has " + statusInp; */

  }

  var bottomTaskOperation = function (event) {

    
    BTaskID = event.target.parentNode.id;
    console.log(BTaskID);
    console.log(event.target.classList);

    if (BTaskID) {
      var splitBTaskID = BTaskID.split('-');
      var status = splitBTaskID[0];
      var dID = parseInt(splitBTaskID[1]);

      console.log(status);
      console.log(dID);

      if (event.target.classList.contains("add-btn-btm")) {
        dataCtrl.data.allTasks.Edit = [];
        var input = UICtrl.getInput(); //getting status inp 
        var statusInp = input.taskstatus; //completed// incompleted//deleted
        //var downTaskInpList = dataCtrl.data.allTasks[statusInp]; //fetching data from arr //completed// incompleted//deleted
/*      Dom.remainingTasksHeading.innerHTML = downTaskInpList.length + " Tasks Has " + statusInp; */

        //var downTaskInp = dataCtrl.data.allTasks[status][dID];

        //UICtrl.editTask(downTaskInp);

        //dataCtrl.EditTasks(status, dID);

        var downTaskInp = dataCtrl.EditTasks(status, dID);

        UICtrl.editTask(downTaskInp);

        //UICtrl.addListTask()
        UICtrl.deletelistTask(BTaskID);
      }
    }



  }

  //=====setting event listner to add new main item======//

  var Dom = UICtrl.getDomStrings();

  Dom.addInputField.addEventListener("click", ctrlAddTask);
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      ctrlAddTask();
    }
  });

  Dom.subtaskContainer.addEventListener("click", subTaskOperation);

  Dom.tasksContainer.addEventListener("click", mainTaskOperations);

  Dom.bottomTaskContainer.addEventListener('click', bottomTaskOperation)

  Dom.subinputAddBtn.addEventListener("click", subinputValue);

  Dom.optionContainer[1].addEventListener("click", showStatusData);

  

  //------------------------------------------------------//
  return { subinputValue };
})(UIcontroller, dataController);
