import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mic,
  Brain,
  Users,
  School,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { ImaginativeHeroBackground } from "@/components/home/ImaginativeHeroBackground";

const features = [
  {
    icon: Mic,
    title: "Voice-First Assessment",
    description: "Advanced speech recognition analyzes phoneme accuracy, prosody, and temporal patterns across 11 languages.",
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Deep learning models trained on Indian speech patterns detect early indicators of dyslexia, dyscalculia, and dysgraphia.",
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Support for Hindi, Bengali, Telugu, Tamil, and 7 more Indian languages with accent normalization.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "All data is encrypted and compliant with Indian data protection standards. No medical diagnoses made.",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <ImaginativeHeroBackground />
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              AI-Powered Learning Disability Detection
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Every Child Deserves to Be{" "}
              <span className="text-gradient">Understood</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              SWARSETU is India's first voice-powered platform to flag early indicators of dyslexia, dyscalculia, and dysgraphia in 11 Indian languages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Button asChild variant="hero" size="xl">
                <Link to="/login" className="gap-2">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/learn-more">Learn How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for India's Classrooms</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform addresses the unique challenges of Indian education systems with advanced AI technology.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Login Portals Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Portal</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're a parent tracking your child's progress or a teacher managing your classroom, we have you covered.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Parent Portal */}
            <Card className="relative overflow-hidden border-2 border-accent/30 hover:border-accent transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 gradient-warm opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="pb-4">
                <div className="h-16 w-16 rounded-2xl gradient-warm flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl">Parent Portal</CardTitle>
                <CardDescription>
                  Track your child's learning journey with gamified progress reports and AI-powered insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Gamified progress tracking</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>AI chatbot for practice</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Real-time session updates</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Learning resources</span>
                  </li>
                </ul>
                <Button asChild variant="accent" className="w-full">
                  <Link to="/login/parent">
                    Parent Login
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Teacher Portal */}
            <Card className="relative overflow-hidden border-2 border-secondary/30 hover:border-secondary transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardHeader className="pb-4">
                <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                  <School className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Teacher Portal</CardTitle>
                <CardDescription>
                  Manage students, conduct assessments, and generate comprehensive reports for your institution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Voice & written tests</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Student management</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Detailed analytics</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>Parent linking</span>
                  </li>
                </ul>
                <Button asChild variant="secondary" className="w-full">
                  <Link to="/login/teacher">
                    Teacher Login
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </Layout>
  );
}
