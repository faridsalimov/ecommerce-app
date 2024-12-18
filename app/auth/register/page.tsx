import AuthForm from "@/components/auth/auth-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { register } from "@/app/actions/auth";

export default function RegisterPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-16">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Qeydiyyat</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm type="register" onSubmit={register} />
        </CardContent>
      </Card>
    </div>
  );
}
