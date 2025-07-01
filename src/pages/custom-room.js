import Link from "next/link";

const premiumModels = [
    {
        id: "p1",
        name: "Aqua Elite RO+UV+UF",
        description: "Premium multi-stage purification with mineral boost.",
        image: "https://images.unsplash.com/photo-1662926912257-514bbe9d4ba3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHJvJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D",
        highlights: ["FREE ASSEMBLING", "UV + Copper Filter", "Premium Look"],
       
    },
    {
        id: "p2",
        name: "Nexus PureX Pro",
        description: "Smart touch panel with auto-clean system.",
        image: "https://media.istockphoto.com/id/1353364880/photo/glass-of-filtered-clean-water-with-reverse-osmosis-filter-lemons-and-cartridges-on-table-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=CySwbuyjv6YXZALYu-f8U4KdIh1b80ysos_Q7Y0eYqA=",
        highlights: ["FREE ASSEMBLING", "TDS Controller", "Digital Display"],
       
    },
];

export default function CustomRoom() {
    return (
        <div className="min-h-screen bg-zinc-900 text-white px-4 py-20">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
                Customize Your Premium RO Setup
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {premiumModels.map((model) => (
                    <div
                        key={model.id}
                        className="bg-zinc-800 rounded-xl shadow-lg overflow-hidden"
                    >
                        <img
                            src={model.image}
                            alt={model.name}
                            className="w-full h-56 object-cover"
                        />
                        

                        <div className="p-5">
                            <h2 className="text-xl font-semibold mb-2">{model.name}</h2>
                            <p className="text-sm text-gray-300 mb-3">{model.description}</p>
                            <ul className="mb-4">
                                {model.highlights.map((point, i) => (
                                    <li key={i} className="text-green-400 font-semibold">
                                        ✅ {point}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-yellow-400 text-lg font-bold mb-4">
                                Contact Us for Best Price 💬
                            </p>
                            <Link
                                href="/contact"
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block"
                            >
                                Enquire Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
