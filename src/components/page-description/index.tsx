type Props = {
    providerName: string
};

const PageDescripton = ({ providerName }: Props) => {
    return <p className="page-description">Stock information provideed by: {providerName}</p>
};

export default PageDescripton;