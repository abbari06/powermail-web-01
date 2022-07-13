// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import * as CryptoJs from 'crypto-js';
// // import {CryptoService} from ''

// @Injectable({
//   providedIn: 'root',
// })
// export class StorageHelperService {
//   constructor(private crypto: CryptoService) {}

//   /**
//    * Store data to Local Storage
//    * @param key key
//    * @param value value
//    */
//   public store(key: string, value: any) {
//     localStorage.setItem(key, this.crypto.encrypt(value));
//   }

//   /**
//    * Store data to session storage
//    * @param key key
//    * @param value value
//    */
//   public storeSession(key: string, value: any) {
//     sessionStorage.setItem(key, this.crypto.encrypt(value));
//   }

//   /**
//    * Retrieve session data
//    * @param key key
//    */
//   public retrieveSession(key: string): any {
//     if (key && sessionStorage.getItem(key)) {
//       return this.crypto.decrypt(sessionStorage.getItem(key));
//     }
//     return;
//   }

//   /**
//    * Retrieve data from Local Storage
//    * @param key key
//    */
//   public retrieve(key: string): any {
//     if (key && localStorage.getItem(key)) {
//       return this.crypto.decrypt(localStorage.getItem(key));
//     }
//     return;
//   }

//   /**
//    * Clear session storage
//    * @param key key
//    */
//   public clearSession(key?: string) {
//     // this.storage.clear(key);
//     if (key) {
//       sessionStorage.removeItem(key);
//     } else {
//       sessionStorage.clear();
//     }
//   }

//   /**
//    * Clear Local Storage
//    */
//   public clear(key?: string) {
//     if (key) {
//       localStorage.removeItem(key);
//     } else {
//       localStorage.clear();
//     }
//   }
// }
