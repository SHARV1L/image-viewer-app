import React,{Component} from 'react';
import './Header.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';


import Avatar from '@material-ui/core/Avatar';
class Header extends Component{
    render(){
        return(
            <div>
                <header className='appHeader'>
                 <div className='appLogo'>IMAGE VIEWER</div>
                 {this.props.showSearchIcon==="true"? 
            
              <div className='search-icon'>
              
              <SvgIcon ><SearchIcon/></SvgIcon>
              <InputBase id="search" placeholder="Search..." />
              </div>:""}
             
             {this.props.showUserPic==="true"?
                <div className="user-pic">
                <IconButton><Avatar alt="userDP" src="" className="avatar"/></IconButton>  
                </div>:""}
            </header>
            </div>
        )
    }
}
export default Header;