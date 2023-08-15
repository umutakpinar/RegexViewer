let textarea = document.getElementById('text-area');
let btnClearAll = document.getElementById("clear-all");
let inputRegexPattern = document.getElementById("regexPattern");
let btnSearch = document.getElementById("btn-search");

textarea.addEventListener('click', function(e) {
    textarea.addEventListener("keydown",(e) => {

        if(e.key === "Tab"){ //eğer basılan tuş tab ise
            e.preventDefault();
        }
    });
});

let tagHead = "<span style='background-color: red;'>";
let tagTail = "</span>";
let searchtext = textarea.innerText;
console.log(`innerText before clicked: ${textarea.innerText}`);
//Şimdilik tıklama ile arıyor değişikliğe göre arama yapma işlemini 500ms bekletme ile yapmalı!
btnSearch.addEventListener('click',(e) => {
   
    try{
        let previousEndIndex = 0;
        let pattern = inputRegexPattern.value;
        console.log(`innerText after clicked: ${searchtext}`);
        let regex = new RegExp(pattern,"gmi");

        let matches = [];
        while(result = regex.exec(searchtext)) { //g flag'ı olduğu için while ile çalıştırmalı!
            matches.push({startIndex: result.index, endIndex: result.index + result[0].length, match : result});
        }
        let editedArray = [];

        if(matches.length > 0){

            matches.map((match) => {
                editedArray.push(searchtext.substring(previousEndIndex,match.startIndex));
                editedArray.push(tagHead + match.match + tagTail);
                previousEndIndex = match.endIndex; //şuanki endIndex bir sonrakinin start'ı olmalı ancak original text'ten çekiyorsun yine! olacak!
            });

            //en son kalan kısmı ekle!
            editedArray.push(searchtext.substring(previousEndIndex));
            textarea.innerText = "";
            //array elemanlarını birleştirip textareaya eşitleme işlemi/ 
            console.log("EditedArray : ")
            editedArray.map((value,index) => {
                console.log(`${index} : ${value}`);
            });
            textarea.innerHTML = editedArray.join("");
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
        }
  });
