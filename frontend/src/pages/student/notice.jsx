// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const NoticePage = () => {
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const student = JSON.parse(localStorage.getItem("user"));
//   const collegeCode = student?.collegeCode;

//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         const res = await fetch(
//           `https://career-ksfd.onrender.com/api/auth/student/${collegeCode}/notices`
//         );
//         const data = await res.json();
//         setNotices(data);
//       } catch (err) {
//         console.error("Error fetching notices:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (collegeCode) fetchNotices();
//   }, [collegeCode]);

//   if (loading) {
//     return (
//       <div className="notices-page">
//         <p className="notice-loading">Loading notices...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="notices-page">
//       <h1>Approved Notices for Your College ({collegeCode})</h1>

//       {notices.length === 0 ? (
//         <p className="notice-empty">No approved notices available</p>
//       ) : (
//         <div className="notice-list">
//           {notices.map((n) => (
//             <div key={n._id} className="notice-item">
//               <h3>{n.title}</h3>
//               <p>{n.description}</p>

//               {n.image && (
//                 <img
//                   src={`https://career-ksfd.onrender.com/uploads/${n.image}`}
//                   alt={n.title}
//                 />
//               )}

//               <span className="notice-company">
//                 <strong>Company:</strong> {n.companyId?.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoticePage;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const NoticePage = () => {
//   const [notices, setNotices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const student = JSON.parse(localStorage.getItem("user"));
//   const collegeCode = student?.collegeCode;

//   useEffect(() => {
//     const fetchNotices = async () => {
//       try {
//         const res = await fetch(
//           `https://career-ksfd.onrender.com/api/auth/student/${collegeCode}/notices`
//         );
//         const data = await res.json();
//         setNotices(data);
//       } catch (err) {
//         console.error("Error fetching notices:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (collegeCode) fetchNotices();
//   }, [collegeCode]);

//   if (loading) {
//     return (
//       <div className="notices-page">
//         <p className="notice-loading">Loading notices...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="notices-page">
//       <h1>Approved Notices for Your College ({collegeCode})</h1>

//       {notices.length === 0 ? (
//         <p className="notice-empty">No approved notices available</p>
//       ) : (
//         <div className="notice-list">
//           {notices.map((n) => (
//             <div key={n._id} className="notice-item">
//               <h3>{n.title}</h3>
//               <p>{n.description}</p>

//               {n.image && (
//                 <img
//                   src={`https://career-ksfd.onrender.com/uploads/${n.image}`}
//                   alt={n.title}
//                 />
//               )}

//               <span className="notice-company">
//                 <strong>Company:</strong> {n.companyId?.name}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NoticePage;


import React, { useEffect, useState } from "react";
import { Building, Calendar, MapPin, Briefcase, Search, Filter } from "lucide-react";

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotices, setFilteredNotices] = useState([]);

  const student = JSON.parse(localStorage.getItem("user"));
  const collegeCode = student?.collegeCode;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await fetch(
          `https://career-ksfd.onrender.com/api/auth/student/${collegeCode}/notices`
        );
        const data = await res.json();
        setNotices(data);
        setFilteredNotices(data);
      } catch (err) {
        console.error("Error fetching notices:", err);
      } finally {
        setLoading(false);
      }
    };

    if (collegeCode) fetchNotices();
  }, [collegeCode]);

  useEffect(() => {
    const filtered = notices.filter(notice =>
      notice.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notice.companyId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNotices(filtered);
  }, [searchTerm, notices]);

  if (loading) {
    return (
      <div className="notice-page-container">
        <div className="notice-loading">
          <div className="loading-spinner"></div>
          <p>Loading approved notices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notice-page-container">
      <div className="notice-page-header">
        <div className="header-content">
          <div className="header-main">
            <h1>Approved Job Notices</h1>
            <p className="college-info">For College: {collegeCode}</p>
          </div>
          <div className="notice-stats">
            
          </div>
        </div>

        <div className="search-filter-section">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search notices by title or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* <div className="filter-info">
            <Filter size={16} />
            <span>
              Showing {filteredNotices.length} of {notices.length} notices
            </span>
          </div> */}
        </div>
      </div>

      {filteredNotices.length === 0 ? (
        <div className="notice-empty-state">
          <div className="empty-icon">
            <Briefcase size={64} />
          </div>
          <h3>No Notices Available</h3>
          <p>
            {searchTerm
              ? "No notices match your search criteria. Try different keywords."
              : "There are no approved job notices for your college at the moment."}
          </p>
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm("")}
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="notices-grid">
          {filteredNotices.map((notice) => (
            <div key={notice._id} className="notice-card">
              <div className="notice-card-header">
                <div className="notice-badge">Active</div>
                <div className="notice-date">
                  <Calendar size={14} />
                  {new Date(notice.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="notice-card-body">
                <h3 className="notice-title">{notice.title}</h3>
                <p className="notice-description">{notice.description}</p>

                {notice.image && (
                  <div className="notice-image-container">
                    <img
                      src={`https://career-ksfd.onrender.com/uploads/${notice.image}`}
                      alt={notice.title}
                      className="notice-image"
                    />
                  </div>
                )}

                <div className="notice-company-info">
                  <div className="company-details">
                    <Building size={16} />
                    <div>
                      <span className="company-name">
                        {notice.companyId?.name || "Unknown Company"}
                      </span>
                      {notice.companyId?.location && (
                        <span className="company-location">
                          <MapPin size={12} />
                          {notice.companyId.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoticePage;

