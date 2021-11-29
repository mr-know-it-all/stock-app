import mockProvider from './api-providers/mock-provider';

type ApiType = {
    query: ({ term }: QueryRequestType) => Promise<QueryResponseType>,
    companyProfile: ({ symbol }: CompanyProfileRequestType) => Promise<CompanyProfileResponseType>,
    stockInfo: ({ symbol, from, to }: StockInfoRequestType) => Promise<StockInfoResponseType>
}

const Api = (provider = mockProvider): ApiType => {

    return {
        query: provider.query,
        companyProfile: provider.companyProfile,
        stockInfo: provider.stockInfo
    }
};

export default Object.freeze(Api());
