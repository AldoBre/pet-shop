async function getUserList() {
  console.log('getUserList')
  const response = await fetch('http://localhost:3333/api/user')
  const data = await response.json()
  
  const users = document.querySelectorAll('tr > td')

  users.forEach(td => {
    const tr = td.parentNode
    tr.remove()
  })

  const userListContainer = document.getElementById('user-list-container')

  data.forEach(user => {
      const newUserTr = document.createElement('tr')
      
      newUserTr.id = user.id
      newUserTr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.birth_date}</td>
        <td>${user.email}</td>
        <td>${user.cpf}</td>
        <td class="register-actions">
          <button 
          class="delete-buton"
          type="button"
          onclick="deleteUser(${user.id})">
          Excluir
          </button>
        </td>
      `

      userListContainer.appendChild(newUserTr)
  })
}

getUserList()

const createUserButton = document.getElementById('create-user-button')

createUserButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const name = document.querySelector('input[name="name"]').value
    const birth_date = document.querySelector('input[name="birth_date"]').value
    const email = document.querySelector('input[name="email"]').value
    const cpf = document.querySelector('input[name="cpf"]').value

    await fetch('http://localhost:3333/api/user', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            name,
            birth_date,
            email,
            cpf,
        })
    })

    await getUserList()
})

async function deleteUser(userId){
  const deleteResult = await fetch(`http://localhost:3333/api/user/${userId}`,{
    method: 'DELETE',
  })

  const deleteResultJson = await deleteResult.json()

  if(deleteResultJson.deleteUserCount < 1){
    console.error("Nenhum usuário foi deletado")
    return
  }

  const userToBeDeleted = document.getElementById(`user-id-${userId}`)
  userToBeDeleted.remove()

  return deleteResultJson
}