document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    
    var user = {
        name: name,
        email: email,
        phone: phone
    };
    
    var storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    storedUsers.push(user);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    
    document.getElementById("userForm").reset();
    updateUsersList();
});

function deleteUser(index) {
    var storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    storedUsers.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(storedUsers));
    updateUsersList();
}

function updateUsersList() {
    var userList = document.getElementById("userList");
    userList.innerHTML = "";
    
    var storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    for (var i = 0; i < storedUsers.length; i++) {
        var user = storedUsers[i];
        var listItem = document.createElement("li");
        listItem.textContent = "Name: " + user.name + ", Email: " + user.email + ", Phone: " + user.phone;
        
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", deleteUser.bind(null, i));
        
        listItem.appendChild(deleteButton);
        userList.appendChild(listItem);
    }
}

updateUsersList();
