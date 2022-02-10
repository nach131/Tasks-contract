const taskForm = document.querySelector("#taskForm")

// cuando carge addEventListener y pase el elemento DOMConteLoader carga la funcion de incio  App.init
document.addEventListener('DOMContentLoaded', () => {
  // Esta funcion es la ejecucion de todas las funciones de la blockchain
  App.init()
})

taskForm.addEventListener("submit", e => {
  e.preventDefault()

  // console.log(
  //   taskForm["title"].value,
  //   taskForm["description"].value,
  // )

  App.createTask(
    taskForm["title"].value,
    taskForm["description"].value,
  )
})