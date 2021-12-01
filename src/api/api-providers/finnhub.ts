const API_KEY = 'c6iveviad3icv9hueu00';

const query = ({ term }: QueryRequestType): Promise<QueryResponseType> => {
    const url = `https://finnhub.io/api/v1/search?q=${term}&token=${API_KEY}`;

    return new Promise((resolve, reject) => {
        fetch(url).then(async response => {
            if(response.ok) {
                const data = await response.json().catch(reject);
                resolve(data);
            } else reject(response);
        }).catch(reject);
    });
};

const companyProfile = ({ symbol }: CompanyProfileRequestType): Promise<CompanyProfileResponseType> => {
    const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${API_KEY}`;

    return new Promise((resolve, reject) => {
        fetch(url).then(async response => {
            if(response.ok) {
                const data = await response.json().catch(reject);

                resolve({
                    data: {
                        description: data.name && data.exchange ? `${data.name} - ${data.exchange}` : '',
                        displaySymbol: data.ticker,
                        symbol: data.ticker,
                        type: "Common Stock",
                        country: data.country,
                        city: '',
                        state: '',
                        sector: data.finnhubIndustry
                    }
                });
            } else reject(response);
        }).catch(reject);
    });
};

type StockCandles = {
    "c": Array<number>,
    "h": Array<number>,
    "l": Array<number>,
    "o": Array<number>,
    "s": string,
    "t": Array<number>,
    "v": Array<number>,
  }

const stockInfoAdaptor = (data: StockCandles): StockInfoResponseType => {
    const getDay = () => {
        return {
            date: 0,
            info: {
                open: 0,
                high: 0,
                low: 0,
                close: 0,
                volume: 0
            }
        }
    };

    const count = data.t.length;

    const result = [];
    for(let i = 0; i < count; i++) {
        const day = getDay();
        day.date = Math.round(data.t[i] * 1000);
        day.info.open = data.o[i];
        day.info.high = data.h[i];
        day.info.low = data.l[i];
        day.info.close = data.c[i];
        day.info.volume = data.v[i];

        result.push(day);
    }
    return {
        data: result
    };
}

const stockInfo = ({ symbol, from, to, type = 'D' }: StockInfoRequestType): Promise<StockInfoResponseType> => {
    const start = Math.round(from / 1000).toString();
    const end  = Math.round(to / 1000).toString();

    const url = `https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=${type}&from=${start}&to=${end}&token=${API_KEY}`;

    return new Promise((resolve, reject) => {
        fetch(url).then(async response => {
            if(response.ok) {
                const data = await response.json().catch(reject);
                const transformedData = stockInfoAdaptor(data);
                resolve(transformedData);
            } else reject(response);
        }).catch(reject);
    });
};

const MockProvider = {
    name: 'Finnhub Provider',
    query,
    companyProfile,
    stockInfo
};

export default MockProvider;

  
