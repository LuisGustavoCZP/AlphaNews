export function createText (type, text, className)
{
    const el = document.createElement(type);
    el.innerText = text;
    if(className) el.className = className;
    return el;
}

export function createImage (src, desc)
{
    const el = document.createElement("img");
    el.src = src;
    if(desc)
    {
        el.title = desc;
        el.alt = desc;
    }
    return el;
}

export function createNotice (noticeData)
{
    return new Notice(noticeData);
}

export class Notice extends HTMLLIElement
{
    #onconnected;
    constructor ({id, titulo, resumo, noticia_completa, categoria, fonte, imagem})
    {
        super();
        const div = document.createElement("div");
        div.appendChild(createText("span", categoria, "news-category"));
        div.appendChild(createText("h2", titulo, "news-title"));
        div.appendChild(createText("p", resumo, "news-resume"));
        div.appendChild(createText("span", `Fonte: ${fonte}`, "news-font"));
        const img = createImage(imagem);
        this.#onconnected = () => 
        {
            this.appendChild(div);
            this.appendChild(img);
            this.onclick = () => {location.assign(noticia_completa);}
        }
    }

    connectedCallback()
    {
        this.#onconnected ();
    }
}

customElements.define("li-notice", Notice, { extends: "li" });