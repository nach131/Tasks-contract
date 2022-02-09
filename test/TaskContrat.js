const TasksContract = artifacts.require("TasksContract")

contract("TaskContract", () => {

  before(async () => {
    // cond this paso la funcion al de scoop y asi se pueden usar en otras fuciones
    this.tasksContract = await TasksContract.deployed()
  })


  it("el contrato se realizo", async () => {
    const address = this.tasksContract.address
    // https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
    // https://www.chaijs.com/
    // usuamos la funcion  asser para comparar los datos optenidos
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
    assert.notEqual(address, 0x0)
    assert.notEqual(address, "")
  })

  it("obtener lista de tareas", async () => {
    const contador = await this.tasksContract.tasksCountert()
    const task = await this.tasksContract.tasks(contador)

    assert.equal(task.id.toNumber(), contador)
    assert.equal(task.title, "Titulo de la tarea")
    assert.equal(task.description, "esto esta creado desde el constructor")
    assert.equal(task.done, false)

  })

  it("Tarea creada corectamente", async () => {
    const result = await this.tasksContract.createTask("Titulo Test", "descripcion desde test")
    const taskEvent = result.logs[0].args;

    assert.equal(taskEvent.id.toNumber(), 2)
    assert.equal(taskEvent.title, "Titulo Test")
    assert.equal(taskEvent.description, "descripcion desde test")
  })

  it("ToggleDone funciona", async () => {
    const result = await this.tasksContract.ToggleDone(1)
    const TaskEvent = result.logs[0].args;
    const task = await this.tasksContract.tasks(1)

    assert.equal(task.done, true)
    assert.equal(TaskEvent.done, true)

  })

})