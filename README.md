
#kiiri-angular-directives
@author Alex Dong (https://github.com/Kiiri)

This package contains miscellaneous angular directives that I've found to be useful in the
various web applications that I have been working on. Better instructions, examples, and more
directives to come in the future.

Dependencies:
jQuery, AngularJS, Font-Awesome (for some icons)

Current directives:
* angular-button (Button with loading, disabled, propagate attributes. Works well in conjunction with clickoutside)
* checkbox (Angular wrapper for checkbox)
* clickoutside (Call a given function when a user clicks outside of an element)
* dropdown (Simple dropdown directive. Can be given either a list of objects or strings)
* input-field (Basic customizable text input field)
* modal (Typical modal)
* text-area (Customizable auto-resizing text area)

Examples:
See the files in the folder 'examples'

In order to see the examples in action, you may have to start up a simple Python server in the directory. <br/>
<code>
    python -m SimpleHTTPServer 8000
</code>

To use, include the following in your html file: <br/>
```html
    <link type="text/css" rel="stylesheet" href="kiiri-angular-directives.min.css"></link>
    <script type="text/javascript" src="kiiri-angular-directives.min.js"></script>
```

and add the following dependency to your main Angular module: <br/>
<code>
    angular.module('SomeApp', ["kiiri.angular"]);
</code>