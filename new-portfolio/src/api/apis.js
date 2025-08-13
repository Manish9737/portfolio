import axios from "./axios";

// -------------------- Tech Stack APIs --------------------
export const getTechStack = () => axios.get("/techStack");
export const getTechStackById = (id) => axios.get(`/techStack/${id}`);
export const addTechStack = (data) => axios.post("/techStack", data, { headers: { "Content-Type": "multipart/form-data"}});
export const updateTechStack = (id, data) => axios.patch(`/techStack/${id}`, data, { headers: { "Content-Type": "multipart/form-data"}});
export const deleteTechStack = (id) => axios.delete(`/techStack/${id}`);

// -------------------- Visit Counter API --------------------
export const getVisitCount = () => axios.get("/visits");
export const createVisit = () => axios.post("/visits");

// -------------------- User Profile APIs --------------------
export const getUserProfile = () => axios.get(`/auth/users/${localStorage.getItem("userId")}`);
export const updateUserProfile = (data) => axios.patch(`/auth/users/${localStorage.getItem("userId")}`, data, { headers: { "Content-Type": "multipart/form-data"}});
export const loginAdmin = (credentials) => axios.post("/auth/login", credentials);

// -------------------- Projects APIs --------------------
export const getProjects = () => axios.get("/projects");
export const addProject = (data) => axios.post("/projects", data, { headers: { "Content-Type": "multipart/form-data"}});
export const updateProject = (id, data) => axios.patch(`/projects/${id}`, data, { headers: { "Content-Type": "multipart/form-data"}});
export const deleteProject = (id) => axios.delete(`/projects/${id}`);

// -------------------- Contact us APIs --------------------
export const getContactRequests = () => axios.get("/contact");
export const createContactRequest = (data) => axios.post("/contact", data);
export const getContactById = (id) => axios.get(`/contact/${id}`);
export const deleteContact = (id) => axios.delete(`/contact/${id}`);

export const sendEmail = (data) => axios.post("/contact/send-email", data);

// -------------------- Blogs APIs --------------------
export const getBlogs = () => axios.get("/blogs");
export const createBlog = (data) => axios.post("/blogs", data);
export const getBlogBySlug = (slug) => axios.get(`/blogs/${slug}/slug`);
export const getBlogById = (id) => axios.get(`/blogs/${id}`);
export const updateBlog = (id, data) => axios.patch(`/blogs/${id}`, data);
export const deleteBlog = (id) => axios.delete(`/blogs/${id}`);
