import React from 'react'
import { Settings } from '../src/components/Settings'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

test('Settings form has two password fields', () => {
  const user = {uid: 'g1534fip1s', email: 'kate@kateray.net'}
  const form = shallow(
    <Settings user={user}/>
  )

  expect(form.find('input[type="password"]').length).toEqual(2)
})
