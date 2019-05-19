const express = require('express');
const router = express.Router();
const uuid = require("uuid")
const members = require('../../Members')

//Gets all Members
router.get('/', (req, res)=>{
    res.json(members)
});

//Get single memeber
router.get('/:id', (req, res)=>{
    const found = members.some(member=> member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else{
        res.status(400).json({msg: `no member with the id of ${req.params.id}`})
    }
})

//Create Member
router.post('/', (req, res)=>{
    const newMember ={
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg: " please include a name and email"})
    }

    members.push(newMember);

    // res.json(members)
    res.redirect('/')
})

//Update Member
router.put('/:id', (req, res)=>{
    const found = members.some(member=> member.id === parseInt(req.params.id));
    if(found){
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name= updMember.name? updMember.name: member.name;
                member.email= updMember.email? updMember.email: member.email;
                res.json({msg: "Member updated", member})
            }
        })
    }else{
        res.status(400).json({msg: `no member with the id of ${req.params.id}`})
    }
})

//Delete Member
router.delete('/:id', (req, res)=>{
    const found = members.some(member=> member.id === parseInt(req.params.id));
    if(found){
        res.json({msg:"Member deleted", members: members.filter(member => member.id !== parseInt(req.params.id))})
    }else{
        res.status(400).json({msg: `no member with the id of ${req.params.id}`})
    }
})

module.exports = router;