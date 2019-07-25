# XSweet job component

WARNING: This is an early version, please test and report any issues.

This is a component that uses PubSweet's internal job queue to provide XSweet conversions to PubSweet applications.

# Usage

Once specified in your app's components config by adding '@pubsweet/job-xsweet' adds:

## A `/convertDocxToHTML` endpoint

That takes a `docx` file formdata input, with e.g. something like a

```
curl -X POST \
  'http://localhost:3000/convertDocxToHTML?=' \
  -H 'cache-control: no-cache' \
  -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \
  -F docx=@/home/pubsweet/components/server/job-xsweet/src/test.docx
```

This publishes a job that the job runner (a Docker container) picks up.

## Docker container

Run it with: `docker run pubsweet/job-xsweet:latest -e DATABASE_URL=yourdatabaseurl` (e.g. postgres://username:password@host.docker.internal:5432/yourdb)

The DATABASE_URL is needed so that the Docker container knows how to connect to your database.

After the Docker container starts up, jobs from the endpoint will start to be processed.

# Testing

Testing has to be done semi-automatically for now, as GitLab CI does not allow for service-2-service communication yet (https://gitlab.com/gitlab-org/gitlab-runner/merge_requests/1041), by running:

```
cd components/server/job-xsweet && yarn test --testRegex test/standaloneXsweetTest.js
```

And in a separate window, building and starting the `job-xsweet` container like so:

```
docker build -t pubsweet/job-xsweet components/server/job-xsweet
docker run -e DATABASE_URL="postgres://yourUsername@host.docker.internal/test" pubsweet/job-xsweet
```

This will test both the GraphQL subscription and the classic long-running HTTP request path.
