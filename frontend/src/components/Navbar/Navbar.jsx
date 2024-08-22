import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu]  = useState("home");
    const [searchTerm, setSearchTerm] = useState(""); // State to hold search term
    const [isSearchVisible, setIsSearchVisible] = useState(false); // State to toggle search input visibility

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);
    
    const navigate = useNavigate();

    const logout = () => {
      localStorage.removeItem("token");
      setToken("");
      navigate("/")
    }
    
    const handleSearch = (e) => {
      e.preventDefault();
      if (searchTerm) {
        // Navigate to the search results page with the search term as a query parameter
        navigate(`/search?query=${searchTerm}`);
      }
    };


  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile-app</a>
        <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact-us</a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          {/* Toggle search input visibility on search icon click */}
          <img src={assets.search_icon} alt="Search" onClick={() => setIsSearchVisible(!isSearchVisible)} />
          {isSearchVisible && (
            <form onSubmit={handleSearch} className="navbar-search-form">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Go</button>
            </form>
          )}
        </div>
        <Link to='/cart'><img src={assets.basket_icon} alt="Cart" /></Link>
        <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
          : <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="Logout" /><p>Logout</p></li>
            </ul>
          </div>}
      </div>
    </div>
  );
};

export default Navbar;