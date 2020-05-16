function include(filename) {
//file name is passed to the html service and we get the content of the file
   return HtmlService.createHtmlOutputFromFile(filename).getContent();

}
//THIS FUNCTION RENDERS THE CORRECT ROUTE AKA PAGE TP YOUR SCREEN
function render(file,argsObject) {

  var tmp = HtmlService.createTemplateFromFile(file);
  if(argsObject){
  var keys = Object.keys(argsObject);
   
    keys.forEach(function(key){
      tmp[key] = argsObject[key];
    
    });
  }//END IF
  return tmp.evaluate();
  //return tmp.evaluate().setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}