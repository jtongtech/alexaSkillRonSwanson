/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = "amzn1.ask.skill.31f45452-a9e1-4587-9007-64e8a094daee";

const SKILL_NAME = 'Ron Says';
const GET_FACT_MESSAGE = " ";
const HELP_MESSAGE = 'You can say what would ron say, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

var fetch = require("node-fetch");
var quoteOutput = "";
var dataStr = '';
var response = {};

function* quoteGenerator() {
	while (true) {
		yield fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    		.then(res => res.json());
 	}
}
var generator = quoteGenerator();

function updateQuote() {
	generator.next().value.then(function (i) {
        quoteOutput = `${i[0]}`;
        dataStr = quoteOutput;
	});
}   
// console.log("updateQuote()", updateQuote);


//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
var data = [
    "Clear alcohols are for rich women on diets.",
    "Crying: acceptable at funerals and the Grand Canyon.",
    "I call this turf ‘n’ turf. It's a 16 oz T-bone and a 24 oz porterhouse. Also, whiskey and a cigar. I am going to consume all of this at the same time because I am a free American.",
    "Under my tutelage, you will grow from boys to men. From men into gladiators. And from gladiators into Swansons.",
    "I'm a simple man. I like pretty, dark-haired women, and breakfast food.",
    "Never half-ass two things. Whole-ass one thing.",
    "[On bowling] Straight down the middle. No hook, no spin, no fuss. Anything more and this becomes figure skating.",
    "I don't want to paint with a broad brush here, but every single contractor in the world is a miserable, incompetent thief.",
    "Fishing relaxes me. It's like yoga, except I still get to kill something.",
    "No home is complete without a proper toolbox. Here's April and Andy's: A hammer, a half eaten pretzel, a baseball card, some cartridge that says Sonic and Hedgehog, a scissor half, a flashlight filled with jellybeans.",
    "Just give me all the bacon and eggs you have. Wait...wait. I worry what you just heard was: Give me a lot of bacon and eggs. What I said was: Give me all the bacon and eggs you have. Do you understand?",
    "When people get a little too chummy with me I like to call them by the wrong name to let them know I don't really care about them.",
    "There's only one thing I hate more than lying: skim milk. Which is water that's lying about being milk.",
    "The government is a greedy piglet that suckles on a taxpayer's teat until they have sore, chapped nipples.",
    "The less I know about other people's affairs, the happier I am. I'm not interested in caring about people. I once worked with a guy for three years and never learned his name. Best friend I ever had. We still never talk sometimes.",
    "When I eat, it is the food that is scared.",
    "My only official recommendations are US Army-issued mustache trimmers, Morton's Salt, and the C.R. Lawrence Fein two inch axe-style scraper oscillating knife blade.",
    "Are you going to tell a man that he can't fart in his own car?",
    "Turkey can never beat cow.",
    "It's always a good idea to demonstrate to your coworkers that you are capable of withstanding a tremendous amount of pain.",
    "There are three acceptable haircuts: high and tight, crew cut, buzz cut.",
    "Capitalism: God's way of determining who is smart and who is poor.",
    "Any dog under fifty pounds is a cat and cats are useless.",
    "Fish, for sport only, not for meat. Fish meat is practically a vegetable.",
    "There is only one bad word: taxes.",
    "History began July 4th, 1776. Anything before that was a mistake.",
    "Cultivating a manly musk puts opponent on notice.",
    "Give a man a fish and feed him for a day. Don't teach a man to fish… and feed yourself. He's a grown man. And fishing's not that hard.",
    "Child labor laws are ruining this country.",
    "Great job, everyone. The reception will be held in each of our individual houses, alone.",
    "America: The only country that matters. If you want to experience other ‘cultures,’ use an atlas or a ham radio.",
    "The key to burning an ex-wife effigy is to dip it in paraffin wax and then toss the flaming bottle of isopropyl alcohol from a safe distance. Do not stand too close when you light an ex-wife effigy.",
    "There are only three ways to motivate people: money, fear, and hunger.",
    "Shorts over six inches are capri pants, shorts under six inches are European.",
    "Friends: one to three is sufficient.",
    "Breakfast food can serve many purposes.",
    "Honor: if you need it defined, you don't have it.",
    "One rage every three months is permitted. Try not to hurt anyone who doesn't deserve it.",
    "Strippers do nothing for me…but I will take a free breakfast buffet anytime, anyplace.",
    "I like saying ‘No,’ it lowers their enthusiasm.",
    "You had me at meat tornado.",
    "There must be a mistake, you've accidentally given me the food that my food eats.",
    "Son, there is no wrong way to consume alcohol.",
    "Keep your tears in your eyes where they belong.",
    "I've cried twice in my life. Once when I was seven and hit by a school bus. And then again when I heard that Li'l Sebastian has passed.",
    "I hate everything.",
    "I love nothing.",
    "I love riddles!",
    "Don't waste energy moving unless necessary.",
    "I'll take that steak to go. Please and thank you.",
    "Creativity is for people with glasses who like to lie.",
    "Children are terrible artists and artists are crooks.",
    "Tom put all my records into this rectangle!",
    "I believe luck is a concept invented by the weak to explain their failures.",
    "What's cholesterol?",
    "People who buy things are suckers.",
    "I'm going to get 12 eggs and part of a dead animal. Dealer's choice. Please and thank you.",
    "What the f*ck is a German muffin?!?",
    "I wanna punch you in the face so bad right now."
];

console.log("data", data)
//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
