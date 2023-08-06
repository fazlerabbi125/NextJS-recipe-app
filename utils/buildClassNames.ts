export function buildClassNames(...args: any[]) {
    return args
        .filter((elem) => {
            if (typeof elem === "string") return elem;
            return false;
        })
        .join(" ");
}
