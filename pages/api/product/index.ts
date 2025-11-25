import type { NextApiRequest, NextApiResponse } from "next";
import { product } from "../../../lib/store";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
return res.status(200).json({
  products: product,
});
}
