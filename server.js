const express = require("express")
const { User, Animal, Service } = require("./models")

const app = express()
app.use(express.json())

const port = 3333

app.use("/home", express.static('./index.html'))
app.use("/index.css", express.static('./index.css'))
app.use("/script.js", express.static('./script.js'))

app.use("/animals", express.static('./animals.html'))
app.use("/animals.css", express.static('./animals.css' ))
app.use("/scriptAnimal.js", express.static('./scriptAnimal.js'))

app.use("/services", express.static('./services.html'))
app.use("/service.css", express.static('./service.css'))
app.use("/scriptService.js", express.static('./scriptService.js'))

app.use("/calls", express.static('./calls.html'))
app.use("/calls.css", express.static('./calls.css'))
app.use("/scriptCall.js", express.static('./scriptCall.js'))

/* register users */
app.get('/api/user', async (request, response) => {
    const users = await User.findAll()

    response.json(users)
})
app.post('/api/user', async (request, response) => {
    const newUser = {
        name: request.body.name,
        birth_date: request.body.birth_date,
        email: request.body.email,
        cpf: request.body.cpf,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const user =  await User.create(newUser)

    response.json(user)
})

app.delete("/api/user/:id", function (request, response) {
    if(!request.params.id){
        request.status(400).send({ message: "É necessário um id para deletar um usuário!"})
        return
    }

    User.destroy({where: {id: request.params.id}}).then((data)=>{
        response.send({ deleteUsersCount:data})
    })
    .catch((err)=>{
        response.status(500).send({ message: err.message || "Ocorreu um erro ao tentar deletar esse usuário" })
    })
})

/* register animals */
app.get('/api/animals', async (request, response) => {
    const animals = await Animal.findAll()

    response.json(animals)
})
app.post('/api/animals',async (request, response) => {
    const newAnimal = {
        name: request.body.name,
        breed:request.body.breed,
        age: request.body.age,
        weight: request.body.weight,
        owner_name: request.body.owner_name,
        is_vacinated: request.body.is_vacinated,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const animal =  await Animal.create(newAnimal)

    response.json(animal)
})

app.delete("/api/animals/:id", function (request, response) {
    if(!request.params.id){
        request.status(400).send({ message: "É necessário um id para deletar um animal!"})
        return
    }

    Animal.destroy({where: {id: request.params.id}}).then((data)=>{
        response.send({ deleteAnimalsCount:data})
    })
    .catch((err)=>{
        response.status(500).send({ message: err.message || "Ocorreu um erro ao tentar deletar esse animal" })
    })
})

/* register Service */
app.get('/api/service',async (request, response) => {
    const service = await Service.findAll()
    response.json(service)
})
app.post('/api/service',async (request, response) => {
    const newService = {
        service_name: request.body.service_name,
        price: request.body.price,
        duration: request.body.duration,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const service =  await Service.create(newService)
    response.json(newService)
})

app.delete("/api/service/:id", function (request, response) {
    if(!request.params.id){
        request.status(400).send({ message: "É necessário um id para deletar esse serviço!"})
        return
    }

    Service.destroy({where: {id: request.params.id}}).then((data)=>{
        response.send({ deleteServiceCount:data})
    })
    .catch((err)=>{
        response.status(500).send({ message: err.message || "Ocorreu um erro ao tentar deletar esse serviço" })
    })
})

/* register Call */

app.get('/api/call', (request, response) => {
    response.json(call)
})
app.post('/api/call', (request, response) => {
    const newCall = {
        id: call.length + 1,
        service_type: request.body.service_type,
        animal: request.body.animal,
        scheduled_date: request.body.scheduled_date,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    call.push(newCall)
    response.json(newCall)
})

app.listen(port, () => {
    console.log(`Servidor está rodando em
     http://localhost:${port}`)
})
