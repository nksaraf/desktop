import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default (req, res) => {
  return res.json({ a: true });
};
