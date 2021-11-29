
const query = ({ term }: QueryRequestType): Promise<QueryResponseType> => {
    const companies: Array<CompanyInfoType> = [
        {
            "description": "APPLE INC",
            "displaySymbol": "AAPL",
            "symbol": "AAPL",
            "type": "Common Stock"
        },
        {
            "description": "GOOGLE INC",
            "displaySymbol": "GOOG",
            "symbol": "GOOG",
            "type": "Common Stock"
        },
        {
            "description": "FACEBOOK INC",
            "displaySymbol": "FB",
            "symbol": "FB",
            "type": "Common Stock"
        }
    ];

    const result: Array<CompanyInfoType> = companies.filter(company => {
        return (
            company.symbol.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
            company.displaySymbol.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
            company.description.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
            company.type.toLowerCase().indexOf(term.toLowerCase()) !== -1 
        )
    });

    const response: QueryResponseType = {
        result,
        count: result.length
    };

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(response);
        }, 2000);
    })
};

const companyProfile = ({ symbol }: CompanyProfileRequestType): Promise<CompanyProfileResponseType> => {
    const companies: Array<CompanyDescriptionType> = [
        {
            "description": "APPLE INC",
            "displaySymbol": "AAPL",
            "symbol": "AAPL",
            "type": "Common Stock",
            country: 'US',
            city: 'CUPERTINO',
            state: 'CALIFORNIA',
            sector: 'Information Technology'
        },
        {
            "description": "GOOGLE INC",
            "displaySymbol": "GOOG",
            "symbol": "GOOG",
            "type": "Common Stock",
            country: 'US',
            city: 'CUPERTINO',
            state: 'TEXAS',
            sector: 'Information Technology'
        },
        {
            "description": "FACEBOOK INC",
            "displaySymbol": "FB",
            "symbol": "FB",
            "type": "Common Stock",
            country: 'US',
            city: 'CUPERTINO',
            state: 'UTAH',
            sector: 'Information Technology'
        }
    ];

    const company: CompanyDescriptionType | null = companies.find(company => company.symbol === symbol) || null;
    const result = {
        data: company
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(result);
        }, 2000)
    });
};

const stockInfo = ({ symbol, from, to, type = 'daily' }: StockInfoRequestType): Promise<StockInfoResponseType> => {
    const a = new Date(from);
    const b = new Date(to);
    const day = 1000 * 60 * 60 * 24;
    const interval = Math.round((b.getTime() - a.getTime()) / day);
    const random = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    }
    const getStockInfo = (i: number): StockType => {
        return  ({
            date: from + (i + 1) * day,
            info: {
                open: random(5, 10),
                high: random(10, 20),
                low: random(1, 5),
                close: random(5, 10),
                volume: random(100, 1000)
            }
        });
    }

    const result: StockInfoResponseType = {
        data: Array(interval).fill([]).map((_, i) => getStockInfo(i))
    };
    
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(result);
        }, 2000);
    })
};

const MockProvider = {
    name: 'Mock Provider',
    query,
    companyProfile,
    stockInfo
};

export default MockProvider;

  
