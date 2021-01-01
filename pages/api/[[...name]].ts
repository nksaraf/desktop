export default async (req, res) => {
  const api = require("app/" + req.query.name.join("/") + ".api");
  let rpcCall = JSON.parse(req.body);
  try {
    return res.json({
      data: await api[rpcCall.method](...(rpcCall.args ?? [])),
    });
  } catch (e) {
    return res.status(400).json({ error: { message: e.message, ...e } });
  }
};
