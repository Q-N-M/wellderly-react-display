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
import question_mark from "../statics/question-mark.jpg";

class FetchAPI extends Component {

    constructor(props){
        super(props);
        this.url = props.url;
        this.state = {
            data: null,
            isFetching: false,
            isFetched: false,
            divCardWrapper: "#024773",
            cardWrapperBackground: "grey",
            cardWrapperBorder: "",
            listOfUsersEmoji: {},
            total_data: 0,
            highest_percentage_of_emoji: ""
        };
        if(props.dummy === "true" || props.dummy == null){
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
        }else{
            let date = new Date();
            this.current_date = date.getFullYear().toString() + "-" + (date.getMonth()+1).toString() + "-" + date.getDate().toString();
        }
    }

    // Code to be called when the cards are swiped
    onSwipe(data){
        if(data === "show-full-info"){

            // Remove the <CardWrapper>
            document.getElementById("divBackground").remove();

            let fullInfoDomObject = document.getElementById("fullInfo");
            
            // Create chart with Chart.js
            let chartCanvas = document.createElement("canvas");
            chartCanvas.id = "fullChart";
            // chartCanvas.style.width = "50%";
            // chartCanvas.style.height = "100%";
            fullInfoDomObject.appendChild(chartCanvas);

            // Append the script for the chart into body
            let chartCanvasScript = document.createElement("script");
            chartCanvasScript.innerHTML = `
            var xValues = ["Happy", "Down", "Angry", "Neutral", "Ecstatic"];
            var yValues = [${this.state.data[0].split(":")[1]}, ${this.state.data[1].split(":")[1]}, ${this.state.data[2].split(":")[1]}, ${this.state.data[3].split(":")[1]}, ${this.state.data[4].split(":")[1]}];
            var barColors = [
            "rgba(146, 222, 127, 1)",
            "rgba(149, 197, 236, 1)",
            "rgba(245, 136, 136, 1)",
            "rgba(245, 221, 136, 1)",
            "rgba(126, 207, 199, 1)"
            ];

            new Chart("fullChart", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                backgroundColor: barColors,
                data: yValues
                }]
            },
            options: {
                legend: {display: false},
                scales: {
                yAxes: [{
                    ticks: {
                    beginAtZero: true
                    }
                }],
                }
            }
            });`;
            document.body.appendChild(chartCanvasScript);
            document.body.style.background = "white";

            // After 20 seconds, reload the page
            setTimeout(() => {window.location.reload()}, 15000);

        }else{
            if(data === "last"){
                data = this.state.highest_percentage_of_emoji;
            }
            this.state.divCardWrapper = this.getStyleBasedOnEmoji(data)["background"]["background"];
            this.state.cardWrapperBackground = this.getStyleBasedOnEmoji(data)["card-wrapper-div"]["background"];
            this.state.cardWrapperBorder = this.getStyleBasedOnEmoji(data)["card-wrapper-div"]["border"];
            document.body.style.background = this.state.divCardWrapper;
            document.getElementById("divBackground").style.background = this.state.divCardWrapper;
            // <CardWrapper> has a class name called cards_container
            document.getElementsByClassName("cards_container")[0].style.background = this.state.cardWrapperBackground;
            document.getElementsByClassName("cards_container")[0].style.border = this.state.cardWrapperBorder;
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
            this.setState({...this.state, isFetching: true, isFetched: false});
            fetch(this.url, {
                method: "GET"
            }).then(
                response => response.json()
            ).then(result => {
                    this.setState({...this.state, listOfUsersEmoji: result, isFetching: false, isFetched: true})
                }
            );
        } catch (e) {
            console.log(e);
            this.setState({...this.state, isFetching: false, isFetched: false});
        }
    }

    /**
     * 
     * @param {string} emoji code name
     * @returns image path for respective emoji
     */
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

    /**
     * 
     * @param {string} emoji string
     * @returns CSS font color for each emoji for the card
     */
    getEmotionCode(emoji){
        if(emoji === "Ecstatic"){
            return ["#09887B", "ecstatic"];
        }else if(emoji === "Happy"){
            return ["#5D9D47", "happy"];
        }else if(emoji === "Neutral"){
            return ["#BA8B2E", "neutral"];
        }else if(emoji === "Sad"){
            return ["#486991", "down"];
        }else if(emoji === "Angry"){
            return ["#B13D3D", "angry"];
        }
    }

    /**
     * 
     * @param {string} code is APIs emoji name
     * @returns the next 'emoji' name for the card wrapper
     */
    getNextEmojiCodeToName(code){
        if(code === "emoji_1_data"){
            return "emoji_2_data";
        }else if(code === "emoji_2_data"){
            return "emoji_3_data";
        }else if(code === "emoji_3_data"){
            return "emoji_4_data";
        }else if(code === "emoji_4_data"){
            return "emoji_5_data";
        }else{
            return "last";
        }
    }

    /**
     * 
     * @param {string} code 
     * @returns translated Emoji type from the APIs code name
     */
    parseEmojiCodeToName(code){
        if(code === "emoji_1_data"){
            return "Happy";
        }else if(code === "emoji_2_data"){
            return "Sad";
        }else if(code === "emoji_3_data"){
            return "Angry";
        }else if(code === "emoji_4_data"){
            return "Neutral";
        }else if(code === "emoji_5_data"){
            return "Ecstatic";
        }
    }

    getStyleBasedOnEmoji(code){
        if(code === "emoji_1_data"){
            return {
                "background" : {
                    background: "#92DE7F"
                },
                "card-wrapper-div" : {
                    background: "#5D9D47",
                    border: "12px solid #315827"
                },
            };
        }else if(code === "emoji_2_data"){
            return {
                "background" : {
                    background: "#95C5EC"
                },
                "card-wrapper-div" : {
                    background: "#486991",
                    border: "12px solid #193D67"
                },
            };
        }else if(code === "emoji_3_data"){
            return {
                "background" : {
                    background: "#F58888"
                },
                "card-wrapper-div" : {
                    background: "#B13D3D",
                    border: "12px solid #881313"
                },
            };
        }else if(code === "emoji_4_data"){
            return {
                "background" : {
                    background: "#F5DD88"
                },
                "card-wrapper-div" : {
                    background: "#BA8B2E",
                    border: "12px solid #8D591B"
                },
            };
        }else if(code === "emoji_5_data"){
            return {
                "background" : {
                    background: "#7ECFC7"
                },
                "card-wrapper-div" : {
                    background: "#09887B",
                    border: "12px solid #08534B"
                },
            };
        }else{
            return {
                "background" : {
                    background: "#7ECFC7"
                },
                "card-wrapper-div" : {
                    background: "#09887B",
                    border: "12px solid #08534B"
                },
            };
        }
    }

    getQuestionMark(){
        return question_mark;
    }

    renderCards(){
        const data = new Map(Object.entries(this.state.listOfUsersEmoji[this.current_date]));
        const parsedData = [];
    
        console.log(data);
        let highest_emoji_percentage = "";
        let highest_percentage = 0;
        let total = 0;

        data.forEach((result, emoji) => {
            if(emoji.includes("emoji")){
                parsedData.push(emoji+":"+result[0].toString()+":"+result[1].toString());
                if(result[1] >= highest_percentage){
                    highest_emoji_percentage = emoji;
                    highest_percentage = result[1];
                }
            }
            if(emoji.includes("total_data")){
                this.state.total_data = result;
            }
        })

        this.state.data = parsedData;
        this.state.highest_percentage_of_emoji = highest_emoji_percentage;

        const imageStyle = {
            width: "50%",
            height: "auto",
        }

        return parsedData.map((data) => {
                return (
                    <Card onSwipe={this.onSwipe.bind(this, this.getNextEmojiCodeToName(data.split(":")[0]))} style={{textAlign: "center", background: "#FFFFFF", border: "10px solid #BABABA", borderRadius: "25px"}}>
                        <div id='separator' style={{height: "25%"}}>&nbsp;</div>
                        <div>
                            <img src={this.getEmoji(this.parseEmojiCodeToName(data.split(":")[0]))} style={imageStyle}></img>
                            <div id="separator">&nbsp;</div>
                            <b>{data.split(":")[1]}% of {this.state.total_data} ({data.split(":")[2]} of {this.state.total_data})</b>
                            <br />
                            feels <font style={{color: this.getEmotionCode(this.parseEmojiCodeToName(data.split(":")[0]))[0]}}>{this.getEmotionCode(this.parseEmojiCodeToName(data.split(":")[0]))[1]}</font> today
                        </div>
                    </Card>
                );
            }
        );
    }

    render() {

        const imageStyle = {
            width: "50%",
            height: "auto",
        }

        if(this.state.isFetching){
            return(<>RENDERING....</>);
        }else{
            if(this.state.isFetched){
                return (
                    <>
                        <div id="divBackground" style={{background: this.state.divCardWrapper}}>
                            <CardWrapper style={{width: "60%", border: this.state.cardWrapperBorder, background: this.state.cardWrapperBackground, marginLeft: "auto", marginRight: "auto"}}>
                                <Card onSwipe={this.onSwipe.bind(this, "emoji_1_data")} style={{textAlign: "center", background: "#FFFFFF", border: "10px solid #BABABA", borderRadius: "25px"}}>
                                    <div style={{height: "20%"}}>&nbsp;</div>
                                    {/* <!-- Image reference : https://www.vecteezy.com/vector-art/442722-question-mark-vector-icon --> */}
                                    <img style={{width: "50%", height: "50%"}} src={this.getQuestionMark()} />
                                    <div style={{height: "20%"}}>&nbsp;</div>
                                    <a href="https://www.vecteezy.com/vector-art/442722-question-mark-vector-icon">vecteezy</a>
                                </Card>
                                {this.renderCards()}
                                <Card onSwipe={this.onSwipe.bind(this, "show-full-info")} style={{textAlign: "center", background: "#FFFFFF", border: "10px solid #BABABA", borderRadius: "25px"}}>
                                    <div style={{height: "10%"}}>&nbsp;</div>
                                    <div style={{fontFamily: "space-mono"}}>
                                        <b>
                                        You are looking at
                                        <br />
                                        elderlies' emotions of
                                        <br />
                                        the display
                                        <br /><br />
                                        Elderlies in your area
                                        <br />
                                        feel <b>{this.parseEmojiCodeToName(this.state.highest_percentage_of_emoji)}</b> today
                                        <br />
                                        <br />
                                        <img src={this.getEmoji(this.parseEmojiCodeToName(this.state.highest_percentage_of_emoji))} style={imageStyle} />
                                        <br />
                                        <br />
                                        Wellderly
                                        </b>
                                    </div>
                                </Card>
                            </CardWrapper>
                        </div>
                        <div id="fullInfo" style={{justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%"}}>
                        </div>
                    </>
                );
            }else{
                return(<>RENDERING</>);
            }
        }
    }
}

export default FetchAPI;
