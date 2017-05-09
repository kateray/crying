Graffiti.prototype = new window.google.maps.OverlayView();

function Graffiti(parent) {
  this.content_ = null
  this.text_ = null
  this.parent_ = parent
  this.setMap(parent.streetView)
}
Graffiti.prototype.onAdd = function() {
  var form = document.createElement('div')
  var content = document.createElement('div');
  var button = document.createElement('button')
  form.appendChild(content)
  form.appendChild(button)
  content.setAttribute('contenteditable', true)
  content.className = 'floating-text';
  this.content_ = content;
  content.addEventListener("keypress", function(e){
    e.stopPropagation()
  });
  content.addEventListener("mousedown", function(e){
    e.stopPropagation()
  });
  content.addEventListener("keyup", this.parent_.titleChanged);
  button.innerHTML = 'save'
  button.className = 'save-text'
  button.addEventListener("click", function(e){
    this.parent_.closePopups()
  }.bind(this));
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(form);
  this.content_.innerHTML = this.text_;
  this.focusCaret()
};
Graffiti.prototype.updateText = function(text){
  this.text_ = text;
};
Graffiti.prototype.focusCaret = function() {
  if (this.content_) {
    this.content_.focus();
    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
      const range = document.createRange();
      range.selectNodeContents(this.content_);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange !== "undefined") {
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(this.content_);
      textRange.collapse(false);
      textRange.select();
    }
  }
}
Graffiti.prototype.draw = function() {
  this.content_.innerHTML = this.text_;
  this.focusCaret()
};
Graffiti.prototype.onRemove = function() {
  this.content_.parentNode.removeChild(this.content_);
  this.content_ = null;
};

module.exports = Graffiti;
