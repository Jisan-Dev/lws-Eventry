export default function DetailContent({ description, swags }) {
  return (
    <div className="col-span-3 max-sm:col-span-full">
      <div className="w-full h-full bg-[#242526] p-6 rounded-lg">
        <h2 className="font-bold text-2xl">Details</h2>
        <div className="my-2 text-[#AEAEAE] space-y-4 prose lg:prose-lg max-w-none">
          <p>{description}</p>

          <ul>
            {swags.map((item, index) => (
              <li key={index}>📌 {item}</li>
            ))}

            {/* <li>🎉 Free T-shirt</li>
            <li>🕹️ Networking</li>
            <li>🎯 Networking</li>
            <li>📌 Free Foods</li>
            <li>🚀 Free Wifi</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
