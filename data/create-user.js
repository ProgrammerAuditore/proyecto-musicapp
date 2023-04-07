db.createUser({
  user: "user_musicapp",
  pwd: "pass",
  roles: [{ role: "readWrite", db: "db_musicapp" }]
});