import { createNotice } from "./build.js";
const newsListElement = document.getElementById("news-list");

async function loadNews ()
{
    const resp = await fetch("/news")
    .then(resp => resp.json()).catch(err => {console.log(err); return undefined});

    console.log(resp);
    if(resp)
    {
        resp.forEach(element => {
            newsListElement.appendChild(createNotice(element));
        });
    }
}

loadNews ();
