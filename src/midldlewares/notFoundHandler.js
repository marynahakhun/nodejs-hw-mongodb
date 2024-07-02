const notFoundHandler = (req, res) => {
    res.status(404).json({
        message: "Page not Found"
    })
}
export default notFoundHandler