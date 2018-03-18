# Animate on scroll
Animate on scroll - elements animation when user is scrolling page

Animate on scroll with Animate.css (https://daneden.github.io/animate.css/)
Animation with global and local offset
Animation inside scrollable element

## HTML - use data-animation attribute with animation name

````
<h1 data-animation="name">Animated element</h1>
````

## HTML - local animation offset - use data-offset attribute with pixels
````
<h1 data-animation="name" data-offset="number">Animated element</h1>
````

````
<h1 data-animation="bounceIn" data-offset="500">Hello World!</h1>
````

## JavaScript simple configuration
````
$(document).ready(function ($) {
     $().animateOnScroll();
});
````  
## JavaScript advanced configuration
````
$(document).ready(function ($) {
     var args = {
          container: node,
          offset : number
     };
     $().animateOnScroll(args);

});
````         
