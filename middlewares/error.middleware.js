const errorMiddleware = async (err,req,res,next)=>{
    try{
        const error = {...err}
        error.message = err.message
        res.status(error.statusCode || 500).json({
            success:false,
            message:error.message
        })
    }catch(err){
        next(err)
    }
}

export default errorMiddleware