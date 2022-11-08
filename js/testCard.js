const toggleBtns = document.querySelectorAll('.tcard-toggle');

toggleBtns.forEach(toggleBtn => {
  toggleBtn.addEventListener('click', ()=>{
    toggleBtn.parentNode.classList.toggle('active')
  })
});