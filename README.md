# Slides used during the presentation
https://docs.google.com/presentation/d/1i01aSa1G0h9w00iIfgQSE1KizdYr_zVMnTIcrYDeW6Y/edit?usp=sharing

# How to run this project
## Clone the Project from Github repo 

1. Clone this project open it in VSCode and from the terminal run 
	`npm install`

## Create Firebase Project 

1. Sign Up for a free Firebase Spark Plan using an existing Google Account or create a new one.
		
		https://console.firebase.google.com/

2. Create a new project in the Firebase Console

	![Create New Project](/src/assets/help/create_project.png)

3. Add a web app in Firebase

	![Register a app](/src/assets/help/add_an_app.png)

4. Give your app a name. (Eg: SaltNPepper Menu) & register the app

5. In the second step in Web UI, copy the 
	const firebaseConfig....}; 
	and go to VSCode and update the `src/utils/firestore.js` and replace the dummy section of const firebaseConfig = {}

	![App Config](/src/assets/help/app_config.png)

### Create Firestore Database

1. Navigate to Firebase Web UI Console.

	![Create New Firestore Database](/src/assets/help/create_firestore.png)

2. Keep "Start in production mode" selected and click Next. Select server location closest to you and click on "Enable" and it’ll enable Firestore in your project.
*PS: The location of the database may be locked if you've previously specified the server location in this Firebase project.*

3. Now we will add a new Collection to Firestore Database. The documents in this collection will serve as a Value Dictionary (dropdown list values) in our App. This step can be given as feature in the App. But in the interest of keeping the App simple, we are doing a hack by keying in the data directly to Firestore Database.

	In the Firestore database Web UI Console add a new Collection named **MenuCategories**. Inside this collection add an auto-ID document with two fields i.e. catName of **string** type, and catNum of **number** type. Similarly add few more Menu Categories like Main Course, Drinks, Sides etc.

	![Create Collection](/src/assets/help/menu_cat_collection_creation.png)

	![Collection details](/src/assets/help/menu_categories.png)

4. Firestore Security rules: Navigate to Rules tab in the Cloud Firestore Web UI.
	Replace the exisitng security rule "allow read, write: if false;" with below 2 security rules to allow "read" access of all collections to unauthenticated users (public) and "write" access to only authenticated users. Click Publish after the changes are made.

	  `allow read, write: if request.auth != null;`\
	  `allow read;`

    ![Collection Security](/src/assets/help/firestore_security_rules.png)

### Firebase Authentication

1. Open console.firebase.com and go to the Authentication and click on "Get started".
2. Select the tab called "Sign-in method".
3. Select Email/Password and turn the switch on to enable it and save the changes.

![Authentication](/src/assets/help/firebase_auth.png)

4. Select the "Users"-tab and click on "Add User". Add an email and password (I did Email: demo@snp.io & Password:Password123) and click "Add User". 
*PS: We’ll only keep one email to log in and we’re not going to have signup functionality.*

Now we have a user that we’ll use as an authenticated user to perform write operations on the Firestore database.

## Run the App Locally

1. Do `npm start` to run the project locally. It should run on `localhost:3000` or other port.

## Firebase Hosting

1. Go to your firebase console and select Hosting and click on "Get started".

	![Hosting](/src/assets/help/hosting.png)

2. In the Firebase Hosting Console, Set Up Firebase Hosting. On step 3 (in the web UI) just press "Continue" to console as we’ll do the Deploy from command line.

	![Hosting Setup](/src/assets/help/hosting_config.png)


3. Install firebase tools on the local development host.
	`npm install -g firebase-tools`

4. Run firebase login on the terminal
	`firebase login`

5. Navigate into the project folder. In my case its the saltnpepper. Run the Firebase Init.\
	`firebase init`

    when it asks to select Firebase feature select,\
	`Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys`\
	Then select\
	`Use an existing project and select the project you have created for this tutorial.`\
	Then it’ll ask you to set a public directory, write build which will act as our public directory. We’re not using the public directory created for us during project creation as it’s firebase hosting so it’ll look for a build folder.
	
	Then for the next two questions, you have to type N\
	`? Configure as a single-page app (rewrite all URLs to /index.html)? No`\
	`? Set up automatic builds and deploys with GitHub? No`\
	Notice a build folder is created in your project directory. Now you’re ready to move to step 2 of setting up the Firebase hosting, but you’ve already done that so just press Next on step 2.

6. Build the ReactJs project run this command from the VSCode terminal:\
	`npm run build`

7. Run the Firebase Deploy command to deploy the project to Firebase Hosting.\
	`firebase deploy`

	Your Project is LIVE NOW !!!
