//CONSTANTS
const light_bg = 'assets/images/background-light.png';
const dark_bg = 'assets/images/background-dark.png';
const textarea = document.getElementById('text-area');
const appbarContainer = document.getElementById("appbar-container");
const mainHeader = document.getElementById("main-header");
const btnClearAll = document.getElementById("clear-all");
const inputRegexPattern = document.getElementById("regexPattern");
const timeTag = document.getElementById("time-tag");
const btnDarkLightMode = document.getElementById("dark-light");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const alertBox = document.getElementById("alert-box");
const tagHead = "<span class='little-space' style='background-color: yellow; color: black;'>";
const tagTail = "</span>";

//STATES
let isDark = true;
let searchtext = textarea.innerText;
let checkboxSituations = {
    d : false,
    g : true,
    i : true,
    m : true,
    s : true,
    u : false,
    y : false
}

//LISTENERS
//Text Area Click Listener
textarea.addEventListener('click', function(e) {
    textarea.addEventListener("keydown",(e) => {

        if(e.key === "Tab"){ //eğer basılan tuş tab ise
            e.preventDefault();
        }
    });
});

//Text Area Input Listener
textarea.addEventListener("input",() => {
    searchtext = textarea.innerText;
});

//Checkbox Change Listeners
checkboxes.forEach(element => {
    element.addEventListener("change",(e)=>{
        Object.keys(checkboxSituations).forEach(key => {
            if(key == element.id){
                checkboxSituations[key] = element.checked;
            }
        });
    });
});

//Text Area Copy/Cut Listeners
textarea.addEventListener('copy', function(event) {
    event.preventDefault(); // Varsayılan kopyalama işlemini iptal et
    const selectedText = window.getSelection().toString();
    event.clipboardData.setData('text/plain', selectedText);
  });

textarea.addEventListener('cut', function(event) {
    event.preventDefault();
    let text = textarea.innerText;
    const selectedText = window.getSelection().toString();
    event.clipboardData.setData('text/plain', selectedText);
    textarea.innerHTML = text.substring(0,window.getSelection().anchorOffset) + text.substring(window.getSelection().focusOffset);
});

//Regex Area Input Listener
inputRegexPattern.addEventListener('input', async (e) => {
    removeHighlights();
    let pattern = inputRegexPattern.value;
    try{
        if(pattern == null || pattern == undefined || pattern == ""){
            createAlertMessage("alert-warning","Lütfen bir pattern girin ya da pattern'i değiştirin. <a href='https://www.regular-expressions.info/catastrophic.html' target = '_blank'>Catastrophic Backtracking</a>'e dikkat edin.");
        }/*else if(pattern == ".*"){
            createAlertMessage("alert-success","This pattern selects everything.")
        }*/
        else{
            let previousEndIndex = 0;
            let regex = new RegExp(pattern,getCheckedCheckboxesAsString());
            let startTime = performance.now();
            let matches = [];
            let stopper = 0;
            while(result = regex.exec(searchtext.trim())) { //g flag'ı olduğu için while ile çalıştırmalı!
                stopper++;
                if(stopper > searchtext.trim().length || result[0] == "" || result == undefined){
                    break;
                }
                matches.push({startIndex: result.index, endIndex: result.index + result[0].length, match : result});
            }
            createAlertMessage("alert-success",`${matches.length} eşleşme bulundu.`);
            let editedArray = [];

            if(matches.length > 0){

                matches.map((match) => {
                    editedArray.push(searchtext.substring(previousEndIndex,match.startIndex));
                    editedArray.push(tagHead + match.match[0] + tagTail);
                    previousEndIndex = match.endIndex; //şuanki endIndex bir sonrakinin start'ı olmalı ancak original text'ten çekiyorsun yine! olacak!
                });

                //en son kalan kısmı ekle!
                editedArray.push(searchtext.substring(previousEndIndex));
                textarea.innerText = "";
                textarea.innerHTML = editedArray.join("");
                let endTime = performance.now();
                timeTag.innerText = `${(endTime-startTime).toFixed(2)}ms`;
            }else{
                timeTag.innerText = "No match!";
            }
        }
    }catch(exception){
        createAlertMessage("alert-danger",`<span style = "color: red;">${exception}</span>`);
    }
    
});


//Clear Button Click Listener
  btnClearAll.addEventListener("click",(e)=>{
        let result = confirm("Ekran temizlensin mi?");
        if(result){
            inputRegexPattern.value = "";
            textarea.innerHTML = "";
            timeTag.innerText = "";
        }
  });

//Dark/Light Mode Click Listener
btnDarkLightMode.addEventListener("click",(e)=>{
    let selection;
    if(isDark){
        appbarContainer.classList.add("bg-warning");
        mainHeader.classList.add("text-dark");
        appbarContainer.classList.remove("bg-dark");
        mainHeader.classList.remove("text-warning");
        selection = light_bg;
        timeTag.style.color = 'black';
        isDark = false;
    }else{
        appbarContainer.classList.add("bg-dark");
        mainHeader.classList.add("text-warning");
        appbarContainer.classList.remove("bg-warning");
        mainHeader.classList.remove("text-dark");
        selection = dark_bg;
        timeTag.style.color = 'yellow';
        isDark = true;
    }

    textarea.classList.toggle("bg-dark");
    textarea.classList.toggle("text-white");
    document.body.style.backgroundImage = `url('${selection}')`;
  });

//FUNCTIONS
//Create Alert Message Function
function createAlertMessage(msgType = "alert-warning", message  = ""){
    alertBox.innerHTML = "";
    alertBox.innerHTML = `
    <div class="alert ${msgType} alert-dismissible fade show p-2 ps-4" role="alert" style="position: fixed; right: 1vw; bottom: 5vw;">
        ${message}
        <button type="button" class="close btn btn-close-white" data-bs-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>`;
  }
//Remove Highlights From Text Area Function
/* Not : 
* Uygulamada halihazırda bir WYSIWYG Editor kullanmadığımdan dolayı,
* bu fonksiyon çalıştığında Text Area'da cursor, innerText'in en başına gidiyor.
* Geliştirme yaparken bu durumu göz önünde bulundurun.
*/
function removeHighlights(){
    let txt = "";
    txt = searchtext.replaceAll(tagHead,"");
    txt = txt.replaceAll(tagTail,"");
    textarea.innerText = txt;
}

//Find Checkbox Values Which is True and Return Them as String Function
function getCheckedCheckboxesAsString(){
    let checkedOnes = Object.keys(checkboxSituations).filter((key) => {
        if(checkboxSituations[key] == true){
            return key;
        }
    });
    return checkedOnes.join("");
}

