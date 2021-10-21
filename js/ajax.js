function ajax(url,data){
    fetch(url,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'content-type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error(response.statusText);
    });
}