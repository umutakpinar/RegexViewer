let textarea = document.getElementById('text-area');
let btnClearAll = document.getElementById("clear-all");
let inputRegexPattern = document.getElementById("regexPattern");
let btnSearch = document.getElementById("btn-search");
let timeTag = document.getElementById("time-tag");
let btnDarkLightMode = document.getElementById("dark-light");
let isDark = true;
const light_bg = '../assets/images/background-light.png';
const dark_bg = '../assets/images/background-dark.png';
let alertBox = document.getElementById("alert-box");

textarea.addEventListener('click', function(e) {
    textarea.addEventListener("keydown",(e) => {

        if(e.key === "Tab"){ //eğer basılan tuş tab ise
            e.preventDefault();
        }
    });
});


const tagHead = "<span class='little-space' style='background-color: yellow; color: black;'>";
const tagTail = "</span>";
let searchtext = textarea.innerText;
//Şimdilik tıklama ile arıyor değişikliğe göre arama yapma işlemini 500ms bekletme ile yapmalı!
btnSearch.addEventListener('click', async (e) => {
    removeHighlights();
    let pattern = inputRegexPattern.value;
    try{
        if(pattern == null || pattern == undefined || pattern == ".*" || pattern == ""){
            createAlertMessage("alert-warning","Lütfen bir pattern girin ya da pattern'i değiştirin. <a href='https://www.regular-expressions.info/catastrophic.html' target = '_blank'>Catastrophic Backtracking</a>'e dikkat edin.");
        }else{
            let previousEndIndex = 0;
            let regex = new RegExp(pattern,"g");
            let startTime = performance.now();
            let matches = [];
            while(result = regex.exec(searchtext)) { //g flag'ı olduğu için while ile çalıştırmalı!
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

textarea.addEventListener("input",() => {
    searchtext = textarea.innerText;
});

//Copy özellğini düzeltmek için
textarea.addEventListener('copy', function(event) {
    event.preventDefault(); // Varsayılan kopyalama işlemini iptal et
    const selectedText = window.getSelection().toString();
    event.clipboardData.setData('text/plain', selectedText);
  });

//Cut özellğini düzeltmek için
  textarea.addEventListener('cut', function(event) {
    event.preventDefault();
    let text = textarea.innerText;
    const selectedText = window.getSelection().toString();
    event.clipboardData.setData('text/plain', selectedText);
    textarea.innerHTML = text.substring(0,window.getSelection().anchorOffset) + text.substring(window.getSelection().focusOffset);
   //Burada da rematch edilmeli

});

//Ekranı temizleme butonu
  btnClearAll.addEventListener("click",(e)=>{
        let result = confirm("Ekran temizlensin mi?");
        if(result){
            inputRegexPattern.value = "";
            textarea.innerHTML = "";
            timeTag.innerText = "";
        }
  });

  btnDarkLightMode.addEventListener("click",(e)=>{
    let selection;
    if(isDark){
        selection = light_bg;
        timeTag.style.color = 'black';
        isDark = false;
    }else{
        selection = dark_bg;
        timeTag.style.color = 'yellow';
        isDark = true;
    }

    textarea.classList.toggle("bg-dark");
    textarea.classList.toggle("text-white");
    console.log("isdark?: " + isDark);
    document.body.style.backgroundImage = `url('${selection}')`;
  });

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

function removeHighlights(){
    let txt = "";
    txt = searchtext.replaceAll(tagHead,"");
    txt = txt.replaceAll(tagTail,"");
    textarea.innerText = txt;
}