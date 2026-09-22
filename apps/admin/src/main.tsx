import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { LoginPage, SignUpPage } from "../pages/auth/index.ts";
import UsageStats from "../pages/analytics/analytics.tsx";
import { Layout } from "../pages/dashboard/index.ts";
import SubmissionLogs from "../pages/dsa-questions/submission-logs/submissionLogs.tsx";
import DSAQuestions from "../pages/dsa-questions/questions/questions.tsx";
import CreateDSAQuestion from "../pages/dsa-questions/addQuestion/addQuestion.tsx";
import BlogManagement from "../pages/blogs/blogs/blogs.tsx";
import { store } from "../store/store";
import JobsManagement from "../pages/job-post/jobs/jobs.tsx";
import type { RootState } from "../store/store";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? children : <Navigate to="/" replace />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout>
                  <Outlet />
                </Layout>
              </ProtectedRoute>
            }
          >
            <Route path="analytics" element={<UsageStats />} />
            <Route path="submission-logs" element={<SubmissionLogs />} />
            <Route path="questions" element={<DSAQuestions />} />
            <Route path="add-question" element={<CreateDSAQuestion />} />
            <Route path="blogs" element={<BlogManagement />} />
            <Route path="jobs" element={<JobsManagement />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
