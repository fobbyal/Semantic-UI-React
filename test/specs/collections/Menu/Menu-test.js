import React from 'react'

import Menu from 'src/collections/Menu/Menu'
import MenuItem from 'src/collections/Menu/MenuItem'
import MenuHeader from 'src/collections/Menu/MenuHeader'
import MenuMenu from 'src/collections/Menu/MenuMenu'
import * as common from 'test/specs/commonTests'
import { sandbox } from 'test/utils'

describe('Menu', () => {
  common.isConformant(Menu)
  common.hasUIClassName(Menu)
  common.hasSubComponents(Menu, [MenuHeader, MenuItem, MenuMenu])

  common.implementsWidthProp(Menu, { propKey: 'widths', canEqual: false })
  common.propKeyOrValueAndKeyToClassName(Menu, 'attached')
  common.propKeyOnlyToClassName(Menu, 'borderless')
  common.propValueOnlyToClassName(Menu, 'color')
  common.propKeyOnlyToClassName(Menu, 'compact')
  common.propKeyAndValueToClassName(Menu, 'fixed')
  common.propKeyOrValueAndKeyToClassName(Menu, 'floated')
  common.propKeyOnlyToClassName(Menu, 'fluid')
  common.propKeyOrValueAndKeyToClassName(Menu, 'icon')
  common.propKeyOnlyToClassName(Menu, 'inverted')
  common.propKeyOnlyToClassName(Menu, 'pagination')
  common.propKeyOnlyToClassName(Menu, 'pointing')
  common.propKeyOnlyToClassName(Menu, 'secondary')
  common.propKeyOnlyToClassName(Menu, 'stackable')
  common.propKeyOrValueAndKeyToClassName(Menu, 'tabular')
  common.propKeyOnlyToClassName(Menu, 'text')
  common.propValueOnlyToClassName(Menu, 'size')
  common.propKeyOnlyToClassName(Menu, 'vertical')

  common.rendersChildren(Menu)

  it('renders a `div` by default', () => {
    shallow(<Menu />)
      .should.have.tagName('div')
  })

  describe('activeIndex', () => {
    const items = [
      { name: 'home' },
      { name: 'users' },
    ]

    it('is null by default', () => {
      shallow(<Menu items={items} />)
        .should.not.have.descendants('.active')
    })

    it('is set when clicking an item', () => {
      const wrapper = mount(<Menu items={items} />)

      wrapper
        .find('MenuItem')
        .at(1)
        .simulate('click')

      // must re-query for the menu items or we get a cached copy
      wrapper
        .find('MenuItem')
        .at(1)
        .should.have.prop('active', true)
    })
  })

  describe('items', () => {
    const spy = sandbox.spy()
    const items = [
      { name: 'home', onClick: spy, 'data-foo': 'something' },
      { name: 'users', active: true, 'data-foo': 'something' },
    ]
    const children = mount(<Menu items={items} />).find('MenuItem')

    it('renders children', () => {
      children.first().should.have.prop('name', 'home')
      children.last().should.have.prop('name', 'users')
    })

    it('onClick can omitted', () => {
      const click = () => children.last().simulate('click')
      expect(click).to.not.throw()
    })

    it('passes onClick handler', () => {
      const event = { target: null }
      const props = { name: 'home', index: 0 }

      children.first().simulate('click', event)

      spy.should.have.been.calledOnce()
      spy.should.have.been.calledWithMatch(event, props)
    })

    it('passes arbitrary props', () => {
      children.everyWhere(item => item.should.have.prop('data-foo', 'something'))
    })
  })

  describe('onItemClick', () => {
    const items = [
      { name: 'home' },
      { name: 'users' },
    ]

    it('can be omitted', () => {
      const click = () => mount(<Menu items={items} />).find('MenuItem').first().simulate('click')

      expect(click).to.not.throw()
    })

    it('is called with (e, { name, index }) when clicked', () => {
      const spy = sandbox.spy()
      const event = { target: null }
      const props = { name: 'home', index: 0 }

      mount(<Menu items={items} onItemClick={spy} />).find('MenuItem').first()
        .simulate('click', event)

      spy.should.have.been.calledOnce()
      spy.should.have.been.calledWithMatch(event, props)
    })
  })
})
