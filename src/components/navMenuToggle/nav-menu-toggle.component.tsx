import React from 'react'
import SvgBaricon from '@/icons/bar-icon'
import "./nav-menu-toggle.component.scss"

const NavMenuToggle: React.FC = () => {
  return (
    <div className='nav-menu-toggle'>
      <SvgBaricon width={20} height={20} />
    </div>
  )
}

export default NavMenuToggle
