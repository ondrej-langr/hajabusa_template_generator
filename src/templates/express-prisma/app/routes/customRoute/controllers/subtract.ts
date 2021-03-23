export default async function subtract(req, res) {
    const difference = Number(req.query.a) - Number(req.query.b)
    res.send(difference.toString())
  }