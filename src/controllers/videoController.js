export const trending = (req, res) => res.send("Home page Video");
export const see = (req, res) => {
  console.log(req.params);
  res.send("Watch Video");
};
export const edit = (req, res) => {
  console.log(req.params);
  return res.send("Edit Video");
};
export const search = (req, res) => res.send("Search Videos");
export const upload = (req, res) => res.send("Upload video");
export const deleteVideo = (req, res) => {
  console.log(req.params);
  return res.send("Delete Video");
};
