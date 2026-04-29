import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { StudyProvider } from "./contexts/StudyContext";
import Home from "./pages/Home";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      {basePath && <Route path={`${basePath}/`} component={Home} />}
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <StudyProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </StudyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
