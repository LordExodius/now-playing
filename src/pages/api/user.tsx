import { NextApiHandler, NextApiResponse } from "next";

const userHandler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    // Handle GET request
  } else if (req.method === "POST") {
    // Handle POST request
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default userHandler;
