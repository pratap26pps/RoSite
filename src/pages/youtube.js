import Link from "next/link";

export default function YoutubeTrust() {
  return (
    <section className="bg-white text-black px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-blue-700">
            Trusted by 25,000+ Clients Since 1999
          </h2>
          <p className="mb-4">
            RO TECHNICAL XPERTS is not just an online platform — we've served thousands of happy customers through our offline network across NCR for over two decades.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>🔧 Installed 25,000+ RO Systems since 1999</li>
            <li>🏆 Recognized service provider for homes, schools, hospitals, & defense</li>
            <li>📞 Active service network across Ballabhgarh, Faridabad, and NCR</li>
            <li>🎯 24×7 expert support and doorstep assembling</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">🎥 YouTube Channel Highlights</h3>
          <ul className="space-y-2 text-gray-800">
            <li>✅ 1,00,000+ Subscribers</li>
            <li>✅ 2M+ Views across product tutorials & reviews</li>
            <li>✅ Real customer reviews & live demonstrations</li>
          </ul>
          <Link
            href="https://youtube.com/@rotechnicalxperts"
            target="_blank"
            className="inline-block mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Visit Our YouTube Channel
          </Link>
        </div>
      </div>
    </section>
  );
}