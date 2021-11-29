import { useState } from 'react';
import SearchCompanies from "../../components/search-companies";
import CompanyProfile from '../../components/company-profile';
import CompanyStockChart from '../../components/company-stock-chart';
import Api from '../../api';


const Dashboard = () => {
    const [symbol, setSymbol] = useState('');
    const clearCompany = () => setSymbol('');

    const getAvailableCompanies = (term: string) => Api.query({ term });
    const getCompanyProfile = (symbol: string) => Api.companyProfile({ symbol });
    const getStockInfo = ({ symbol, from, to, type }: StockInfoRequestType) => Api.stockInfo({ symbol, from, to, type});

    const setSelectedCompany = (company: CompanyInfoType) => {
        setSymbol(company.symbol);
    };

    return (
        <>
            <SearchCompanies
                getAvailableCompanies={getAvailableCompanies}
                selectCompany={setSelectedCompany}
                clearSelectedCompany={clearCompany}
            />
            
            <CompanyProfile symbol={symbol} getCompanyProfile={getCompanyProfile} />

            <CompanyStockChart symbol={symbol} getStockInfo={getStockInfo} />
        </>
    )
};

export default Dashboard;