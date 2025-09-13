import React, { useRef, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useUserStore } from "@/stores/UserStore";
import { LoginApiRespone } from "../types/User.type";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Eye, EyeOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { API } from "@/utils/apiclient";
import { toast } from "sonner";
const LoginPage: React.FC = () => {
  const { setUser } = useUserStore();

  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Login submitted:", { email, password });

    setIsSubmitting(true);
    setTimeout(async () => {
      try {
        const api = new API();
        
        const loginApiRespone: LoginApiRespone = await api.post(
          "/api/user/login",
          { email: email, password: password },
          {credentials : 'include'}
        );
        setUser({...loginApiRespone.data,access_token: loginApiRespone.access_token});
        return navigate("/");
      } catch (error) {
        setIsSubmitting(false);
        // console.log("----" + error.message);
        toast.error("Đăng nhập thất bại" , {description:<span className="font-extrabold">{error.message || ""}</span> , position:'top-center'});
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          {/* <CardTitle className="text-2xl text-center">Login</CardTitle> */}
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              className="w-[130px] h-[100px]"
              src="/logo.png"
              alt="@shadcn"
            />
            <AvatarFallback>Logo</AvatarFallback>
          </Avatar>
          <CardDescription>
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
              <button className="flex items-center justify-center w-full bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none ">
                <svg
                  className="h-6 w-6 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="800px"
                  height="800px"
                  viewBox="-0.5 0 48 48"
                  version="1.1"
                >
                  {" "}
                  <defs> </defs>{" "}
                  <g
                    id="Icons"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    {" "}
                    <g
                      id="Color-"
                      transform="translate(-401.000000, -860.000000)"
                    >
                      {" "}
                      <g
                        id="Google"
                        transform="translate(401.000000, 860.000000)"
                      >
                        {" "}
                        <path
                          d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                          id="Fill-1"
                          fill="#FBBC05"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                          id="Fill-2"
                          fill="#EB4335"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                          id="Fill-3"
                          fill="#34A853"
                        >
                          {" "}
                        </path>{" "}
                        <path
                          d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                          id="Fill-4"
                          fill="#4285F4"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                disabled={isSubmitting}
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2 relative">
              <Label htmlFor="password">Password</Label>

              <Input
                disabled={isSubmitting}
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                tabIndex={-1}
                className="absolute inset-y-0 right-0 pr-3 top-5 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              {isSubmitting ? <Spinner /> : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
