// import React, { useEffect, useState } from "react";

// const PostPage = () => {
//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const companyId = user._id || user.id;

//   const [notices, setNotices] = useState([]);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageFile, setImageFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const fetchNotices = async () => {
//     if (!companyId) return;
//     try {
//       const res = await fetch(`https://career-ksfd.onrender.com/api/auth/company/${companyId}/notices`);
//       const data = await res.json();
//       setNotices(data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { fetchNotices(); }, [companyId]);

//   const handleFileChange = (e) => setImageFile(e.target.files[0]);

//   const handlePostNotice = async (e) => {
//     e.preventDefault();
//     if (!title || !description) return alert("Title and description required");
//     if (!companyId) return alert("Company ID missing");

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     if (imageFile) formData.append("image", imageFile);

//     setUploading(true);
//     try {
//       const res = await fetch(`https://career-ksfd.onrender.com/api/auth/company/${companyId}/notice`, { method: "POST", body: formData });
//       const data = await res.json();
//       if (data.notice) {
//         // Add the new notice to state immediately
//         setNotices((prev) => [data.notice, ...prev]);
//         setTitle("");
//         setDescription("");
//         setImageFile(null);
//         alert("Notice posted successfully");
//       } else alert("Failed to post notice");
//     } catch (err) {
//       console.error(err);
//       alert("Server error");
//     }
//     setUploading(false);
//   };

//   const handleDelete = async (noticeId) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       const res = await fetch(`https://career-ksfd.onrender.com/api/auth/notice/${noticeId}`, { method: "DELETE" });
//       if (res.ok) {
//         setNotices((prev) => prev.filter((n) => n._id !== noticeId)); // remove from state
//         alert("Notice deleted successfully");
//       } else alert("Failed to delete the notice");
//     } catch (err) {
//       console.error(err);
//       alert("Server error while deleting notice");
//     }
//   };

//   return (
//     <div className="profile-page">
//       <h2>Post a New Notice</h2>
//       <form onSubmit={handlePostNotice}>
//         <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//         <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
//         <input type="file" accept="image/*" onChange={handleFileChange} />
//         <button type="submit" disabled={uploading}>{uploading ? "Posting..." : "Post Notice"}</button>
//       </form>

//       <h3>Your Notices</h3>
//       {notices.length === 0 ? <p>No notices yet</p> : (
//         <ul>
//           {notices.map((n) => (
//             <li key={n._id} style={{ marginBottom: "15px" }}>
//               <strong>{n.title}</strong> - {n.description}
//               {n.image && (
//                 <img
//                   src={`https://career-ksfd.onrender.com/uploads/${n.image}`}
//                   alt={n.title}
//                   width="100"
//                   style={{ display: "block", marginTop: "5px" }}
//                   onError={(e) => { e.target.src = "https://via.placeholder.com/100"; }}
//                 />
//               )}
//               <button onClick={() => handleDelete(n._id)} style={{ marginTop: "5px" }}>Delete</button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default PostPage;


import React, { useEffect, useState } from "react";

const PostPage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const companyId = user._id || user.id;

  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchNotices = async () => {
    if (!companyId) return;
    try {
      const res = await fetch(
        `https://career-ksfd.onrender.com/api/auth/company/${companyId}/notices`
      );
      const data = await res.json();
      setNotices(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, [companyId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview("");
  };

  const handlePostNotice = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);

    setUploading(true);

    try {
      const res = await fetch(
        `https://career-ksfd.onrender.com/api/auth/company/${companyId}/notice`,
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (data.notice) {
        setNotices((prev) => [data.notice, ...prev]);
        setTitle("");
        setDescription("");
        setImageFile(null);
        setPreview("");
        alert("Notice posted successfully!");
      } else {
        alert("Failed to post notice");
      }
    } catch (err) {
      alert("Error posting notice");
    }

    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(
        `https://career-ksfd.onrender.com/api/auth/notice/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        setNotices((prev) => prev.filter((n) => n._id !== id));
      }
    } catch {
      alert("Error deleting notice");
    }
  };

  return (
    <div className="post-page-container">
      {/* POST NOTICE */}
      <div className="post-notice-section">
        <h2>Post a New Notice</h2>

        <form className="notice-form" onSubmit={handlePostNotice}>
          {/* Title */}
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              placeholder="Enter notice title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter job description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="5"
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="file-upload-container">
            <label className="file-upload-label">
              <span className="file-upload-text">
                {imageFile ? imageFile.name : "Choose an image"}
              </span>
              <span className="file-upload-button">Browse</span>
              <input
                type="file"
                className="file-input"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Image preview */}
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="preview" />
              <button type="button" className="remove-image-btn" onClick={removeImage}>
                Remove Image
              </button>
            </div>
          )}

          {/* Submit button */}
          <button className="submit-btn" type="submit" disabled={uploading}>
            {uploading ? (
              <>
                <div className="spinner"></div> Posting...
              </>
            ) : (
              "Post Notice"
            )}
          </button>
        </form>
      </div>

      {/* NOTICE LIST */}
      <div className="your-notices-section">
        <h3>Your Notices</h3>

        {notices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <p>No notices posted yet</p>
            <p>Your posted notices will appear here</p>
          </div>
        ) : (
          <div className="notices-grid">
            {notices.map((n) => (
              <div className="notice-card" key={n._id}>
                <div className="notice-header">
                  <h4>{n.title}</h4>

                              {/* Delete button */}
                              <button className="delete-btn" onClick={() => handleDelete(n._id)}>
              <span>Delete</span>
            </button>

                </div>

                <div className="notice-body">
                  <p className="notice-description">{n.description}</p>

                  {n.image && (
                    <div className="notice-image">
                      <img
                        src={`https://career-ksfd.onrender.com/uploads/${n.image}`}
                        alt={n.title}
                      />
                    </div>
                  )}

                  <div className="notice-footer">
                    <span className="notice-date">📅 Posted just now</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
