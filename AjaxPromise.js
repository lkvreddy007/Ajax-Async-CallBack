let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date = new Date();
    return date.getHours()+"Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makePromiseCall(methodType, url, async = true, data = null){
    return new Promise(function (resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200 || xhr.status ===201){
                    resolve(xhr.responseText);
                }
                else if(xhr.status >=400){
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("XHR Failed. Handle Error");
                }
            }
        }
        xhr.open(methodType, url, async);
        if(data){
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }
        else{
            xhr.send();
        }
        console.log(methodType+" request sent to the server at: "+showTime())
    });
}

const getURL = "http://127.0.0.1:3000/employees/";
makePromiseCall("GET", getURL, true)
                .then(responseText => {
                    console.log("Get User Data: "+responseText)
                })
                .catch(error => console.log("GET Error Status: "+JSON.stringify(error)));

const deleteURL = "http://127.0.0.1:3000/employees/3";
makePromiseCall("DELETE",deleteURL,false)
                .then(responseText =>{
                    console.log("User Deleted: "+responseText)
                })
                .catch(error => console.log("DELETE Error Status: "+JSON.stringify(error)));

const postURL = "http://127.0.0.1:3000/employees/";
const empData = {"name":"Sally","salary":"6000"};
makePromiseCall("POST", postURL, true, empData)
                .then(responseText => {
                    console.log("UserAdded: "+responseText)
                })
                .catch(error => console.log("Post Error Status: "+JSON.stringify(error)));