module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || "https://your-supabase-url.supabase.co",
    supabaseKey: process.env.SUPABASE_KEY || "your-supabase-anon-key"
  });
};
