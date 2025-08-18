const QuickContacts = ({ currentUser, Users }) => {


  return (
    <div>
      <h3 className="text-gray-800 font-semibold mb-2">Quick Transactions</h3>
      <div className="flex space-x-4 overflow-x-auto">
        {Users?.length > 0 &&
          Users
            .filter((user) => user._id !== currentUser?._id) 
            .map((user) => (
              <div
                key={user._id} // use stable key
                className="flex flex-col items-center cursor-pointer hover:scale-90 transition-transform"
                title={user.firstName}
              >
                <div
                  className="w-16 h-16 rounded-full border-2 border-blue-600 bg-blue-700 text-white flex justify-center items-center text-2xl font-semibold"
                >
                  {user.firstName?.charAt(0).toUpperCase()}
                </div>
                <span className="mt-1 text-gray-700 font-medium text-sm">
                  {user.firstName}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
};

export default QuickContacts;
