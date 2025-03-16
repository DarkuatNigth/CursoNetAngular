// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'dev',
  firebase: {
    config :{
      apiKey: "AIzaSyCT6dCeGYEZQ8nUkCw9tKBcuYzLJB7xumg",
      authDomain: "edificacion-project-app.firebaseapp.com",
      projectId: "edificacion-project-app",
      storageBucket: "edificacion-project-app.firebasestorage.app",
      messagingSenderId: "973820375285",
      appId: "1:973820375285:web:8a126134898837c0fed5bc"
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
