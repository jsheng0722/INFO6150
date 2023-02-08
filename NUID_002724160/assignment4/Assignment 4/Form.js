var form = document.getElementById("myForm");
form.addEventListener("submit",submitted);

var validTitle = false;
var validFirstname = false;
var validLastname = false;
var validEmail = false;
var validPhone = false;
var validS1 = false;
var validCity = false;
var validState = false;
var validZipcode = false;
var validReferral = false;
var validDrink = false;
var validAddcomments = false;
var validComments = false;

// var regExNoBlank = /^[\s\S]*.*[^\s][\s\S]*$/;
var regExName = /^[a-zA-Z]+$/;
var regExEmail = /([\w\.]+)@northeastern.edu/;
var regExPhone = /\d{3}-?\d{3}-\d{4}$/;
var regExZipcode = /^\d{5}$/;

var title = document.getElementsByName("title");
var title_val = "";
title.forEach(t => {
    t.addEventListener("input",getVal);
})

var firstName = document.getElementById("firstName");
firstName.addEventListener("input", validate);

var lastName = document.getElementById("lastName");
lastName.addEventListener("input", validate);

var emailId = document.getElementById("emailId");
emailId.addEventListener("input", validate);

var phoneNumber = document.getElementById("phoneNumber");
phoneNumber.addEventListener("input", validate);

var streetAddress1 = document.getElementById("streetAddress1");
streetAddress1.addEventListener("input", validate);

var streetAddress2 = document.getElementById("streetAddress2");

var city = document.getElementById("city");
city.addEventListener("input",validate);

var state = document.getElementById("state");
state.addEventListener("input",validate);

var zipcode = document.getElementById("zipcode");
zipcode.addEventListener("input", validate);

var source = document.getElementsByName("source");

var listbox = document.getElementById("listbox");
listbox.addEventListener("input",getOption);
var drink = "";
var size = "";
var additionalC = "";

var comments = document.getElementById("comments");
comments.addEventListener("input",validate);

function getVal(e){
    var value = e.target.value;
    if(value != undefined){
        title_val = value;
        validTitle = true;
    }
}

function getOption(e){
    var value = e.target.value;
    if (value != "0"){
        drink = value;
    } else{
        drink = "0";
    }

    if (drink == "0"){
        document.getElementById("error_drink").style.display = "block";
        this.style.border = "2px solid red";
        validDrink = false;
    } else{
        document.getElementById("error_drink").style.display = "none";
        this.style.border = "";
        validDrink = true;
        validAddcomments = true;
        additionalC = "N/A";
        size = "Regular";
    }
    console.log("validDrink",validDrink);
}

function validate(e){
    var value = e.target.value;
    var type = this.id;
    var em = "error_" + type;

    switch(type){
        case "firstName":
            if(!value.trim().match(regExName)){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validFirstname = false;
            } else{
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validFirstname = true;
            }
            console.log("validFirstname", validFirstname)
            break;
        case "lastName":
            if(!value.trim().match(regExName)){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validLastname = false;
            } else{
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validLastname = true;
            }
            console.log("validLastname", validLastname)
            break;
        case "emailId":
            if(!value.trim().match(regExEmail)){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validEmail = false;
            } else{
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validEmail = true;
            }
            console.log("validEmail", validEmail)
            break;
        case "phoneNumber":
            if(!value.trim().match(regExPhone)){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validPhone = false;
            } else{
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validPhone = true;
            }
            console.log("validPhone", validPhone)
            break;
        case "zipcode":
            if(!value.trim().match(regExZipcode)){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validZipcode = false;
            } else{
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validZipcode = true;
            }
            console.log("validZipcode", validZipcode)
            break;
        case "streetAddress1":
            if(value==""){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validS1 = false;
            } else{
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validS1 = true;
            }
            console.log("validS1",validS1);
            break;
        case "city":
            if(value==""){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validCity = false;
            } else{
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validCity = true;
            }
            console.log("validCity",validCity);
            break;
        case "state":
            if(value==""){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validState = false;
            } else{
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validState = true;
            }
            console.log("validState",validState);
            break;
        case "comments":
            if(value==""){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                validComments = false;
            } else{
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                validComments = true;
            }
            console.log("validComments",validComments);
            break;
    }
}

function listboxSelect(box){
    var index = box.selectedIndex;
    var val = box.options[index].value;
    var text = box.options[index].text;
    if (val != 0){
        var d = document.getElementById("listbox_choice");
        d.innerHTML = "<hr>" + "<label for='size'>" + text + "- Large<br>($1 extra)</label>" + "<input type='checkbox' name='size' value='Large' required= 'required' onclick='addAdditional(this);'/> <br><br><br>";
        var divbox = document.createElement("div");
        divbox.style.display = "none";
        divbox.innerHTML = "<label for='additionalText'>Any additional customisations*:</label>"
            + "<textarea name='addtext' id='addcomments' placeholder='Your Customisations, write N/A if none' rows='2' cols='25' required='required'></textarea>" +
            "<div id='error_addcomments' style='display: none; color: red;'>" +
                "Not allowing blank, Please enter valid additional costomisations." + 
                "<br><br>" +
            "</div>";
        d.appendChild(divbox);
        d.style.display = "block";
    } else{
        document.getElementById("listbox_choice").style.display = "none";
    }
}

function cleanForm(){
    validTitle = false;
    validFirstname = false;
    validLastname = false;
    validEmail = false;
    validPhone = false;
    validS1 = false;
    validCity = false;
    validState = false;
    validZipcode = false;
    validReferral = false;
    validDrink = false;
    validAddcomments = false;
    validComments = false;
    document.getElementById("listbox_choice").style.display = "none";
    document.getElementById("myForm").reset();
}

function checkReferral(){
    var sourseList = [];
    for(var i=0;i<source.length;i++){
        if(source[i].checked){
            sourseList.push(source[i].value);
        }
    }
    if(sourseList.length!=0){
        validReferral = true;
    } else{
        validReferral = false;
    }
    return sourseList.toString();
}

function submitted(e){
    e.preventDefault();
    var source_vals = checkReferral();

    if(validTitle && validFirstname && validLastname && validEmail && validPhone && validS1 && validCity && validState && validZipcode && validReferral && validDrink && validAddcomments && validComments){
        alert("Data entered successful");
        addtoTable(title_val,firstName.value,lastName.value,emailId.value,phoneNumber.value,streetAddress1.value,streetAddress2.value,city.value,state.value,zipcode.value,source_vals,drink,size,additionalC,comments.value);
        cleanForm();
    } else{
        alert("Please enter valid details");
    }
}

function addAdditional(e){
    var d = document.getElementById("listbox_choice").lastChild;
    if(e.checked == true){
        size = e.value;
        d.style.display = "block";
        validAddcomments = false;
    } else{
        size = "Regular";
        d.style.display = "none";
        validAddcomments = true;
    }
    checkAddComments();
}

function checkAddComments(){
    if (size!="Regular"){
        var addcomments = document.getElementById("addcomments");
        addcomments.addEventListener("input",(e)=>{
            var value = e.target.value;
            if(value==""){
                document.getElementById("error_addcomments").style.display = "block";
                document.getElementById("error_addcomments").style.border = "2px solid red";
                validAddcomments = false;
            } else{
                document.getElementById("error_addcomments").style.display = "none";
                document.getElementById("error_addcomments").style.border = "";
                validAddcomments = true;
                additionalC = value;
            }
            console.log("validAddcomments",validAddcomments);
        })
    } else{
        additionalC = "N/A";
    }
}

function addtoTable(title,fn,ln,eid,phone,s1,s2,city,state,zc,ref,drink,size,add,comment){
    var table = document.getElementById("myTable");
    var newTr = document.createElement("tr");
    var newtitleTd = document.createElement("td");
    newtitleTd.innerHTML = title;
    var newfnTd = document.createElement("td");
    newfnTd.innerHTML = fn;
    var newlnTd = document.createElement("td");
    newlnTd.innerHTML = ln;
    var neweidTd = document.createElement("td");
    neweidTd.innerHTML = eid;
    var newphoneTd = document.createElement("td");
    newphoneTd.innerHTML = phone;
    var news1Td = document.createElement("td");
    news1Td.innerHTML = s1;
    var news2Td = document.createElement("td");
    news2Td.innerHTML = s2;
    var newcityTd = document.createElement("td");
    newcityTd.innerHTML = city;
    var newstateTd = document.createElement("td");
    newstateTd.innerHTML = state;
    var newzcTd = document.createElement("td");
    newzcTd.innerHTML = zc;
    var newrefTd = document.createElement("td");
    newrefTd.innerHTML = ref;
    var newdrinkTd = document.createElement("td");
    newdrinkTd.innerHTML = drink;
    var newsizeTd = document.createElement("td");
    newsizeTd.innerHTML = size;
    var newaddTd = document.createElement("td");
    newaddTd.innerHTML = add;
    var newcommentTd = document.createElement("td");
    newcommentTd.innerHTML = comment;

    newTr.appendChild(newtitleTd);
    newTr.appendChild(newfnTd);
    newTr.appendChild(newlnTd);
    newTr.appendChild(neweidTd);
    newTr.appendChild(newphoneTd);
    newTr.appendChild(news1Td);
    newTr.appendChild(news2Td);
    newTr.appendChild(newcityTd);
    newTr.appendChild(newstateTd);
    newTr.appendChild(newzcTd);
    newTr.appendChild(newrefTd);
    newTr.appendChild(newdrinkTd);
    newTr.appendChild(newsizeTd);
    newTr.appendChild(newaddTd);
    newTr.appendChild(newcommentTd);
    table.appendChild(newTr);
}