# EDAF90Project

EDAF90 Project - The Svelte Manifesto

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

[Tailwind](https://tailwindcss.com/) is used for CSS, [flowbite-svelte](https://flowbite-svelte.com/) is our chosen component library.

## Adding dependencies

Since the project uses yarn instead of npm, new dependencies are added using `yarn add <package-name>`

## Building

To create a production version of your app:

```bash
yarn build
```

You can preview the production build with `yarn preview`.
