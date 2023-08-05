// const { textputter } = require("./downloadfile.js");
import download, { textputter } from './downloadfile.js';

let textarea = document.querySelector("textarea");
let input = document.getElementById('userFile');
let form = document.getElementById('send-container');
let btn = document.getElementById('this-submit-button');

// let resp= document.getElementById('response_field');
var myDiv = document.getElementById("response_field");
// myDiv.innerHTML = "Content To Show";

let text_line="";

input.addEventListener('change', () => {
    let files= input.files;
    if(files.length == 0) return;
    const file = files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
        const file = e.target.result;

        let lines = file.split(/\r\n|\n/);

        const deletion= [""];
        //you can change over the abv array on which data to reject to go to processing stage
        lines = lines.filter(item => !deletion.includes(item));
        text_line= lines.join(',');
        textarea.value =text_line;   
    };
    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file);
});

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  // console.log(text_line);
  fetch('/process-data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
       text_line
    })
})
.then(response=> response.json())
.then(data =>{
    // console.log(data.response);
  updateResponseDiv(data.response);
})
.catch((e) => { console.log(e.message) });
});

function updateResponseDiv(processedData){
    if(myDiv) {
        myDiv.value= processedData;
        // myDiv.innerHTML= processedData;
        textputter(processedData);
        btn_function();
      }
}
function  btn_function() {
  window.location.href = "#our_output";
}
