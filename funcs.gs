//1.//change "Copy of Data back to Data" updateRecordById, userClick, getTableData
//**** ListDetail-js.html function  ****//
function updateRecordById(recordInfo){
   //test data
  //var recordInfo = {};
  //recordInfo.id = 4;
  //recordInfo.checkInState = false;
  
  
 var spreadSheet = SpreadsheetApp.openByUrl(url);
 var workSheet = spreadSheet.getSheetByName("Copy of Data");
 var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
 var positionInArray =  ids.indexOf(parseInt(recordInfo.id));
 var rowNumber = positionInArray === -1 ? 0 : positionInArray +2;
 //2.//old time data is 5 and will need to be moved to 6
  var oldTimeData = workSheet.getRange(rowNumber,6).getValue();
  //old line//var oldTimeData = workSheet.getRange(rowNumber,5).getValue();
 
  var checkInDate;
  if(recordInfo.checkInState){
  
   checkInDate = oldTimeData =="" ? new Date(): oldTimeData;
  } else {
  
  checkInDate = "";
  }
  var newTimeData = [checkInDate,recordInfo.checkInState];  
  //3.//old time data is 5 and will need to be changed to 6
  workSheet.getRange(rowNumber,6,1,2).setValues([newTimeData]);
   //OLD LINE//workSheet.getRange(rowNumber,5,1,2).setValues([newTimeData]);
 
  // on 5/19/20 I missed this change to return the correct column for the time data
  return workSheet.getRange(rowNumber,6,1,2).getDisplayValues()[0];
 //OLD LINE//return workSheet.getRange(rowNumber,5,1,2).getDisplayValues()[0];
  
}

//**** AddGuest-js.html functions ****//
//fucntion that adds line and data to the *"COPY OF DATA"* file for a guest list
//the max will increase the number are using for an ID.
function userClick(userInfo){

  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Copy of Data");
  var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
  
  //find the max id from this list
  var maxID = Math.max.apply(null,ids);
  var newID = maxID+1;

  workSheet.appendRow([newID, userInfo.fname, userInfo.lname, userInfo.ctype, userInfo.org, userInfo.checkinDate, userInfo.checkBox, userInfo.eventID]);

  
  //Logger.log(name + "Your CLick is My Command");

}
//**** LIST DETAIL JS FUNCTION ****//
function getTableData(ev) {

     var ss = SpreadsheetApp.openByUrl(url);
     var ws = ss.getSheetByName("Copy of Data");
     //4.//the get range is 7 and will need to be changed to 8 to the 8th column that was added
     //remember that the range starts at column 1 not 0
     var data = ws.getRange(2,1, ws.getLastRow() -1, 8).getDisplayValues();

     //5. //var data = ws.getRange(2,1, ws.getLastRow() -1, 7).getDisplayValues();
    data = data.filter(function(r){
    //6. //in this filter function we need the  column in javascript which starts at 0
    //6. //the 6 needs to be changed to a 7
    return r[7] == ev;
     //old line//return r[6] == ev;
  
  });
     Logger.log("data : " + data);
     return data;
}

//**** LIST DETAIL JS FUNCTION ****//
function getTableTitle(ev) {
 //ev = 7;
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Event");
  var data = ws.getRange(2,1, ws.getLastRow() - 1,4).getValues();  
  //var gridTitleArray = data.filter(function(r){return r[0] == ev;}).map(function(r){return r[2] + " @ " + r[1] + " - " + r[3]});
  
  
  
  //May 1, 2020 12:00:00 AM PDT
  //[May,1, 2020, 12:00:00,AM,PDT]
  
  var gridTitleArray = data.filter(function(r){return r[0] == ev;}).map(function(r){
    
        var dateText = r[3].toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        var displayDateArray = dateText.split(' ');
     //Logger.log(displayDateArray);
        var displayDate = displayDateArray[0] + ' ' + displayDateArray[1] + ' ' + displayDateArray[2];
        
    
    return r[2] + " @ " + r[1] + " - " + displayDate});

  Logger.log(gridTitleArray);
  return gridTitleArray;
   
}

//**** AddEvent-js.html function ****//
function userClickAddEvent(userInfo){

  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Event");
  var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
  
  //find the max id from this list
  var maxID = Math.max.apply(null,ids);
  var newID = maxID+1;

  workSheet.appendRow([newID,userInfo.vname,userInfo.ename,userInfo.sdate,userInfo.eimage]);
  

}

//**** Dashboard-js.html functions ****//
function getEventTableData() {
  
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Event");
  var data = ws.getRange(2,1,ws.getLastRow()-1,5).getDisplayValues();
  Logger.log(data);
  return data;

}


function getEditList(ev) {

     var ss = SpreadsheetApp.openByUrl(url);
     var ws = ss.getSheetByName("Copy of Data");
     //4.//the get range is 7 and will need to be changed to 8 to the 8th column that was added
     //remember that the range starts at column 1 not 0
     var data = ws.getRange(2,1, ws.getLastRow() -1, 8).getDisplayValues();

     //5. //var data = ws.getRange(2,1, ws.getLastRow() -1, 7).getDisplayValues();
    data = data.filter(function(r){
    //6. //in this filter function we need the  column in javascript which starts at 0
    //6. //the 6 needs to be changed to a 7
    return r[7] == ev;
     //old line//return r[6] == ev;
  
  });
     Logger.log("data : " + data);
     return data;
}
//** EditList-js Functions **//
function deleteRecordById(recordInfo){
Logger.log(recordInfo);
 var spreadSheet = SpreadsheetApp.openByUrl(url);
 var workSheet = spreadSheet.getSheetByName("Copy of Data");
 var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
 
 var positionInArray =  ids.indexOf(parseInt(recordInfo.id));
 var rowNumber = positionInArray === -1 ? 0 : positionInArray +2;
  
  workSheet.deleteRow(rowNumber);
}


//** EditList-js Functions **//
function userClickAddGuest(userInfo){

  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Copy of Data");
  var ids = workSheet.getRange(2, 1,workSheet.getLastRow()-1,1).getValues().map(function(r){return r[0]});
  
  //find the max id from this list
  var maxID = Math.max.apply(null,ids);
  var newID = maxID+1;
  //When the user clicks add guest they are adding the guest to a specific guests list.
  //this needs to be changed to send the event id as a parameter received from userInfo

  workSheet.appendRow([newID, userInfo.fname, userInfo.lname, userInfo.ctype, userInfo.org, userInfo.checkinDate, userInfo.checkBox, userInfo.eventID]);

  
  //Logger.log(name + "Your CLick is My Command");

}

function deleteEventById(recordInfo){
  //var recordInfo = {id: 5};
  var id = parseInt(recordInfo.id); //converting text ids to number ids
  var spreadSheet = SpreadsheetApp.openByUrl(url); //get spreadsheet
  var wsData = spreadSheet.getSheetByName("Copy of Data"); //get worksheet for guests
  var guestData = wsData.getRange(2,1,wsData.getLastRow()-1,8).getValues(); //get array of guests
  var wsEvent = spreadSheet.getSheetByName("Event"); //get event data
  //intially this is what it looks like
  //[ 1,stephen,rosso,god pass,organization, eventID] 
  //[ 1,stephen,rosso,god pass,organization, eventID] r.concat adds extra column for index to existing array
  var matchingEvents = guestData.map(function(r,i){ 
     return r.concat([i]);
  }).filter(function(r){ //filter the results and keep the records where eventID matches event ID
    return r[7] === id;  // the index is on the last column.
  });
  var matchingGuestRows = matchingEvents.map(function(r){ //only return the information needed- the index
     return r[8]+2; // add 2 becasue we have 1 line of static information
  }); //[1,5,9] 
  for (var i = matchingGuestRows.length -1; i>=0; i--){ //loop through the aray from bottom to top to find the matching guest. start with -1 to get to the last element
          wsData.deleteRow(matchingGuestRows[i]); //delete the row number which is i inside  matchingGuestRows
       }
  Logger.log(matchingGuestRows);
  
 var ids = wsEvent.getRange(2, 1,wsEvent.getLastRow()-1,1).getValues().map(function(r){return r[0]}); //get the id of the event
 
 var positionInArray =  ids.indexOf(id); //get the index position 
 var rowNumber = positionInArray === -1 ? 0 : positionInArray +2; //again add 2 to index to get the row number
  
 wsEvent.deleteRow(rowNumber); // delete the row number
}

//next step is to create a delete button that calls this function and passes the recordInfo.id.



//**FUNCTIONS NOT IN USE GO BELOW THIS LINE**//
//table-js.html functions
function formatMySpreadsheet(id) {
  // Set the background of the row to yellow where id (firstname + last name) = id 
  Logger.log(id);
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("Data");
  
  //var selectedData = ws.getCurrentCell().getValue();
  var selectedData = ws.getRange(2,1).getValue();
  Logger.log(selectedData);
  if (selectedData === id) {
  //selectedData.setBackground("Yellow");
    ws.getRange(2,1,2,5).setBackground("Yellow").setFontStyle(null).setFontWeight(null).setFontSize('10').setFontColor('Red');
  } else { 
    ws.getRange(2,1,2,5).setBackground("blue").setFontStyle("italic").setFontWeight('Bold').setFontSize('18');
   }
  //return data;
                                                
}


function loadHome() {
  var spreadSheet = SpreadsheetApp.openByUrl(url);
 // var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var sheets = spreadSheet.getSheets();
  var holderArray = [];
  for(var i=0; i< sheets.length; i++){
  var sheetName = sheets[i].getName();
    holderArray.push(sheetName);
  }
  Logger.log(sheets);
  Logger.log(holderArray);
  var sheetArray = holderArray.map(function(s){return '<option>' + s[0] + '</option>'; }).join(''); 
   Logger.log(sheetArray);
  return render("home", {sheets: sheetArray});
}

function getCost(zipCode){

     var spreadSheet = SpreadsheetApp.openByUrl(url);
     var workSheet = spreadSheet.getSheetByName("Estimate");
     var data = workSheet.getRange(1,1, workSheet.getLastRow(), 2).getValues();
  
     var zipCodesList = data.map(function(r){return r[0]; });
     var costList = data.map(function(r){return r[1]; });
     var position = zipCodesList.indexOf(zipCode);
  
     if(position > -1) {
     return '$' + costList[position].toFixed(2);
      } else{
         return 'unavailable';  
     }  
}

function getCalendarBusyDays() {
    var startDate = new Date();
    var endDate = new Date(new Date().setYear(startDate.getFullYear()+1));
    var calendar = CalendarApp.getCalendarsByName("stephen@mylifeeveryday.com")[0];
    var events = calendar.getEvents(startDate,endDate);
    var days = events.map(function(e){return e.getStartTime().setHours(0,0,0,0); });
  
    var uniqueDays = [];
   
  days.forEach(function(d){
    if(uniqueDays.indexOf(d) === -1){
       uniqueDays.push(d);  
    }           
  });
 return uniqueDays;
}

function getWords() {
   var ss = SpreadsheetApp.openByUrl(url);
   var ws = ss.getSheetByName("Venue");
   var data = ws.getRange(1,1, ws.getLastRow(), 1).getValues();

   var options = {};
  data.forEach(function(v){
  
  options[v[0]] = null;
  
  
  }); 
   return options;  
}

