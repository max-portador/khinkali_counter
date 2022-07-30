import cookie from "cookie"

export const createFileFromURL = async (url: string): Promise<File> => {

    const params = new Proxy(new URLSearchParams(url), {
        get: (searchParams, prop: string) => searchParams.get(prop),
    });
    let format = params['format'] || 'jpg';
    let blobFile = await fetch(url).then(r => r.blob())
    return new File([blobFile], `1.${format}`, { type: `image/${format}` })
}


export function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}