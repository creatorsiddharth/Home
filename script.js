/**** **********
**********
chatgpt code gallery 
chatgpt code  gallery 

**********
******************/

(function() {
  /* == EDIT THIS ARRAY TO ADD/REMOVE GALLERY ITEMS==
  
     Each item must have:
       - type: "image" or "video"
       - src: URL or relative path to your file
       - alt: short text for images (or poster/description for video)
       */
  const items = [
    // Example items (replace src values with your files)
    { type: 'image', src: '/gallery images/p1.jpg', alt: 'Photo 1' },
    { type: 'image', src: '/gallery images/p2.jpg', alt: 'Photo 2' },
    { type: 'video', src: '/gallery images/c1.mp4', alt: 'Clip 1' },
    { type: 'image', src: '/gallery images/p3.jpg', alt: 'Photo 3' },
    { type: 'image', src: '/gallery images/p4.jpg', alt: 'Photo 4' },
    { type: 'image', src: '/gallery images/p5.jpg', alt: 'Photo 5' },
    { type: 'image', src: '/gallery images/p6.jpg', alt: 'Photo 6' },
    { type: 'image', src: '/gallery images/p7.jpg', alt: 'Photo 7' },
    { type: 'image', src: '/gallery images/p8.jpg', alt: 'Photo 8' },
    { type: 'image', src: '/gallery images/p9.jpg', alt: 'Photo 9' },
    { type: 'image', src: '/gallery images/p10.jpg', alt: 'Photo 10' },
    { type: 'image', src: '/gallery images/p11.jpg', alt: 'Photo 11' },
    { type: 'image', src: '/gallery images/p12.jpg', alt: 'Photo 12' },
    { type: 'image', src: '/gallery images/p13.jpg', alt: 'Photo 13' },
    { type: 'image', src: '/gallery images/p14.jpg', alt: 'Photo 14' },
    { type: 'image', src: '/gallery images/p15.jpg', alt: 'Photo 15' },
    { type: 'image', src: '/gallery images/p16.jpg', alt: 'Photo 16' },
    { type: 'image', src: '/gallery images/p17.jpg', alt: 'Photo 17' },
    { type: 'image', src: '/gallery images/p18.jpg', alt: 'Photo 18' },
    { type: 'image', src: '/gallery images/p19.jpg', alt: 'Photo 19' },
    { type: 'image', src: '/gallery images/p20.jpg', alt: 'Photo 20' },
    { type: 'image', src: '/gallery images/p21.jpg', alt: 'Photo 21' },
    { type: 'image', src: '/gallery images/p22.jpg', alt: 'Photo 22' },
    { type: 'image', src: '/gallery images/p23.jpg', alt: 'Photo 23' },
    { type: 'image', src: '/gallery images/p24.jpg', alt: 'Photo 24' },


    // add more...
  ];
  
  const grid = document.getElementById('galleryGrid');
  const viewer = document.getElementById('viewer');
  const mediaHolder = document.getElementById('viewerMediaContainer');
  const closeBtn = document.getElementById('viewerClose');
  const caption = document.getElementById('viewerCaption');
  
  /* Build gallery DOM from items array */
  function buildGallery() {
    items.forEach((it, idx) => {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.setAttribute('data-index', idx);
      
      if (it.type === 'image') {
        const img = document.createElement('img');
        img.src = it.src;
        img.alt = it.alt || '';
        img.draggable = false;
        tile.appendChild(img);
      } else if (it.type === 'video') {
        // create muted thumbnail preview for tile (autoplay muted loop for preview)
        const vid = document.createElement('video');
        vid.src = it.src;
        vid.muted = true;
        vid.playsInline = true;
        vid.preload = 'metadata';
        vid.loop = true;
        vid.autoplay = true;
        vid.draggable = false;
        // browsers may block autoplay unless muted - we set muted true here for preview
        tile.appendChild(vid);
        
        const badge = document.createElement('div');
        badge.className = 'playBadge';
        badge.innerHTML = '&#9658; Video';
        tile.appendChild(badge);
      }
      
      // open viewer on click
      tile.addEventListener('click', () => openViewer(idx));
      // prevent user dragging images/videos out
      tile.addEventListener('dragstart', (e) => e.preventDefault());
      tile.addEventListener('contextmenu', (e) => e.preventDefault()); // basic right-click block
      grid.appendChild(tile);
    });
  }
  
  /* Open viewer with either image or video */
  async function openViewer(index) {
    console.log('ooen')
    const it = items[index];
    // clear previous content
    mediaHolder.innerHTML = '';
    caption.textContent = it.alt || '';
    
    if (it.type === 'image') {
      const img = document.createElement('img');
      img.src = it.src;
      img.alt = it.alt || '';
      // prevent zoom/drag on mobile
      img.draggable = false;
      mediaHolder.appendChild(img);
      
    } else if (it.type === 'video') {
      const vid = document.createElement('video');
      vid.src = it.src;
      vid.controls = true; // show all controls
      vid.autoplay = true; // play automatically
      vid.playsInline = true;
      vid.preload = 'auto';
      vid.draggable = false;
      vid.setAttribute('webkit-playsinline', ''); // iOS
      vid.style.maxHeight = '100vh';
      mediaHolder.appendChild(vid);
      
      // try to request fullscreen for the video element (may be blocked by some browsers)
      try {
        // first try element.requestFullscreen (user initiated click allowed)
        if (vid.requestFullscreen) await vid.requestFullscreen().catch(() => {});
        else if (vid.webkitEnterFullscreen) vid.webkitEnterFullscreen && vid.webkitEnterFullscreen(); // safari fallback
      } catch (e) {
        // ignore if browser denies
      }
      
      // ensure it plays (some browsers require play() call)
      vid.play().catch(() => { /* autoplay might be blocked by policy */ });
    }
    
    // show viewer
    viewer.classList.add('show');
    viewer.setAttribute('aria-hidden', 'false');
    closeBtn.style.display = 'block';
    back_gal_but.style.display='none'
    
    // try to push focus to close button for accessibility
    closeBtn.focus();
  }
  
  /* Close viewer and stop/pause video if playing */
  async function closeViewer() {
    // if a video element exists, pause and remove it, and exit fullscreen
    const v = mediaHolder.querySelector('video');
    if (v) {
      try { v.pause(); } catch (e) {}
      // if currently fullscreen, exit it
      if (document.fullscreenElement) {
        try { await document.exitFullscreen(); } catch (e) {}
      } else if (document.webkitFullscreenElement) {
        try { document.webkitExitFullscreen && document.webkitExitFullscreen(); } catch (e) {}
      }
    }
    viewer.classList.remove('show');
    viewer.setAttribute('aria-hidden', 'true');
    mediaHolder.innerHTML = '';
    caption.textContent = '';
    closeBtn.style.display = 'none';
    back_gal_but.style.display='block'
  }
  
  /* close on Esc key */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewer.classList.contains('show')) {
      closeViewer();
    }
  });
  
  /* close on background click (but not when clicking media) */
  viewer.addEventListener('click', (e) => {
    if (e.target === viewer) closeViewer();
  });
  
  closeBtn.addEventListener('click', closeViewer);
  
  /* Build gallery on load */
  buildGallery();
  
  /* Prevent some simple ways users might try to change items from UI */
  document.addEventListener('contextmenu', function(e) {
    // allow contextmenu when not over the grid (so devtools still work on other parts)
    const overGrid = e.target.closest('#galleryGrid');
    if (overGrid) e.preventDefault();
  });
  
  // Note: It's not possible to fully prevent a determined user from changing website code
  // (they can inspect or edit files locally). This implementation removes any upload UI
  // and places all gallery items in the code array above so only code edits add/remove items.
})();



//gallery over
//gallery over
//gallery over



// making GALLERY BUTTON WORKING 
// making GALLERY BUTTON WORKING 
// making GALLERY BUTTON WORKING 

var gallery_button = document.getElementById('gallery_but')
var gallery = document.getElementById('photo_gallery')
var main_ = document.querySelector('main')
var header_ = document.querySelector('header')
var footer_ = document.querySelector('footer')
var back_gal_but = document.getElementById('back_home')

gallery_button.addEventListener('click', () => {
  gallery.style.transform = 'scale(1)';
 main_.style.display = 'none';
footer_.style.display = 'none';
 header_.style.display = 'none'
  
})

// making GALLERY back BUTTON WORKING 
// making GALLERY back BUTTON WORKING 
// making GALLERY back BUTTON WORKIng


back_gal_but.addEventListener('click', () => {
  gallery.style.transform = 'scale(0.0)';
 main_.style.display = 'flex';
footer_.style.display = 'block';
 header_.style.display = 'flex'
  
})




// YOURCODE.....
// YOURCODE.....
// YOURCODE.....
// YOURCODE.....







//making navbar colourful on scrolling 
//making navbar colourful on scrolling 
//making navbar colourful on scrolling 

var navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('bg_nav')
  } else {
    navbar.classList.remove('bg_nav')
  }
})






//making scrool to projects on clicking projects shortcut button 
//making scrool to projects on clicking projects shortcut button 
//making scrool to projects on clicking projects shortcut button 

var prj_short = document.getElementById('prj_short')

prj_short.addEventListener('click', () => {
  
  window.scrollTo(1, document.getElementById('project').offsetTop - navbar.offsetHeight)
  
})





// actions on clicking bar
// actions on clicking bar
// actions on clicking bar


var bar = document.getElementById('bar');
var nav = document.querySelector('nav');
var nav_num = 1;

bar.addEventListener('click', () => {
  
  if (nav_num == 1) {
    
    // nav down
    nav.style = 'transform: translateY(50vh); transition: .5s;';
    
    // bar rotation 
    bar.style = 'transform: rotate(450deg); transition:.5s';
    
    // project shortcut disappear 
    prj_short.style = 'display:none'
    
    nav_num = 2;
  }
  else {
    
    // nav up
    nav.style = 'transform: translateY(0vh); transition: .5s';
    
    // bar rotation 
    bar.style = 'transform: rotate(0deg); transition:.5s';
    
    //project shortcut reappear 
    prj_short.style = 'display:block'
    
    nav_num = 1;
  }
  
})






// actions on clicking photo changer button 
// actions on clicking photo changer button 
// actions on clicking photo changer button 

var buttons = Array.from(document.getElementById('ph_button').children);
var image = document.getElementById('ph1');
var img_urls = ['home.jpg']
buttons.forEach((e) => {
  e.addEventListener('click', () => {
    
    // adding animation class to photoframe
    image.classList.add('ph_ani')
    
    //adding urls to url array to store it 
    img_urls.shift();
    img_urls.push(e.value);
    
    // changing photo while animation with delay
    setTimeout(() => {
      image.style = 'background: url("' + e.value + '"); background-size: cover;'
    }, 250)
    
    // removing animation class after animation 
    setTimeout(() => {
      image.classList.remove('ph_ani')
    }, 500)
    
  })
})


buttons[0].click();



// making photos big on click
// making photos big on click
// making photos big on click


var big_img = document.getElementById('ph_big')
var big_img_container = document.getElementById('img_big_container')

image.addEventListener('click', () => {
  
  big_img.setAttribute('src', img_urls[0]);
  big_img_container.style.display = 'grid';
  
  
  //Adding title on big photos
  if (img_urls[0] == 'home.jpg' || img_urls[0] == '/home.jpg') {
    document.getElementById('big_img_name').innerText = 'Trio with their Mother';
  }
  else if (img_urls[0] == '/e.jpg' || img_urls[0] == 'e.jpg') {
    document.getElementById('big_img_name').innerText = 'Sandeep, Siddharth, Bharti';
  }
  else if (img_urls[0] == '/e1.jpg' || img_urls[0] == 'e1.jpg') {
    document.getElementById('big_img_name').innerText = 'My mother & me';
  }
  else if (img_urls[0] == '/trio.jpg' || img_urls[0] == 'trio.jpg') {
    document.getElementById('big_img_name').innerText = 'Trio: Bharti, Yash, Siddharth';
  }
  
  else {
    document.getElementById('big_img_name').innerText = 'The Real Gods.';
  }
  
})



// Removing big photos on body click
// Removing big photos on body click
// Removing big photos on body click



big_img_container.addEventListener('click', () => {
  big_img.removeAttribute('src');
  big_img_container.style.display = 'none'
  
})



// actions on clicking navigational buttons
// actions on clicking navigational buttons
// actions on clicking navigational buttons

var nav_child = Array.from(document.querySelectorAll('nav>button'));

nav_child.forEach((l) => {
  l.addEventListener('click', () => {
    
    // nav up
    nav.style = 'transform: translateY(0vh); transition: .5s';
    nav_num = 1;
    
    //bar rotation 
    bar.style = 'transform: rotate(0deg); transition:.5s';
    
    // project shortcut reappear 
    prj_short.style = 'display:block'
    
    // scrolling to section on clicking respective navigational button 
    let box = document.getElementById(l.value)
    
    window.scrollTo(1, box.offsetTop - navbar.offsetHeight)
    
  })
  
})




//action on clicking bgcolor changer buttons
//action on clicking bgcolor changer buttons
//action on clicking bgcolor changer buttons


var col_changer = Array.from(document.querySelectorAll('nav div input'));

col_changer.forEach((u) => {
  
  u.addEventListener('change', (f) => {
    
    if (f.target.checked) {
      
      // css variable value changer
      document.documentElement.style.setProperty('--co', u.value);
      
      // nav up
      nav.style = 'transform: translateY(0vh); transition: .5s';
      nav_num = 1;
      
      //bar rotation 
      bar.style = 'transform: rotate(0deg); transition:.5s';
      
      // project shortcut reappear 
      prj_short.style = 'display:block'
    }
    
  })
  
})





// action on clicking send email button
// action on clicking send email button
// action on clicking send email button


var sentbutton = document.querySelector('form button a');
var forminputs = Array.from(document.getElementsByClassName('fo_input'));
forminputs.forEach((e) => {
  e.addEventListener('change', () => {
    if (forminputs[0].value.trim() != '' && forminputs[1].value.trim() != '' && forminputs[3].value.trim() != '' && forminputs[4].value.trim() != '') {
      sentbutton.setAttribute('href', 'mailto:herosiddharthspck@gmail.com?subject=' + forminputs[3].value + '&body=' + '*NAME:  ' + forminputs[0].value + '%0D%0A%0D%0A' + '*CONTACT NO:  ' + forminputs[1].value + '%0D%0A%0D%0A' + '*EMAIL ID: ' + forminputs[2].value + '%0D%0A%0D%0A' + '*MESSAGE: ' + forminputs[4].value + '%0D%0A%0D%0A.%0D%0A **THIS IS VIA HOMEPAGE--Sid--GITHUB**')
    }
    else {
      sentbutton.removeAttribute('href')
    }
    
  })
})




// Making projects preview active
// Making projects preview active
// Making projects preview active



var preview_buttons = Array.from(document.getElementsByClassName('preview'));

preview_buttons.forEach((e) => {
  e.addEventListener('click', () => {
    console.log('ju')
    if (e.innerText == 'Preview Project') {
      let preview_page = document.getElementById(e.value);
      preview_page.classList.add('prj_cont_view_active');
      e.innerText = ' 🔙 Go Back 🔙';
    } else {
      let preview_page = document.getElementById(e.value);
      preview_page.classList.remove('prj_cont_view_active');
      e.innerText = 'Preview Project';
    }
    
  })
})










/*
let waste_bu = document.getElementsByClassName('unavailable');

waste_bu = Array.from(waste_bu)
waste_bu.forEach((e)=>{
  e.addEventListener('click',()=>{
    let info_box = document.createElement('div');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    //info_box.classList.add('info_box');
    p1.innerText='Alert!'
    p1.classList.add('p1')

    p2.classList.add('p2')
    p2.innerText='i'

    info_box.appendChild(p1);
    info_box.appendChild(p2);

    document.querySelector('body').appendChild(info_box)
    console.log(info_box)
  })
})*/
