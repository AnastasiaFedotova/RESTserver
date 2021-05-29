const errorHandler = (res, err) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || err,
    });
};

module.exports ={
    errorHandler
}
