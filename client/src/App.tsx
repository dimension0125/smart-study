import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { StudyProvider } from "./contexts/StudyContext";
import Home from "./pages/Home";


function Router() {
  return (
    <Switch base="/smart-study">
      <Route path={"/"} component={Home} />
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
