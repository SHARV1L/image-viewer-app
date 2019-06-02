import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import './Login.css';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Home from '../../screens/home/Home';
import {Link} from 'react-router-dom';

class Login extends Component{
    constructor(){
        super();
        this.state={username:"",
    password:"",
reqUsername:"dispNone",
reqPassword:"dispNone",
helpertext:"required",
accessToken:"8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784",
loggedIn:"false"
}
    }

    inputUsernameHandler=(e)=>{
    this.setState({username:e.target.value})
    }
    inputPasswordHandler=(e)=>{
    this.setState({password:e.target.value})
    }
    loginButtonHandler=()=>{
        var username="himadri";
        var password="hello123";
       // var accessToken="8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784";
        this.state.username===""?this.setState({reqUsername:"dispBlock" , helpertext:"required"}):this.setState({reqUsername:"dispNone"});
        this.state.password===""?this.setState({reqPassword:"dispBlock" , helpertext:"required"}):this.setState({reqPassword:"dispNone"});
        
        if(this.state.username!==""&&this.state.password!=="")
        {
            
           
            if(this.state.username===username&&this.state.password===password)
            {
               // ReactDOM.render(<Home userDetails={this.state}/>,document.getElementById('root'));
               this.props.history.push({pathname:'/home'});
               sessionStorage.setItem('access-token', this.state.accessToken);
               this.setState({ loggedIn: true });
            }
           else{
             this.setState({helpertext:"Incorrect Username/Password",reqPassword:"dispBlock"});
           }
        }
        

    }
    render(){
        return(
         <div>
             <div><Header/></div>
            <div>
                <Card className="cardStyle">
                    <CardContent>
                       <Typography variant="headline" component='h2' className="login">LOGIN </Typography>
                       <FormControl required className="formControl">
                           <InputLabel htmlFor="username">Username</InputLabel>
                           <Input id="username" type="text" username={this.state.username} onChange={this.inputUsernameHandler}/>
                         <FormHelperText className={this.state.reqUsername}><span className="red">{this.state.helpertext}</span></FormHelperText>

                       </FormControl> <br/>
                       <FormControl required className="formControl">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id="password" type="password" password={this.state.password} onChange={this.inputPasswordHandler}/>
                       <FormHelperText className={this.state.reqPassword}><span className="red">{this.state.helpertext}</span></FormHelperText>
                      </FormControl><br/><br/>
                      <Button className ="pointer"variant="contained" color="primary" onClick={this.loginButtonHandler} >LOGIN</Button>
                    </CardContent>
                </Card>
            </div>
         </div>   
        )
    }
} 
export default Login;