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