## World ID Authentication with Next.js

To learn more about WorldID click [here](https://docs.worldcoin.org/)

<img
  src="worldid.png"
  width="800"
/>

### Running the app

1. Clone the repo and install dependencies

```sh
git clone git@github.com:dabit3/worldid-auth.git

cd worldid-auth

npm install

# or yarn, pnpm, bun, etc...
```

2. Create WorldID App

> Be sure to set the app as "Production" to use on a real device.

<img
  src="wcid-app.png"
  width="700"
/>

3. Create WorldID Action

<img
  src="wcid-action.png"
  width="700"
/>

4. Configure environment variables, including App ID and Action from previous two steps.

```sh
# rename .env.local.example to .env.local
AIRSTACK_API_KEY=""
NEXT_PUBLIC_WC_ACTION=""
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=""

# !!! remove "_app" from the WorldCoin App ID before setting !!!
NEXT_PUBLIC_WLD_APP_ID=""
```

5. Run the app

```sh
npm run dev
```