import fs from 'fs'
import crypto from 'crypto';
import axios from 'axios';

// Function to derive a key using PBKDF2
function generateKey(password:string, salt:Buffer, iterations:number, keyLength:number) {
    return crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
  }
  
  // Function to decrypt an image
  export async function decryptImage(imageUrl:string, key:string) {

    // Fetch the encrypted image data from the web link
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const encryptedDataWithSaltAndIV = Buffer.from(response.data, 'binary');

    // Extract salt, iv, and encrypted data
    const salt = encryptedDataWithSaltAndIV.slice(0, 16);
    const iv = encryptedDataWithSaltAndIV.slice(16, 32);
    const encryptedData = encryptedDataWithSaltAndIV.slice(32);
  
    // Generate the key using PBKDF2
    const iterations = 100000;
    const keyLength = 32;
    const derivedKey = generateKey(key, salt, iterations, keyLength);
  
    // Create a decipher using the key and initialization vector (iv)
    const decipher = crypto.createDecipheriv('aes-256-cbc', derivedKey, iv);
  
    // Decrypt the image data
    const decryptedData = Buffer.concat([decipher.update(encryptedData), decipher.final()]);
    return decryptedData;
  }


  // Example usage
// inputImagePath = 'https://s3.ap-south-1.amazonaws.com/dkacademy.store/pyq-pdf/65540b2ba79f3fc5d391b01b/encrypt.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCmFwLXNvdXRoLTEiSDBGAiEAhkMfuBWgbH8vJMiG8q7T3uWX2H2sPsbCA%2FX%2BWf7MPG4CIQDt6Xh8PYKS5RkRW%2FsZV5aM3wuQRPwDCVktyd4NsC6c3SrtAgi2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAIaDDQ5MDI0OTk3MzkzOSIMz%2FceT9ZP6JcMDvZeKsEC3N4bgRtdudhQediYjKAjF9NcyTN%2FZf4hXvH1OOhdCIf2fMTTngJYvmVb5NotC1fnHmDp%2Fa7Clso226YRxX1i94naWInBUIPQcCoRYezCy9GIvs7GGyutTmgOq03R%2FXdbW6dTlyFLvGRCcJ%2BJkoGWN6GYv9EABMY9xd0a%2B09k7OqYjUN%2BL%2B3vOqZAe2DBWuM%2BaiP1FOef%2FFe6YAlEUd%2F0wqlRYEAhlDkDP21Qq5xRgZxqk%2Fz%2BsFlCHIdifj9YnHzuJKjacuokbgiDZz1Ek6%2FOz2ATpf%2FvcWDwU3f8ZUVPr2O%2BHmtRZ0iYf6%2FivF4wERoRWqzf3VGrM4yGUeEt%2BFpxS8WYptczu5vpoWlRxF%2F9%2F2ou7yJhEQfQDs4VTncBxwObv9CASr3aNXbUZcgiZO3eORjCI8IVvftiVCGeEVIyeSxZMPSQ4aoGOrICAb43jkMuxxapwVrGR0w%2FHwrmqysOcy82GIRUFcgItFgQfN70R2Dw1wpPs3OMqpYyVQ4AeDyr90Vb%2BZ8IENb8JETAvHCO4BUyDvNFCb%2FqhQcProGM1hTm7EavOxDiS1eOMcYGrf%2B%2BLxnsL9ctP%2BuMnPmnP0fQCxmsr4HP85pxxW3e8Me4tG%2FkNv%2FOKqeyA3pzAj5pYKi4pLSA2oIiUcICeVRVCS2pPAwtJBUyp%2BqjdGRIth2Br7kUhOIgYFHZj0YpEoPyyFqrTdnn1wuk3qVWg88w8E31XSJDl44xGuFxRP1L%2F8uJk8m9HIydFTWOWVuQ6XXuTiHqjv4gAyYrmlFCAPy2l1Vp%2FI3G%2FLuZXolCV2YGHSNo%2FbvPpmCHWsW5WTkWFaJ%2FlMKkpFGRYUV6TBCH5R52&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231118T114929Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAXEJJM6CZUI52J2NR%2F20231118%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=a663728733ea6bee6c4d7a1f8ba8813ff505e1d1b914b6e4ae67712434e735bc';
// outputImagePath = './decrypted.png';
// decryptionKey = 'rfgvbhjko34iouyg3hkjvgbhnjhk';