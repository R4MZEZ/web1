
function onlyDigits() {
    var separator = this.dataset.separator;
    var replaced = new RegExp('[^\\d\\'+separator+'\\-]', "g");
    var regex = new RegExp('\\'+separator, "g");
    this.value = this.value.replace(replaced, "");

    var minValue = parseFloat(this.dataset.min);
    var maxValue = parseFloat(this.dataset.max);
    var val = parseFloat(separator == "." ? this.value : this.value.replace(new RegExp(separator, "g"), "."));
    if (minValue <= maxValue) {
        if (this.value[0] == "-") {
            if (this.value.length > 8) 
                this.value = this.value.substr(0, 8);
        } else {
            if (this.value.length > 7) 
                this.value = this.value.substr(0, 7); 
        }
        
        if (minValue < 0 && maxValue < 0) {
            if (this.value[0] != "-")
                this.value = "-" + this.value[0];
        } else if (minValue >= 0 && maxValue >= 0) {
            if (this.value[0] == "-") 
                this.value = this.value.substr(0, 0);
        }
            
        if (val < minValue || val > maxValue)
            this.value = this.value.substr(0, 0);
        
        if (this.value.match(regex)) 
            if (this.value.match(regex).length > 1) 
                this.value = this.value.substr(0, 0);
        
        if (this.value.match(/\-/g)) 
            if (this.value.match(/\-/g).length > 1) 
                this.value = this.value.substr(0, 0);
    }
}


function createRow(row){
    if (localStorage.length == 0){
        historyTable.innerHtml += "<tr><th>Координата Х</th>" +
                                    "<th>Координата Y</th>" +
                                    "<th>Параметр R</th>" +
                                    "<th>Отправка</th>" +
                                    "<th>Исполнение</th>" +
                                    "<th>Результат</th></tr>"
    }
    alert("РА СИ Я");
    alert(historyTable.innerHtml);
}

function startPHP(){
    var x = inputX.value;
    var y = inputY.value;
    var r = radio1.checked ? 1 :
            radio2.checked ? 2 :
            radio3.checked ? 3 :
            radio4.checked ? 4 :
            radio5.checked ? 5 : "";
    if (x=="" || y=="" || r==""){
        alert("Заполните все поля");
    } else{
        $.ajax({
			type: "GET",
			url: "scripts/input.php",
			data: {
				"x": x,
				"y": y,
				"r": r,
				"time": (new Date()).getTimezoneOffset()
			},
			success: createRow,
			dataType: "json"
		});
    }
}



document.querySelector("#inputX").onkeyup = onlyDigits;
document.querySelector("#inputY").onkeyup = onlyDigits;

document.querySelector("#submit-button").onclick = startPHP;