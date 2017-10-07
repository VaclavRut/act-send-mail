# act-send-mail

Apify act to send mail.

## Input
```javascript
{
    // Email address of the recipient(s) (e.g. "Apifier <info@apifier.com>")
    // Required
    to: String,
    // Email CC same format as to
    // Required
    cc: String
    // Email BCC same format as to
    bcc: String
    // Email subject
    // Required
    subject: String,
    // Text body of Email
    // Required
    text: String,

}
```

## Usage

### From other Apify act

```javascript
Apify.call({
    'apify/send-mail',
    JSON.stringify({
        to: 'test@apifier.com',
        subject: 'Test from act',
        text: "Email text"
    }),
    {}
});
```

### From Apify Crawler finish webhook

For a specific crawler set the following parameters:

#### Finish webhook URL (finishWebhookUrl)

https://api.apifier.com/v2/acts/apify~send-mail/runs?token=APIFIER_API_TOKEN
You can find your API token on your Apifier account page.

#### Finish webhook data (finishWebhookData)

```json
{
    "to": "test@apifier.com",
    "subject": "Test from crawler",
    "text": "Text"
}
