import { Package, Globe, Star, Users } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Package,
      number: "500+",
      label: "Premium Products",
      labelPl: "Produktów Premium",
    },
    {
      icon: Globe,
      number: "50+",
      label: "Countries Supported",
      labelPl: "Obsługiwanych Krajów",
    },
    {
      icon: Star,
      number: "90%",
      label: "European Retailer Satisfaction",
      labelPl: "Satysfakcja Europejskich Detalistów",
    },
    {
      icon: Users,
      number: "100+",
      label: "Satisfied Retailers",
      labelPl: "Zadowolonych Detalistów",
    },
  ]

  return (
    <section id="stats" className="py-20 bg-gradient-to-br from-[#8B1538] to-[#6B0F2A] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-4 p-4 bg-white/10 rounded-full group-hover:bg-white/20 transition-colors">
                  <Icon className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-3">{stat.number}</div>
                <div className="text-base md:text-lg opacity-90 leading-relaxed max-w-[200px]">{stat.labelPl}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
