// Lesson 3: Dark mode feature
// Check out `public/app.js` to see how this is implemented
function DarkMode() {
  const buttonLabel = this.isEnabled() ? 'Light mode' : 'Dark mode';

  this.body = document.getElementsByTagName('body')[0];
  this.button = document.createElement('button');
  this.button.id = 'dark-mode';
  this.button.appendChild(document.createTextNode(buttonLabel));

  this.button.addEventListener('click', this.toggle.bind(this));

  this.controls = document.createElement('div');
  this.controls.id = 'controls';
  this.controls.appendChild(this.button);

  this.isEnabled() ? this.enable() : this.disable();
}

DarkMode.prototype.isEnabled = function() {
  return localStorage.getItem('dark-mode') == 'true';
}

DarkMode.prototype.enableFeature = function() {
  this.body.insertBefore(this.controls, document.getElementById('resources'));
}

DarkMode.prototype.disableFeature = function() {
  this.body.removeChild(this.controls);
  this.disable();
}

DarkMode.prototype.toggle = function() {
  this.isEnabled() ? this.disable() : this.enable();
}

DarkMode.prototype.enable = function() {
  this.body.classList.add('dark-mode');
  this.button.innerHTML = 'Light mode';
  localStorage.setItem('dark-mode', true);
}

DarkMode.prototype.disable = function() {
  this.body.classList.remove('dark-mode');
  this.button.innerHTML = 'Dark mode';
  localStorage.setItem('dark-mode', false);
}
