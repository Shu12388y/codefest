import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { LoginPage, SignUpPage } from "../pages/auth/index.ts";
import UsageStats from "../pages/analytics/analytics.tsx";
import { Layout } from "../pages/dashboard/index.ts";
import SubmissionLogs from "../pages/dsa-questions/submission-logs/submissionLogs.tsx";
import DSAQuestions from "../pages/dsa-questions/questions/questions.tsx";
import CreateDSAQuestion from "../pages/dsa-questions/addQuestion/addQuestion.tsx";
import BlogManagement from "../pages/blogs/blogs/blogs.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="analytics" element={<UsageStats />} />
          <Route path="submission-logs" element={<SubmissionLogs />} />
          <Route path="questions" element={<DSAQuestions />} />
          <Route path="add-question" element={<CreateDSAQuestion/>} />
          <Route path="blogs" element={<BlogManagement/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
