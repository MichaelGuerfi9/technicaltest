const Player = require('./Player.model')

module.exports = {
    findAll: (req, res) => {
        Player.find({})
            .exec()
            .then(player => {
                if(player === null){
                    return res.status(500).json({error:1,message:'Aucun Player trouvé'})
                }
                res.json(player)
            })
            .catch(err => res.status(500).json({error:1, message:err.message}))
    },
    findOne: (req, res) => {
        Player.findById(req.params.id)
        .exec()
        .then(player => {
            if(player === null){
                return res.status(500).json({error:1,message:'Aucun Player trouvé'})
            }
            res.json(player)
        })
        .catch(err => res.status(500).json({error:1, message:err.message}))
    },
    create: (req, res) => {
        Player.create(req.body)
            .then(player => res.json({success:1, message:'Joueur créé', inserted:collaborateur}))
            .catch(err => res.status(500).json({error:1, message:err.message}))
    },
    update: (req, res) => {
        Player.findByIdAndUpdate(req.params.id,req.body,{new:true})
            .exec()
            .then(player => {
                if(player === null){
                    return res.status(500).json({error:1,message:'Aucun Player trouvé'})
                }res.json({success:1, message:'Player modifié', inserted:collaborateur})})
            .catch(err => res.status(500).json({error:1, message:err.message}))
    },
    delete: (req, res) => {
        Player.findByIdAndRemove(req.params.id)
            .exec()
            .then(player => {
                if(player === null){
                    return res.status(500).json({error:1,message:'Aucun Player trouvé'})
                }
            res.json({success:1, message:'Player supprimé'})})
            .catch(err => res.status(500).json({error:1, message:err.message}))
    }
}