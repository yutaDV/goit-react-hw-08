import { MagnifyingGlass } from 'react-loader-spinner';

const Loader = () => {
  return (
    <MagnifyingGlass
      visible={true}
      height="100"
      width="100"
      ariaLabel="magnifying-glass-loading"
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#c0efff"
      color="green"
    />
  );
};

export default Loader;