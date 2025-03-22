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

buttons.forEach((e) => {
  e.addEventListener('click', () => {
    
    // adding animation class to photoframe
    image.classList.add('ph_ani')
    
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
    if (forminputs[0].value.trim()!='' && forminputs[1].value.trim()!='' && forminputs[3].value.trim()!='' && forminputs[4].value.trim()!='') {
      sentbutton.setAttribute('href', 'mailto:herosiddharthspck@gmail.com?subject=' + forminputs[3].value + '&body=' + '*NAME:  ' + forminputs[0].value + '%0D%0A%0D%0A' + '*CONTACT NO:  ' + forminputs[1].value + '%0D%0A%0D%0A' + '*EMAIL ID: ' + forminputs[2].value + '%0D%0A%0D%0A' + '*MESSAGE: ' + forminputs[4].value + '%0D%0A%0D%0A.%0D%0A **THIS IS VIA HOMEPAGE--Sid--GITHUB**')
    }
        else{
          sentbutton.removeAttribute('href')
        }
    
  })
})