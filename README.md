Info Bot
============

In remote areas where cellular 3G connectivity is more difficult to come by, it is often difficult to perform quick online lookups; one example being looking up the short-term weather to inform hiking decisions.

This is a simple client intended to be deployed as a Twilio SMS webhook that performs quick lookups based on a textual query. Backed by an AWS Lambda function, this allows the user to offload the desired network request to a serverless platform.

Sample Utterances
------------
* "Weather in Yosemite"
* "Forecast 36.508, -118.575"
* "Wiki Half Dome"
* "Give me a quotation!"

Key Dependencies
------------
* [claudia-bot-builder](https://github.com/claudiajs/claudia-bot-builder) - A JS framework to help create and deploy chat bots for various platforms (such as Twilio) to [AWS Lambda](https://aws.amazon.com/documentation/lambda/).

#### Installation & Deployment
1. Clone this project.
2. Create an AWS profile named `claudia` (used in package.json scripts) with the following IAM programmatic access permissions.
    - AWSLambdaFullAccess
    - IAMFullAccess
    - AmazonAPIGatewayAdministrator
3. Add the profile keys to `.aws/credentials` ([Reference](https://claudiajs.com/tutorials/installing.html)).
4. Install [node 6.10.*](https://nodejs.org) to match the [Lambda execution environment](http://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html). Use [nvm](https://modernfidelity.github.io/blog/multiple-node-versions-with-brew-and-nvm/) to manage multiple node versions, if needed.
5. Make sure you have [npm](https://www.npmjs.org/) installed globally.
6. In the command prompt run the following commands.
  ```sh
  $ cd `project-directory`
  $ npm install
  ```
4. To create the cluadia configuration.
  ```sh
  $ npm run create
  ```
5. To configure and store Twilio account access keys and tokens into the API Gateway stage variables. This will result with a list of webhooks to the Lambda function that can be called when a message comes into the desired Twilio phone number.
  ```sh
  $ npm run update -- --configure-twilio-sms-bot
  ```

References
------------
* [Claudia Hello World Chatbot](https://claudiajs.com/tutorials/hello-world-chatbot.html)
* [Claudia Bot Builder API](https://github.com/claudiajs/claudia-bot-builder/blob/master/docs/API.md)
* [Create an SMS Bot on AWS Lambda with Claudia](https://www.twilio.com/blog/2016/12/create-an-sms-bot-on-aws-lambda-with-claudia-js.html)
* [AWS JS SDK Configuration](http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/configuring-the-jssdk.html)

Future Work
------------
* Integrate WolframAlpha textual querying
