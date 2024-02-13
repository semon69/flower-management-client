const NoDataFound = ({title}: {title: string}) => {
  return (
    <div>
      <h1 className="font-bold lg:text-3xl text-center text-red-600">No {title} Found</h1>
    </div>
  );
};

export default NoDataFound;