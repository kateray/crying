import _ from 'lodash'

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
  this.button_ = button
  content.setAttribute('contenteditable', true)
  content.className = 'floating-text';
  this.content_ = content;
  parent = this.parent_
  content.addEventListener("keydown", function(e){
    e.stopPropagation()
  })
  content.addEventListener("keypress", function(e){
    e.stopPropagation()
    if (e.keyCode == 13){
      if (!_.isEmpty(this.textContent)){
        parent.props.closePopups()
      }
      e.preventDefault()
      return false
    }
  });
  content.addEventListener("mousedown", function(e){
    e.stopPropagation()
  });
  content.addEventListener("keyup", parent.props.titleChanged);
  button.innerHTML = 'save'
  button.className = 'save-text'
  if (_.isEmpty(this.text_)){
    button.disabled = true
  }
  button.addEventListener("click", function(e){
    parent.props.closePopups()
  })
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(form);
  this.content_.innerHTML = this.text_;
  this.focusCaret()
};
Graffiti.prototype.updateText = function(text){
  this.text_ = text;
  if (this.button_){
    if (_.isEmpty(text)){
      this.button_.disabled = true
    } else {
      this.button_.disabled = false
    }
  }
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
