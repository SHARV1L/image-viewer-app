import React,{Component} from 'react';
import Header from '../../common/header/Header';
import {Link} from 'react-router-dom';

class Home extends Component{
    constructor()
    {
        super();
        this.state={
            userDetails:[{}]
        }
    }
    componentWillMount(){
        let userData=null;
        let xhr = new XMLHttpRequest();
        let that=this;
        xhr.addEventListener("readystatechange",function(){
            if(this.readyState===4)
            {
                console.log(JSON.parse(this.responseText));
                that.setState({userDetails:JSON.parse(this.responseText).data});

            }
        })
        xhr.open("GET",this.props.baseUrl+"?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        //xhr.setRequestHeader("Cache-Control","no-cache");
        xhr.send(userData);
        
    }
    render(){
        return(
         <div>   <div><Header showSearchIcon="true" showUserPic="true"/></div>
         <div>

         </div>
         
         </div>
        )
    }
}
export default Home;