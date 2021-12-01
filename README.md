# Stock app
This is a sketch of a stock web application.

## Features
- the user can query companies via a text input, the results will appear below the input (finnhub provider matches at least company symbol and company name)
- after selecting a company, some information about it is displayed as well as stock data for a default interval on a chart
- the user can select a custom interval for the data and also interact with the chart, hide metrics, display average value
- the stock data is displayed with daily intervals

## Design considerations
The only page implemented is Dashboard page. It sends selected company symbol (company stock indentifier) and api methods to its subcomponents: SearchCompanies, CompanyProfile and CompanyStockChart. These subcomponents could be reused across a larger application.

The company symbol is set in the SearchCompanies component.

CompanyProfile and CompanyStock chart automatically fetch data when a company symbol is provided to them.

Global types are declared under /types directory. As long as the request/response types are respected, any stock data provider can be added under /api/api-providers directory. A mechanism that cchanges the provider at runtime can be considered.

## Tech stack
- Basic [CRA](https://create-react-app.dev/) with TypeScript boilerplate
- Default [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for unit tests
- [react-chartjs-2](https://www.npmjs.com/package/react-chartjs-2) 
- [lodash.debounce](https://lodash.com/docs/4.17.15#debounce)
- [Finnhub](https://finnhub.io/) data service

## How to use
After the usual
```sh
git clone ^
npm ci
npm start
npm test -- --coverage --watchAll=false
```
Add a valid API key in /api/api-providers/finnhub.ts at line 1, if you want to use this provider. Otherwise, in api/index.ts use mockProvider:

```ts
const Api = (provider = mockProvider)
```