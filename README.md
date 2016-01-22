# Welcome to my Node Express Postgres Angular example!

## Background

I have created a sample single page application for a fictional talent placement company. They were looking for the ability to add Talent (aka, clients) to their database. Each talent needed to have at least a first name, last name, phone number, and a high range and low range for salary expectations.

In addition each talent should also list their skills. A skill just has a name, such as "JavaScript" or "Public Speaking".

The client wanted the homepage to display a listing of all talent, and what skills they have. They also wanted like a button that hides and shows a form for adding new talent to the database. When adding new talent, skills are chosen from a list of skills pulled from a second table in the database.

The client also needed a button to hide and show both a list of all existing skills and a form for adding new skills to the database.

## Technology

The backend was created using Node and Express, from the ground up, simply using `npm init` and installing a few packages. Grunt was used to automatically move CSS/JS from packages into the public/vendor folder, so run `grunt` from the terminal first.

In this example, I wanted to demonstrate how to use plain SQL to do everything you need. All input is parameterized, so there is no risk of SQL injection.

Skeleton CSS was used for rapidly creating a simple clean interface that is mobile responsive and easily used as a base framework.

Angular JS was used for two way data-binding, DOM manipulation and API interaction.
