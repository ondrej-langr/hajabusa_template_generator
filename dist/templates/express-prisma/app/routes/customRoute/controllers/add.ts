export default async function add(req, res) {
    const sum = Number(req.query.a) + Number(req.query.c)
    res.send(sum.toString())
}