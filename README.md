# Welcome to Tech Snack

Tech Snacks is my personal blog, in addition to being a blog engine created with the help of [Remix](https://remix.run), which is a framework for creating react applications. I created the my own blog engine due to the freedom and ability to customize every aspect of how things everything is put together. For example, prosessing markdown on the go, which gives me the ability to switch between content sources whenever I want. Another is to swich text prosessors whenever i feel like it, without having to change too much. This is something that Static Site Generation had a hard time fulfilling, especially given the way I wanted to design/architect the application.

## Development

The continous delivery pipeline and production environment runs on `node 16`, which means that development should ideally be done on the same version, however, it should be ok to use never versions in most cases. Just remember to run `npm ci` after cloning the project to download all dependencies before running `npm run dev` to start up the local development server. You should afterward be able to find the application available on [http://localhost:3000](http://localhost:3000). For any customization or information regarding the development server, please refer to [the remix documentation](https://remix.run/docs/en/v1/other-api/dev#remix-dev), as I am using it as is, out of the box.

### Commands mentioned

Install project dependencies based on versions listed in `package-lock.json`.

```sh
npm ci
```

Start development server too see live output based on the current state of the codebase.

```sh
npm run dev
```

## Deployment

The application is currently running in a standard Google Cloud App Engine environment, with little to no custom configuration, as can be seen in the `app.yaml` file. The only thing that is out of the "standard" is the environment variables listed in the file, which preferably should be configured another more secret place. But that is a problem for whenever I connect to a remote source in the future. Future me problems in other words.

There are two very important commands that has to be run before the application is available in a production environment. First, we have to build the application, by running `npm run build`. This will give us a `build/` and `public/build/` folder which is the content/files that needs to be served. Secondly, we are using remix serve to run the node server, so remember to run `npm run start` after transfering the files over to whichever server environment you are using, to begin serving the application.

OPS! The server won't be able to start up unless the environment variable `NODE_ENV` is set to `production`.

### Commands mentioned

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

## History of Tech Snacks

Tech Snacks got it's name during summer of 2022, but the site itself has been in the works for much longer. It first began as a [Gatsby](https://www.gatsbyjs.com/) application, which was ok, but I was not a fan of loading content into a local database and query it out during the build process. It kind of felt wrong to go through all the work of loading data and information into a local graphQL database, which was going to be erased after the build process was finished. Felt like wasted time and effort.

After tinkering for awhile, I decided to attempt to write the application using [Next](https://nextjs.org/), which was essentially identical to Remix in many ways, but everything too cluttered, too many things that had to be defined in return values of various functions depending rendering mode and such. It did not feel like something I would like to tinker with and evolve over time, which is why I migrated over to Remix in the end.

Remix provided a really simple API for what I wanted, `loaders` for fetching and sending data to the view, without having to think about anything else, those were seperated into their own separate functions and lived in semi-isolation from each other. In other words, detached functionality which functions as bricks, that together forms whatever I wanted to build. Which is why we are here, a Remix application where i am in control of almost everything. From how content is located and processed to how it is displayed. It is currently reading the content directly from the servers file directory, which is good enough for now.
