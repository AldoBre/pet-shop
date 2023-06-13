async function getAnimalsList() {
  console.log('geAnimalsList')
  const response = await fetch('http://localhost:3333/api/animals')
  const data = await response.json()
  
  const animals = document.querySelectorAll('tr > td')

  animals.forEach(td => {
    const tr = td.parentNode
    tr.remove()
  })

  const animalsListContainer = document.getElementById('animals-list-container')

  data.forEach(animals => {
      const newAnimalsTr = document.createElement('tr')
      
      newAnimalsTr.id = animals.id
      newAnimalsTr.innerHTML = `
        <td>${animals.name}</td>
        <td>${animals.breed}</td>
        <td>${animals.age}</td>
        <td>${animals.weight}</td>
        <td>${animals.owner_name}</td>
        <td>${animals.is_vacinated}</td>
        <td class="register-actions">
          <button 
          class="delete-buton"
          type="button"
          onclick="deleteAnimal(${animals.id})">
          Excluir
          </button>
        </td>
      `

      animalsListContainer.appendChild(newAnimalsTr)
  })
}

getAnimalsList()

const createAnimalButton = document.getElementById('create-animal-button')

createAnimalButton.addEventListener('click', async (event) => {
  event.preventDefault()

  const name = document.querySelector('input[name="name"]').value
  const breed = document.querySelector('input[name="breed"]').value
  const age = document.querySelector('input[name="age"]').value
  const weight = document.querySelector('input[name="weight"]').value
  const owner_name = document.querySelector('input[name="owner_name"]').value
  const is_vacinated = document.querySelector('input[name="is_vacinated"]').value

  await fetch('http://localhost:3333/api/animals', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
          name,
          breed,
          age,
          weight,
          owner_name,
          is_vacinated
      })
  })

  await getAnimalsList()
})

async function deleteAnimal(animalId){
  const deleteResult = await fetch(`http://localhost:3333/api/animals/${animalId}`,{
    method: 'DELETE',
  })

  const deleteResultJson = await deleteResult.json()

  if(deleteResultJson.deleteAnimalCount < 1){
    console.error("Nenhum animal foi deletado")
    return
  }

  const animalToBeDeleted = document.getElementById(`animal-id-${animalId}`)
  animalToBeDeleted.remove()

  return deleteResultJson
}