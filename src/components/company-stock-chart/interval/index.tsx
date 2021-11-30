import { FROM, TO } from '../../../language/constants'; 
import './style.css';

type Props = {
    updateInterval: (type: 'from' | 'to', value: Date) => void,
    setCustomInterval: () => void
}

const Interval = ({
    updateInterval,
    setCustomInterval
}: Props) => {
    return (
        <fieldset className="chart-component-interval">
            <label htmlFor="interval-from">{FROM}</label>
            <input type="date" id="interval-from" onChange={
                event => {
                    const value = new Date(event.target.value);
                    updateInterval('from', value);
                }
            } />
            <label htmlFor="interval-to">{TO}</label>
            <input type="date" id="interval-to" onChange={
                event => {
                    const value = new Date(event.target.value);
                    updateInterval('to', value);
                }
            } />
            <button onClick={setCustomInterval}>Set interval</button>
        </fieldset>
    )
};

export default Interval;