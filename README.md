## Nguyen Duy Khang

## Project Name: URL Shortener

### Core Requirements

1. Frontend:

- [x] Implement a form to submit long URLs
- [x] Display the generated short URL after submission
- [x] Include a "Copy to Clipboard" button for the short URL
- [x] Implement basic styling for a clean, responsive design

2. Backend:

- [x] Create an API endpoint to receive long URLs and return shortened versions
- [x] Implement a redirect service to handle requests for shortened URLs
- [x] Generate unique short codes for each submitted URL
- [x] Allow duplicate long URLs (each submission should create a new short URL)

3. Database:

- [x] Store mappings between short codes and original URLs
- [x] Save creation dates for each shortened URL

4. Deployment:

- [ ] Deploy the application to a publicly accessible platform
- [x] Provide instructions for running the project locally
      Nice-to-have Features

_If time permits, consider implementing one or more of these optional features_:

- [ ] Password Protection: Allow users to set a password for accessing certain shortened URLs
- [x] URL Expiry Date: Enable users to set an expiration date for shortened URLs
- [x] Custom Short Codes: Allow users to specify their own custom short codes

### Screenshot

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/duykhang2103/URL-Shortener.git
   ```

2. Open 2 terminals:

   The first terminal is used to run the server:

   1. Install the project dependencies

   ```sh
   cd backend
   npm install
   ```

   2. Create `.env` file and configure the environment variables

   ```sh
    MONGO_URI=
    SALT_ROUNDS=
   ```

   2. Start the server

   ```sh
     npm run dev
   ```

The second terminal is used to run the application:

1. Install the project dependencies

```sh
  cd frontend
  npm install
```

2. Create `.env` file and configure the environment variables

```sh
SERVER_URL=
```

3. Start the application

```sh
npm run dev
```

### Usage

To use the URL Shortener API, make HTTP requests to the following endpoints:

- **POST** `{BASE_URL}/urls`: Shorten a long URL.
- **GET** `{BASE_URL}/urls`: Retrieve all short url created.
- **GET** `{BASE_URL}/{code}`: Redirect to the original URL.

### API documentation

For detailed information about the available API endpoints, please check the `BASE_URL/api-docs` , in which `BASE_URL` is your API's base URL as configured in your environment file.

### Deployment
