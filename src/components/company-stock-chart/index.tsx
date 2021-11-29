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
    }, [symbol, interval]);

    console.log('companystock', companyStock)

    if(loading) return <p>LOADING...</p>
    else if(!loading && companyStock) {
        return (
            <figure className="company-stock-chart">
                <Chart data={companyStock} />
            </figure>
        )
    } else return <p>[Chart] Select a company</p>
}

export default CompanyStockChart;