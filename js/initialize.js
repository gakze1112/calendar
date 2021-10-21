const date = new Date();
let thisYear = date.getFullYear(),
    thisMonth = date.getMonth(),
    thisDay = date.getDay(),
    thisDate = date.getDate();

let userSelectedColor = {
        name: 'blue',
        colorCode: '',
        offColorCode: ''
    };

let postIts = [],
    postIt_CurrentID = '',
    postIt_CurrentPostItIndex = -1;
    
let newCurrentPostIt = false;

// 讀取 colorTheme 與記事資料
fetch('PHPScripts/initializeWebiste.php', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
.then(function(response){
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
})
.then( data => {
    userSelectedColor.name = data.color;
    data.notes.forEach(elem => postIts.push(elem));
    updateData();
});