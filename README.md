# 2021-business-50

This is the repository for the Star Tribune 50, a business project that runs annually in the late spring. It's a standard Svelte 3 setup that powers many of the Star Tribune's interactive pages. 

Unlike the previous versions of the business interactives, this project's data is served from a static file `./data/companies.json`, which is tracked by git. This cuts out a good amount of time in the build process. 

Data from this project comes from DataUI, but the initial data load comes from a Google Sheet. There is currently not a mechanism in this project to load that data so you'll need to use the import commands from [this repo](https://github.com/striblab/2020-top-executives).

This import command only needs to be run once. The rest of the changes, which should hopefully be minor, can be made directly in DataUI. 

## Setup 

Before running this project you'll need to setup/install a number of things: 

- An .env file with the correct environment variables
- node.js (node version 10.12 works for sure if you run into node error messages)
- The `tunnel.sh` file to get through the Star Tribune's firewall and into the database holding the company info (this is needed only to update/load data so if you're only running the project locally without needing to make data changes you won't need this). 

### .env 

The environment variables you'll need to run this project (you can obtain these from Chase Davis):

```
DATA_UI_USERNAME
DATA_UI_API_KEY
BUSINESS_DB_URI
DATA_UI_LOCATION
MYSQL_HOST
MYSQL_USER
MYSQL_PASS
MYSQL_DATABASE
MYSQL_PORT
```

These are primarily needed to run the script that fetches data from the data-ui API endpoint. 

## Updating the data

The downside to cutting the API call out of the build phase is that you'll need to manually run the command every time data is changed or updated in DataUI. 

`npm run get_data` will update `./data/companies.json`. It's an expensive call so it'll take a minute. 

## Swapping the data for a different year

This is designed to be a repo that's easy to switch and reuse for a different year. To do that, you'll need to change variables in a few places. 

- `./data/fetch_data.js` - change `PUBLISH_YEAR` to the current year on line 8. 
- `./src/App.svelte` - change `PUBLISH_YEAR` to the current year on line 9. 

To preserve the previous year's version, you can start a new branch off master or clone the repo.  

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

fetch the data (this may take a bit)
```
npm run get_data
```

...then start webpack:

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running. Edit a component file in `src`, save it, and the page should reload with your changes.

## Deploying

To deploy (bucket paths need to be set in `webpack.config.js`):
```bash
npm run build -- --deploy
``` 

Or, some other suggestions from Rich Harris:

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public
```

## LCD Setup

Assuming you're using a series-article template, this project uses the standard series-article LCD. 

The two most important fields for the project itself are the `Body override` field and the `Responsive Styles` field

Inside of the body override field you'll need at least these two elements 

```
<div id="proj-container"></div>
<script src='https://static.startribune.com/your-webpack-production-file-path-here/bundle.js'></script>
```

Svelte looks for a `div` with the id `proj-container` to insert the content into. If that div isn't there, the project will not renderat all. 

In Responsive Styles you'll need a standard link tag pointing to the `bundle.css`. 

```
<link rel='stylesheet' href='https://static.startribune.com/your-webpack-production-file-path-here/bundle.css'>
```

It is important to note that you must bust the cache with a string at the end of both `bundle.js` and `bundle.css` (i.e. cache=trash, cache=trash1, etc.) in order to see immediate changes on the template page. 