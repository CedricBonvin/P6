
        // VERIFICATION DE L'EMAIL :


module.exports = (req,res,next) => {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (regex.test(req.body.email)){
        next()
    }
    else {
        res.json({message : " Il semble que votre e-mail ne soit pas valide...!"})
    }
}

