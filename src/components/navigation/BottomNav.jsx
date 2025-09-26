// Your real Layout component
const createPageUrl = (pageName) => {
  return `/${pageName.toLowerCase()}`;
};

const Layout = ({ children, currentPageName }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <style>{`
        :root {
          --primary-navy: #1e3a8a;
          --accent-cyan: #06d6a0;
          --electric-blue: #3b82f6;
          --dark-navy: #0f172a;
        }
      `}</style>
      {children}
    </div>
  );
};
