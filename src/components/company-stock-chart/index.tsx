import { useEffect, useState } from "react";
import Chart from './chart';
import Interval from './interval';
import './style.css';
import { LOADING, ERROR } from '../../language/constants';

type Props = {
    symbol: string,
    getStockInfo: ({ symbol, from, to, type }: StockInfoRequestType) => Promise<StockInfoResponseType>; 
}

const day = 1000 * 60 * 60 * 24;

const CompanyStockChart = ({ symbol, getStockInfo }: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [companyStock, setCompanyStock] = useState<Array<StockType> | null>(null);
    const [interval, setInterval] = useState({
        from: Date.now() - 15 * day,
        to: Date.now() - 5 * day
    });

    useEffect(() => {
        setError(false);

        if(symbol.trim().length === 0) {
            setCompanyStock(null);
            return;
        }
        
        setLoading(true);
        getStockInfo({ symbol, from: interval.from, to: interval.to, type: 'D' }).then(response => {
            setCompanyStock(response.data); 
            setLoading(false);
        }).catch(error => {
            setError(true);
            setLoading(false);
        })
    }, [symbol, getStockInfo]);

    const setCustomInterval = () => {
        setError(false);
        setLoading(true);
        getStockInfo({ symbol, from: interval.from, to: interval.to, type: 'D' }).then(response => {
            setCompanyStock(response.data); 
            setLoading(false);
        }).catch(error => {
            setError(true);
            setLoading(false);
        })
    };

    const updateInterval = (type: 'from' | 'to', value: Date) => {
        setInterval(state => ({ ...state, [type]: value.getTime() }));
    };
    
    return (
        <figure className="company-stock-chart">
            {loading && <p className="loading">{LOADING}</p>}
            {!loading && error && <p className="error">{ERROR}</p>}
            {companyStock && !loading && (
                <>
                    <Interval updateInterval={updateInterval} from={interval.from} to={interval.to} setCustomInterval={setCustomInterval} />
                    <Chart data={companyStock} />
                </>
            )}
        </figure>
    );
}

export default CompanyStockChart;