import { useEffect, useState } from "react";
import './style.css';
import { LOADING, COMPANY_PROFILE, NO_COMPANY_SELECTED } from '../../language/constants';

type Props = {
    symbol: string,
    getCompanyProfile: (symbol: string) => Promise<CompanyProfileResponseType> 
}

const CompanyProfile = ({ symbol, getCompanyProfile }: Props) => {
    const [loading, setLoading] = useState(false);
    const [companyProfile, setCompanyProfile] = useState<CompanyDescriptionType | null>(null);

    useEffect(() => {
        if(symbol.trim().length === 0) {
            setCompanyProfile(null);
            return;
        }
        
        setLoading(true);
        getCompanyProfile(symbol).then(response => {
           setCompanyProfile(response.data); 
           setLoading(false);
        }).catch(error => {
            console.error(error);
            setLoading(false);
        })
    }, [symbol, getCompanyProfile])

    if(loading) return <p className="loading">{LOADING}</p>
    else if(!loading && companyProfile) {
        return (
            <article className="company-profile">
                <h3>{COMPANY_PROFILE}</h3>
                <div className="company-profile-item">{companyProfile.description}</div>
                <div className="company-profile-item">{companyProfile.country}</div>
                <div className="company-profile-item">{companyProfile.state}</div>
                <div className="company-profile-item">{companyProfile.city}</div>
            </article>
        )
    } else return <p className="company-profile-empty">{NO_COMPANY_SELECTED}</p>
}

export default CompanyProfile;