const Apify = require('apify');
const mailgun = require('mailgun-js');
const request = require('request-promise');
const typeCheck = require('type-check').typeCheck;
const sleep = require('sleep');
const _ = require('underscore');

// Input data attributes types
const INPUT_TYPES = `{
        to: String,
        subject: String,
        text: String,
        isMock: Maybe Boolean,
        cc: Maybe String,
        bcc: Maybe String,
        actId: Maybe String,
        _id: Maybe String,
    }`;
// Allowed mail attributes
const MAIL_ATTRIBUTES = ['to', 'subject', 'text', 'cc', 'bcc'];

Apify.main(async () => {
    // Gets input of your act
    let input = await Apify.getValue('INPUT');
if (!input) {
    throw new Error('Input is missing!');
}
// Data from crawler finish webhook was in input.data JSON string
if (input.data) {
    input = Object.assign(input, JSON.parse(input.data));
    delete input.data;
}else if(input){
    input = JSON.parse(input);
}

// Checks input
if (!typeCheck(INPUT_TYPES, input)) {
    console.log(`Invalid input:\n${JSON.stringify(input)}\nData types:\n${INPUT_TYPES}\nAct failed!`);
    throw new Error('Invalid input data');
}
// Sends mail
const mail = _.pick(input, MAIL_ATTRIBUTES);
mail.from = 'Apifier Mailer <postmaster@apify-mailer.com>';

if (input.isMock) {
    console.log(`Mail:\n${JSON.stringify(mail)}`)
} else {
    const sender = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    });
    const senderBody = await sender.messages().send(mail);
    console.log(`Email with id ${senderBody.id} was send to ${mail.to}.`);
}
// Sleeps act for 10s
// NOTE: We use sleep to avoid instant usage
sleep.sleep(10);
});