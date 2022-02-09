// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TasksContract {

// se ejecuta la primera vez que se crea un contrato CONSTRUCTOR
  constructor (){
    createTask("Titulo de la tarea","esto esta creado desde el constructor");
  }
  
uint256 public tasksCountert = 0;

// event para decir que datos devuelve en los eventos
    event TaskCreated (
        uint256 id,
        string title,
        string description,
        bool done,
        uint256 createdAt
    );

    event TaskToggleDone(
        uint256 id,
         bool done
    );

// struct para describir los tipos de datos
    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createdAt;
    }

  mapping (uint256 => Task) public tasks;

function createTask(string memory _title, string memory _description) public {
  tasksCountert++;
  tasks[tasksCountert] = Task(tasksCountert, _title, _description, false, block.timestamp);
  emit TaskCreated(tasksCountert, _title, _description, false, block.timestamp);
}

function ToggleDone(uint256 _id) public {
  Task memory _task = tasks[_id];
  _task.done = !_task.done;
  // para guardarlo en el arreglo de tareas
  // arreglo taks[el dato con el ID ] = cambia por el nuevo _task
  tasks[_id]= _task;
  emit TaskToggleDone(_id, _task.done );
}

}