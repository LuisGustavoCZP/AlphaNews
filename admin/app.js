
const fieldsets = document.querySelectorAll("fieldset");

async function buildCreateNews ()
{
    const fieldset = fieldsets[0];
    const fields = fieldset.querySelectorAll("input, textarea");
    const createButton = fieldset.querySelector("button");
    createButton.onclick = async () => 
    {

        const data = {};
        fields.forEach(field => 
        {
            data[field.name] = field.value;
        });

        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        try 
        {
            const resp = await fetch("/news", options)
            .then(resp => resp.json())
            .catch(err => 
            {
                console.log("deu erro", err);
                return undefined;
            });

            if(resp.messages) console.log(resp.messages);
        } 
        catch (error)
        {
            
        }
        
    }
}

async function buildEditNews ()
{
    const fieldset = fieldsets[1];
    const newsList = await fetch("/news").then(resp => resp.json()).catch(err => {console.log(err); return undefined});
    const select = fieldset.querySelector("select");
    const fields = fieldset.querySelectorAll("input, textarea");
    select.innerHTML = '';

    newsList.forEach(element => 
    {
        const option = document.createElement("option");
        option.value = newsList.id;
        option.innerText = newsList.title;
        option.onselect(()=>
        {
            const keys = Object.keys(newsList);
            keys.forEach(key => 
            {
                if(key != "id")
                {
                    const el = fieldset.querySelector(`*[name=${key}`);
                    if(el)
                    {
                        el.value = newsList[key];
                    }
                }    
            });
        });
        select.appendChild(option);
    });

    const buttons = fieldset.querySelectorAll("button");
    buttons[0].onclick = () => {
        const options = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            }    
        }
    }

    buttons[1].onclick = () => {
        const options = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }    
        }
    }
}

buildCreateNews ();
//buildEditNews ();
