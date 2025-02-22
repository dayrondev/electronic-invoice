import { CreateBusinessForm } from "./create-business-form";

const RegisterBusinessPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <CreateBusinessForm />
      </div>
    </div>
  );
};
export default RegisterBusinessPage;
