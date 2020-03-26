# AWS S3 File Upload Configuration

In order to use this component, the following configuration needs to be added to a PubSweet application inside a section named `pubsweet-component-aws-s3`:

- `secretAccessKey`: the `AWS_S3_SECRET_KEY` value from the app's `.env` file
- `accessKeyId`: the `AWS_S3_ACCESS_KEY` value from the app's `.env` file
- `region`: the `AWS_S3_REGION` value from the app's `.env` file
- `bucket`: the `AWS_S3_BUCKET` value from the app's `.env` file

For example:

```json
"pubsweet-component-aws-s3": {
    "secretAccessKey": "process.env.AWS_S3_SECRET_KEY",
    "accessKeyId": "process.env.AWS_S3_ACCESS_KEY",
    "region": "process.env.AWS_S3_REGION",
    "bucket": "process.env.AWS_S3_BUCKET",
    "validations": "path.resolve(__dirname, 'upload-validations.js')",
  },
```

The `.env` file should look like this:

```shell
AWS_S3_ACCESS_KEY = exampleKey
AWS_S3_SECRET_KEY = exampleKey/sads/21
AWS_S3_REGION = region-name
AWS_S3_BUCKET = bucket-name
```

Then, as soon as possible in your app you should add the `dotenv` package:

```js static
require('dotenv').config()
```

# `component-aws-s3` API

A list of endpoints that help you upload, download and delete S3 files.

## Upload a file [POST]

#### Request

`POST /api/file`

#### Request body

```static
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryWfPNVh4wuWBlyEyQ

------WebKitFormBoundaryWfPNVh4wuWBlyEyQ
Content-Disposition: form-data; name="fileType"

supplementary
------WebKitFormBoundaryWfPNVh4wuWBlyEyQ
Content-Disposition: form-data; name="fragmentId"

545
------WebKitFormBoundaryWfPNVh4wuWBlyEyQ
Content-Disposition: form-data; name="file"; filename="attachment.txt"
Content-Type: text/plain

[file content goes there]
------WebKitFormBoundaryWfPNVh4wuWBlyEyQ
```

#### Response

```json
{
  "id": "fragment-id/file-id",
  "name": "Document Name.doc",
  "size": 452097
}
```

## Retrieve file signed URL [GET]

This endpoint allows you to retrieve a file's signed URL that can be used to download the file.

#### Request

`GET /api/files/{fragmentId}/{fileId}`

| URI Parameter | Requiered | Requirements | Description            |
| ------------- | --------- | ------------ | ---------------------- |
| fragmentId    | Yes       | String       | The ID of the fragment |
| fileId        | Yes       | String       | The ID of the file     |

| Query Parameter | Requiered | Requirements | Description                            |
| --------------- | --------- | ------------ | -------------------------------------- |
| download        | No        | Boolean      | Get the file data blob if set to true. |

#### Response

```json
HTTP/1.1 200
{
	"signedUrl": "aws-url"
}
```

## Retrieve files as zip [GET]

This endpoint allows you to retrieve a fragment's files as a zip archive.

#### Request

`GET /api/files/{fragmentId}`

| URI Parameter | Requiered | Requirements | Description            |
| ------------- | --------- | ------------ | ---------------------- |
| fragmentId    | Yes       | String       | The ID of the fragment |

| Query Parameter | Requiered | Requirements  | Description                                                                                    |
| --------------- | --------- | ------------- | ---------------------------------------------------------------------------------------------- |
| fileTypes       | No        | Array(String) | Specify which file types to be included in the zip. All file types will be included if omitted |

#### Response

```json
HTTP/1.1 200
{
	"dataBlob"
}
```

## Delete file [DELETE]

#### Request

`DELETE /api/file/{fileId}`

| URI Parameter | Requiered | Requirements | Description        |
| ------------- | --------- | ------------ | ------------------ |
| fileId        | Yes       | String       | The ID of the file |

#### Response

```json
HTTP/1.1 204
```

---
