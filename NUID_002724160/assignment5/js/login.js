function checkUserName(){
    var userName = $("#userName").val();
    var regExName = /^[a-zA-Z1-9]+$/;
    if(userName == ""){
        $("#error_userName").html("<font color='red'>Can not accept blank</font>");
        return false;
    }

    if(userName.length < 6){
        $("#error_userName").html("<font color='red'>The length needs to be greater than 6</font>");
        return false;
    }

    if(!userName.match(regExName)){
        $("#error_userName").html("<font color='red'>it should be combine with letters or numbers.</font>");
        return false;
    }
    
    $("#error_userName").html("<font color='green'>OK</font>");
    return true;
 }

function checkPassword(){
    var password = $("#password").val();
    var regExPw = /^[a-zA-Z1-9]+$/;
    if(password == ""){
        $("#error_password").html("<font color='red'>Can not accept blank</font>");
        return false;
    }

    if(password.length < 8){
        $("#error_password").html("<font color='red'>The length needs to be greater than 8</font>");
        return false;
    }

    if(!password.match(regExPw)){
        $("#error_password").html("<font color='red'>it should be combine with letters or numbers</font>");
        return false;
    }
    
    $("#error_password").html("<font color='green'>OK</font>");
    return true;
}

function doubleCheckPassword(){
    var confrimPassword = $("#confrimPassword").val();
    var password = $("#password").val();

    if(confrimPassword != password){
        $("#error_confrimPassword").html("<font color='red'>Password did not match</font>");
        return false;
    }
    
    $("#error_confrimPassword").html("<font color='green'>OK</font>");
    return true;
}

function checkEmail(){
    var emailId = $("#emailId").val();
    var regExEmail = /([\w\.]+)@northeastern.edu/;
    if(emailId == ""){
        $("#error_emailId").html("<font color='red'>Can not accept blank</font>");
        return false;
    }

    if(emailId.length < 6){
        $("#error_emailId").html("<font color='red'>The length needs to be greater than 8</font>");
        return false;
    }

    if(!emailId.match(regExEmail)){
        $("#error_emailId").html("<font color='red'>It should be end by @northeastern.edu</font>");
        return false;
    }
    
    $("#error_emailId").html("<font color='green'>OK</font>");
    return true;
}

function submitForm(){
    if (checkUserName() && checkPassword() && doubleCheckPassword() && checkEmail()){
        window.location.href="index.html?userName=" + $('#userName').val();;
    }else{
        alert('Make sure you get 4 ok');
    }
}