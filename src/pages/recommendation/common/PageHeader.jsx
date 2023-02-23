import PageNavigation from './PageNavigation';
import PageTitle from './PageTitle';

const PageHeader = ({title}) => {
  return (
    <>
      <PageNavigation title={title} />
      <PageTitle>{title}</PageTitle>
    </>
  );
};

export default PageHeader;
