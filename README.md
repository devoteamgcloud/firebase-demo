# How to run this project
## Clone the Project from Github repo 

1. Clone this project open it in VSCode and from the terminal run 
	`npm install`

## Create Firebase Project 

1. Sign Up for a free Firebase Spark Plan using an exisitng Google Account or Create a new one.
		
		https://console.firebase.google.com/

2. Create a new Project in Firebase Console

	![Create New Project](/src/assets/help/create_project.png)

3. Add a web app in Firebase

	![Register a app](/src/assets/help/add_an_app.png)

4. Give your app a name. (Eg: SaltNPepper Menu) & Register the App

5. In the second step copy the 
	const firebaseConfig....}; 
	and go to VSCode and update the `src/utils/firestore.js` and replace the dummy section of const firebaseConfig = {}

### Create FireStore Database

1. Navigate to Firebase Web UI Console.

	![Create New Firestore Database](/src/assets/help/create_firestore.png)

2. Keep Start in production mode select and click Next. Select server location closest to you and click on Enable and it’ll enable firestore in your project.

3. In the FireStore DB add a new Collection named **MenuCategories**. Inside this collection add an auto-ID document with two fields i.e. catName of string type, and catNumber of number type. Similarly add few Menu Categories like Starters, Main Course, Drinks etc.

### Firebase Authentication

1. Open console.firebase.com and go to the Authentication -> Sign-in method. 
2. Select Email/Password and turn the switch on to enable it and Save.
3. Select the Users tab and click on Add User. Add an email and password (I did Email: demo@snp.io & Password:Password123) and click Add User. 
*PS: We’ll only keep one email to log in and we’re not going to have signup functionality.*

![Authentication](/src/assets/help/firebase_auth.png)

Now we have a user that we’ll use as an authenticated user to perform write operations on the firestore database.

## Run the App Locally

1. Do `npm start` to run the project locally. It should run on `localhost:3000` or other port.

## Firebase Hosting

1. Go to your firebase console and select Hosting and click on Get started

	![Hosting](/src/assets/help/hosting.png)

2. In the Firebase Hosting Console, Set Up Firebase Hosting. On step 3 (in the web UI) just press Continue to console as we’ll do the Deploy from command line.

	![Hosting Setup](/src/assets/help/hosting_config.png)


3. Install firebase tools on the local development host.
	*npm install -g firebase-tools*

4. Run firebase login on the terminal
	*firebase login*

5. Navigate into the project folder. In my case its the saltnpepper. Run the Firebase Init. 
	*firebase init*

    when it asks to select Firebase feature select, 
		*Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys*
	Then select 
		*Use an existing project and select the project you have created for this tutorial.*
	Then it’ll ask you to set a public directory, write build which will act as our public directory. We’re not using the public directory created for us during project creation as it’s firebase hosting so it’ll look for a build folder.
	
	Then for the next two questions, you have to type N
		? Configure as a single-page app (rewrite all URLs to /index.html)? No
		? Set up automatic builds and deploys with GitHub? No
	Notice a build folder is created in your project directory. Now you’re ready to move to step 2 of setting up the Firebase hosting, but you’ve already done that so just press Next on step 2.

6. Build the ReactJs project run this command from the VSCode terminal:
	*npm run build*

7. Run the Firebase Deploy command to deploy the project to Firebase Hosting.
 	*firebase deploy*

	Your Project is LIVE NOW !!!