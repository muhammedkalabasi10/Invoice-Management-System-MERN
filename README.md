<details>
<summary>Table of Contents</summary>
<ol>
<li>

<a href="#about-the-project">About the Project</a>
<ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
</li>
<li><a href="#getting-started">Getting Started</a>
<ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#some-pictures-from-the-project">Some Pictures of the Project</a></li>
    <li><a href="#📬contact">Contact</a></li>
</ol>
</details>

## About The Project

This projects aim is facilitate management invoice, products and clients. You can sign up and login with email verification. With this account add-update-delete client, add-update-delete product and add-delete-download-send email invoice.

### Built With

---

#### Frontend:

- React.js
- React Router
- Redux
- Material UI
- Bootstrap
  </br>

#### Backend:

- Node.js
- Express.js
- MongoDB
- JWT
- Nodemailer
- Express Validator
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

### Features

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
- Linkedin: https://www.linkedin.com/in/muhammedkalabasi/
