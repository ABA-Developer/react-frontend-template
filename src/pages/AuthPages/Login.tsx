import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "../../components/auth/AuthPageLayout";
import LoginForm from "../../components/auth/LoginForm";

export default function Login() {
  return (
    <>
      <PageMeta
        title='Login Dashboard | NBA Dashboard Template'
        description='Login to access your Dashboard'
      />
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
}
