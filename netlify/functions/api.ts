import serverless from "serverless-http";
import app from "../../server";

// Wrap the Express app for Netlify Serverless Functions
export const handler = serverless(app);
