let textarea = document.getElementById('text-area');
let btnClearAll = document.getElementById("clear-all");
let inputRegexPattern = document.getElementById("regexPattern");
let btnSearch = document.getElementById("btn-search");
let timeTag = document.getElementById("time-tag");
let btnDarkLightMode = document.getElementById("dark-light");
let isDark = true;
let light_bg = '../assets/images/background-light.png';
let dark_bg = '../assets/images/background-dark.png';

textarea.addEventListener('click', function(e) {
    textarea.addEventListener("keydown",(e) => {

        if(e.key === "Tab"){ //eğer basılan tuş tab ise
            e.preventDefault();
        }
    });
});

let tagHead = "<span style='background-color: yellow; color: black;'>";
let tagTail = "</span>";
let searchtext = textarea.innerText;
console.log(`innerText before clicked: ${textarea.innerText}`);
//Şimdilik tıklama ile arıyor değişikliğe göre arama yapma işlemini 500ms bekletme ile yapmalı!
btnSearch.addEventListener('click', async (e) => {
   
    try{
        let previousEndIndex = 0;
        let pattern = inputRegexPattern.value;
        console.log(`innerText after clicked: ${searchtext}`);
        let regex = new RegExp(pattern,"gmi");

        let startTime = performance.now();
        let matches = [];
        while(result = regex.exec(searchtext)) { //g flag'ı olduğu için while ile çalıştırmalı!
            matches.push({startIndex: result.index, endIndex: result.index + result[0].length, match : result});
        }
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
    }catch(exception){
        console.log("*****"+exception);
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
