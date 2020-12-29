var list = [
    {"desc": "rice", "amount": "1", "value": "5.40"},
    {"desc": "beer", "amount": "12", "value": "1.99"},
    {"desc": "meat", "amount": "1", "value": "15.00"}
];

function gettotal(list) {
    var total = 0;

    for (var key in list) {
        total += list[key].value * list[key].amount;
    }

    return total;
}

function setlist(list) {
    var table = '<thead>\n' +
        '                <tr>\n' +
        '                    <td>Description</td>\n' +
        '                    <td>Amount</td>\n' +
        '                    <td>Value</td>\n' +
        '                    <td>Action</td>\n' +
        '                </tr>\n' +
        '            </thead>\n' +
        '            <tbody>';

    for (var key in list) {
        table += '<tr>\n' +
            '                    <td>'+ formatDesc(list[key].desc) +'</td>\n' +
            '                    <td>'+ list[key].amount +'</td>\n' +
            '                    <td>'+ formatValue(list[key].value) +'</td>\n' +
            '                    <td><button class="btn btn-default" onclick="setUpdate('+ key +')">Edit</button><button class="btn btn-default" onclick="resetForm('+ key +')">Delete</button></td>\n' +
            '                </tr>';
    }

    table += '</tbody>';
    document.getElementById("listTable").innerHTML = table;
}

function formatDesc (desc) {
    var str = desc.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
}

function formatValue (value) {
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".", ",");

    str = "$" + str;

    return str;
}

function addData () {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list.unshift({ "desc": desc, "amount": amount, "value": value });

    setlist(list);
}

function setUpdate(id) {
    var obj = list[id];

    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;


    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
}

function resetForm() {

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";


    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";
}

setlist(list);
