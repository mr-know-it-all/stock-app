import mockProvider from './api-providers/mock-provider';

const Api = (provider = mockProvider) => {

    return {
        query: provider.query,
        companyProfile: provider.companyProfile,
        stockInfoDaily: provider.stockInfoDaily
    }
};

export default Object.freeze(Api());
