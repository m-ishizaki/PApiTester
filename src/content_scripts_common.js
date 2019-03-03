window.onload = function(){
var button = document.getElementById("postButton");
if(button == null) return;
var urlView = document.getElementById("urlView");
var postDataView = document.getElementById("postDataView");
var resultView = document.getElementById("resultView");
var columnFilterHash = document.getElementById("columnFilterHash");
var columnSorterHash = document.getElementById("columnSorterHash");
var tabUrl = "";
button.disabled = "disabled";

button.addEventListener('click', function(){
    resultView.innerHTML = "送信中...";

    var postUrl = tabUrl.replace("/items/", "/api_items/").replace("/index", "/get");
    urlView.innerText = postUrl;

    var json = {
        "ApiKey": "",
        "Offset": 0,
        "View": {
          "ColumnFilterHash": {
          },
          "ColumnSorterHash": {
          }
        }
      };
      try{
      if(columnFilterHash.value) json.View.ColumnFilterHash = JSON.parse(columnFilterHash.value);
      if(columnSorterHash.value) json.View.ColumnSorterHash = JSON.parse(columnSorterHash.value);
      }catch(ex){
        resultView.innerHTML = ex.name + ': ' + ex.message;
        return;
      }
    var value = JSON.stringify(json)
    postDataView.innerText = value;

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            resultView.innerHTML = xhr.responseText;
            return;
        }
      }
      xhr.open('POST', postUrl);
     xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      xhr.send(value);
});
chrome.tabs.getSelected(null,function(tab) {
    tabUrl = tab.url;
    if(tabUrl.includes("/items/") && tabUrl.includes("/index")) button.disabled = "";
});
};