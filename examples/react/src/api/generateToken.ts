/* 
** Generate JWT Token **
Run this code on your backend with your credentials and pass the generated token to the frontend. 
You can use this token to authenticate the frontend with the Lamatic API.
*/

import jwt from 'jsonwebtoken';

export const access_token = jwt.sign({ project_id: 'your-project-id' }, 'your-secret-key' , {
    algorithm: 'HS256',
    expiresIn: '1h', // You can set the expiration time as per your requirement
})