$(document).ready(function () {


    // console.log(moment().format());
    //console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));

    // ============== GLOBAL VARIABLES =================
    var startingHour = 9;

    var scheduleObject = JSON.parse(localStorage.getItem("schedule"));
    console.log(scheduleObject);

    var currenTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    // var currenTime = moment().format("dddd, MMMM Do YYYY, HH:mm:ss A")
    var currentHour = moment().format('HH');


    console.log("current hour:   " + currentHour);

    var textHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"];

    var myInterval;



    // ============== DYNAMYC ELEMENTS ========================

    function creatObjects() {

        for (var i = 0; i < textHours.length; i++) {
            var txtid = textHours[i].split(" ");
            //create elements under class container
            // create row div, class row
            var mainRowDiv = $("<div>")
            mainRowDiv.addClass("row");
            mainRowDiv.attr("id", +txtid[0]);
            $("#mainContainer").append(mainRowDiv);


            //create col1 div, class col-sm-2 col-md-2 time-block hour
            var col1Div = $("<div>")
            col1Div.addClass("col-sm-2");
            col1Div.addClass("col-md-2");
            col1Div.addClass("time-block");
            col1Div.addClass("hour");
            col1Div.text(textHours[i]);
            col1Div.attr("id", "time-" + txtid[0]);
            mainRowDiv.append(col1Div);

            //add text area, add class class="col-sm-8 col-md-8 future description"
            var col2textarea = $("<textarea>")
            col2textarea.addClass("col-sm-8");
            col2textarea.addClass("col-md-8");
            col2textarea.addClass("description");
            col2textarea.attr("id", "txt-" + txtid[0]);
            mainRowDiv.append(col2textarea);

            //add saveBtn div, class="col-sm-2 col-md-2 saveBtn"

            var col3Div = $("<div>");
            col3Div.addClass("col-sm-2");
            col3Div.addClass("col-md-2");
            col3Div.addClass("saveBtn");
            col3Div.attr("id", "save-" + txtid[0])
            mainRowDiv.append(col3Div);
        }

    }

    creatObjects();


    // ============= RETRIEVE DATA FROM LS and other ELEMENTS==========
    $("#currentDay").text(currenTime);

    function retrieveData() {
        var objectKeys = Object.keys(scheduleObject);

        console.log(" my keys: ", objectKeys);
        objectKeys.forEach(element => {
            console.log("myElement key:" + element);
            var textareaIndex = "#txt-" + element;
            console.log("key element:  " + textareaIndex)


            var textareaInput = scheduleObject[element]
            console.log(" this is the text area text:  " + textareaInput);
            $(textareaIndex).text(textareaInput);
        });

    }
    retrieveData();




    // ============= EVENT LISTENERS=================

    //save txtArea
    $(".saveBtn").on("click", function () {
        var idSave = $(this).attr("id");
        console.log("saving id =" + idSave);

        var indexArray = idSave.split("-");
        var index = indexArray[1];
        var idText = "#txt-" + index;

        console.log("idText: " + idText);
        var enteredText = $.trim($(idText).val());

        console.log("captured text " + enteredText);
        console.log("myIndex: " + index);
        tempScheduleObject = { [index]: enteredText }
        console.log("new object:  ", tempScheduleObject);



        // check if returned object from local storage is not null
        if (scheduleObject === null) {
            scheduleObject = { [index]: enteredText };

        } else {
            scheduleObject[index] = enteredText;
        }

        localStorage.setItem("schedule", JSON.stringify(scheduleObject));

    });

    // ============ CHANGE COLORS ============

    function changeBackGroundColor() {
        var pastHour = startingHour;

        myInterval = setInterval(function () {
            currentHour = moment().hour();

            if (currentHour > pastHour) {
                changePastColor(currentHour);
                changePresentColor(currentHour);
                changeFutureColor(currentHour);
            }
            pastHour = currentHour;

        }, 1000)
    }
    changeBackGroundColor();

    function changePastColor(currentHour) {
        if (currentHour > 12) {
            currentHour = currentHour - 12;
            console.log("currentHourPast:  " + currentHour);
            if(currentHour > 7) {currentHour =7}
            for (var i = 1; i < currentHour && i < 7; i++) {  
                var textareaId = "#txt-" + i;     
                $(textareaId).addClass("past");
            }
            
            for (var i = 9; i <= 12; i++) {
                console
                var textareaId = "#txt-" + i;
                $(textareaId).addClass("past");
            }

         
        } else {
            for (var i = 9; i <= currentHour; i++) {
                var textareaId = "#txt-" + i;
                $(textareaId).addClass("past");
            }
        }
    }

    function changePresentColor(currentHour){

        if (currentHour > 12) {
            currentHour = currentHour - 12;
            if(currentHour<7){
            var textareaId = "#txt-" + currentHour;
            $(textareaId).addClass("present");
            }
        } else {
            if(currentHour>9){
            var textareaId = "#txt-" + currentHour;
            $(textareaId).addClass("present");
            }
        }
       
    }

    function changeFutureColor(currentHour){

        if (currentHour > 12) {
            currentHour = currentHour - 12;
            console.log("currentHourFuture:  " + currentHour);
            
            for (var i = currentHour; i <= 6; i++) {
                var textareaId = "#txt-" + i;
                $(textareaId).addClass("future");
            }

        } else {
            for (var i = currentHour+1; i <= 12; i++) {
                var textareaId = "#txt-" + i;
                $(textareaId).addClass("future");
            }
            for (var i = 1; i <= 6; i++) {
                var textareaId = "#txt-" + i;
                $(textareaId).addClass("future");
            }
        }
       
    }

})