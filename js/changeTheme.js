const color_data = [
    {
        name: 'blue',
        colorCode: '#1B19CD',
        offColorCode: '#7C7EFB'
    }, {
        name: 'red',
        colorCode: '#D01212',
        offColorCode: '#EEA19B'
    }, {
        name: 'purple',
        colorCode: '#721D89',
        offColorCode: '#EBADFB'
    }, {
        name: 'green',
        colorCode: '#158348',
        offColorCode: '#57C664'
    }, {
        name: 'orange',
        colorCode: '#EE742D',
        offColorCode: '#F7A77A'
    }, {
        name: 'deep-orange',
        colorCode: '#F13C26',
        offColorCode: '#F77D59'
    }, {
        name: 'baby-blue',
        colorCode: '#31B2FC',
        offColorCode: '#3D8DD9'
    }, {
        name: 'cerise',
        colorCode: '#EA3D69',
        offColorCode: '#FCBECC'
    }, {
        name: 'lime',
        colorCode: '#2ACC32',
        offColorCode: '#4FFA4F'
    }, {
        name: 'teal',
        colorCode: '#2FCCB9',
        offColorCode: '#7FE7E3'
    }, {
        name: 'pink',
        colorCode: '#F50D7A',
        offColorCode: '#FFB9EA'
    }, {
        name: 'black',
        colorCode: '#212524',
        offColorCode: '#687E7B'
    }
];

function openFavColor(){

    let modal = document.getElementById("modal");
    let favColor = document.getElementById("fav-color");

    // 增加 fade-in 效果
    if(modal.classList.contains("fade-out")) modal.classList.remove("fade-out");
    modal.classList.add("fade-in");

    // 開關
    modal.open = true;
    favColor.hidden = false;
}

function changeColor(){
    const modal = document.getElementById("modal");
    const favColor = document.getElementById("fav-color");
    
    // 將使用者選擇的顏色寫入資料庫
    ajax('PHPScripts/updateTheme.php',{ color: userSelectedColor.name });

    // 主題更新
    // 根據使用者選擇的顏色，找到正確的色碼
    color_data.forEach(currentColor => {
        if(userSelectedColor.name === currentColor.name){
            userSelectedColor.colorCode = currentColor.colorCode;
            userSelectedColor.offColorCode = currentColor.offColorCode;
        }
    });

    let elements;

    // 清除當前色彩配置
    elements = document.getElementsByTagName("td");
    for(let i=0; i< elements.length; i++) elements[i].style = null;

    // 改變色彩配置
    elements = document.getElementsByClassName("color");
    for( let i=0; i<elements.length; i++){
        elements[i].style.backgroundColor = userSelectedColor.colorCode;
    }

    elements = document.getElementsByClassName("border-color");
    for( let i=0; i<elements.length; i++){
        elements[i].style.borderColor = userSelectedColor.colorCode;
    }

    elements = document.getElementsByClassName("off-color");
    for( let i=0; i<elements.length; i++){
        elements[i].style.color = userSelectedColor.offColorCode;
    }

    // 增加 fade-out 效果
    modal.classList.add("fade-out");
    if(modal.classList.contains("fade-in")) modal.classList.remove("fade-in");
    
    favColor.hidden = true;
    modal.open = false;
}

function addCheckMark(colorName){
    // 記住使用者選擇的顏色
    userSelectedColor.name = colorName;
    
    // 清除 checkmark
    const checkmarks = document.getElementsByClassName("checkmark");
    for( let i = 0; i < checkmarks.length; i++){
        checkmarks[i].parentElement.removeChild(checkmarks[i]);
    }

    // 增加 checkmark
    const colorPreview = document.getElementsByClassName("color-preview");
    for( let i=0; i<colorPreview.length; i++){
        if(colorPreview[i].id === colorName){
            colorPreview[i].innerHTML = "<i class='fas fa-check checkmark'></i>";
        }
    }
}