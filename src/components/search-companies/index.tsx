import React, { useState, useMemo } from 'react';
import debounce from 'lodash.debounce';
import './style.css';
import { SEARCH_COMPANIES, LOADING, ERROR, SEARCH } from '../../language/constants';

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
    const [error, setError] = useState(false);

    const getCompaniesData = useMemo(() => (
        (term: string) => {
            clearSelectedCompany();
            setError(false);
    
            if(term.trim().length === 0) {
                setCompanies([]);
                return;
            }
    
            setLoading(true);
            getAvailableCompanies(term).then(data => {
                setCompanies(data.result);
                setLoading(false);
            }).catch((error) => {
                setError(true);
                setLoading(false);
            });
        }
    ), [clearSelectedCompany, getAvailableCompanies]);

    const debouncedGetAvailableCompanies = useMemo(() => debounce(getCompaniesData, 300), [getCompaniesData]);

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
            <label htmlFor="search-companies">{SEARCH_COMPANIES}</label>
            <input
                id="search-companies"
                type="text"
                value={term}
                onChange={onInputChange}
                placeholder={SEARCH}
                autoComplete="off"
            />

            {loading && (<div className="loading">{LOADING}</div>)}
            {!loading && error && (<div className="error">{ERROR}</div>)}
            {!loading && !error && companies.length > 0 && (
                <div className="search-companies-result">
                    {companies.map(company => (
                        <div
                            key={company.symbol}
                            className="search-companies-result-item"
                            onClick={onCompanyClick(company)}
                        >
                            <span>{company.displaySymbol}</span>
                            <span>{company.description}</span>
                        </div>
                    ))}
                </div>
            )}
        </fieldset>
    );
};

export default SearchCompanies;