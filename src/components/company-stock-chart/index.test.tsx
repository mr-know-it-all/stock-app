import { render, waitFor, fireEvent } from '@testing-library/react';
import CompanyStockChart from '.';
import { COMPANY_PROFILE, NO_COMPANY_SELECTED, ERROR } from '../../language/constants';

type SetupProps = {
    [key: string]: string | (() => Promise<never> | Promise<any>)
}
export const setup = (props?: SetupProps) => {
    const spies = {
        getStockInfo: jest.fn()
    };
    const { container } = render(
        <CompanyStockChart
            symbol=''
            getStockInfo={spies.getStockInfo}
            {...props}
        />
    );

    return ({
        container,
        spies
    });
};

test('CompanyStockChart - renders component with no selected company symbol', () => {
    const { container, spies } = setup();

    expect(container.querySelector('.company-stock-chart')).toBeEmptyDOMElement();
    expect(container.querySelector('.company-stock-chart canvas')).toBe(null);
});

test('CompanyStockChart - renders component with selected company symbol', async () => {
    const stockData = [
        {
            date: 1635717600000,
            info: {
                open: 1,
                high: 2,
                low: 0.3,
                close: 1.2,
                volume: 500
            }
        },
        {
            date: 1635804000000,
            info: {
                open: 1,
                high: 2,
                low: 0.3,
                close: 1.2,
                volume: 500
            }
        }
    ] 
    const { container, spies } = setup({
        symbol: 'GOOG',
        getStockInfo: () => Promise.resolve({ data: stockData })
    });

    expect(container.querySelector('.company-stock-chart')).not.toBeEmptyDOMElement();

    await waitFor(() => {
        expect(container.querySelector('.company-stock-chart canvas')).not.toBe(null);
        expect(container.querySelector('.company-stock-chart .chart-component-interval')).not.toBeEmptyDOMElement();
    });
});