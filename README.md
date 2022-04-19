# Newman CLI

Newman is a command-line collection runner for Postman. It allows you to effortlessly run and test a Postman collection directly from the command-line. It is built with extensibility in mind so that you can easily integrate it with your continuous integration servers and build systems.

# Getting Started

Install dependencies

```shell
npm install
```

Create run.json with a copy of your postman collection or use run.sample.json to get started.

Make sure you have at least 2GB of memory to dedicate to load testing.

```
npm start
```

If you increase the parallels, you'll need to allocate more memory to Node.

```shell
npm run 10gig
```