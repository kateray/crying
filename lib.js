const _ = require( 'lodash' )

const getPopupPosition = (x, y, popupHeight) => {
  let popupPosition = ''

  const popupWidth = 500
  // Header height + popup above pin
  const fromTop = 80
  // too high
  if (y < (popupHeight + fromTop)) {
    popupPosition = popupPosition + 'top '
  }
  // too right
  if ((window.innerWidth - x) < popupWidth/2) {
    popupPosition = popupPosition + 'right'
  }
  // too left
  if (x < popupWidth/2) {
    popupPosition = popupPosition + 'left'
  }

  return popupPosition
}

const createWebString = (text) => {
  if (text.length > 50) {
    text = text.substring(0,50)
  }
  text = text.replace(/\s/g, '-')
  text = encodeURIComponent(text)
  return text
}

const randId = () => {
  return Math.random().toString(36).substr(2, 5)
}

const validateFields = (f, mode) => {
  let errors = {}

  if (mode === 'login' || mode === 'signup') {
    if (_.isEmpty(f.password)){
      errors['password'] = "Password can't be blank"
    } else if (f.password.length < 6) {
      errors['password'] = "Please use at least 6 characters"
    }
  }

  if (mode === 'signup') {
    if (_.isEmpty(f.passwordConfirm)){
      errors['password'] = "Please confirm your password"
    } else if (f.password !== f.passwordConfirm) {
      errors['password'] = "Passwords don't match"
    }
  }

  if (mode === 'update' && !_.isEmpty(f.password)) {
    if (f.password.length < 6) {
      errors['password'] = "Please use at least 6 characters"
    } else if (f.password !== f.passwordConfirm) {
      errors['password'] = "Passwords don't match"
    }
  }

  if (mode === 'signin' || mode === 'update') {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (_.isEmpty(f.email)){
      errors['email'] = "Email can't be blank"
    } else if (!f.email.match(re)){
      errors['email'] = "Not a valid email"
    }
  }

  return errors
}

const sanitizePinTitle = (text) => {
  return text.replace(/[^\w\s!.,:'&()]/gi, '')
}


module.exports = {
  getPopupPosition: getPopupPosition,
  sanitizePinTitle: sanitizePinTitle,
  createWebString: createWebString,
  randId: randId,
  validateFields: validateFields
}
