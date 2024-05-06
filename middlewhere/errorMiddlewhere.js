const errorMiddleWhere = (err, req, res, next) => {
    console.log("pankaj")
    console.log(`error ${err}`.bgRed.white)
    res.status(404).send({
        sucess: false,
        "msg": "sonting is Wrong",
        err
    })
}

export default errorMiddleWhere;