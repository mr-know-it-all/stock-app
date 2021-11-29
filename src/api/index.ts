import mockProvider from './api-providers/mock-provider';

type ApiType = {
    providerName: string,
    query: ({ term }: QueryRequestType) => Promise<QueryResponseType>,
    companyProfile: ({ symbol }: CompanyProfileRequestType) => Promise<CompanyProfileResponseType>,
    stockInfo: ({ symbol, from, to }: StockInfoRequestType) => Promise<StockInfoResponseType>
}

const Api = (provider = mockProvider): ApiType => {

    return {
        providerName: provider.name,
        query: provider.query,
        companyProfile: provider.companyProfile,
        stockInfo: provider.stockInfo
    }
};

export default Object.freeze(Api());
