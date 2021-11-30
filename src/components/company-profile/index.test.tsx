import { render, waitFor, fireEvent } from '@testing-library/react';
import CompanyProfile from '.';
import { COMPANY_PROFILE, NO_COMPANY_SELECTED, ERROR } from '../../language/constants';

type SetupProps = {
    [key: string]: string | (() => Promise<never> | Promise<any>)
}
export const setup = (props?: SetupProps) => {
    const spies = {
        getCompanyProfile: jest.fn()
    };
    const { container } = render(
        <CompanyProfile
            symbol=''
            getCompanyProfile={spies.getCompanyProfile}
            {...props}
        />
    );

    return ({
        container,
        spies
    });
};

test('CompanyProfile - renders component with no selected company symbol', () => {
    const { container, spies } = setup();

    expect(container.querySelector('.company-profile-empty')).not.toBeEmptyDOMElement();
    expect(container.querySelector('.company-profile-empty')?.textContent).toEqual(NO_COMPANY_SELECTED);
    expect(spies.getCompanyProfile).toHaveBeenCalledTimes(0);
});

test('CompanyProfile - renders component with selected company symbol', async () => {
    const companyProfileData = {
        description: 'APPLE INC',
        displaySymbol: 'AAPL',
        symbol: 'AAPL',
        type: 'Common Stock',
        country: 'US',
        city: 'CUPERTINO',
        state: 'CALIFORNIA',
        sector: 'Information Technology'
    };

    const { container, spies } = setup({
        symbol: 'APPL',
        getCompanyProfile: () => Promise.resolve({
            data: companyProfileData
        })
    });
    
    await waitFor(() => {
        expect(container.querySelector('.company-profile')).not.toBeEmptyDOMElement();
        expect(container.querySelector('.company-profile > h3')?.textContent).toEqual(COMPANY_PROFILE);

        const profileItems = container.querySelectorAll('.company-profile-item');
        expect(profileItems).toHaveLength(4);
        expect(profileItems[0]?.textContent).toEqual(companyProfileData.description);
        expect(profileItems[1]?.textContent).toEqual(companyProfileData.country);
        expect(profileItems[2]?.textContent).toEqual(companyProfileData.state);
        expect(profileItems[3]?.textContent).toEqual(companyProfileData.city);
    });
});

test('CompanyProfile - renders component with error if call to getCompanyProfile fails', async () => {
    const { container, spies } = setup({
        symbol: 'APPL',
        getCompanyProfile: () => Promise.reject({})
    });
    
    await waitFor(() => {
        expect(container.querySelector('.error')).not.toBeEmptyDOMElement();
        expect(container.querySelector('.error')?.textContent).toEqual(ERROR);
    });
});