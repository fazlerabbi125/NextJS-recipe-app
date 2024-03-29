import { NextApiRequest, NextApiResponse } from "next";
import tags from "@/data/tags.json";
import { TagDetailType } from "./[tagID]";

export interface TagListType {
    count: number;
    results: Array<TagDetailType>;
}

tags.results.sort((a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name === b.name && a.type < b.type) return -1;
    return 1;
});

export default function handler(req: NextApiRequest, res: NextApiResponse<TagListType>) {
    const start = parseInt(`${req.query.start}`) || 0;
    const end = parseInt(`${req.query.end}`) || tags.count;
    const query = tags.results.filter((elem) => {
        if (req.query.tagName && req.query.tagName.length > 0) {
            const regex = new RegExp(`${req.query.tagName}`, "gi");
            return regex.test(elem.display_name) || regex.test(elem.type);
        }
        return true;
    });

    res.status(200).json({
        count: query.length,
        results: query.slice(start, end),
    });
}
