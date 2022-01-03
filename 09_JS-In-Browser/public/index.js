// XMLHttpRequest - old school

var usersContainer = document.getElementById('users-container')
console.log(usersContainer)
if (usersContainer) {
  fetch('/api/user', {
    headers: {
      'Authorization': 'nasko.it'
    },
    method: 'GET'
  })
    .then(res => res.ok ? res.json() : null)
    .then(users => {
      users.forEach(u => {
        const el = document.createElement('div');
        el.innerHTML = `${u.firstName} ${u.lastName}`;
        usersContainer.appendChild(el);
      })
    });
}

let counter  = 1;
function createNewUser() {
  fetch('/api/user', {
    body: JSON.stringify({ firstName: 'Ivan ' + counter, lastName: 'Ivanov ' + counter }),
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'nasko.it'
    },
    method: 'POST'
  })
    .then(res => res.ok ? res.json() : null)
    .then(res => {
      console.log(res)
      counter++
    });
}

document.getElementById('create-new-user-btn')
.addEventListener('click', createNewUser)
