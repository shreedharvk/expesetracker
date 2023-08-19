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

document.getElementById("saveEditButton").addEventListener("click", function() {
    var editName = document.getElementById("editName").value;
    var editEmail = document.getElementById("editEmail").value;
    var editPhone = document.getElementById("editPhone").value;

    var storedUsers = JSON.parse(localStorage.getItem("users"));
    var indexToEdit = parseInt(document.getElementById("editForm").getAttribute("data-index"));

    storedUsers[indexToEdit].name = editName;
    storedUsers[indexToEdit].email = editEmail;
    storedUsers[indexToEdit].phone = editPhone;

    localStorage.setItem("users", JSON.stringify(storedUsers));
    updateUsersList();
    document.getElementById("editForm").reset();
});

function editUser(index) {
    var storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    var userToEdit = storedUsers[index];

    document.getElementById("editName").value = userToEdit.name;
    document.getElementById("editEmail").value = userToEdit.email;
    document.getElementById("editPhone").value = userToEdit.phone;

    document.getElementById("editForm").setAttribute("data-index", index);
}

function deleteUser(index) {
    var storedUsers = JSON.parse(localStorage.getItem("users"));
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
        listItem.id = "userListItem_" + i;

        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function(index) {
            return function() {
                editUser(index);
            };
        }(i));

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function(index) {
            return function() {
                deleteUser(index);
            };
        }(i));

        listItem.textContent = "Name: " + user.name + ", Email: " + user.email + ", Phone: " + user.phone;
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        userList.appendChild(listItem);
    }
}

updateUsersList();
