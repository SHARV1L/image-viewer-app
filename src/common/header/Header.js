import React,{Component} from 'react';
import './Header.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';


import Avatar from '@material-ui/core/Avatar';
class Header extends Component{
    render(){
        return(
            <div>
                <header className='appHeader'>
                 <div className='appLogo'>IMAGE VIEWER</div>
                 {this.props.showSearchIcon==="true"? 
            <div className='search-icon'>
              
              <IconButton className="start"><SearchIcon/></IconButton>
              <InputBase id="search" placeholder="Search..." />
              
              
              </div>:""}
           {this.props.showUserPic==="true"?
                <div className="user-pic">
               <Avatar alt="userDP" src="" className="avatar"/>
            </div>:""}
                </header>
            </div>
        )
    }
}
export default Header;