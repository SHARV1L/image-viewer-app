import React,{Component} from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import {Link} from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography, IconButton, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Input from '@material-ui/core/Input';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Favorite from '@material-ui/icons/Favorite';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

//import * as moment from 'moment';


class Home extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            userDetails:[{}],
            allPosts:null,
            filteredUserPosts:null,
            access_token:sessionStorage.getItem('access-token')
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
        
        let userData1=null;
        let xhr1 = new XMLHttpRequest();
        xhr1.addEventListener("readystatechange", function(){
            if(this.readyState===4)
            {
                console.log(JSON.parse(this.responseText));
               const data =JSON.parse(this.responseText).data
                that.setState({allPosts:[...data],
                filteredUserPosts:[...data]});
            
            }
        })
        xhr1.open("GET",this.props.baseUrl+"media/recent?access_token=8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784");
        xhr1.send(userData1);
    }
// search Filter
    applyFilter = (e) => {
        const _searchText = (e.target.value).toLowerCase();
        let _userPosts = JSON.parse(JSON.stringify(this.state.allPosts));
        let _filteredPosts = [];
        if(_userPosts !== null && _userPosts.length > 0){
            _filteredPosts = _userPosts.filter((post) => 
                 (post.caption.text.split('\n')[0].toLowerCase()).indexOf(_searchText) > -1 
            );
            this.setState({
                filteredUserPosts: [..._filteredPosts]
            });
        }}
// formatting date
   //  getDate = (milliseconds)  => {
       //     return moment(new Date(parseInt(milliseconds))).format('DD/MM/YY HH:mm:ss');
       // }

//likes 
        likesClickHandler = ( id, index) => {

            let userPosts = JSON.parse(JSON.stringify(this.state.allPosts));
            let filteredPosts = JSON.parse(JSON.stringify(this.state.filteredUserPosts));
    
            if(userPosts !== null && userPosts.length > 0){
    
                // Updating main array
                let updatedPosts =  userPosts.map((post,index) => {
                    if(post.id === id){
                        if (post.user_has_liked) {
                            post.user_has_liked = false;
                            post.likes.count = (post.likes.count) - 1;
                        } else {
                           post.user_has_liked = true;
                           post.likes.count = (post.likes.count) + 1;
                        }
                    }
                    return post;
                });
                
                // Updating filtered array
                if(filteredPosts !== null && filteredPosts.length > 0) {
                    if(filteredPosts[index].user_has_liked ) {
                        filteredPosts[index].user_has_liked = false;
                        filteredPosts[index].likes.count = (filteredPosts[index].likes.count) - 1;
                    } else {
                        filteredPosts[index].user_has_liked = true;
                        filteredPosts[index].likes.count = (filteredPosts[index].likes.count) + 1;
                    }
                } 
                
                // setting updated arrays to state
                this.setState({
                    allPosts: [...updatedPosts],
                    filteredUserPosts: [...filteredPosts]
                });
            }
        }

        //profile handler
        profile_handler=()=>{
            this.props.history.push('/profile');
        }
       // adding comment
       // adding comment
    onAddCommentClicked = (id) => {
        if (this.state.currentComment === "" || typeof this.state.currentComment === undefined) {
          return;
        }
  
        let commentList = this.state.comments.hasOwnProperty(id)?
          this.state.comments[id].concat(this.state.currentComment): [].concat(this.state.currentComment);
  
        this.setState({
          comments:{
            ...this.state.comments,
            [id]:commentList
          },
          currentComment:''
        })
      }
     //writing comment
      commentChangeHandler = (e) => {
        this.setState({
          currentComment:e.target.value
        });
      }

        
    
    render(){
        return(
         <div>   <div><Header  username={this.state.userDetails.username} showSearchIcon="true" showUserPic="true" pic_url={this.state.userDetails.profile_picture} searchHandler={this.applyFilter}/></div>
         <div>
         <Container fixed style={{ 'margin':16}}>
                    <Grid container spacing={2}>                
                        {(this.state.filteredUserPosts || []).map((post, index) => (
                            <Grid item xs={12} sm={6} key={post.id}>
                                <Card className="postcard" key={post.id}>
                                    <CardHeader
                                        avatar={
                                        <Avatar  className="avatar"
                                        alt={post.user.username} 
                                        src={post.user.profile_picture} onClick={this.profile_handler} >
                                        </Avatar>
                                        }
                                        title={post.user.username}
                                        subheader= {post.created_time}
                                    
                                    />
                                    
                                    <CardContent>

                                    <CardMedia
                                        className="media"
                                        image={post.images.standard_resolution.url}
                                        title={(post.caption.text).split('\n')[0]}
                                        style={{ 'height': 300, 'width':'100%'}}
                                    />
                                    <hr className="hr"/>
                                        <Grid container spacing={1} justify="flex-start" alignItems="center">
                                            <Grid item >
                                                <Typography variant="h6">
                                                    {(post.caption.text).split('\n')[0]}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={1} justify="flex-start" alignItems="center">
                                            <Grid item >
                                                {(post.tags || []).map((tag, i) => {
                                                    return <Typography key={i} variant="caption" color="primary"> #{tag}</Typography>
                                                })}
                                            </Grid>
                                        </Grid>

                                        <CardActions disableSpacing>
                                            <Grid container spacing={1} justify="flex-start" alignItems="center">
                                                <Grid item >
                                                    <Favorite className={post.user_has_liked ? 'redColor' : 'greyColor'} onClick={this.likesClickHandler.bind(this, post.id, index)} />
                                                </Grid>
                                                <Grid item >
                                                    <Typography variant="caption">
                                                        {(post.likes.count)} likes
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1} justify="flex-start" alignItems="center">
                                            <Grid item >
                                                {(post.comments.data || []).map((comment, i) => {
                                                    return <Typography key={comment.id} variant="caption" display="block">
                                                        <strong>{comment.comment_by} :</strong> {comment.comment_value}
                                                    </Typography>
                                                })}
                                            </Grid>
                                            
                                        </Grid>
                                        </CardActions>
                                    <div className="rowStyle">
                              <FormControl style={{flexGrow:1}}>
                                <InputLabel htmlFor="comment">Add Comment</InputLabel>
                                <Input id="comment" value={this.state.currentComment} onChange={this.commentChangeHandler}/>
                              </FormControl>
                              <FormControl>
                                <Button onClick={this.onAddCommentClicked}
                                   variant="contained" color="primary">
                                  ADD
                                </Button>
                              </FormControl>
                            </div>
                                    
                                    
                                                    
                                    </CardContent>
                                    
                                </Card>
                            </Grid>
                            ))}
                    </Grid>
                </Container>
         </div>
         
         </div>
        )
    }
}
export default Home;
