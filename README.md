
#kiiri-angular-directives
@author Alex Dong (https://github.com/Kiiri)

This package contains miscellaneous angular directives that I've found to be useful in the
various web applications that I have been working on. Better instructions, examples, and more
directives to come in the future.

Dependencies:
jQuery, AngularJS, Font-Awesome (for some icons)

Other external libraries: <br/>
Some of the directives make use of other external libraries. The external libraries are already minified and bundled
into the built "kiiri-angular-directives.min.js" file, however.

text-area: https://github.com/monospaced/angular-elastic <br/>
qrcode-scanner: https://github.com/dwa012/html5-qrcode, https://github.com/LazarSoft/jsqrcode
cropper: https://github.com/fengyuanchen/cropper

Current directives:
* autocomplete (Directive used to display ajax autocomplete results)
* angular-button (Button with loading, disabled, propagate attributes. Works well in conjunction with clickoutside)
* background-image (Attribute directive used to cover an html element with a background image)
* checkbox (Angular wrapper for checkbox)
* clickoutside (Call a given function when a user clicks outside of an element)
* dropdown (Simple dropdown directive. Can be given either a list of objects or strings)
* image-input (Makes parent element a clickable image upload field. Useful for updating user avatars and similar applications)
* input-field (Basic customizable text input field)
* modal (Typical modal)
* oauth (Oauth popup directive attribute. Wraps the oauth response in a promise)
* radio-button (Typical radio button directive)
* qrcode-scanner (Angular wrapper for HTML5 compatible QR-code scanner)
* text-area (Customizable auto-resizing text area)
* tooltip (Tooltip directive that wraps an element)

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