**
*
References: -https: //blog.logrocket.com/comprehensive-guide-data-fetching-react/
    *
    /

import React, { Component } from 'react';
import { Card, CardWrapper } from 'react-swipeable-cards';

// Emojies PNG
import angry from "../statics/Angry.png";
import flat from "../statics/Flat.png";
import happy from "../statics/Happy.png";
import sad from "../statics/Sad.png";
import smile from "../statics/Smile.png";

class FetchAPI extends Component {

    constructor(props) {
        super(props);
        this.url = props.url;
        this.state = {
            isFetching: false,
            isFetched: false,
            cardWrapperBackground: "#024773",
            cardWrapperDivBackground: "",
            cardWrapperDivBorder: "",
            listOfUsersEmoji: {}
        };
        if (props.dummy === "true" || props.dummy == null) {
            this.current_date = "2022-10-05";
            this.state.listOfUsersEmoji = {
                "2022-10-05": {
                    "emoji_1_data": 50.0,
                    "emoji_2_data": 21.428571428571427,
                    "emoji_3_data": 14.285714285714285,
                    "emoji_4_data": 7.142857142857142,
                    "emoji_5_data": 7.142857142857142,
                    "total_data": 14
                }
            };
            this.state.isFetched = true;
        } else {
            // let date = new Date();
            // this.current_date = date.getFullYear().toString() + "-" + (date.getMonth()+1).toString() + "-" + date.getDate().toString();
            this.current_date = "2022-10-05";
        }
    }

    componentDidMount() {
        this.fetchUsers();
        //this.timer = setInterval(() => this.fetchUsers(), 5000);
    }

    // componentWillUnmount() {
    //     clearInterval(this.timer);
    //     this.timer = null;
    // }

    async fetchUsers() {
        try {
            this.setState({...this.state, isFetching: true, isFetched: false });
            fetch(this.url, {
                method: "GET"
            }).then(
                response => response.json()
            ).then(result => {
                this.setState({...this.state, listOfUsersEmoji: result, isFetching: false, isFetched: true })
            });
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false, isFetched: false });
        }
    }

    getEmoji(emoji) {
        if (emoji === "Ecstatic") {
            return happy;
        } else if (emoji === "Happy") {
            return smile;
        } else if (emoji === "Neutral") {
            return flat;
        } else if (emoji === "Sad") {
            return sad;
        } else if (emoji === "Angry") {
            return angry;
        }
    }

    getEmotionCode(emoji) {
        if (emoji === "Ecstatic") {
            return ["#09887B", "ecstatic"];
        } else if (emoji === "Happy") {
            return ["#5D9D47", "happy"];
        } else if (emoji === "Neutral") {
            return ["#BA8B2E", "neutral"];
        } else if (emoji === "Sad") {
            return ["#486991", "down"];
        } else if (emoji === "Angry") {
            return ["#B13D3D", "angry"];
        }
    }

    parseEmojiCodeToName(code) {
        if (code === "emoji_1_data") {
            return "Happy";
        } else if (code === "emoji_2_data") {
            return "Sad";
        } else if (code === "emoji_3_data") {
            return "Angry";
        } else if (code === "emoji_4_data") {
            return "Neutral";
        } else if (code === "emoji_5_data") {
            return "Ecstatic";
        }
    }

    getStyleBasedOnEmoji(code) {
        if (code === "emoji_1_data") {
            return {
                "background": {
                    background: "#92DE7F"
                },
                "card-wrapper-div": {
                    background: "#5D9D47",
                    border: "12px solid #315827"
                },
            };
        } else if (code === "emoji_2_data") {
            return {
                "background": {
                    background: "#95C5EC"
                },
                "card-wrapper-div": {
                    background: "#486991",
                    border: "12px solid #193D67"
                },
            };
        } else if (code === "emoji_3_data") {
            return {
                "background": {
                    background: "#F58888"
                },
                "card-wrapper-div": {
                    background: "#B13D3D",
                    border: "12px solid #881313"
                },
            };
        } else if (code === "emoji_4_data") {
            return {
                "background": {
                    background: "#F5DD88"
                },
                "card-wrapper-div": {
                    background: "#BA8B2E",
                    border: "12px solid #8D591B"
                },
            };
        } else if (code === "emoji_5_data") {
            return {
                "background": {
                    background: "#7ECFC7"
                },
                "card-wrapper-div": {
                    background: "#09887B",
                    border: "12px solid #08534B"
                },
            };
        } else {
            return false;
        }
    }

    renderCards() {

        const data = new Map(Object.entries(this.state.listOfUsersEmoji[this.current_date]));
        const parsedData = [];
        data.forEach((result, emoji) => {
            if (emoji.includes("emoji")) {
                parsedData.push(emoji + ":" + result.toString());
            }
        })

        const imageStyle = {
            width: "50%",
            height: "auto",
        }

        return parsedData.map((data) => {
            return ( <
                Card style = {
                    { textAlign: "center", background: "#FFFFFF", border: "10px solid #BABABA", borderRadius: "25px" }
                } >
                <
                div id = 'separator'
                style = {
                    { height: "25%" }
                } > & nbsp; < /div> <
                div >
                <
                img src = { this.getEmoji(this.parseEmojiCodeToName(data.split(":")[0])) }
                style = { imageStyle } > < /img> <
                div id = "separator" > & nbsp; < /div> <
                b > { data.split(":")[1] } % of ? < /b> <
                br / >
                feels < font style = {
                    { color: this.getEmotionCode(this.parseEmojiCodeToName(data.split(":")[0]))[0] }
                } > { this.getEmotionCode(this.parseEmojiCodeToName(data.split(":")[0]))[1] } < /font> today < /
                div > <
                /Card>
            );
        });
    }

    render() {

            if (this.state.isFetching) {
                return ( < > RENDERING.... < />);
                }
                else {
                    if (this.state.isFetched) {
                        return ( <
                            CardWrapper style = {
                                { background: this.getStyleBasedOnEmoji(data.split(":")[0]) }
                            } > { this.renderCards() } <
                            /CardWrapper>
                        );
                    } else {
                        return ( < > RENDERING < />);
                        }
                    }
                }
            }

            export default FetchAPI;