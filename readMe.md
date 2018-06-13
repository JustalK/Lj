
# Latsuj.com
<img src="http://www.latsuj.com/imgs/cats.png"></img>

This project is my portefolio, everything have been made from scratch. And I'm really focus on doing a website that load really fast. So it's quite long to make a lot of profiling and tests for finding the best result. I have done a lot of experimentation. There are two versions, a mobile one and a responsive one for tablet and computer.

There are two differents kind of optimizations and I'm always switching between them. There are the optimizations for reducing the loading time and the optimizations for improving the performance of the website.

## Reducing the loading time

 - Using html-minimizer, cssnano and uglifyjs for building a concatened, minimized, clean production version (HTML, CSS & JS)
 - I'm using AJAX for loading the HQ images of the website when needed. I'm use the LQIP technique. I load a small file of the image with progressive optimization and then I use at the same place the HQ image once it loaded. I have also done that on the 3D parts, look the waterfall of the network, you will understand.
 - I'm use AJAX also for loading the global CSS. I mean that I load only the necessaries css rules at the fold. And I load the next rules once the users is starting scrolling.
 - I'm also using the Goodle loading API for avoiding the FOUT and FOIT when you arrive for the first time on the website. I'm using it in two differents parts, I first load the only necessaries FONT and once they have been loaded properly I load the others.
  - Using HTML Page instead of PHP for having the page already rendered and not passing throught the server. I could have used some software for prerendering the page but it add some useless complexity on my website.
  - Reducing the number of request by adding the minimized css for the fold directly into the dom
  - Moving the script to the end of the body for downloading the DOM and CSS in priority
  - Using a custom font based on material design where I remove all the unnecessaries symbols
  - Using data64 image on the CSS because it's smaller and faster to load at the end
  - Using clip-path for creating complex forms instead of using img. For this one, by doing that, the website will not work on IE until this css rules become a PR and REC for the W3C. For the moment, it's still a CR but I have good hope for this one.
 - I've created alias on some functions that I use often for keeping my file the smallest possible. By example, I have created $i and $n for respectively document.getElementById and document.getElementsByClassName

## Improving the performance

 - Adding a class for removing the hover element when scrolling
 - I have tested many functions on jsperf for finding the best results by example, it's faster to use classList.add instead of += " "
 - I have saved the elements of the dom only once at the start for not parsing the dom everytime and wasting ressource on the garbage.
 - I have used sometime the shift operator instead of arithmetic operator because  it's faster when you have to turn the float value into an integer and multiply or divide it
 - I'm using the transform Z on some element for using the GPU and not repainting the windows. It's beast to avoid reflow and repainting when you can.
 - I'm using webAssembly on some function that require a lot of calcul and that I use often. The file is bigger but after the gain in the execution is nice.
 - I'm also using some framerate control with a game loop for optimizing the animation on the scroll. RequestAnimationFrame

## Micro-optimizations
- Using the AND (&&) for gaining some bits
- Removing the value of return when not needed
- Putting the variable together for not repeating the word "var"
- Reverse the loop for not using a second variable in the loop

## Old improvement

 - When the page was in PHP, I use the flush function just after the body for showing the content as soon as possible without waiting for the entirely page to be read by the server. 
 - setTimeout 0, for adding the function that I need to be execute for sure but later into the queue.
