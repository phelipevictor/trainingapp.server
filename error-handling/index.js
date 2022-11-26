module.exports = (app) => {
    app.use((req, res) => {
        res.status(404).json({ message: 'This route does not exist' })
    })
    app.use((err, req, res, next) => {
        console.log('Error', req.method, req.path, err)
        res.status(500).json({ message: "Internal server error." })
    })
}