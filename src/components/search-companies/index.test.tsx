import { render, waitFor, fireEvent } from '@testing-library/react';
import SearchCompanies from '.';
import { SEARCH_COMPANIES, ERROR } from '../../language/constants';

type SetupProps = {
    [key: string]: (() => Promise<never> | Promise<any>)
}
export const setup = (props?: SetupProps) => {
    const spies = {
        getAvailableCompanies: jest.fn(),
        selectCompany: jest.fn(),
        clearSelectedCompany: jest.fn()
    };
    const { container } = render(
        <SearchCompanies
            getAvailableCompanies={spies.getAvailableCompanies}
            selectCompany={spies.selectCompany}
            clearSelectedCompany={spies.clearSelectedCompany}
            {...props}
        />
    );

    return ({
        container,
        spies
    });
};

test('SearchCompanies - renders component', () => {
    const { container, spies } = setup();

    expect(container.querySelector('.search-companies')).not.toBeEmptyDOMElement();
    expect(container.querySelector('.search-companies > label')).not.toBeEmptyDOMElement();
    expect(container.querySelector('.search-companies > input')).toBeDefined();
    expect(container.querySelector('.search-companies > label')?.textContent).toEqual(SEARCH_COMPANIES);
    expect(container.querySelector('.search-companies-result')).toBeEmptyDOMElement();
});


test('SearchCompanies - triggers companies search, displays results, selects company, then clears the selected company', async () => {
    const availableCompanies: Array<CompanyInfoType> = [
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

    const { container, spies } = setup({
        getAvailableCompanies: () => Promise.resolve({
            result: availableCompanies
        })
    });

    expect(spies.clearSelectedCompany).toBeCalledTimes(0);
    const searchInput = container.querySelector('.search-companies > input') as HTMLInputElement;
    searchInput && fireEvent.change(searchInput, { target: { value: 'C' } });
   
    await waitFor(() => {
        const searchResult = container.querySelector('.search-companies-result');
        expect(searchResult).not.toBeEmptyDOMElement();

        const searchResultItems = searchResult?.querySelectorAll('.search-companies-result-item');
        expect(searchResultItems).toHaveLength(availableCompanies.length);
        expect(spies.clearSelectedCompany).toBeCalledTimes(1);
    });

    await waitFor(() => {
        const searchResult = container.querySelector('.search-companies-result');
        const searchResultItems = searchResult?.querySelectorAll('.search-companies-result-item');

        searchResultItems && searchResultItems[0] && fireEvent.click(searchResultItems[0]);
        expect(spies.selectCompany).toBeCalledWith(availableCompanies[0]);
    });

    await waitFor(() => {
        searchInput && fireEvent.change(searchInput, { target: { value: '' } });
        expect(spies.clearSelectedCompany).toBeCalledTimes(2);
    });
});

test('SearchCompanies - renders component with error if call to getAvailableCompanies fails', async () => {
    const { container, spies } = setup({
        getAvailableCompanies: () => Promise.reject({})
    });

    const searchInput = container.querySelector('.search-companies > input') as HTMLInputElement;
    searchInput && fireEvent.change(searchInput, { target: { value: 'C' } });
    
    await waitFor(() => {
        expect(container.querySelector('.error')).not.toBeEmptyDOMElement();
        expect(container.querySelector('.error')?.textContent).toEqual(ERROR);
    });
});