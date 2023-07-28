import { NextApiRequest, NextApiResponse } from "next";
import tags from "@/data/tags.json";

export interface TagDetailType {
    name: string;
    id: number;
    display_name: string;
    type: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<TagDetailType | null>) {
    const result = tags.results.find((elem) => {
        return Number(req.query.tagID) === elem.id;
    });

    res.status(200).json(result || null);
}
