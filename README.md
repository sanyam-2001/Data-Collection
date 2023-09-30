

# Atlan Daisy Challenge Solution

Steps to Set Up: 



* Run **npm install**
* Open a 2 CMDs 
    * One for Server for API’s
    * One for Execution Service
* Commands
    * npm run dev (starts API Server in Dev Mode)
    * npm run dev-es (starts Execution Service in Dev Mode)
    * npm start (start API Server in Standalone mode)
    * npm run start-es (start Execution Service in standalone mode)

Postman Link: [https://elements.getpostman.com/redirect?entityId=14285336-29e20c91-1684-4e8e-becd-adb5981a4c29&entityType=collection](https://elements.getpostman.com/redirect?entityId=14285336-29e20c91-1684-4e8e-becd-adb5981a4c29&entityType=collection)


# Problem Statement Interpretation



* Forms,with Questions are used in the process of data collection
* After a user fills the form, the responses hit the datastore
* There is some post submission logic that needs to be executed

**These Post Submission Business Logic Use Cases  are called as <span style="text-decoration:underline;">Actions </span>in my Implementation**

**To Do**



* Create a Schematic of Forms, Questions, Responses
* Create a System that executes a list of post-submission logics in a plug and play fashion


# Initial Thoughts



* There should be a **Form **Entity that Contains a List of **Questions**
* Users should be able to respond to these Questions in form of **Responses**
* After Receiving responses, 2 Steps must happen
    * Save them in Datastore
    * Execute All actions relevant to this particular form

We Could do this synchronously, i.e Do this all in the same go, but that would introduce some issues as it would block our application and make it slow. It would act as a Bottleneck.

Alternatively, We could Separate the 2 Steps(Saving and Running Actions) so that both tasks are independent of each other and can be scaled individually


# Solution

I went forward with the second solution.

We have 2 Services in our solution,



* A Core Server that Exposes API to Create, Update and Submit forms
* A Dedicated Execution Service, that executes the Post-Submission Business Logic Use-Cases(Actions)

To make it Asynchronous(As we are expecting eventual Consistency and a Fault-tolerant, scalable app), I have Used Kafka as the **Message-Relaying System**


## Architecture Design and Database Design


## Schemas






* Action List contains ID of Actions that need to be executed for each form
    * Eg: 1: saveResponseToGoogleSheet, 2: sendMailToParticipant
* Action Parameters are configurable parameters pertaining to each handler
    * Eg: googleSheetLink
* Questions and Responses are Mapped using an Array
    * This is Done for Simplicity for now
    * This Can be updated to have them dynamically mapped using Question Id


# Architecture and Workflow

![Alt text]("https://github.com/sanyam-2001/Data-Collection/blob/master/public/Daisy-Challenge.drawio.svg")




* Upon Submission of a response, the Submission APi creates a Response Object
    * It saves it in the Database
    * It publishes it to the Kafka Topic
* The Execution Service has a Consumer to the same kafka topic
* It Consumes the messages and executes all Actions that are in the Action List of the Form
* I have Added a Feature Switch, that Can be used to toggle the behavior of The Consumer at Execution Service to be 
    * Single Message at a Time
        * **Pros**: Simple Error Handling, Can set the order of Actions if needed
        * **Cons: **Slow, time Consuming, Blocking
    * Batch Processing grouped on basis of FormID
        * **Pros: **Fast
        * **Cons: **Complex Error Handling, No Order of Actions
* If any Action Fails, It is Caught by a Kafka Exception Catcher
    * It will be pushed to another kafka Topic and Using a CRON Job can be pushed into the main kafka queue at regular intervals making the App a complete failsafe solution
* **This can also overcome third party bottlenecks like **
    * In my solutions I have Built **Google Sheet Use Case **And **E-Mail to Participant as a Receipt Use Case**
    * **Google Sheet** only allows 60 Writes per minute. Other Updates will Fail. These can be **Reflown **using the Failsafe


# Plug and Play Paradigm

To add a new Use-Case,



* Create a Handler for an Action and Map it to a relevant Unique Numeric ID
* Add this Combination to the ActionMap and ActionLookup
* Update the Action List of the respective form that needs to implement this use-case using the Endpoint Provided
* DONE! It's that easy


# Testing

I created a Manual test for testing performance which mimics n number of responses submitted to our form

For n=200,

It took **Less than 4 minutes** to run the Execution Pipeline for 2 Implemented Actions with 0 Failures

**Batch Processing implementation drastically improved the performance as previously it used to take 10 Minutes for n=100(Using Single Processing)**
