import React,{useContext} from 'react'
import module from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import AuthContext from '../Context/AuthContext'

export default function Navbar() {
  const {logout}=useContext(AuthContext)
  return (
    <div className={module.navbar}>
        <ul>
            <NavLink to="/" style={{ textDecoration: 'none', color:'#8a8a8d' }}><li className={module.logo}><a className={module.navlink}>KALABASI</a>
            <i className="bi bi-arrow-right" style={{"textAlign":"right"}}></i>
            </li></NavLink>
            <NavLink to="/" style={{ textDecoration: 'none', color:'#8a8a8d' }}><li className={module.navitem}><i className="bi bi-graph-up fa-5x"></i><a className={module.navlink}>Homepage</a></li></NavLink>
            <NavLink to="/addinvoice" style={{ textDecoration: 'none', color:'#8a8a8d' }}><li className={module.navitem}><i className="bi bi-plus"></i><a className={module.navlink}>Add Invoice</a></li></NavLink>
            <NavLink to="/invoices" style={{ textDecoration: 'none', color:'#8a8a8d' }}><li className={module.navitem}><i className="bi bi-stack"></i><a className={module.navlink}>Invoices</a></li></NavLink>
            <NavLink to="/clients" style={{ textDecoration: 'none', color:'#8a8a8d' }}><li className={module.navitem}><i className="bi bi-person-fill"></i><a className={module.navlink}>Clients</a></li></NavLink>
            <NavLink to="/products" style={{ textDecoration: 'none', color:'#8a8a8d' }}><li className={module.navitem}><i className="bi bi-folder-fill"></i><a className={module.navlink}>Products</a></li></NavLink>
            <li className={`${module.navitem} ${module.profile}`}><i class="bi bi-person-circle"></i><a className={module.navlink}>Products</a>
            <ul>
            <NavLink to="/profile" style={{ textDecoration: 'none', color:'#8a8a8d' }}>
              <li>
              <i class="bi bi-gear"></i>
              <a className={module.navlink}>Profile</a>
              </li>
              </NavLink>
              <NavLink to="/" style={{ textDecoration: 'none', color:'#8a8a8d' }} onClick={()=>logout() }>
              <li>
              <i class="bi bi-power"></i>
              <a className={module.navlink}>Logout</a>
              </li>
              </NavLink>
            </ul>
            </li>
        </ul>
    </div>
  )
}
