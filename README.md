<details>
<summary>Table of Contents</summary>
<ol>
<li>

<a href="#about-the-project">About the Project</a>
<ul>
        <li><a href="#🖥️built-with">Built With</a></li>
      </ul>
</li>
<li><a href="#getting-started">Getting Started</a>
<ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul></li>
    <li><a href="#🚀features">Features</a></li>
    <li><a href="#some-pictures-from-the-projects">Some Pictures of the Project</a></li>
    <li><a href="#📬contact">Contact</a></li>
</ol>
</details>

## About The Project

This projects aim is facilitate management invoice, products and clients. You can sign up and login with email verification. With this account add-update-delete client, add-update-delete product and add-delete-download-send email invoice.

### 🖥️Built With

---

#### Frontend:

- [![React][react.js]][react-url]
- [![React Router][react-router]][react-router-dom]
- [![Redux][redux-img]][redux-toolkit]
- [![Material UI][material-ui]][mui]
- <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png" alt="Bootstrap" width="50" title="Bootstrap">
  </br>

#### Backend:

- [![Nodejs][node.js]][nodejs-url]
- [![Expressjs][express.js]][expressjs-url]
- [![Mongodb][mongodb]][mongodb-url]
- [![JWT][jwt-img]][jwt-url]
- <img src="https://nodemailer.com/nm_logo_200x136.png" alt="Nodemailer" width="80" title="Nodemailer">
- <img src="https://repository-images.githubusercontent.com/2518028/adb2df00-9431-11e9-9ccd-26f012b80f29" alt="Express Validator" width="100" title="Express Validator">
  </br>

#### Deployed On:

- <img src="https://dka575ofm4ao0.cloudfront.net/pages-transactional_logos/retina/89884/render-logo-dark3.png" alt="Render" width="200" title="Render">
- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Netlify_logo.svg/2560px-Netlify_logo.svg.png" alt="Netlify" width="100" title="Netlify">
  </br>

---

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/muhammedkalabasi10/Invoice-Management-System-MERN
   ```
2. Install NPM packages in terminal
   ```sh
   npm install
   ```
3. In the first terminal `cd client` and create a `.env` file in the root of your client directory
4. Supply the following credentials
   ```js
   REACT_APP_API = http://localhost:5000
   REACT_APP_URL = http://localhost:3000
   ```
5. `cd server` and create a `.env` file in the root of your client directory
6. Supply the following credentials
   ```js
   MONGODB_URL=Your MongoDB url
   PORT=5000
   ACCESS_TOKEN_SECRET=random bytes
   REFRESH_TOKEN_SECRET=random bytes
   API_LINK=http://localhost:3006
   EMAIL_SERVICE =your email service(hotmail, gmail etc.)
   EMAIL_USERNAME =your email address
   EMAIL_PASSWORD =your password of email address
   ```

### 🚀Features
- Login/Signup User Account
- Signup using email verification
- Update Profile
- Reset Password using email
- Add, update and delete product
- Add image to product
- Add, update and delete client
- Add and delete invoice
- Add payment to invoice
- Invoice status changes to paid or unpaid based on payments
- Invoice download as pdf
- Send the invoice by e-mail
- Access Token and Refresh Token
- Security for Csrf
- Data validation on server side
- Cors restriction

### Some Pictures from the Project
![5](https://user-images.githubusercontent.com/97872051/222112214-aab0d34c-e191-4941-9441-b8d3ac1d53e4.PNG)
![4](https://user-images.githubusercontent.com/97872051/222112230-905acf7d-2801-405d-9fa6-afbeab9a737e.PNG)
![3](https://user-images.githubusercontent.com/97872051/222112248-286d25e4-df06-4ee6-9b32-338dad700630.PNG)
![1](https://user-images.githubusercontent.com/97872051/222112263-ebb4ff6b-26c9-4550-845e-cd8b9218607e.PNG)


### 📬Contact
- Project Link: https://github.com/muhammedkalabasi10/Invoice-Management-System-MERN
- Linkedin: https://www.linkedin.com/in/muhammed-kalaba%C5%9F%C4%B1-116287248/

<!-- LINKS & IMAGES -->

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[react-router]: https://camo.githubusercontent.com/4f9d20f3a284d2f6634282f61f82a62e99ee9906537dc9859decfdc9efbb51ec/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163745f526f757465722d4341343234353f7374796c653d666f722d7468652d6261646765266c6f676f3d72656163742d726f75746572266c6f676f436f6c6f723d7768697465
[react-router-dom]: https://reactrouter.com/en/main
[redux-img]: https://camo.githubusercontent.com/6908bc5919e46cd787b8e5117f092f5ed37da82e8bd602e6339060ea0fff722c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656475782d3539334438383f7374796c653d666f722d7468652d6261646765266c6f676f3d7265647578266c6f676f436f6c6f723d7768697465
[redux-toolkit]: https://redux-toolkit.js.org/
[material-ui]: https://camo.githubusercontent.com/2c2e3cab0541596a12e216df86e68fa554256f25826b55a068993a3edfbcd0e8/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6174657269616c2d2d55492d3030383143423f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6174657269616c2d7569266c6f676f436f6c6f723d7768697465
[mui]: https://mui.com/
[node.js]: https://camo.githubusercontent.com/dfc69d704694f22168bea3d84584663777fa5301dcad5bbcb5459b336da8d554/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3433383533443f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465
[nodejs-url]: https://nodejs.org/en/
[express.js]: https://camo.githubusercontent.com/7f73136d92799b19be179d1ed87b461120c35ed917c7d5ab59a7606209da7bd3/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f457870726573732e6a732d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d65787072657373266c6f676f436f6c6f723d7768697465
[expressjs-url]: https://expressjs.com/
[mongodb]: https://camo.githubusercontent.com/72e92f69f36703548704a9eeda2a9889c2756b5e08f01a9aec6e658c148d014e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4d6f6e676f44422d3445413934423f7374796c653d666f722d7468652d6261646765266c6f676f3d6d6f6e676f6462266c6f676f436f6c6f723d7768697465
[mongodb-url]: https://www.mongodb.com/
[jwt-img]: https://camo.githubusercontent.com/92407fc26e09271d8137b8aaf1585b266f04046b96f1564dfe5a69f146e21301/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a57542d3030303030303f7374796c653d666f722d7468652d6261646765266c6f676f3d4a534f4e253230776562253230746f6b656e73266c6f676f436f6c6f723d7768697465
[jwt-url]: https://jwt.io/
