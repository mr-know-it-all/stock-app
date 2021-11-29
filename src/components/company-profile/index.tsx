import { useEffect, useState } from "react";

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
    }, [symbol])

    if(loading) return <p>LOADING...</p>
    else if(!loading && companyProfile) {
        return (
            <div>
                <div>{companyProfile.description}</div>
                <div>{companyProfile.country}</div>
                <div>{companyProfile.state}</div>
                <div>{companyProfile.city}</div>
            </div>
        )
    } else return <p>[Profile] Select a company</p>
}

export default CompanyProfile;