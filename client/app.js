
App = {

  contract: {},

  init: () => {
    console.log("cagando...")
    App.loadEthereum()
    App.loadAccount()
    App.loadContracts()
  },

  loadEthereum: async () => {
    if (window.ethereum) {
      App.web3Provider = window.ethereum
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider)
    }
    else {
      console.log("instala metamask")
    }
  },

  loadAccount: async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    App.account = accounts[0]

  },

  loadContracts: async () => {

    const res = await fetch("TasksContract.json")
    // pasamos res a json
    const tasksContractJSON = await res.json()
    // console.log(tasksContractJSON)
    // El contrato dentro del obj contracts de App
    App.contract.tasksContract = TruffleContract(tasksContractJSON)

    // para conectarse el contrato a la cuenta de MetaMask
    App.contract.tasksContract.setProvider(App.web3Provider)

    // Desplegar el contrato
    App.tasksContract = await App.contract.tasksContract.deployed()
  },

  createTask: async (title, description) => {
    const result = await App.tasksContract.createTask(
      title,
      description, {
      from: App.account
    })
    console.log(result.logs[0].args)
  }


}

App.init()
