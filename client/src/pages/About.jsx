function About() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="bg-white max-w-3xl w-full p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100">
        
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center">
          About Our Platform
        </h1>
        
        <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
          <p>
            Welcome to our <strong>MERN Based Real Estate Brokering Platform</strong>. This project was built to bridge the gap between property owners and prospective buyers or renters through a seamless, modern web experience.
          </p>
          
          <p>
            Developed collaboratively by a dedicated team of 5 students, this application showcases our full-stack engineering capabilities using MongoDB, Express.js, React, and Node.js. 
          </p>
          
          <p>
            <strong>Key Platform Features:</strong>
          </p>
          
          <ul className="list-disc pl-6 space-y-2">
            <li>Secure, role-based authentication for Buyers, Owners, and Admins.</li>
            <li>Dynamic property listing management with image upload capabilities.</li>
            <li>Advanced search and filtering mechanisms for easy discovery.</li>
            <li>Responsive, user-friendly interface powered by Tailwind CSS.</li>
          </ul>
          
          <p className="pt-6 font-semibold text-center text-blue-800">
            Thank you for reviewing our project!
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;