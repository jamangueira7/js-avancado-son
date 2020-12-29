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
            '                    <td>'+ formatAmount(list[key].amount) +'</td>\n' +
            '                    <td>'+ formatValue(list[key].value) +'</td>\n' +
            '                    <td><button class="btn btn-default" onclick="setUpdate('+ key +')">Edit</button><button class="btn btn-default" onclick="deleteData('+ key +')">Delete</button></td>\n' +
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

function formatAmount (amount) {
    return parseInt(amount);
}

function formatValue (value) {
    var str = parseFloat(value).toFixed(2) + "";
    str = str.replace(".", ",");

    str = "$" + str;

    return str;
}

function addData () {
    if(!validation()){
        return;
    }
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

    document.getElementById("inputIDUpdate").innerHTML = '<input type="hidden" id="idUpdate" value="'+id+'">'
}

function resetForm() {

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";

    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnAdd").style.display = "inline-block";

    document.getElementById("inputIDUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData() {
    if(!validation()){
        return;
    }

    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    list[id] = { "desc": desc, "amount": amount, "value": value }

    resetForm();
    setlist(list);

}

function deleteData (id) {
    if(confirm("Delete this item?")){
        if(id === list.length -1) {
            list.pop();
        } else if (id === 0) {
            list.shift();
        } else {
            var arrAuxInit = list.slice(0, id);
            var arrAuxEnd = list.slice(id + 1);
            list = arrAuxInit.concat(arrAuxEnd);
        }

        setlist(list);
    }
}

function validation() {
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    document.getElementById("errors").style.display = "none";
    var errors = "";

    if (desc === "") {
        errors += '<p>Fill out description</p>';
    }

    if (amount === "") {
        errors += '<p>Fill out quantity</p>';
    } else if (amount != parseInt(amount)) {
        errors += '<p>Fill out a valid amount</p>';
    }

    if (value === "") {
        errors += '<p>Fill out value</p>';
    } else if (value != parseFloat(value)) {
        errors += '<p>Fill out a valid value</p>';
    }

    if(errors != "") {
        document.getElementById("errors").style.display = "block";
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";
        document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
        return 0;
    } else {
        return 1;
    }
}

setlist(list);
