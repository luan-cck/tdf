const Loading = ({ show = false }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center ${
        show ? '' : 'hidden'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <div>
        <div
          className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
