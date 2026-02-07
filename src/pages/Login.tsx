import { Link, useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, School, ArrowLeft } from "lucide-react";
import { TeacherAuthForm } from "@/components/auth/TeacherAuthForm";
import { ParentAuthForm } from "@/components/auth/ParentAuthForm";

export default function Login() {
  const { type } = useParams<{ type?: string }>();
  const navigate = useNavigate();

  // If no type specified, show selection
  if (!type) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to SWARSETU</h1>
            <p className="text-muted-foreground">
              Choose your portal to continue
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Card 
              className="cursor-pointer border-2 hover:border-accent transition-colors"
              onClick={() => navigate("/login/parent")}
            >
              <CardContent className="pt-8 pb-8 text-center">
                <div className="h-16 w-16 rounded-2xl gradient-warm flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Parent Portal</h2>
                <p className="text-sm text-muted-foreground">
                  Track your child's progress and access learning resources
                </p>
              </CardContent>
            </Card>

            <Card 
              className="cursor-pointer border-2 hover:border-secondary transition-colors"
              onClick={() => navigate("/login/teacher")}
            >
              <CardContent className="pt-8 pb-8 text-center">
                <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                  <School className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Teacher Portal</h2>
                <p className="text-sm text-muted-foreground">
                  Manage students, conduct tests, and generate reports
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  // Parent Login
  if (type === "parent") {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
              <ArrowLeft className="h-4 w-4" />
              Back to selection
            </Link>
            <Card>
              <CardHeader className="text-center">
                <div className="h-14 w-14 rounded-2xl gradient-warm flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-accent-foreground" />
                </div>
                <CardTitle>Parent Login</CardTitle>
                <CardDescription>
                  Access linked by your child's teacher
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ParentAuthForm />
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Parent access must be linked by your child's teacher. 
                  Contact the school if you haven't received access.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  // Teacher Login
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to selection
          </Link>
          <Card>
            <CardHeader className="text-center">
              <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <School className="h-7 w-7 text-secondary-foreground" />
              </div>
              <CardTitle>Teacher Portal</CardTitle>
              <CardDescription>
                Sign in or create an account to manage your classroom
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TeacherAuthForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
