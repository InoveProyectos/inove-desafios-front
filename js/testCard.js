function tcardToogle() {
    /*const toggleBtns = document.querySelectorAll('.tcard-toggle');
    toggleBtns.forEach(toggleBtn => {
        toggleBtn.addEventListener('click', ()=>{
            toggleBtn.parentNode.classList.toggle('active')
        })
    });*/

    const tcards = document.querySelectorAll('.tcard');
    tcards.forEach(element => {
        element.addEventListener('click', ()=>{
            element.classList.toggle('active')
        })
    });
}