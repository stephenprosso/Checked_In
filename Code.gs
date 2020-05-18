var url ="https://docs.google.com/spreadsheets/d/1-6UatdMa_6eXjhzZ-h5Pw2IcjBp_542uNyeIHyjMBfI/edit#gid=0";
var Route = {};
Route.path = function(route,callback){
   Route[route] = callback;
}

function newSS() {
  var mySS = SpreadsheetApp.create('newEvent');
  Logger.log(mySS.getUrl());
}
function doGet(e) {
  
  Route.path("addGuest",loadAddGuest);
  Route.path("listDetail",loadListDetail);
  Route.path("editList",loadEditList);
  Route.path("addEvent", loadAddEvent);
  if(Route[e.parameters.v]) {
  return Route[e.parameters.v]();
  }else {
   return render("Dashboard");
  }
}

function loadAddGuest() {
  
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Options");
  var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var htmlListArray = list.map(function(r){return '<option>' + r[0] + '</option>'; }).join('');  

  return render("AddGuest", {list: htmlListArray })

}

function loadListDetail() {  
  return render("ListDetail");
}


function loadAddEvent() {

  return render("AddEvent");
}

function loadEditList() {
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Options");
  var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var htmlListArray = list.map(function(r){return '<option>' + r[0] + '</option>'; }).join('');  
  Logger.log(list);
  Logger.log(htmlListArray);
  return render("EditList", {list: htmlListArray});
}


function loadDashboard() {
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
  return render("Dashboard", {sheets: sheetArray});
}






