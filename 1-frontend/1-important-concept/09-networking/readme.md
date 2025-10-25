# Networking

<details >
 <summary style="font-size: x-large; font-weight: bold">How Web Works</summary>

- Think of `IP Address` as your house `PIN code`, which helps 
you get the website you are looking for on the internet
- Since remembering `IP address` is difficult  we use `Domain Name` such as www.google.com
- In Google Chrome, the default value is 6 connections per domain. This means that Chrome will only make a maximum of 6 HTTP requests to a single domain at the same time.
![img.png](images/img.png)
![img_1.png](images/img_1.png)

<details >
 <summary style="font-size: large; font-weight: bold">ISP(Internet Service Provider)</summary>

Example Airtel, Jio, etc.
![img_12.png](images/img_12.png)
![img_14.png](images/img_14.png)
![img_13.png](images/img_13.png)
https://www.submarinecablemap.com/

---
</details>

<details >
 <summary style="font-size: large; font-weight: bold">DNS(Domain Name Service)</summary>

- DNS acts as an address book. It translates human-readable domain
names (google.com) to machine-readable IP addresses
(142.251.46.238).
- WHOIS Privacy Protection: Helps to prevent any domain related info in public
![img_15.png](images/img_15.png)
- https://www.whois.com/whois/lensview.io

To achieve better scalability, the DNS servers are organized in a
hierarchical tree structure.
There are 3 basic levels of DNS servers:
1. Root name server (.). It stores the IP addresses of Top Level
   Domain (TLD) name servers. There are 13 logical root name servers
   globally.
2. TLD name server. It stores the IP addresses of authoritative name
   servers. There are several types of TLD names. For example, generic
   TLD (.com, .org), country code TLD (.us), test TLD (.test).
3. Authoritative name server. It provides actual answers to the DNS
   query. You can register authoritative name servers with domain name
   registrar such as GoDaddy, Namecheap, etc.
   The diagram below illustrates how DNS lookup works under the hood:
![img.png](images/img_40.png)

   1. google.com is typed into the browser, and the browser sends the
      domain name to the DNS resolver.
      97
   2. The resolver queries a DNS root name server.
   3. The root server responds to the resolver with the address of a TLD
      DNS server. In this case, it is .com.
   4. The resolver then makes a request to the .com TLD.
   5. The TLD server responds with the IP address of the domain’s name
      server, google.com (authoritative name server).
   6. The DNS resolver sends a query to the domain’s nameserver.
   7. The IP address for google.com is then returned to the resolver from
      the nameserver.
   8. The DNS resolver responds to the web browser with the IP address
      (142.251.46.238) of the domain requested initially.
      DNS lookups on average take between 20-120 milliseconds to
      complete (according to YSlow).
   
Referred Video: https://www.youtube.com/watch?v=27r4Bzuj5NQ

---
</details>

<details >
 <summary style="font-size: large; font-weight: bold">What happens when you type a URL into your browser?
</summary>

![img_11.png](images/img_11.png)
![img_10.png](images/img_10.png)
1. Bob enters a URL into the browser and hits Enter. In this example,
   the URL is composed of 4 parts:
   - scheme - 𝒉𝒕𝒕𝒑𝒔://. This tells the browser to send a connection to the
   server using HTTPS.
   - domain - 𝒆𝒙𝒂𝒎𝒑𝒍𝒆.𝒄𝒐𝒎. This is the domain name of the site.
   - path - 𝒑𝒓𝒐𝒅𝒖𝒄𝒕/𝒆𝒍𝒆𝒄𝒕𝒓𝒊𝒄. It is the path on the server to the requested
   resource: phone.
   - resource - 𝒑𝒉𝒐𝒏𝒆. It is the name of the resource Bob wants to visit.
2. The browser looks up the IP address for the domain with a domain
   name system (DNS) lookup. To make the lookup process fast, data is
   cached at different layers: browser cache, OS cache, local network
   cache and ISP cache.
   
   - If the IP address cannot be found at any of the caches, the browser
   goes to DNS servers to do a recursive DNS lookup until the IP address
   is found (this will be covered in another post).
3. Now that we have the IP address of the server, the browser
   establishes a TCP connection with the server.
4. The browser sends a HTTP request to the server. The request looks
   like this:
   𝘎𝘌𝘛 /𝘱𝘩𝘰𝘯𝘦 𝘏𝘛𝘛𝘗/1.1
   𝘏𝘰𝘴𝘵: 𝘦𝘹𝘢𝘮𝘱𝘭𝘦.𝘤𝘰𝘮
5. The server processes the request and sends back the response. For
   a successful response (the status code is 200). The HTML response
   might look like this:
   ```html
    𝘏𝘛𝘛𝘗/1.1 200 𝘖𝘒
   𝘋𝘢𝘵𝘦: 𝘚𝘶𝘯, 30 𝘑𝘢𝘯 2022 00:01:01 𝘎𝘔𝘛
   𝘚𝘦𝘳𝘷𝘦𝘳: 𝘈𝘱𝘢𝘤𝘩𝘦
   𝘊𝘰𝘯𝘵𝘦𝘯𝘵-𝘛𝘺𝘱𝘦: 𝘵𝘦𝘹𝘵/𝘩𝘵𝘮𝘭; 𝘤𝘩𝘢𝘳𝘴𝘦𝘵=𝘶𝘵𝘧-8
   <!𝘋𝘖𝘊𝘛𝘠𝘗𝘌 𝘩𝘵𝘮𝘭>
   <𝘩𝘵𝘮𝘭 𝘭𝘢𝘯𝘨="𝘦𝘯">
   𝘏𝘦𝘭𝘭𝘰 𝘸𝘰𝘳𝘭𝘥
   </𝘩𝘵𝘮𝘭>
    ```
   
6. The browser renders the HTML content.

Referred Video: https://www.youtube.com/watch?v=AlkDbnbv7dk&t=236s

Try to keep first call page size small so that their something to show, to make it performant
![img_16.png](images/img_16.png)

---
</details>


<details >
 <summary style="font-size: large; font-weight: bold">CRP(Critical Rendering Path)</summary>

The Critical Rendering Path is the sequence of steps the browser goes through to convert the HTML, CSS, and JavaScript into pixels on the screen. Optimizing the critical render path improves render performance. The critical rendering path includes the Document Object Model (DOM), CSS Object Model (CSSOM), render tree and layout.

![img_17.png](images/img_17.png)
![img_19.png](images/img_19.png)

JS Execution
![img_20.png](images/img_20.png)

Looking code-wise the critical rendering path is as follows:
1.
![img_21.png](images/img_21.png)
2. 
![img_22.png](images/img_22.png)

**Render-Blocking V/s Parser-Blocking**
- When a browser encounters a render-blocking resource, it will not display the page content below that render-blocking resource.

- When rendering is blocked because of a render-blocking resource, the browser will continue to parse the HTML code and construct the page contents. CSS is render-blocking by default.

- A parser-blocking resource blocks rendering as well, but in addition it prevents the browser from continuing to parse the HTML and processing other resources in the page. JavaScript is parser-blocking by default.

- A parser-blocking or render-blocking resource placed towards the end of the body is can't block rendering of remaining page content, as there's no more content to render!

- Note that when the browser's HTML parser encounters a stylesheet, the parser will not execute any scripts that come after the stylesheet until the CSS is fully loaded.

- In theory parser-blocking resources are worse than merely render-blocking ones, as images or additional scripts or stylesheet won't be discovered until the parser reaches those HTML tags.

- In practice this is rarely a problem, as the [browser's preload scanner](https://web.dev/articles/preload-scanner) can quickly identify important resources that need to be downloaded, without pausing to run any scripts.
- Why is it generally a good idea to position CSS `<link>`s between `<head></head>` and JS `<script>`s just before `</body>`? https://www.greatfrontend.com/questions/quiz/css-link-between-head-and-js-script-just-before-body?format=quiz
- Referred Article: https://www.debugbear.com/blog/visualize-render-blocking-scripts.

3. 
![img_23.png](images/img_23.png)

4. 
![img_24.png](images/img_24.png)

5. 
![img_25.png](images/img_25.png)

6. Layout and Painting are just like making home 
![img_26.png](images/img_26.png)

7. Lastly, in Composting phase, we put things together, and things like modal should be at top, 
and we need to hide other things below it, happen in Composting phase

---
</details>



---
</details>








<details >
 <summary style="font-size: x-large; font-weight: bold">Communication Protocols</summary>


<details >
 <summary style="font-size: large; font-weight: bold">Network Protocols</summary>

![img_28.png](images/img_28.png)

Network protocols are standard methods of transferring data between two computers in a
network.
1. HTTP (HyperText Transfer Protocol)
   HTTP is a protocol for fetching resources such as HTML documents. It is the foundation of any
   data exchange on the Web and it is a client-server protocol.
2. HTTP/3
   HTTP/3 is the next major revision of the HTTP. It runs on QUIC, a new transport protocol
   designed for mobile-heavy internet usage. 
   1. It relies on **UDP** instead of TCP, which enables faster web page responsiveness.
   2. It is faster than HTTP/2.
   3. Header Compression
   4. Improved Performance
   5. Better Network Congestion
   6. VR applications demand more bandwidth to render intricate details
      of a virtual scene and will likely benefit from migrating to HTTP/3 powered by QUIC.
3. HTTPS (HyperText Transfer Protocol Secure)
   HTTPS extends HTTP and uses encryption for secure communications.
4. WebSocket
   WebSocket is a protocol that provides full-duplex communications over TCP. Clients establish
   WebSockets to receive real-time updates from the back-end services. Unlike REST, which always
   “pulls” data, WebSocket enables data to be “pushed”. Applications, like online gaming, stock
   trading, and messaging apps leverage WebSocket for real-time communication.
5. TCP (Transmission Control Protocol)
   TCP is designed to send packets across the internet and ensure the successful delivery of data
   and messages over networks. Many application-layer protocols are built on top of TCP.
6. UDP (User Datagram Protocol)
   UDP sends packets directly to a target computer, without establishing a connection first. UDP is
   commonly used in time-sensitive communications where occasionally dropping packets is better
   than waiting. Voice and video traffic are often sent using this protocol.
7. SMTP (Simple Mail Transfer Protocol)
   SMTP is a standard protocol to transfer electronic mail from one user to another.
8. FTP (File Transfer Protocol)
   FTP is used to transfer computer files between client and server. It has separate connections for
   the control channel and data channel.

Referred Video: https://www.youtube.com/watch?v=P6SZLcGE4us

---
</details>


---
</details>







<details >
 <summary style="font-size: x-large; font-weight: bold">API Protocols</summary>

Architecture in System Design
![img_31.png](images/img_31.png)
![img_32.png](images/img_32.png)

https://blog.postman.com/api-protocols-in-2023/
![img_2.png](images/img_2.png)



<details >
 <summary style="font-size: large; font-weight: bold">REST</summary>

![img_33.png](images/img_33.png)



<details >
 <summary style="font-size: medium; font-weight: bold">Advantages/Disadvantages</summary>

### Advantage
1. **Ease of Use**
2. **Stateless:** The server does not need to store any state in order to process the request. Like authentication details, IP address from where request is coming etc
3. **Scability:** The server can be scaled up and down as per the demand.
4. **Flexibility with Data:** We are free to use JSON or XML to send and receive data.
5. **Uniform Interface:** It leverages the same standard followed by HTTP like domain name, path, query etc.
6. **Caching:** We can cache the data which are not changing frequently like for example API returning number of countries etc. REST out of box provided caching capability using HTTP protocols
7. **Separation of Concerns:** Backend and frontend can be built on any language like java, javascript, python etc. We need to use same language on both side to consume REST API.
8. **Interoperability:** Language agnostic 
9. Ease of testing 
10. **Security:** It leverage different header to make it more secure.


### Disadvantage
1. **Over-fetching and under-fetching:** REST runs the risk of over-fetching or under-fetching data, as clients may only need a subset of resources. This drawback can cause performance issues and waste bandwidth.
2. **Chatty interfaces:** Retrieving related data may require multiple requests, which increases latency. This waterfall of calls becomes especially problematic as applications scale.
3. **[Versioning](https://www.postman.com/api-platform/api-versioning/) challenges:** Creating new versions of a REST API can be cumbersome, especially when there are changes to the data structure or service functionality. This often leads to backward compatibility issues.
4. **Stateless overhead:** While statelessness supports scalability, it also means that all the necessary context must be provided with every request. This requirement can introduce overhead, especially when clients must send large amounts of repetitive data.
5. **Lack of real-time functionality:** REST is not optimized for real-time apps like chat or live feeds. WebSockets and Server-Sent Events often better suit such use cases.

---
</details>



<details >
 <summary style="font-size: medium; font-weight: bold">URL v/s URI v/s URN</summary>

- Here anything after `#` does not go from client to server
- path helps you get to the exact function that needs to be executed
  ![img_35.png](images/img_35.png)

![img_4.png](images/img_4.png)

- URI
  URI stands for Uniform Resource Identifier. It identifies a logical or physical resource on
  the web. URL and URN are subtypes of URI. URL locates a resource, while URN names a
  resource.
  A URI is composed of the following parts:
  scheme:[//authority]path[?query][#fragment]
- URL
  URL stands for Uniform Resource Locator, the key concept of HTTP. It is the address of a
  unique resource on the web. It can be used with other protocols like FTP and JDBC.
- URN
  URN stands for Uniform Resource Name. It uses the urn scheme. URNs cannot be used
  to locate a resource. A simple example given in the diagram is composed of a namespace
  and a namespace-specific string.

If you would like to learn more detail on the subject, I would recommend W3C’s clarification.

---
</details>



<details >
 <summary style="font-size: medium; font-weight: bold">HTTP Request Methods</summary>

![img_36.png](images/img_36.png)

1. HEAD: Just want to check if any header got modified or not on the server
2. OPTIONS: Use for security purposes


---
</details>



<details >
 <summary style="font-size: medium; font-weight: bold">Express REST API</summary>

1. Complete JS SetUp: https://github.com/namastedev/namaste-frontend-system-design/tree/master/Networking/RestApi
```js
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.all('/', (req, res) => {
    // console.log('Request > ', req);
    // console.log('Response >', res);
    res.send(`I'm up!`);
});

const todos = [{
    id: '1',
    title: 'Task 1',
    completed: false
}, {
    id: '2',
    title: 'Task 2',
    completed: true
}];

// READ
app.get('/todos', (req, res) => {
    res.json(todos);
})

// CREATE
app.post('/todos', (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.status(201).json({
        message: 'New Todo Added!'
    });
});

// UPDATE
app.put('/todos/:id', (req, res) => {
    const newTodoData = req.body;
    const todoParamId = req.params.id;
    const todoIndex = todos.findIndex(td => td.id === todoParamId);

    if (todoIndex !== -1) {
        todos[todoIndex] = {
            id: todoParamId,
            ...newTodoData,
        }
        res.json({
            message: 'Todo updated successfully!'
        });
    } else {
        res.status(400).json({
            message: 'Todo Id does not exist!'
        });
    }
    
})

// DELETE
app.delete('/todos/:id', (req, res) => {
    const todoParamId = req.params.id;
    const todoIndex = todos.findIndex(td => td.id === todoParamId);

    if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
    }

    res.json({
        message: 'Todo deleted successfully!'
    });

})


const PORT = 5111;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
```

2. Complete TS Setup: https://github.com/anjaysahoo/basic-ts-express-app

---
</details>



<details >
 <summary style="font-size: medium; font-weight: bold">`req.params` v/s `req.query`</summary>

### 1. `req.params`
`req.params` contains route parameters (in the path portion of the URL), which are typically used to capture dynamic segments in the URL.

```javascript
app.get('/user/:userId/books/:bookId', (req, res) => {
  res.send(req.params);
});
```
And you make a request to:
```
GET /user/123/books/456
```
`req.params` will contain:
```json
{
  "userId": "123",
  "bookId": "456"
}
```

**Other names:**
- Route parameters
- Path variables
- URL parameters

### 2. `req.query`
`req.query` contains query string parameters (in the query string portion of the URL, after the `?`), which are typically used to send additional data to the server.


```javascript
app.get('/search', (req, res) => {
  res.send(req.query);
});
```
And you make a request to:
```
GET /search?keyword=javascript&page=2
```
`req.query` will contain:
```json
{
  "keyword": "javascript",
  "page": "2"
}
```

**Other names:**
- Query string parameters
- URL query parameters
- Query variables


---
</details>



<details >
 <summary style="font-size: medium; font-weight: bold">HTTP Headers</summary>

HTTP requests are like asking for something from a server, and HTTP responses are the server's
replies. It's like sending a message and receiving a reply.

![img_34.png](images/img_34.png)

- An HTTP request header is an extra piece of information you include when making a request,
such as what kind of data you are sending or who you are. 
- In response headers, the server provides information about the response it is sending you, such as what type of data you're
receiving or if you have special instructions.
- A header serves a vital role in enabling client-server communication when building RESTful
applications. 
- In order to send the right information with their requests and interpret the
server's responses correctly, you need to understand these headers.

#### Request Headers

| Header            | Usecase                                             | Example                                                                                                         |
|:------------------|:----------------------------------------------------|:----------------------------------------------------------------------------------------------------------------|
| Host              | Target host                                         | host: www.1.cdn.example.com                                                                                     |
| Origin            | Origin Host                                         | host: www.example.com                                                                                           |
| Referer           | Indicate the previous web page making this request  | https://www.example.com/previous-page                                                                           |
| Accept            | Response content type                               | application/json                                                                                                |
| Accept-language   | Preferred response content language                 | en-US, en;q=0.9                                                                                                 |
| User Agent        | Identify the client. User agent string- OS, Browser | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 |
| Accept-encoding   | Encoding algorithm                                  | gzip,deflate,br                                                                                                 |
| Connection        | Keep TCP connection open                            | keep-alive, close                                                                                               |
| Authorization     | send credentials                                    | Authorization: Bearer                                                                                           |
| Cookie            | Previous Server Token can be resend                 | key=value                                                                                                       |
| if-modified-since |                                                     |                                                                                                                 |
| Cache-control     |                                                     |                                                                                                                 |


#### Response Headers

| Header            | Usecase                                                                                       | Example                       |
|:------------------|:----------------------------------------------------------------------------------------------|:------------------------------|
| Date              | When the response was generated                                                               | Tue, 09 Jul 2024 04:53:11 GMT |
| Server            | Provides server info(This info can misused if there is known issue in library used on server) | Server: Apache/2.4.41(Unix)   |
| Content-Type      | Type of response content                                                                      | text/html, application.json   |
| Content-Length    | Original body response length(Can be used to show loader with percentage it downloaded)       | 256                           |
| Set-cookie        | Informs about cookie need to store for future response                                        | Set-cookie: user_id=123       |
| Content-encoding  | Response content encoding                                                                     | br                            |
| Cache-control     |                                                                                               |                               |
| Last-modified     |                                                                                               |                               |
| Etag              |                                                                                               |                               |
| Expires           |                                                                                               |                               |


---
</details>



<details >
 <summary style="font-size: medium; font-weight: bold">HTTP Status Code</summary>

![img_37.png](images/img_37.png)
![img_38.png](images/img_38.png)

Usecase for frontend developer
1. We can retry based on status code. So retry does not make sense if we get `400 Bad requests` because user is sending wrong info, but `503 service unavailable` make sense where we should retry

![img_5.png](images/img_5.png)
Refer Video for more details here: https://www.youtube.com/watch?v=qmpUfWN7hh4

---
</details>

<details >
 <summary style="font-size: medium; font-weight: bold">Design Effective & Safe API</summary>

![img_7.png](images/img_7.png)


---
</details>


---
</details>


<details >
 <summary style="font-size: large; font-weight: bold">GraphQL</summary>

![img_3.png](images/img_3.png)
- GraphQL is a query language for APIs developed by Meta. It provides a complete
  description of the data in the API and gives clients the power to ask for exactly what they
  need.
-  GraphQL servers sit in between the client and the backend services.
- GraphQL can aggregate multiple REST requests into one query. GraphQL server organizes
  the resources in a graph.
- GraphQL supports queries, mutations (applying data modifications to resources), and
  subscriptions (receiving notifications on schema modifications).

### Advantages

1. **Avoid Over-fetching**
2. **Avoid Under-fetching**
3. **Better mobile performance:** Since we are able to request required data only so for mobile we don't need fetch as much data we may need for desktop
4. Efficiency & Precision
5. **Declarative data fetching:** We are very clear what we need. Like for a country there are multiple things I can get but we can define that we need just name & code
6. **Structured / Hierarchical Structure:** For this we might need to do some configuration on server side
 
   Getting separately `language`, `continents` & `countries`
   ![img_1.png](images/img_41.png)
   Getting same data in nested structure
   ![img_2.png](images/img_42.png)
7. **Strongly Typed:** GraphQL APIs have strongly typed schemas, which allow developers to know exactly what data and types are available to query. 
8. **Introspection:** GraphQL’s self-documenting schema enables easier development through introspection.
9. **Real-time updates with subscriptions:** GraphQL enables real-time syncing through subscriptions, which keep the client updated in real time.

### Difference Between REST and GraphQL

![img_3.png](images/img_43.png)
![img_4.png](images/img_44.png)

- **Enforced schema**
  - GraphQL enforces the use of a schema—regardless of whether developers are taking a schema-first or code-first approach. With the code-first approach, the schema is generated from the resolvers.
  - REST does not enforce the use of a schema. Developers can take a schema-first approach with REST by using API specifications like OpenAPI and AsyncAPI, or they can auto-generate schemas from code, but it is not an integral part of the REST architecture.

- **HTTP status codes**
  - GraphQL uses the 200 status code for all responses, including error responses. The error response is typically included in the response payload itself.
  - REST makes use of standard HTTP status codes that indicate the status of the response. This is very useful for error handling.
    
- **[Versioning](https://www.postman.com/api-platform/api-versioning/)**
  - GraphQL uses a single versioned endpoint. It handles changes and deprecations by updating and evolving the schema without explicitly versioning the API, which can promote a smoother long-term evolution.
  - REST APIs need to be versioned in order to safely handle changes and deprecation. This is usually done in the URL of the APIs, though there are several other approaches to API versioning, as well.


### Similarities Between REST and GraphQL

- **Common architectural principles:** GraphQL and REST share common architectural principles. They are both stateless, support a client-server model, and can be consumed by any client that understands HTTP. This makes them suitable for a wide range of devices and applications.
- **HTTP as transport layer:** GraphQL and REST typically use HTTP as their transport layer, and they both leverage the standard HTTP POST method to send and receive data.
- **Data transfer formats:** GraphQL and REST use standard data formats for communication. JSON is the most commonly used format, but other formats, like XML, can also be used, especially in REST.
- **Middleware and extensions:** GraphQL and REST can both be extended with middleware to add functionalities like logging, caching, and authentication.

### Challenges of GraphQL

- **Query complexity:** The flexibility that GraphQL gives to the client comes with drawbacks, as overly complex or nested queries can negatively impact performance.
- **Learning curve:** GraphQL has a steeper learning curve than REST due to new concepts like mutations and subscriptions.
- **Versioning:** The flexible nature of queries means that changes in the schema can break existing queries, complicating version management.
- **Potential overuse of resources:** Since clients can request multiple resources in one query, there’s a risk of overloading servers by fetching more data than necessary.
- **Security concerns:** Malicious users could exploit GraphQL’s flexibility to overload servers with complex queries.

![img_5.png](images/img_45.png)

<details >
 <summary style="font-size: medium; font-weight: bold">Setting Up GraphQL Server</summary>

![img_6.png](images/img_46.png)

Here we will use Appolo for setting up GraphQL Server

1. Step-1: 
```js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs.js';
import { resolvers } from './resolvers.js';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
```

2. Step-2: Create typeDefs file
```js
export const typeDefs = `#graphql

    type Author {
        id: ID!
        name: String!
        books: [Book]
    }

    type Book {
        id: ID!
        title: String!
        publishedYear: Int
        author: Author
    }

    type Query {
        authors: [Author]
        books: [Book]
    }

    type Mutation {
        addBook(title: String!, publishedYear: Int, authorId: ID! ): Book!
    }
`
```

3. Step-3: Create resolvers file
```js
const data = {
    authors: [
      { id: "1", name: "Chirag Goel", bookIds: ["101", "102"] },
      { id: "2", name: "Akshay Saini", bookIds: ["103"] },
    ],
    books: [
      { id: "101", title: "Namaste Frontend System Design", publishedYear: 2000, authorId: "1" },
      { id: "102", title: "Book 2", publishedYear: 2010, authorId: "1" },
      { id: "103", title: "Book 3", publishedYear: 2020, authorId: "2" },
    ],
  };
  


export const resolvers = {
    Book: {
        author: (parent, args, context, info) => {
            console.log(parent);
            return data.authors.find(authorDetail => authorDetail.id === parent.authorId);

        },
    },
    Author: {
        books: (parent, args, context, info) => {
            return data.books.filter(book => parent.bookIds.includes(book.id));
        }
    },
    Query: {
        authors: (parent, args, context, info) => {
            return data.authors;
        },
        books: (parent, args, context, info) => {
            return data.books;
        }
    },
    Mutation: {
        addBook: (parent, args, context, info) => {
            console.log(args);
            const newBook = {...args, id: data.books.length + 1};
            data.books.push(newBook)
            return newBook;
        }
    }
}
```

Full Code: https://github.com/namastedev/namaste-frontend-system-design/tree/master/Networking/GraphQl

4. Step-4: Run server
![img_7.png](images/img_47.png)
![img_8.png](images/img_48.png)

---
</details>


---
</details>


<details >
 <summary style="font-size: large; font-weight: bold">gRPC</summary>

- gRPC, which stands for “Google Remote Procedure Call,” is a modern, high-performance protocol that facilitates communication between services.
- Open-source
- It is built on top of HTTP/2 and leverages Protocol Buffers to define service methods and message formats.
- In contrast to REST APIs, which rely on standard HTTP verbs like GET and POST, gRPC enables services to expose custom methods that are similar to functions in a programming language.  


### Benefits of gRPC
- **Performance:** HTTP/2 and Protocol Buffers enable gRPC to achieve low latency and high throughput.
- **Strong typing:** Like SOAP and GraphQL, gRPC is strongly typed. This results in fewer bugs as types are validated at compile time.
- **Multi-language support:** gRPC has first-class support for many programming languages, including Go, Java, C#, and Node.js.
- **Streaming:** gRPC handles streaming requests and responses out-of-the-box, which unlocks complex use cases like long-lived connections and real-time updates.
- **Battery included:** gRPC directly supports critical functionality like load balancing, retries, and timeouts.


### Challenges of gRPC
- **Browser support:** Native gRPC support in browsers is still limited, making it less suitable for direct client-to-server communication in web applications.
- **Learning curve:** Developers need to learn how to work with Protocol Buffers, custom service definitions, and other gRPC features, which can slow initial productivity.
- **Debugging complexity:** Protocol Buffers are not human-readable, making it harder to debug and test gRPC APIs than JSON APIs.


![img_10.png](images/img_50.png)
![img_11.png](images/img_51.png)
![img_12.png](images/img_52.png)
![img_13.png](images/img_53.png)

Setup Code: https://github.com/namastedev/namaste-frontend-system-design/tree/master/Networking/gRPC

![img_14.png](images/img_54.png)
![img_15.png](images/img_55.png)
![img_16.png](images/img_56.png)
![img_17.png](images/img_57.png)


---
</details>


---
</details>

























![img_6.png](images/img_6.png)






