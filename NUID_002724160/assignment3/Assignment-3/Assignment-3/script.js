//Title constructor function that creates a Title object
function Title(t1) 
{ this.mytitle = t1;
}

Title.prototype.getName = function () 
{ 
return (this.mytitle);
}

var socialMedia = {
  facebook : 'http://facebook.com',
  twitter: 'http://twitter.com',
  flickr: 'http://flickr.com',
  youtube: 'http://youtube.com'
};

var t = new Title("CONNECT WITH ME!");

/**
 *  My code
 **/
// count the number of row, initial is 3.
var count = 3;
var boxChecked = 0;

/**
 * Add new row to table
 */ 
function addNewRow(){
  // table tag
  var table = document.getElementById("myTable");
  // find tbody tag.
  var tbodyRef = document.getElementsByTagName("tbody")[0];
  // find student 3.
  var trRef = table.lastElementChild.lastElementChild.previousElementSibling?.firstElementChild?.nextElementSibling?.innerHTML || "Student 0";
  // split to get number
  var lastestIndex = trRef.split(" ")[1];

  // create tr for table.
  var tdNode = document.createElement("tr");
  // create td inside tr.
  var trCheckBoxCell = document.createElement("td");
  trCheckBoxCell.innerHTML = 
    '<input type="checkbox" onclick="onCheckboxClick(this)"/><br /><br /><img id="forDetail" src="down.png" width="25px" onclick="dropDown(this)"/>';
  var trStudentCell = document.createElement("td");
  trStudentCell.innerHTML = "Student " + (parseInt(lastestIndex) + 1);
  var trAdvisor = document.createElement("td");
  trAdvisor.innerHTML="Teacher " + (parseInt(lastestIndex) + 1);
  var trAwardStatus = document.createElement("td");
  trAwardStatus.innerHTML = "Approved";
  var trSemester = document.createElement("td");
  trSemester.innerHTML = "Fall";
  var trType = document.createElement("td");
  trType.innerHTML = "TA";
  var trBudgetNum = document.createElement("td");
  trBudgetNum.innerHTML = "11111";
  var trPercentage = document.createElement("td");
  trPercentage.innerHTML = "100%";

  // create tr for table.
  var trDetail = document.createElement("tr");
  trDetail.setAttribute("class","dropDownTextArea");
  trDetail.innerHTML = 
    '<td colspan="8">' +
    'Advisor:<br /><br />' +
    'Award Details<br />' +
    'Summer 1-2014(TA)<br />' +
    'Budget Number: <br />' +
    'Tuition Number: <br />' +
    'Comments:<br /><br /><br />' +
    'Award Status:<br /><br /><br />' +
  '</td>';

  var f = confirm("Are you sure you want to add a row?");
  if (f == true){
    // append into first tr.
    tdNode.appendChild(trCheckBoxCell);
    tdNode.appendChild(trStudentCell);
    tdNode.appendChild(trAdvisor);
    tdNode.appendChild(trAwardStatus);
    tdNode.appendChild(trSemester);
    tdNode.appendChild(trType);
    tdNode.appendChild(trBudgetNum);
    tdNode.appendChild(trPercentage);

    // append into table
    tbodyRef.appendChild(tdNode);
    tbodyRef.appendChild(trDetail);
    count++;
    var newTrRef = document.getElementById("myTable").lastElementChild.lastElementChild.previousElementSibling?.firstElementChild?.nextElementSibling?.innerHTML;
    alert('Add \"' + newTrRef + '\" successful.');
  } else {
    alert('Failed to add \"' + newTrRef + '\".');
  }
}

/**
 * Checkbox event
 * @param {*} checkbox 
 */
function onCheckboxClick(checkbox){
  var rowSelect = checkbox.parentElement.parentElement;

  if (checkbox.checked == true){
    rowSelect.style.backgroundColor = "yellow";

    boxChecked++; 
    //delete button
    var deleteButton = document.createElement("td");
    deleteButton.setAttribute("id","deleteTd");
    deleteButton.innerHTML = 
    '<button id="delete" type="button" onclick="deleteThisRow(this)">Delete</button>';
    
    //edit button
    var editButton = document.createElement("td");
    editButton.setAttribute("id","editTd");
    editButton.innerHTML = 
    '<button id="edit" type="button" onclick="editRow(this)">Edit</button>';
    rowSelect.appendChild(deleteButton);
    rowSelect.appendChild(editButton);
  } else {
    rowSelect.style.backgroundColor = "#fff";
    boxChecked--;
    rowSelect.deleteCell(9);
    rowSelect.deleteCell(8);
  }

  verifyCheckbox();
}

/**
 * Delete row
 * @param {*} rowObject 
 */
function deleteThisRow(rowObject){
  var info = rowObject.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
  var tr = rowObject.parentElement.parentElement;
  var tr2 = tr.nextElementSibling;
  var f = confirm("Are you sure you want to delete a row?");
  if (f == true){
    document.getElementById("myTable").deleteRow(tr2.rowIndex)
    document.getElementById("myTable").deleteRow(tr.rowIndex)
    boxChecked--;
    verifyCheckbox();
    count--;
    alert('Deleted \"' + info + '\" successfully!');
  }
  
}

/**
 * Work for submit button
 */
function verifyCheckbox(){
  var submitButton = document.getElementById("button");
  var deleteButtonTh = document.getElementById("delete");
  var editButtonTh = document.getElementById("edit");
  if (boxChecked != 0){
    submitButton.setAttribute("disable","false");
    submitButton.style.backgroundColor = "orange";
    editButtonTh.style.display = "table-cell";
    deleteButtonTh.style.display = "table-cell";
  }
  else{
    submitButton.setAttribute("disable","true");
    submitButton.style.backgroundColor = "gray";
    editButtonTh.style.display = "none";
    deleteButtonTh.style.display = "none";
  }
}

/**
 * Edit row
 * @param {*} rowObject 
 */
function editRow(rowObject){
  var info = rowObject.parentElement.parentElement.firstElementChild.nextElementSibling.innerHTML;
  // alert("Edit the details for " + '\"' + info +'\"');
  prompt("Edit the details");
}

/**
 * Click image for dropdown, for the detail info
 * @param {*} imag 
 */
function dropDown(imag){
  var dropDownbox = imag.parentElement.parentElement.nextElementSibling;
  if (!dropDownbox.style.display || dropDownbox.style.display=="none"){
    dropDownbox.style.display = "contents";
    imag.src = "up.png";
  }else{
    dropDownbox.style.display = "none";
    imag.src = "down.png";
  }
}