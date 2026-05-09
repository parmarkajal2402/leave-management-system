function login() {

  var form = new FormData();

  form.append("username", document.getElementById("username").value);
  form.append("password", document.getElementById("password").value);

  fetch("server.php?action=login", {
    method: "POST",
    body: form
  })

  .then(function(res) {
    return res.text();
  })

  .then(function(data) {

    if (data.trim() == "success") {

      document.getElementById("loginBox").style.display = "none";
      document.getElementById("app").style.display = "flex";

      loadData();

    } else {

      alert("Wrong Login");

    }

  });

}



/* LOAD TABLE DATA */

function loadData() {

  fetch("server.php?action=read")

  .then(function(res) {
    return res.json();
  })

  .then(function(data) {

    var html = `
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    `;

    for (var i = 0; i < data.length; i++) {

      html += `
        <tr>

          <td>${data[i].name}</td>

          <td>${data[i].type}</td>

          <td>${data[i].status}</td>

          <td class="action-box">

            <button 
              class="approve-btn"
              onclick="updateStatus(${data[i].id}, 'Approved')">
              Approve
            </button>

            <button 
              class="reject-btn"
              onclick="updateStatus(${data[i].id}, 'Rejected')">
              Reject
            </button>

            <button 
              class="delete-btn"
              onclick="removeLeave(${data[i].id})">
              Delete
            </button>

          </td>

        </tr>
      `;
    }

    document.getElementById("table").innerHTML = html;

  });

}



/* ADD LEAVE */

function addLeave() {

  var form = new FormData();

  form.append("name", document.getElementById("name").value);
  form.append("type", document.getElementById("type").value);
  form.append("from", document.getElementById("from").value);
  form.append("to", document.getElementById("to").value);
  form.append("reason", document.getElementById("reason").value);

  fetch("server.php?action=create", {
    method: "POST",
    body: form
  })

  .then(function() {

    document.getElementById("name").value = "";
    document.getElementById("reason").value = "";

    loadData();

  });

}



/* UPDATE STATUS */

function updateStatus(id, status) {

  fetch(
    "server.php?action=update&id=" +
    id +
    "&status=" +
    status
  )

  .then(function() {

    loadData();

  });

}



/* DELETE LEAVE */

function removeLeave(id) {

  var confirmDelete = confirm(
    "Are you sure you want to delete?"
  );

  if (confirmDelete) {

    fetch("server.php?action=delete&id=" + id)

    .then(function() {

      loadData();

    });

  }

}