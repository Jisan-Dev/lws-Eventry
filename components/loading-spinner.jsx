export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center  min-h-[calc(100vh-160px)]">
      <p className="text-yellow-400 mr-5">Loading Events...</p>
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-yellow-400 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
      </div>
    </div>
  );
}
