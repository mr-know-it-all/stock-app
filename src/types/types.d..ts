type CompanyInfoType = {
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string
}
type CompanyDescriptionType = {
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string,
    city: string,
    country: string,
    state: string,
    sector: string
}

type StockInfoType = {
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number
}
type StockType = {
    date: number,
    info: StockInfoType
}

type QueryRequestType = {
    term: string
}
type QueryResponseType = {
    count: number,
    result: Array<CompanyInfoType>
}

type CompanyProfileRequestType = {
    symbol: string
}
type CompanyProfileResponseType = {
    data: CompanyDescriptionType | null
}

type StockInfoRequestType = {
    symbol: string,
    from: number,
    to: number
};
type StockInfoResponseType = {
    data: Array<StockType> | null
};