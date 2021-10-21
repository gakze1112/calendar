function getUID(year,month,day){
    // month的範圍: {0 - 11}, 0 表示 1 月；11 表示 12 月 
    if(month > 11){
        year++;
        month = 0;
    }

    if(month < 0){
        year--;
        month = 11;
    }

    month++;
    // 當 month < 10 時，字串補 0
    let str = (month < 10) ? `${year}0${month}` : `${year}${month}`;
    
    // 當 day < 10 時，字串補 0
    return (day < 10) ? `${str}0${day}`: `${str}${day}`;
}

function dayClicked(element){
    postIt_CurrentID = element.dataset.uid;
    openMakedNote();
}

function openMakedNote(){
    // 打開 model 並且 以 淡入 效果呈現。
    const modal = document.getElementById("modal");
    modal.open = true;
    modal.classList.remove("fade-out");
    modal.classList.add("fade-in");

    const makeNote = document.getElementById("make-note");
    const editPostIt = document.getElementById("edit-post-it");

    // 判斷當前的日期是否有記事資料
    newCurrentPostIt = true;
    postIt_CurrentPostItIndex = postIts.findIndex((elem,i) => elem.id === postIt_CurrentID);
    if(postIt_CurrentPostItIndex !== -1){
        editPostIt.value = postIts[postIt_CurrentPostItIndex].content;
        newCurrentPostIt = false;
    }

    // 呈現 model-note
    makeNote.hidden = false;

    // 將游標的焦點集中在 edit-post-it
    document.getElementById("edit-post-it").focus();
}

function closeMakedNote(){
    // 關閉 model 並且 以 淡出 效果呈現。
    let modal = document.getElementById("modal");
    modal.classList.remove("fade-in");
    modal.classList.add("fade-out");
    modal.open = false;

    // 呈現 model-note
    document.getElementById("make-note").hidden = true;

    const editPostIt = document.getElementById("edit-post-it");
    editPostIt.value = "";
}

function submitPostIt(){
    // 取得要送出的資料
    let postItData = {
        id: postIt_CurrentID,
        noteColor: getRandom(1,6),
        content: document.getElementById("edit-post-it").value
    };

    // 清空 post-it 內容
    document.getElementById("edit-post-it").value = "";

    // 如何判斷是新記事? 
    if(newCurrentPostIt){
        postIts.push(postItData);

        // 傳送到後端，寫入資料庫 (CRUD-Create)
        ajax("PHPScripts/addNotes.php", postItData);
    }
    else {
        postIts[postIt_CurrentPostItIndex].content = postItData.content;

        // 傳送到後端，寫入資料庫 (Update)
        ajax("PHPScripts/updateNotes.php", postItData);
    }

    // 更新月曆圖示
    fillInMonth(thisYear,thisMonth);

    // 關閉 modal 對話框
    closeMakedNote();
}

function deleteNote(){
    document.getElementById("edit-post-it").value = "";

    // 如果記事已經存在，則從 postIts 以及後端資料庫移除
    if(postIt_CurrentPostItIndex !== -1){
        ajax("PHPScripts/deleteNotes.php", postIts[postIt_CurrentPostItIndex]);
        postIts.splice(postIt_CurrentPostItIndex,1);
    }

    fillInMonth(thisYear,thisMonth);
    closeMakedNote();
}

function getRandom(min,max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function appendSpriteToCellAndTooltip(uid,elem){
    postIts.forEach((current,i) => {
        if(current.id === uid){
            elem.innerHTML += `<img src='images/note${postIts[i].noteColor}.png' alt='A post-it note'>`;
            elem.classList.add("tooltip");
            elem.innerHTML += `<span>${postIts[i].content}</span>`;
        }
    });
}

// 按下 modal 透明黑色背景，會關閉對話框
window.onload = function(){
    document.getElementById("modal").addEventListener("click",(e)=>{
        if(e.target.id === "make-note" || e.target.id === "modal") closeMakedNote();
    });
}