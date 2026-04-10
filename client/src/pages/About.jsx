import { 
  Users, 
  Shield, 
  Search, 
  Upload, 
  Smartphone, 
  Database,
  Server,
  Code,
  Palette,
  CheckCircle2,
  Sparkles
} from "lucide-react";

function About() {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Role-based access control for Buyers, Owners, and Admins with encrypted data protection",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Upload,
      title: "Property Management",
      description: "Seamless listing creation with multi-image upload and detailed property specifications",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Powerful filtering and search capabilities to find the perfect property instantly",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Fully responsive interface built with Tailwind CSS for optimal viewing on any device",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const techStack = [
    { name: "MongoDB", icon: Database, color: "bg-green-100 text-green-700" },
    { name: "Express.js", icon: Server, color: "bg-gray-100 text-gray-700" },
    { name: "React", icon: Code, color: "bg-blue-100 text-blue-700" },
    { name: "Node.js", icon: Server, color: "bg-green-100 text-green-700" },
    { name: "Tailwind CSS", icon: Palette, color: "bg-cyan-100 text-cyan-700" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-sm mb-6 border border-blue-100">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-blue-700 font-medium">Built by Students, Designed for Everyone</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-blue-900">
              About Our Platform
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A modern real estate brokering solution built with the MERN stack, 
            connecting property owners with potential buyers and renters seamlessly.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-12">
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8 md:p-12 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-300" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Our Mission</h2>
              </div>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                Welcome to our <span className="font-semibold text-white">MERN Based Real Estate Brokering Platform</span>. 
                This project was built to bridge the gap between property owners and prospective buyers or renters 
                through a seamless, modern web experience.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                Developed collaboratively by a dedicated team of <span className="font-semibold text-white">5 students</span>, 
                this application showcases our full-stack engineering capabilities using cutting-edge technologies.
              </p>
            </div>
          </div>
          
          {/* Tech Stack Section */}
          <div className="p-8 md:p-12 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
              Technology Stack
            </h3>
            
            <div className="flex flex-wrap gap-4">
              {techStack.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <div 
                    key={index}
                    className={`flex items-center gap-3 px-5 py-3 ${tech.color} rounded-xl font-medium shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tech.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Key Platform Features</h3>
            <p className="text-lg text-gray-600">Everything you need for a modern real estate experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Team & Thank You Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-blue-100">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-md mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Thank You for Exploring Our Project!
            </h3>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We're passionate about creating innovative solutions that make real estate transactions 
              smoother and more accessible. This platform represents months of dedication, collaboration, 
              and learning.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Users className="w-5 h-5" />
              <span className="font-medium">Built with ❤️ by Team 5</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            MERN Stack • Real Estate Platform • Academic Project 2024
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;