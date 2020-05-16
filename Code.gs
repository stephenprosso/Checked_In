var url ="https://docs.google.com/spreadsheets/d/16yzee5EY8gDCVN9EN7bQGUE-RSL_6Tjr-vzmmNoLrxc/edit#gid=0";
var Route = {};
Route.path = function(route,callback){
   Route[route] = callback;
}

function doGet(e) {
  
  Route.path("addGuest",loadAddGuest);
  Route.path("listDetail",loadListDetail);
  Route.path("editList",loadEditList);
  if(Route[e.parameters.v]) {
  return Route[e.parameters.v]();
  }else {
   return render("dashboard");
  }
}

function loadAddGuest() {
  
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Options");
  var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var htmlListArray = list.map(function(r){return '<option>' + r[0] + '</option>'; }).join('');  

  return render("addGuest", {list: htmlListArray })

}

function loadListDetail() {  
  return render("listDetail");
}


function loadEditList() {
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Options");
  var list = workSheet.getRange(1,1,workSheet.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var htmlListArray = list.map(function(r){return '<option>' + r[0] + '</option>'; }).join('');  
  Logger.log(list);
  Logger.log(htmlListArray);
  return render("editList", {list: htmlListArray});
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
  return render("dashboard", {sheets: sheetArray});
}






