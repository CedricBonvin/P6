
                                        // CONTRE LES ATTAQUE D'INCLUSION :

                             // VALIDE LE PW SI IL N'Y A PAS LES CARACTERE SUIVANT :
                            //                   < > = {} () : " '


module.exports = (req,res,next) => {

    const password = req.body.password
    const reg = /[><={}():"']/

    if (!reg.test(password)){
        next()
    }else{
        res.json({ message : " Veuillez ne pas utiliser les caractères suivant : > < = () : {}  ' " })
    }
}