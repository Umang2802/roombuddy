module.exports = func => {
    return (req, res, next) => {
        console.log("Caught async error in catchAsync( )");
        func(req, res, next).catch(next);
    }
}