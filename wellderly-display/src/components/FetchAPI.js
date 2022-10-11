/**
 * References : - https://blog.logrocket.com/comprehensive-guide-data-fetching-react/
 */

import React, { Component } from 'react';
import { Card, CardWrapper } from 'react-swipeable-cards';

// Emojies PNG
import angry from "../statics/Angry.png";
import flat from "../statics/Flat.png";
import happy from "../statics/Happy.png";
import sad from "../statics/Sad.png";
import smile from "../statics/Smile.png";

class FetchAPI extends Component {

    constructor(props){
        super(props);
        this.url = props.url;
        this.state = {
            isFetching: false,
            listOfUsersEmoji: []
        };
        if(props.dummy === "true"){
            this.state.listOfUsersEmoji = [{
                "id": 1,
                "name": "New Test",
                "emoji": 1,
                "date": "2022-10-04"
            },
            {
                "id": 2,
                "name": "New Test 1",
                "emoji": 2,
                "date": "2022-10-04"
            }];
        }
    }

    // componentDidMount() {
    //     this.fetchUsers();
    //     this.timer = setInterval(() => this.fetchUsers(), 5000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.timer);
    //     this.timer = null;
    // }

    async fetchUsers() {
        try {
            this.setState({...this.state, isFetching: true});
            fetch(this.url, {
                method: "GET"
            }).then(
                response => response.json()
            ).then(result => {
                    this.setState({listOfUsersEmoji: result, isFetching: false})
                }
            );
            this.setState({users: response.data, isFetching: false});
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false});
        }
    }

    getEmoji(emoji) {
        if(emoji === "Ecstatic"){
            return happy;
        }else if(emoji === "Happy"){
            return smile;
        }else if(emoji === "Neutral"){
            return flat;
        }else if(emoji === "Sad"){
            return sad;
        }else if(emoji === "Angry"){
            return angry;
        }
    }

    parseEmojiCodeToName(code){
        if(code === 1){
            return "Happy";
        }else if(code === 2){
            return "Sad";
        }else if(code === 3){
            return "Angry";
        }else if(code === 4){
            return "Neutral";
        }else if(code === 5){
            return "Ecstatic";
        }
    }

    renderCards(){
        const imageStyle = {
            width: "50%",
            height: "auto",
        }

        const cardStyle = {
            textAlign: "center",
            backgroundColor: "#059FFF"
        }

        return this.state.listOfUsersEmoji.map((user) => {
            return (
                <Card key={user.id} style={cardStyle}>
                    <div id='separator' style={{height: "25%"}}>&nbsp;</div>
                    <div>
                        <img src={this.getEmoji(this.parseEmojiCodeToName(user.emoji))} style={imageStyle}></img>
                        <div id="separator">&nbsp;</div>
                        {user.date}
                    </div>
                </Card>
            );
            }
        );
    }

    render() {
        const wrapperStyle = {
            backgroundColor: "#024773"
          }

        return (
            <CardWrapper style={wrapperStyle}>
                {this.renderCards()}
            </CardWrapper>
        );
    }
}

export default FetchAPI;