import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/Label";
import { Card } from "@/Components/ui/Card";
import { Lock, Mail } from "lucide-react";
import { toast } from "sonner";
import schoolLogo from "@/Assets/School-Logo.png";
import { authAPI } from "@/Services/Api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(email, password);
      sessionStorage.setItem("adminAuth", "true");
      sessionStorage.setItem("adminEmail", response.email);
      toast.success("Login Successful! Welcome To Admin Panel");
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login Failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <img src={schoolLogo} alt="School Logo" className="h-20 w-20 mb-4" />
          <h1 className="text-3xl font-bold text-primary">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Goodwill Public School</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@goodwill.edu.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="py-3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="py-3"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-lg"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </Button>
        </form>

        {/* No Demo Credentials Or Hints Shown. Only Real Error Handling. */}
      </Card>
    </div>
  );
};

export default AdminLogin;
