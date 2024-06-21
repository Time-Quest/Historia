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

    /*JS para el caja de Busqueda de la barra*/
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

    /*Carrusel*/
    const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0];
    arrowIcons = document.querySelectorAll(".wrapper i");

    let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
    
    const showHideIcons = () => {
        let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
        arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
        arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
    }
    
    arrowIcons.forEach(icon => {
        icon.addEventListener("click" , () => {
            let firstImgWidth = firstImg.clientWidth + 14;
            carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
            setTimeout(() => showHideIcons(), 60);
        });
    });

    const autoSlide = () => {
        if (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

        positionDiff = Math.abs(positionDiff);
        let firstImgWidth = firstImg.clientWidth + 14;
        let valDifference = firstImgWidth - positionDiff;

        if(carousel.scrollLeft > prevScrollLeft) {
            return carousel.scrollLeft += positionDiff >firstImgWidth / 3 ? valDifference : -positionDiff;
        }
        carousel.scrollLeft -= positionDiff >firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    
    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    }
    
    const dragging = (e) => {
        /*Scrolling images */
        if (!isDragStart) return;
        e.preventDefault();
        isDragging = true;
        carousel.classList.add("dragging");
        positionDiff =  (e.pageX || e.touches[0].pageX) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    }

    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove("dragging");

        if (!isDragging) return;
        isDragging = false;
        autoSlide();
    } 

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);

    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);

    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
    carousel.addEventListener("touched", dragStop);