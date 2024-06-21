const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      sidebarClose = document.querySelector(".sidebarClose");

      let getMode = localStorage.getItem("mode");
        if (getMode && getMode === "dark-mode") {
            body.classList.add("dark");
        }
      
    /*JS para el modo Dia y Noche*/
    modeToggle.addEventListener("click" , () => {
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");

        /*JS para mantener el modo seleccionado por el usuario, incluso actualizando la página o abriendola de nuevo*/
        if (!body.classList.contains("dark")) {
            localStorage.setItem("mode" , "light-mode");
        } else {
            localStorage.setItem("mode" , "dark-mode");
        }
    });

    /*JS para el caja de Busqueda*/
    searchToggle.addEventListener("click" , () => {
        searchToggle.classList.toggle("active");
    });

    /*JS para el diseño responsivo*/
    sidebarOpen.addEventListener("click" , () => {
        nav.classList.add("active");
    });

    body.addEventListener("click" , e => {
        let clikedElm = e.target;

        if (!clikedElm.classList.contains("sidebarOpen") && !clikedElm.classList.contains("menu")) {
            nav.classList.remove("active");
        }
    });


let listVideo = document.querySelectorAll('.video-list .vid');
let mainVideo = document.querySelector('.main-video video');
let title = document.querySelector('.main-video .title');

listVideo.forEach(video =>{
    video.onclick = () => {
        listVideo.forEach(vid => vid.classList.remove('active'));
        video.classList.add('active');
        if (video.classList.contains('active')) {
            let src = video.children[0].getAttribute('src');
            mainVideo.src = src;
            let text = video.children[1].innerHTML;
            title.innerHTML = text;
        };
    };
});
