function acceptToken(token){
  console.log(token);
  if(typeof token == 'undefined'){
     return false;  
  }
  var url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + token;
   console.log(url);
  var response = UrlFetchApp.fetch(url);
  var responseText = response.getContentText();
  //console.log(responseText);
  
  var responseJSON = JSON.parse(responseText);
  return auth(responseJSON.aud,responseJSON.exp,responseJSON.email,responseJSON.email_verified);


}

function auth(aud,exp,email,email_verified){
  
  var spreadSheet = SpreadsheetApp.openByUrl(url);
  var workSheet = spreadSheet.getSheetByName("Users");
  var emails = workSheet.getRange(1, 1,workSheet.getLastRow(),1).getValues().map(function(r){return r[0]});
  

  var clientID = "297108353951-l0dqf4e4vjksup6t2l2ngl2g278dbo24.apps.googleusercontent.com";
  var expDate = new Date(parseInt(exp)*1000);
  var currentDate = new Date();
  
  console.log(expDate);
  console.log(currentDate);
  console.log(aud);
  console.log(exp);
  console.log(email);
  console.log("email", email_verified);
  console.log("listcheck", !(emails.indexOf(email) === -1));
  console.log("ev", email_verified === "true");
  console.log("type",typeof email_verified);
  
  if(aud === clientID && expDate.getTime() >= currentDate.getTime() && email_verified === "true" && !(emails.indexOf(email) === -1)) {
    console.log("GOod work!");
    return true;
  
  } else {
  
  console.log("User did not PASS");
    return false;
  }
  return false;
}





