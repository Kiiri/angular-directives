
#kiiri-angular-directives
@author Alex Dong (https://github.com/Kiiri)

This package contains miscellaneous angular directives that I've found to be useful in the
various web applications that I have been working on. Better instructions, examples, and more
directives to come in the future.

Current directives:
* clickoutside (Call a given function when a user clicks outside of an element)
* modal (Typical modal)

To use, include the following in your html file: <br/>
```html
    <link type="text/css" rel="stylesheet" href="kiiri-angular-directives.min.css"></link>
    <script type="text/javascript" src="kiiri-angular-directives.min.js"></script>
```

and add the following dependency to your main Angular module: <br/>
<code>
    angular.module('SomeApp', ["kiiri.angular"]);
</code>