const app = require('./app');
const cors = require('cors');

app.use(
  cors({
    origin: [
      "https://55b9d4d3.code-review-frontend.pages.dev",
      "https://02dcdf4a.code-review-frontend.pages.dev"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

