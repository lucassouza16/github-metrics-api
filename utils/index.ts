export const htmlEncode = (text: string) => text.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

export const uriToBase64 = (uri: string): Promise<string | null> => {
    return new Promise(resolve => {
        fetch(uri).then(async response => {
            let buffer = Buffer.from(await response.arrayBuffer());
            resolve("data:" + response.headers.get("content-type") + ';base64,' + buffer.toString('base64'));
        }).catch(() => resolve(null));
    });
}