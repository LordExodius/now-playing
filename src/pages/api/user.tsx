import { NextApiHandler, NextApiResponse } from "next";

const userHandler: NextApiHandler = async (req, res) => {
  // This is a placeholder handler. The actual user profile logic is in [uid].tsx.
    res.status(418).end(`I'm a teapot, not a user API!`);
};

export default userHandler;