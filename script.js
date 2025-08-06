const apiUrl = "https://script.google.com/macros/s/AKfycbyXNNtGp90HvbDqd3WMpeV_xCRpIzcSpXhiMUiIN5dBbRmswXvNzJLdZCR-3rSZnJka/exec";

document.getElementById("dataForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = e.target;
  const action = e.submitter.dataset.action;
  const data = {
    CRUD: action,
    ID: form.id.value.trim(),
    NAMA: form.nama.value.trim(),
    EKSKUL: form.ekskul.value.trim(),
    STATUS: form.status.value.trim(),
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(response => {
      alert(response.message || response.status);
      if (action === "READ" && response.data) {
        form.nama.value = response.data.NAMA || '';
        form.ekskul.value = response.data.EKSKUL || '';
        form.status.value = response.data.STATUS || '';
      }
      if (["CREATE", "UPDATE", "DELETE"].includes(action)) {
        loadTable(); // Refresh table
        form.reset();
      }
    })
    .catch(err => alert("Terjadi kesalahan: " + err));
});

function loadTable() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(json => {
      const tbody = document.querySelector("#dataTable tbody");
      tbody.innerHTML = "";

      json.data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${row.ID}</td>
          <td>${row.NAMA}</td>
          <td>${row.EKSKUL}</td>
          <td>${row.STATUS}</td>
        `;
        tbody.appendChild(tr);
      });
    });
}

window.onload = loadTable;

