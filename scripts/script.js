function onlyDigits() {
    var separator = this.dataset.separator;
    var replaced = new RegExp('[^\\d\\' + separator + '\\-]', "g");
    var regex = new RegExp('\\' + separator, "g");
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

function reset() {
    localStorage.clear();
    historyTable.innerHTML = "";
}

function onAnswer(res) {
    let json = JSON.stringify(res);
    createRow(json);
}

function loadTable() {
    if (localStorage.length > 1)
        for (let i = 0; i < localStorage.length; i++) {
            createRow(localStorage.getItem(i))
        }
}

function createRow(row) {
    let data = JSON.parse(row);

    if (($('#historyTable').is(':empty'))) {
        historyTable.innerHTML = "<tr><th>Точка</th>" +
            "<th>Параметр R</th>" +
            "<th>Отправка</th>" +
            "<th>Исполнение</th>" +
            "<th>Результат</th></tr>"
    }

    let result;
    result = "<tr class='historyTd'>";
    try {
        result += `<td class='historyElem'> (${data.x}, ${data.y}) </td>`;
    }catch (TypeError){
        alert(row);
    }

    result += `<td class='historyElem'> ${data.r} </td>`;
    result += `<td class='historyElem'> ${data.currentTime} </td>`;
    result += `<td class='historyElem'> ${(parseFloat(data.scriptTime) * 1000).toFixed(2)} ms</td>`;
    result += `<td class='historyElem'> ${data.hit} </td>`;
    result += "</tr>";

    historyTable.innerHTML = historyTable.innerHTML + result;
    localStorage.setItem(localStorage.length, row);
}

function startPHP() {
    var x = inputX.value;
    var y = inputY.value;
    var r = radio1.checked ? 1 :
        radio2.checked ? 2 :
            radio3.checked ? 3 :
                radio4.checked ? 4 :
                    radio5.checked ? 5 : "";
    if (x === "" || y === "" || r === "") {
        alert("Заполните все поля");
    } else {
        $.ajax({
            type: "GET",
            url: "scripts/input.php",
            data: {
                "x": x,
                "y": y,
                "r": r,
                "time": (new Date()).getTimezoneOffset()
            },
            success: onAnswer,
            dataType: "json"
        });
    }
}


document.querySelector("#inputX").oninput = onlyDigits;
document.querySelector("#inputY").oninput = onlyDigits;

document.querySelector("#submit-button").onclick = startPHP;
document.querySelector("#reset-button").onclick = reset;

loadTable();