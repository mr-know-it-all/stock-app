import { useEffect, useState } from "react";
import Chart from './chart';
import './style.css';

type Props = {
    symbol: string,
    getStockInfo: ({ symbol, from, to, type }: StockInfoRequestType) => Promise<StockInfoResponseType>; 
}

const day = 1000 * 60 * 60 * 24;

const CompanyStockChart = ({ symbol, getStockInfo }: Props) => {
    const [loading, setLoading] = useState(false);
    const [companyStock, setCompanyStock] = useState<Array<StockType> | null>(null);
    const [interval, setInterval] = useState({
        from: Date.now(),
        to: Date.now() + 10 * day
    });

    useEffect(() => {
        if(symbol.trim().length === 0) {
            setCompanyStock(null);
            return;
        }

        setLoading(true);
        getStockInfo({ symbol, from: interval.from, to: interval.to, type: 'daily' }).then(response => {
            setCompanyStock(response.data); 
            setLoading(false);
        }).catch(error => {
            console.error(error);
            setLoading(false);
        })
    }, [symbol, getStockInfo]);

    const setCustomInterval = () => {
        setLoading(true);
        getStockInfo({ symbol, from: interval.from, to: interval.to, type: 'daily' }).then(response => {
            setCompanyStock(response.data); 
            setLoading(false);
        }).catch(error => {
            console.error(error);
            setLoading(false);
        })
    };
    
    return (
        <figure className="company-stock-chart">
            {loading && <p>Loading...</p>}
            {companyStock && (
                <>
                    <label htmlFor="interval-from">From</label>
                    <input type="date" id="interval-from" onChange={
                        event => {
                            const value = new Date(event.target.value);
                            setInterval(state => ({ ...state, from: value.getTime() }));
                        }
                    } />
                    <label htmlFor="interval-from">Tom</label>
                    <input type="date" id="interval-to" onChange={
                        event => {
                            const value = new Date(event.target.value);
                            setInterval(state => ({ ...state, to: value.getTime() }));
                        }
                    } />
                    <button onClick={setCustomInterval}>Set interval</button>
                </>
            )}

            {companyStock && !loading && <Chart data={companyStock} />}
        </figure>
    );
}

export default CompanyStockChart;