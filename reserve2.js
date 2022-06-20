let input, all=0, done=0, prev=1, prevStr='list';
window.onload=()=>{
    input=document.getElementById('query').getElementsByTagName('input')[0];
    input.value='';
    calc();
    document.getElementById('menu').getElementsByTagName('button')[1].style.borderStyle='solid';
}
function trigger(){
    if(!input.value)
        document.getElementsByTagName('form')[0].getElementsByTagName('input')[0].click();
    else{
        let val=input.value;
        input.value='';
        input.focus();
        add(val);
    }
}
function calc(){
    document.getElementById('diff').innerHTML=all-done+' items left';
}
function add(val){
    ++all; calc();
    let cloneAll=document.getElementsByClassName('proto')[0].cloneNode(true);
    let cloneAct=document.getElementsByClassName('act')[0].cloneNode(true);
    let cloneTick=document.getElementsByClassName('ticked')[0].cloneNode(true);
    cloneAll.getElementsByClassName('task')[0].value=val;
    cloneAct.getElementsByClassName('task')[0].value=val;
    cloneTick.getElementsByClassName('task')[0].value=val;
    cloneAll.getElementsByClassName('checker')[0].title='Click to hold completed';
    cloneAll.getElementsByClassName('eraser')[0].title='Click to delete';
    document.getElementById('list').appendChild(cloneAll); 
    document.getElementById('actual').appendChild(cloneAct);
    cloneAll.style.display='flex';
    cloneAct.style.display='flex';
    input.focus();
    waitForTick(cloneAll,cloneAct,cloneTick);
    waitForDel(cloneAll,cloneAct,cloneTick);
}
function waitForTick(cloneAll,cloneAct,cloneTick){
    cloneAll.getElementsByClassName('checker')[0].onclick=()=>{
        done++; calc();
        cloneAll.getElementsByTagName('span')[0].style.visibility='visible';
        cloneAll.getElementsByClassName('checker')[0].disabled=true;
        cloneAll.getElementsByClassName('task')[0].style.opacity=0.5;
        cloneAll.getElementsByClassName('task')[0].style.textDecoration='line-through';
        cloneAct.remove();
        document.getElementById('gone').appendChild(cloneTick);
        cloneTick.style.display='flex';
        return;
    }
}
function waitForDel(cloneAll,cloneAct,cloneTick){
    cloneAll.getElementsByClassName('eraser')[0].onclick=()=>{
        if(cloneAll.getElementsByClassName('checker')[0].disabled)
            done--;
        all--; calc(); cloneAll.remove(); cloneAct.remove(); cloneTick.remove();
        if(!document.getElementById('list').getElementsByTagName('div').length)
            input.focus();
        return;
    }
}
function tab(x,str){
    if(x!==prev){
        document.getElementById('menu').getElementsByTagName('button')[prev].style.borderStyle='none';
        document.getElementById('menu').getElementsByTagName('button')[x].style.borderStyle='solid';
        document.getElementById(prevStr).style.display='none';
        document.getElementById(str).style.display='block';
        prev=x; prevStr=str;
    }
    if(x!=1) input.focus();
}
function clean(){
    while(document.getElementById('gone').firstChild){
        document.getElementById('gone').firstChild.remove();
    }
    let List=document.getElementById('list').getElementsByTagName('div');
    for(i=0; i<List.length; i++){
        if(List[i].getElementsByClassName('checker')[0].disabled){
            List[i].remove(); i=0; all--; done--;
        }
    }
    for(i=0; i<List.length; i++){
        if(List[i].getElementsByClassName('checker')[0].disabled){
            List[i].remove(); i=0;
        }
    }
}