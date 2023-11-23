#nationer i Lund

website gathering (almost) all events arranged by (almost all) nations in Lund and some of the student organizations connected to Akademiska Föreningen. Started as project in course EDAF90, web programming, written in Svelte. 

Events are scraped via an anonymous API from studentlund. The same information we present can be found at [studentlund]("https://www.studentlund.se/"), but we're better.

## If you are connected to a nation
Consider talking your Quratel about allowing us to access your events directly, to make it easier for us to present the correct events and for you to reach more people in a simpler manner. Contact us and we can discuss this further.

Plz don't hate <3


####The Svelte Manifesto

Developers in every nation, take to arms, kill your react suppressor

![Svelte](/images/svelte.png?raw=true 'Svelte')

## Developing

If you don't already have yarn, you need to install it:

```
sudo npm install --global yarn
```

Then install dependencies:

```
yarn
```

A development server can then be started through:

```bash
yarn dev
```

This project uses TS, since JS sucks ass.

[Tailwind](https://tailwindcss.com/) is used for CSS, [flowbite-svelte](https://flowbite-svelte.com/) is our chosen component library. But we have the goal of being self sufficient in css and components.

## Adding dependencies

Since the project uses yarn instead of npm, new dependencies are added using `yarn add <package-name>`

## Building

To create a production version of your app:

```bash
yarn build
```

You can preview the production build with `yarn preview`.
