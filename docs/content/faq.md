This page documents snags, issues and problems experienced by developers of PubSweet apps. The aim is to then either fix or properly document the behaviour in order to streamline the experience for future contributors.

Feel free to add your own questions – and answers if you have them.

## Docker

## Invalid ELF header

- When running the app with Docker you get an error about `invalid ELF header`. This is caused by npm binary dependencies having been compiled for the wrong platform, probably because `yarn` was run on the host machine before the container was started. Resolve it by deleting you `node_modules` and restarting your containers. This will run `yarn` inside the container.

## Is the Docker engine running ?

Check whether docker engine service is running or not. It's good to check this in case `docker-compose` can’t access it.

```bash
$ sudo service docker status
● docker.service - Docker Application Container Engine
   Loaded: loaded (/lib/systemd/system/docker.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2017-12-21 19:16:26 UTC; 1h 45min ago
     Docs: https://docs.docker.com
 Main PID: 20127 (dockerd)
    Tasks: 23
   Memory: 1.0G
      CPU: 53.520s
```

## Does Docker's unix socket file have proper ownership ?

Check Docker's unix socket file whether it has correct owner or not.

```bash
$ sudo ls -la /var/run/docker.sock
srw-rw---- 1 root docker 0 Dec 21 19:16 /var/run/docker.sock
```

## Is your user in docker's user group ?

```bash
$ docker-compose up -d postgres
ERROR: Couldn't connect to ˜Docker daemon at http+docker://localhost - is it running?
```

You need to use sudo if your user is not in docker's user group. Even if you use sudo,
you may encounter other permission issues between host and container filesystems when you mounted volume to containers.
You can add your user to docker user group with the following command.

```bash
$ sudo usermod -aG docker ${USER}
$ su - $USER
```

You should then logout and login into the host again.

## Check docker PORTS and configuration.

Sometimes we see problems like the following when trying to `setupdb` or start the application:

```bash
$ pubsweet start
info: Starting PubSweet app
info: No "start" script defined in app. Falling back to "pubsweet server" behavior.
info: Starting PubSweet app
info: Checking if database tables exist.
error: Error: connect ECONNREFUSED 127.0.0.1:5432
    at Object._errnoException (util.js:992:11)
    at _exceptionWithHostPort (util.js:1014:20)
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1186:14)
error Command failed with exit code 1.
```

One of the following things might be happening:

## Postgres is not running.

If `postgres` is running you should see the following by running: `docker ps`

```bash
user@server:~$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
a9db084764be        postgres            "docker-entrypoint..."   3 months ago        Up 2 months         0.0.0.0:5440->5432/tcp   a9db084764be_xpub_postgres_1
```

Otherwise start the postgres docker service by following the steps in the README file of the application. Probably it will be:

```bash
$ yarn start:services
```

## Your configuration file is misconfigured, or you are running the app in the wrong environment.

The default configuration is in the folder `config/default.js` of your app. Please, souble the check the guide in the README file of the project for the correct way of configuring your app. Also in the config folder you will find other files like `developement.js`, `test.js`. Those files overwrite the `default.js` configuration depending on the environment that you run your app in. This can be checked by running:

```bash
user@server:~/Projects$ echo $NODE_ENV
development
```

You can set your environment by performing `export NODE_ENV=development` that will load the `development.js` config file.

## Check that ports are open.

There are two ports that should be open. First one is the web app port which usually is 3000 - but this is configured from the config file of the application - and the second one is the database port (Postgres) which is usually 5432.
Using `telnet` or `nc` tool we can check if these ports are open :

```bash
$ nc -zv localhost 5432
Ncat: Version 7.50 ( https://nmap.org/ncat )
Ncat: Connected to ::1:5432.
Ncat: 0 bytes sent, 0 bytes received in 0.01 seconds.
```

In case that fails we should open the ports from the firewall list, using ufw or iptables by performing the following command:

```bash
ufw allow 5432
```

or

```bash
sudo iptables -A INPUT -p tcp -d 0/0 -s 0/0 --dport 3000 -j ACCEPT
```

## error: database "test" does not exist

If you're trying to run tests in PubSweet core (that is: this repository) and you're getting the above error: you need to create a local postgresql database with the name `test`. `psql` into your local database and `CREATE DATABASE test;` and it should work.
