# Invite Component

## Configuration

In order to use this component, the following configuration needs to be added to a PubSweet application, like so:

```json
  {
  'invite-reset-password': {
    url: 'http://localhost:3000/invite',
  },
  roles: {
    global: ['admin', 'editorInChief', 'author'],
    collection: ['handlingEditor', 'reviewer'],
    inviteRights: {
      admin: ['admin', 'editorInChief', 'author'],
      editorInChief: ['handlingEditor'],
      handlingEditor: ['reviewer'],
    },
  },
```

## Usage

Here's the list of endpoints that'll help you invite new users in your Pubsweet app.

### Upload a file [POST]

This endpoint allows you to create a new user in your app and then send him a confirmation email.

#### Invite request

`POST /api/users/invite/{collectionId}`
| URI Parameter | Requiered | Requirements | Description |
| ------------- | --------- | ------------ | ------------------ |
| collectionId | No | String | The ID of the collection |

#### Invite request body

```json
{
  "email": "new_user@domain.com" /* required */,
  "role": "editorInChief" /* required */,
  "firstName": "Marc",
  "lastName": "Twain",
  "title": "Prof",
  "affiliation": "MIT"
}
```

#### Invite user response

```json
HTTP/1.1 200
{
  "id": "37463722-c4ca-4e3c-acec-779df8c11ad2",
  "username": "9a42b55f",
  "email": "new_user@domain.com",
  "roles": ["editorInChief"],
  "passwordResetToken": "123",
  "isConfirmed": false,
  "firstName": "Marc",
  "lastName": "Twain",
  "affiliation": "MIT",
  "title": "Prof",
  "admin": false,
  "type": "user",
  "rev": "1-12ebbb6686614791bb08ead305cde4f8"
}
```

---

### Retrieve invited user details [GET]

This endpoint allows you to retrieve an invited users' details so that you can display them in the confirmation form.

#### User details request

`GET /api/users/invite?email=new_user@domain.com&token=123`

| Query Parameter | Requiered | Requirements | Description              |
| --------------- | --------- | ------------ | ------------------------ |
| email           | Yes       | String       | The user's email         |
| token           | Yes       | String       | The password reset token |

#### User details response

```json
HTTP/1.1 200
{
  "firstName": "dsadasd",
  "lastName": "fisdadasdasdaasdago",
  "affiliation": "asdasasae23",
  "title": "131sdadassa"
}
```

---

### Reset password [POST]

This endpoint will reset a user's password and confirm his account.

#### Reset password request

`POST /api/users/invite/password/reset`

#### Reset password request body

```json
// All fields are required
{
  "email": "new_user@domain.com",
  "token": "123",
  "firstName": "Marc",
  "lastName": "Twain",
  "title": "Prof",
  "affiliation": "MIT",
  "password": "verySecure"
}
```

#### Response

```json
HTTP/1.1 200
{
  "id": "37463722-c4ca-4e3c-acec-779df8c11ad2",
  "username": "9a42b55f",
  "email": "new_user@domain.com",
  "isConfirmed": true,
  "firstName": "Marc",
  "lastName": "Twain",
  "affiliation": "MIT",
  "title": "Prof",
  "admin": false,
  "type": "user",
  "roles": [
    "editorInChief"
  ],
  "collections": [],
  "fragments": [],
  "teams": [],
  "rev": "2-81fb76ae72f143bb9edc2b4d4deaf7a3"
}
```

---
