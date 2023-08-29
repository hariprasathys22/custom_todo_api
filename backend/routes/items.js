const express = require('express')
const router = express.Router();
const data = require("../data.json")


router.get('/', (req, res)=>{
    res.status(200).json(data)
})
router.get('/:id', (req, res)=>{
    let found = data.find((item)=>{
        return item.id === parseInt(req.params.id)
    })
    if(found){
    res.status(200).json(found)
    }
    else{
        res.status(404).json({message: "Not Found"})
    }
})

router.post("/", (req, res)=>{
    let itemIds = data.map((item)=>item.id)
    let orderIds = data.map(item => item.order)
    let newId = itemIds.length>0 ? Math.max.apply(Math, itemIds) + 1:1
    let newOrder = orderIds.length>0? Math.max.apply(Math, orderIds) + 1:1

    let newItem = {
        id: newId,
        title: req.body.title,
        order: newOrder,
        completed: false,
        createdOn: new Date()
    }

    data.push(newItem)

    res.status(201).json(newItem) 
})

router.put("/:id", (req, res)=>{
    let found = data.find((item) =>{
        return item.id === parseInt(req.params.id)
    })

    if(found){
        let updated = {
            id: found.id,
            title: req.body.title,
            order: req.body.order,
            completed: req.body.completed,
        }
        let targetIndex = data.indexOf(found)

        data.splice(targetIndex, 1, updated)
        res.sendStatus(204)

    }
    else{
        res.status(404).json({message: "Not Found"})
    }
})
router.delete("/:id", (req,res)=>{
    let found = data.find((item)=>{
        return item.id === parseInt(req.params.id)
    })

    if(found){
        let targetIndex = data.indexOf(found)
        data.splice(targetIndex, 1)
    }
    res.sendStatus(204)
})

module.exports = router