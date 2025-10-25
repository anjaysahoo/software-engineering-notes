<details >
 <summary style="font-size: x-large; font-weight: bold">User Authentication</summary>

<details >
 <summary style="font-size: large; font-weight: bold">Backend Aspect</summary>

![img_22.png](images/img_22.png)

### Session
1. Stateful
2. Good for Monolithic Application
3. Latency issue
4. The Server has full control on closing the session
![img_21.png](images/img_21.png)

### JWT
1. Stateless
2. Good for Microservice Application
3. Server cannot revoke the token

![img_23.png](images/img_23.png)
#### HMAC
Single Key
![img_24.png](images/img_24.png)

### RSA or ECDSA
![img_25.png](images/img_25.png)

Referred Videos: 
1. https://www.youtube.com/watch?v=fyTxwIa-1U0
2. https://www.youtube.com/watch?v=UBUNrFtufWo


---
</details>


<details >
 <summary style="font-size: large; font-weight: bold">Frontend Aspect</summary>

1. In Session based authentication use cookies with HTTP-only.


2. Securely handling JWT tokens on the frontend is critical to maintaining the security of your application. Follow these best practices:

### 1. **Token Storage**
- **Avoid Local Storage**: Storing JWTs in local storage exposes them to cross-site scripting (XSS) attacks.
- **Use HTTP-Only Cookies**: Prefer storing JWTs in secure, HTTP-only cookies. These cookies cannot be accessed via JavaScript, reducing the risk of XSS attacks.

### 2. **Secure Transmission**
- **Always Use HTTPS**: Ensure all communication between your frontend and backend is encrypted using HTTPS to prevent man-in-the-middle (MITM) attacks.

### 3. **Token Expiration and Renewal**
- Set short expiration times for JWTs and implement **refresh tokens** securely for renewing expired access tokens.
- Store refresh tokens only in HTTP-only, secure cookies.

### 4. **Restrict Scope**
- Minimize the data stored in the JWT payload. Avoid sensitive information.
- Use claim-based scopes to restrict token usage to specific resources and operations.

### 6. **Prevent CSRF Attacks**
- Use CSRF tokens when JWTs are stored in cookies.
- Implement CORS policies that only allow requests from trusted origins.

### 7. **Logout and Revoke Tokens**
- Provide a way to revoke refresh tokens in case of a logout or breach.
- Use `iat` (issued at) claim and maintain a token blacklist on the server to invalidate tokens when necessary.

### 8. **Limit Token Lifespan**
- Use short-lived access tokens with strict expiration times.
- Regularly rotate keys used to sign the tokens and handle key expiration using `kid` in the header.

TODO: Read this in spare time: https://hasura.io/blog/best-practices-of-using-jwt-with-graphql

---
</details>


---
</details>


<details >
 <summary style="font-size: x-large; font-weight: bold">Types of attack</summary>

1. XSS 
2. CSRF 
3. IFrame Protection 
4. Security Headers 
5. Client-Storage Security 
6. Secure Communication (HTTPS)
7. Dependency Security 
8. Compliance and Regulations 
9. Input Validation and Sanitization 
10. Server-Side Request Forgery (SSRF)
11. Server-side JavaScript Injection (SSJI)
12. Feature Policy | Permissions-Policy 
13. Subresource Integrity (SRI)
14. Cross-Origin Resource Sharing (CORS)


<details >
 <summary style="font-size: large; font-weight: bold">XSS(Cross-Site Scripting)</summary>

![img.png](images/img.png)

Everything start from clicking any phishing link, which will execute certain JS.
1. Like if if cookies are not set from server side and made HTTPS- only then those cookies can be sent to hacker
2. If there is no validation before rending content from backend on UI then hacker can render 
false login page on top of real one which can then sent user credential to hacker
3. They can again this to run certain javascript in background to capture keystroke

### Type vulnerability
1. User session hacking
2. Unauthorized activities
3. Capturing keystrokes
4. Stealing critical information
5. Phishing attack

### How this attacks are possible?
1. If user is able to insert any script(JS) into your website then they can render there HTML,CSS & JS which can mimic like your website and do sort of attack mentioned here
2. This mostly happen through user input

![img_1.png](images/img_1.png)
https://github.com/namastedev/namaste-frontend-system-design/blob/master/Security/XSS/vulnerability/example1.html


<details >
 <summary style="font-size: large; font-weight: bold">User Session Hacking</summary>

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XSS Example</title>
</head>
<body>

<!-- Vulnerable Code -->
<div>
    Welcome, <span id="username"></span>!
 </div>

<script>
    // Function to set a cookie, mostly this will be set from server
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Example: Set a cookie named "exampleCookie" with value "Hello, Cookie!" that expires in 7 days
    setCookie("exampleCookie", "Hello, Cookie!", 7);
</script>

<!-- Vulnerable Code -->
<script>
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    document.getElementById('username').innerHTML = `${name}`;
 </script>

</body>
</html>
```

Here user can pass malicious code in url param like below. We need to use `encodeURIComponent` to encode below code, so that special character interpreted correctly
![img_2.png](images/img_2.png)

Hacker able to hit his own server with our user cookies information. Cookies can be holding authorization details
which will help hacker to hijack the user session
![img_3.png](images/img_3.png)
User cookies hijacked by hacker.
![img_4.png](images/img_4.png)

---
</details>


<details >
 <summary style="font-size: large; font-weight: bold">Unauthorized activities</summary>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>XSS Example</title>
  </head>
  <body>
    <!-- Vulnerable Code -->
    <div>
      Welcome, <span id="username"></span>! TimeZone,
      <span id="timezone"></span>!
    </div>

    <script>
      // Function to set a cookie, mostly this will be set from server
      function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
      }

      // Example: Set a cookie named "exampleCookie" with value "Hello, Cookie!" that expires in 7 days
      setCookie("exampleCookie", "Hello, Cookie!", 7);
    </script>

    <!-- Vulnerable Code -->
    <script>
      const params = new URLSearchParams(window.location.search);
      const name = params.get("name");
      document.getElementById("username").innerHTML = name;
    </script>

    <script>
      function createPost(title, description) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/post', true);
        console.log(document.cookie);
        xhr.withCredentials = true;
        xhr.setRequestHeader(
          "Content-type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(`txtName=${title}&mtxMessage=${description}`);
      }
    </script>
  </body>
</html>
```

![img_5.png](images/img_5.png)


Since Hacker was able to hit his own server with our user cookies information. So any unauthorized activities can be done by hacker.

---
</details>


<details >
 <summary style="font-size: large; font-weight: bold">Capturing Key strokes</summary>

Just like session we can pass malicious code which can track our user keystrokes activities and send it to hacker server
![img_6.png](images/img_6.png)
![img_7.png](images/img_7.png)

---
</details>


<details >
 <summary style="font-size: large; font-weight: bold">Stealing critical information</summary>

Same like above we can pass malicious code in params and it steals all user details by tacking whole HTML page
![img_8.png](images/img_8.png)
![img_9.png](images/img_9.png)

---
</details>


<details >
 <summary style="font-size: large; font-weight: bold">Phishing attack</summary>

Again like above malicious form was injected through params and now user was tricked thinking this real form and
might share their username and password which be sent to hacker
![img_10.png](images/img_10.png)
![img_12.png](images/img_12.png)
![img_13.png](images/img_13.png)
![img_11.png](images/img_11.png)

---
</details>


### Mitigation
1. List all possible way to take input 
2. In place of of innerHTML with “textContent” (For Older Browsers)
3. Escaping 
4. Use library like React 
5. Sanitize using DOMPurify 
6. CSP Headers (Content Security Policy)
7. Avoid using eval

![img_14.png](images/img_14.png)


<details >
 <summary style="font-size: large; font-weight: bold">Content Security Policy(CSP)</summary>


<details >
 <summary style="font-size: medium; font-weight: bold">Allowed Sources</summary>

```js
const express = require("express");

const PORT = 3010;
const app = express();

//CSP middleware
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self';" + 
        "script-src 'self' http://unsecure.com;"
    );
    next();
})

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log(req.url);
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Server started at http://locolhost:${PORT}`);
});
```

- We above CSP policy `"default-src 'self';"` we can make sure that we don't allow any other source to load anything like images, js etc.
- If we want to allow any other sources then we add `script-src 'self' http://unsecure.com;`


Without Any CSP policy, we are able to load linked image here
![img_15.png](images/img_15.png)

With CSP policy, it was restricted
![img_16.png](images/img_16.png)

---
</details>


<details >
 <summary style="font-size: medium; font-weight: bold">Script Nonce</summary>

Middleware
```js
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self';" + 
        "script-src 'self' 'nonce-randomKey' 'unsafe-inline' http://unsecure.com;"
    );
    next();
})
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="http://unsecure.com/abc.js"></script>
    
    //script with nonce
    <script nonce="randomKey">
        console.log('My trusted code!')
    </script>

    <script>
        console.log('My non-trusted code!')
    </script>
</head>
<body>
    <h1>Page for CORS demo!</h1>
    <img src="https://media.licdn.com/dms/image/D5603AQGR_C2oAwVRBQ/profile-displayphoto-shrink_800_800/0/1673037498537?e=1707955200&v=beta&t=203QmhfiuDGKmUJORGy-qw-RKJQAtMzeTjw3sDR3xbo" />
</body>
</html>
```

Here with above CSP set are able to execute only `trusted code` which has `nonce` set
![img_18.png](images/img_18.png)
![img_20.png](images/img_20.png)
![img_19.png](images/img_19.png)

---
</details>


<details >
 <summary style="font-size: medium; font-weight: bold">Report-only mode</summary>

- Works only on HTTPS
- `report-to default; report-uri URL`

---
</details>


---
</details>


---
</details>



<details >
 <summary style="font-size: large; font-weight: bold">Client-Storage Security</summary>

![img_40.png](images/img_40.png)

1. Storing sensitive data on client
   1. Encrypt Data: 
      1. ![img_41.png](images/img_41.png)
      2. The secret key can be generated dynamically using the environment variables configured on the server. The example above is just for a demo purpose. 
      3. Encrypt your Local Storage data!: https://dev.to/codecraftjs/encrypt-your-local-storage-data-5ag8
   2. Token expiry ![img_42.png](images/img_42.png)
3. Data Integrity
   1. CheckSum ![img_43.png](images/img_43.png)
4. Storage Limit
   ![img_44.png](images/img_44.png)
5. Session Management
   ![img_45.png](images/img_45.png)

---
</details>


<details >
 <summary style="font-size: large; font-weight: bold">Input Validation & Sanitization</summary>

![img_34.png](images/img_34.png)

---
</details>



<details >
 <summary style="font-size: large; font-weight: bold">Server-Side Request Forgery (SSRF)</summary>

![img_35.png](images/img_35.png)
This attack happens when we have internal servers which can be accessed by some servers and inforamtion 
of such server is leaked.

Now hacker can just sent request from web server to internal server in some input box, because of
lack of validation on input box, it will be able to send request to internal server.

![img_36.png](images/img_36.png)

Mitigation:

1. Whitelisting: On server we can add servers which can access these internal servers
![img_37.png](images/img_37.png)
2. ![img_38.png](images/img_38.png)
3. ![img_39.png](images/img_39.png)

---
</details>


<details >
 <summary style="font-size: large; font-weight: bold">Cross-Site Request Forgery (CSRF)</summary>

![img_28.png](images/img_28.png)
![img_29.png](images/img_29.png)

1. If you click on any such phishing link like above it will redirect you to your bank website, 
then scammer can steal your money if you are logged in to your bank website.  
2. Scammer can steal your money by making `GET` or `POST` request in whatever way your API is designed. 
Since you are already logged in to your bank website, session or JWT will be sent to server and since 
these REST API call are Stateless, so it does not really matter how you call these API, it won't be able to identify any phishing call.

![img_26.png](images/img_26.png)

![img_27.png](images/img_27.png)

1. `GET` request are quite simple to make, hence never design your APIs where modification are done by `GET` request
2. `POST` request are more complex to make, but they can also be done by hiding `acc` and `amount` information in hidden input
like in the above example 

### Mitigations

1. Anti-CSRF token
    1. Each we logged into the bank website, a csrf-token will be generated by backend and sent to the frontend.
    Frontend will store this csrf-token in script variable and send it to backend in each request.
    2. By this any other call to server which is not from bank webiste frontend will not be able to send csrf-token 
       and won't be able to make any successful request to backend.
   3. ![img_30.png](images/img_30.png)
2. SameSite Cookies
   1. With this backend will not perform any action if call was not from bank frontend. Any other redirected link will be rejected 
   2. ![img_31.png](images/img_31.png)
3. Referer-based Validate
   1. This same like sameSite cookies, any other website redirect referred server calls will be rejected. Though this can be bypassed by calling through POSTMAN
   2. Below highlighted URL shows from where this call was redirected
   3. ![img_32.png](images/img_32.png)
   4. ![img_33.png](images/img_33.png)
4. Use Captcha
5. CSP Header

---
</details>

---
</details>
