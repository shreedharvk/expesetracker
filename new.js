// new.js
document.getElementById("expenseForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var amount = document.getElementById("amount").value;
    var description = document.getElementById("description").value;
    var category = document.getElementById("category").value;
    
    var expense = {
        amount: amount,
        description: description,
        category: category
    };
    
    var storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    storedExpenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(storedExpenses));
    
    document.getElementById("expenseForm").reset();
    updateExpenseList();
});

function editExpense(index) {
    var storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    var expenseToEdit = storedExpenses[index];

    document.getElementById("amount").value = expenseToEdit.amount;
    document.getElementById("description").value = expenseToEdit.description;
    document.getElementById("category").value = expenseToEdit.category;

    document.getElementById("expenseForm").setAttribute("data-index", index);
}

function deleteExpense(index) {
    var storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    storedExpenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(storedExpenses));
    updateExpenseList();
}

function updateExpenseList() {
    var expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    var storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    for (var i = 0; i < storedExpenses.length; i++) {
        var expense = storedExpenses[i];
        var listItem = document.createElement("li");
        listItem.id = "expenseListItem_" + i;

        var editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.setAttribute("data-index", i);
        editButton.classList.add("editButton");

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-index", i);
        deleteButton.classList.add("deleteButton");

        listItem.textContent = "Amount: " + expense.amount + ", Description: " + expense.description + ", Category: " + expense.category;
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
        expenseList.appendChild(listItem);
    }
}

document.getElementById("expenseList").addEventListener("click", function(event) {
    var target = event.target;

    if (target.tagName === "BUTTON") {
        var index = parseInt(target.getAttribute("data-index"));

        if (target.classList.contains("editButton")) {
            editExpense(index);
        } else if (target.classList.contains("deleteButton")) {
            deleteExpense(index);
        }
    }
});

updateExpenseList();
