# LitElementCypress

This is a minimal project to show a bug with Cypress 4.5.0 and LitElement.

As routing mechanism, the application listens for [`hashChange`](https://github.com/antonioaltamura/LitElementCypress/blob/fbf170f21a8e0df5db529de577af44b9cf92d84e/my-app.js#L42), executes a [`hashFragmentListener()`](https://github.com/antonioaltamura/LitElementCypress/blob/master/my-app.js#L94) function and as soon as `this.config` reference [changes](https://github.com/antonioaltamura/LitElementCypress/blob/master/my-app.js#L101), the render of the page is supposed to be refreshed (this is the expected behaviour of a LitElement WebComponent).

It works in Cypress `4.12.1`, yet it doesn't in Cypress `4.5.0`.
