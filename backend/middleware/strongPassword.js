
// Autorise seulement les passwords avac : 
                                            // nbr min. caractères = 8
                                            // nbr min. majuscule  = 1
                                            // nbr min. minuscule  = 1
                                            // nbr min. nombre     = 1
                                            // nbr min. caractères spéciale = 1




module.exports = (req,res,next) => {
    let password = req.body.password
    let reg = /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/  
    if (reg.test(password)){       
        next()
    }
    else {
        res.json({message : "votre mot de passe n'est pas assé fort ...!"})
    }
}