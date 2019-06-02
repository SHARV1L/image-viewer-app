import React,{Component} from 'react';
import './Header.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from "@material-ui/icons/Search";
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import {withStyles} from '@material-ui/core/styles';



const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      backgroundColor: '#DFDFDF',
      padding: 8,
      marginTop: 4,
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

 const StyledMenuItem = withStyles(theme => ({
    root: {
      padding: 4,
      minHeight: 'auto',
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);


class Header extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            loggedIn: sessionStorage.getItem('access-token') == null ? false : true,
            accessToken : '8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784',
            open: false,
            anchorEl: null,
            searchText: ''
        };
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }
    
    handleClose = (tab, e) => {
        if( tab === 'profile'){
            this.props.history.push({pathname:'/profile'});
        } 
        if( tab === 'logout') {
            sessionStorage.clear();
            this.props.history.push("/");
        } 
        this.setState({ anchorEl: null });
    };
     
  
       
    render()
    {

        return(
            <div>
                <header className='appHeader'>
                 <div className='appLogo'>IMAGE VIEWER</div>
                 {this.props.showSearchIcon==="true"? 
            
              <div className='search-icon'>
              
              <SvgIcon ><SearchIcon/></SvgIcon>
              <InputBase id="search" placeholder="Search..." onChange={this.props.searchHandler} />
              </div>:""}
             
              
             
             {this.props.showUserPic==="true"?
                
                <div className="user-pic">
                <Avatar alt={this.props.username} src={this.props.pic_url} className="avatar"
                onClick={this.handleClick}
                aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"/>
                 <StyledMenu id="simple-menu" anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.handleClose.bind(this,'')}>
                                    
                                     
                                    <div>
                                    <StyledMenuItem className="menu-item" onClick={this.handleClose.bind(this,'profile')}>
                                      <ListItemText primary="My Account" />
                                    </StyledMenuItem> 
                                    <Divider light /> 
                                    </div>  
                                    <StyledMenuItem className="menu-item" onClick={this.handleClose.bind(this, 'logout')}>
                                      <ListItemText primary="Logout" />
                                    </StyledMenuItem> 
                                </StyledMenu>

                </div>:""} 
            </header>
            </div>
        )
    }
}
export default Header;