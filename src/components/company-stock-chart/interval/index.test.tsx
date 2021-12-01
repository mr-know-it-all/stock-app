import { render, waitFor, fireEvent } from '@testing-library/react';
import { date } from 'faker';
import Interval from '.';
import { SEARCH_COMPANIES, ERROR } from '../../../language/constants';

type SetupProps = {
    [key: string]: number | (() => Promise<never> | Promise<any>)
}
export const setup = (props?: SetupProps) => {
    const spies = {
        updateInterval: jest.fn(),
        setCustomInterval: jest.fn()
    };
    const { container } = render(
        <Interval
            updateInterval={spies.updateInterval}
            setCustomInterval={spies.setCustomInterval}
            from={new Date('2021-11-06').getTime()}
            to={new Date('2021-11-20').getTime()}
            {...props}
        />
    );

    return ({
        container,
        spies
    });
};

test('Interval - renders component with prop data', () => {
    const { container, spies } = setup();

    expect(container.querySelector('.chart-interval')).not.toBeEmptyDOMElement();
    expect(container.querySelector('.chart-interval input#interval-from')).toHaveValue('2021-11-06');
    expect(container.querySelector('.chart-interval input#interval-to')).toHaveValue('2021-11-20');
});

test('Interval - calls updateInterval at input change and setCustomInterval at button click', () => {
    const { container, spies } = setup();

    const fromInput = container.querySelector('.chart-interval input#interval-from');
    const toInput = container.querySelector('.chart-interval input#interval-to');

    fromInput && fireEvent.change(fromInput, { target: { value: '2021-10-01' } });
    expect(spies.updateInterval).toBeCalledWith('from', new Date('2021-10-01'));

    toInput && fireEvent.change(toInput, { target: { value: '2021-10-10' } });
    expect(spies.updateInterval).toBeCalledWith('to', new Date('2021-10-10'));

    const intervalButton = container.querySelector('.chart-interval button#interval-submit');
    intervalButton && fireEvent.click(intervalButton);
    expect(spies.setCustomInterval).toHaveBeenCalled();
});