function Certificates() {
  const certificates = [
    {
      name: "University Certificate",
      imageUrl: "/university-Certificate.jpg",
      description:
        "Here is my unversity certificate in Software Engineering from Al-Azhar University",
    },
    {
      name: "English React Certificate",
      imageUrl: "/Certificate-Eng-React.jpg",
      description:
        "This is a certificate in React from Udemy, i have completed the course successfully in 2024",
    },
    {
      name: "Arabic React Certificate",
      imageUrl: "/Certificate-Arb-React.jpg",
      description:
        "This is a certificate in React from Udemy, i have completed the course successfully in 2024",
    },
  ];
  return (
    <div>
      <div
        className="bg-darkBackground  min-h-screen  flex flex-col justify-center items-center"
        id="certificates"
      >
        <h2 className="text-7xl font-extrabold tracking-wide text-slate-100 text-center mb-10">
          Certificates
        </h2>
        <div className="template  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((certificate, index) => (
            <div className="bg-background rounded-lg">
              <div
                className="w-full h-48 bg-top bg-cover mb-4 rounded-t-lg"
                style={{ backgroundImage: `url(${certificate.imageUrl})` }}
              ></div>

              <div key={index} className="p-4 shadow-md">
                <h3 className="text-lg font-semibold text-slate-900">{certificate.name}</h3>
                <p className="text-sm text-slate-400">
                  {certificate.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Certificates;
