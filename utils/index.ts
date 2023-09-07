export const htmlEncode = (text: string) => text.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

export const uriToBase64 = (uri: string): Promise<string | null> => {
    return new Promise(resolve => {
        fetch(uri).then(async response => {
            let buffer = Buffer.from(await response.arrayBuffer());
            resolve("data:" + response.headers.get("content-type") + ';base64,' + buffer.toString('base64'));
        }).catch(() => resolve(null));
    });
}

export const hexToRGB = (hex: string) => {
    const res = (/^\#(((.{1})(.{1})(.{1})(.{1})?)|((.{2})(.{2})(.{2})(.{2})?))$/).exec(hex);

    if (!res) return null;

    const r = res[8] ?? res[3];
    const g = res[9] ?? res[4];
    const b = res[10] ?? res[5];
    const a = res[11] ?? res[6] ?? 'ff';

    return {
       r: parseInt(r, 16),
       g: parseInt(g, 16),
       b: parseInt(b, 16),
       a: parseInt(a, 16),
    };
}