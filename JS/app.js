let textarea = document.querySelector("textarea");
let input = document.getElementById('userFile');
let form = document.getElementById('send-container');
let text_line="";

input.addEventListener('change', () => {
    let files= input.files;

    if(files.length == 0) return;
    const file = files[0];

    let reader = new FileReader();
 
    reader.onload = (e) => {
        const file = e.target.result;

        let lines = file.split(/\r\n|\n/);
        
        console.log(lines);

        const deletion= [""];
        lines = lines.filter(item => !deletion.includes(item));
        text_line= lines.join(',');
        textarea.value =text_line;
      
    };
 
    reader.onerror = (e) => alert(e.target.error.name);

    reader.readAsText(file);
    // const message= messageInput.value;
    // messageInput.value= '';
});

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  console.log(text_line);
  //TODO:
  //here the further process over the text of input will take place
});

