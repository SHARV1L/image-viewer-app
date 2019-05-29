import React,{Component} from 'react';
import './Header.css';
class Header extends Component{
    render(){
        return(
            <div>
                <header className='appHeader'>
                 <div className='appLogo'>IMAGE VIEWER</div>
                </header>
            </div>
        )
    }
}
export default Header;