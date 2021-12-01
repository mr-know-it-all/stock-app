import { FROM, TO } from '../../../language/constants'; 
import './style.css';

type Props = {
    updateInterval: (type: 'from' | 'to', value: Date) => void,
    setCustomInterval: () => void,
    from: number,
    to: number
}

const Interval = ({
    updateInterval,
    setCustomInterval,
    from,
    to
}: Props) => {
    const dateFrom = (new Date(from)).toISOString().substr(0, 10);
    const dateTo = (new Date(to)).toISOString().substr(0, 10);

    return (
        <fieldset className="chart-interval">
            <label htmlFor="interval-from">{FROM}</label>
            <input type="date" id="interval-from" value={dateFrom} onChange={
                event => {
                    const value = new Date(event.target.value);
                    updateInterval('from', value);
                }
            } />
            <label htmlFor="interval-to">{TO}</label>
            <input type="date" id="interval-to" value={dateTo} onChange={
                event => {
                    const value = new Date(event.target.value);
                    updateInterval('to', value);
                }
            } />
            <button id="interval-submit" onClick={setCustomInterval}>Set interval</button>
        </fieldset>
    )
};

export default Interval;