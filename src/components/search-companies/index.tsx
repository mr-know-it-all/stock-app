import React, { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import './style.css';

type Props = {
    getAvailableCompanies: (term: string) => Promise<QueryResponseType>,
    selectCompany: (company: CompanyInfoType) => void,
    clearSelectedCompany (): void
};

const SearchCompanies = ({
    getAvailableCompanies,
    selectCompany,
    clearSelectedCompany
}: Props) => {
    const [companies, setCompanies] = useState<Array<CompanyInfoType>>([]);
    const [term, setTerm] = useState('');
    const [loading, setLoading] = useState(false);

    const getCompaniesData = (term: string) => {
        clearSelectedCompany();

        if(term.trim().length === 0) {
            setCompanies([]);
            return;
        }

        setLoading(true);
        getAvailableCompanies(term).then(data => {
            setCompanies(data.result);
            setLoading(false);
        }).catch((error) => {
            setLoading(false);
            console.error(error);
        });
    };

    const debouncedGetAvailableCompanies = useMemo(() => debounce(getCompaniesData, 300), []);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(loading) return;

        const term = event.target.value;
        setTerm(term);

        debouncedGetAvailableCompanies(term);
    };

    const onCompanyClick = (company: CompanyInfoType) => () => {
        selectCompany(company);
        setTerm(company.symbol); 
        setCompanies([]);   
    };

    return (
        <fieldset className="search-companies">
            <label htmlFor="search-companies">Find company</label>
            <input id="search-companies" type="text" value={term} onChange={onInputChange} />

            {loading && (<div>LOADING...</div>)}
            {!loading && (
                <div className="search-companies-result">
                    {companies.map(company => (
                        <div
                            key={company.symbol}
                            className="search-companies-result-item"
                            onClick={onCompanyClick(company)}
                        >
                            <div>{company.displaySymbol}</div>
                            <div>{company.description}</div>
                        </div>
                    ))}
                </div>
            )}
        </fieldset>
    );
};

export default SearchCompanies;