// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_BASE_URL:"https://app.alfamindstech.com/powermail-dev/",
  //body:"powermail-dev/"
  MSOAuthSettings: {
    baseURL: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    appId:  "1172a65e-10fa-498e-86ca-dcf5450943a0",
   //redirect_Uri: "http://localhost:4200/home/settings/mailaccounts",
    scopes: [
      "openid",
      "offline_access",
      "email",
      "https://graph.microsoft.com/mail.read",
      "https://graph.microsoft.com/mail.readWrite",
      "https://graph.microsoft.com/contacts.read",
      "https://graph.microsoft.com/mail.send",
      "https://graph.microsoft.com/mailboxsettings.read",
      "https://graph.microsoft.com/user.read",
    ],
  },
  firebase: {
    projectId: 'fireauth-abd17',
    appId: '1:346063606233:web:f41b9a7961a8fcdc3849c8',
    databaseURL: 'https://fireauth-abd17-default-rtdb.firebaseio.com',
    storageBucket: 'fireauth-abd17.appspot.com',
    apiKey: 'AIzaSyA9l9VphhPZaUje33-8y3wnW6NaiFd8MaQ',
    authDomain: 'fireauth-abd17.firebaseapp.com',
    messagingSenderId: '346063606233',
  },
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
