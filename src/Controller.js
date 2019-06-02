import React,{Component} from 'react';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Profile from './screens/profile/Profile';
import {BrowserRouter as Router,Route} from 'react-router-dom';
class Controller extends Component{
    constructor()
    {
        super();
        this.baseUrl="https://api.instagram.com/v1/users/self/";
    }
    render(){
        return(
            <Router>
                <div>
                    <Route exact path='/' render={(props)=><Login{...props}/>}/>
                    <Route exact path='/home' render={(props)=><Home{...props }baseUrl={this.baseUrl}/>}/>
                    <Route exact path='/profile' render={(props)=><Profile{...props} baseUrl={this.baseUrl}/>}/>
                </div>
                </Router>
        )
    }
}
export default Controller;